import UIKit
import Capacitor
import CoreBluetooth

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }
        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = MainViewController()
        window?.makeKeyAndVisible()
        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}

class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(WhoopPlugin())
    }
}

/// EVO direct WHOOP bridge: standard Heart Rate + Battery over BLE.
/// No WHOOP account, API or cloud connection is used by this path.
@objc(WhoopPlugin)
public class WhoopPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "WhoopPlugin"
    public let jsName = "Whoop"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "sync", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise)
    ]

    private var central: CBCentralManager?
    private var peripheral: CBPeripheral?
    private var pendingCall: CAPPluginCall?
    private var heartRate: Int?
    private var battery: Int?
    private var timeoutWorkItem: DispatchWorkItem?

    private let heartRateService = CBUUID(string: "180D")
    private let heartRateMeasurement = CBUUID(string: "2A37")
    private let batteryService = CBUUID(string: "180F")
    private let batteryLevel = CBUUID(string: "2A19")
    private let whoop5Service = CBUUID(string: "FD4B0001-C CE1-4033-93CE-002D5875F58A".replacingOccurrences(of: "C CE1", with: "CCE1"))

    @objc public func sync(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            guard self.pendingCall == nil else {
                call.reject("Une synchronisation WHOOP est déjà en cours")
                return
            }
            self.pendingCall = call
            self.heartRate = nil
            self.battery = nil
            self.timeoutWorkItem?.cancel()
            self.central = CBCentralManager(delegate: self, queue: .main)
            self.startTimeout()
        }
    }

    @objc public func status(_ call: CAPPluginCall) {
        var result: [String: Any] = [
            "available": central?.state == .poweredOn,
            "connected": peripheral?.state == .connected
        ]
        if let heartRate { result["heartRate"] = heartRate }
        if let battery { result["battery"] = battery }
        call.resolve(result)
    }

    private func startTimeout() {
        let work = DispatchWorkItem { [weak self] in
            guard let self, self.pendingCall != nil else { return }
            self.resolvePending(error: self.heartRate == nil ? "WHOOP détecté mais aucune donnée de fréquence cardiaque reçue. Le bracelet peut être connecté à l’app WHOOP ou nécessiter son profil BLE propriétaire." : nil)
        }
        timeoutWorkItem = work
        DispatchQueue.main.asyncAfter(deadline: .now() + 10, execute: work)
    }

    private func resolvePending(error: String?) {
        guard let call = pendingCall else { return }
        pendingCall = nil
        timeoutWorkItem?.cancel()
        central?.stopScan()
        if let error {
            call.reject(error)
            return
        }
        var result: [String: Any] = [
            "connected": true,
            "source": "WHOOP BLE standard Heart Rate"
        ]
        if let heartRate { result["heartRate"] = heartRate }
        if let battery { result["battery"] = battery }
        call.resolve(result)
    }

    private func parseHeartRate(_ data: Data) -> Int? {
        guard let flags = data.first, data.count >= 2 else { return nil }
        if (flags & 0x01) != 0 {
            guard data.count >= 3 else { return nil }
            return Int(UInt16(data[1]) | (UInt16(data[2]) << 8))
        }
        return Int(data[1])
    }

    private func isWhoop(_ peripheral: CBPeripheral, advertisementData: [String: Any]) -> Bool {
        let name = (advertisementData[CBAdvertisementDataLocalNameKey] as? String) ?? peripheral.name ?? ""
        return name.uppercased().hasPrefix("WHOOP")
    }
}

extension WhoopPlugin: CBCentralManagerDelegate, CBPeripheralDelegate {
    public func centralManagerDidUpdateState(_ central: CBCentralManager) {
        guard central.state == .poweredOn else {
            if central.state == .unauthorized {
                pendingCall?.reject("Bluetooth n'est pas autorisé pour EVO Fit Coach")
                pendingCall = nil
            }
            return
        }

        // First try peripherals already connected/known to iOS. This is important
        // because WHOOP may not advertise 180D while the official app owns the link.
        let connected = central.retrieveConnectedPeripherals(withServices: [heartRateService, batteryService])
            .filter { isWhoop($0, advertisementData: [:]) }
        if let existing = connected.first {
            self.peripheral = existing
            existing.delegate = self
            central.connect(existing, options: nil)
            return
        }

        // Do not restrict discovery to 180D: WHOOP 5 advertises its private fd4b
        // service and may omit the standard Heart Rate service from advertisements.
        central.scanForPeripherals(withServices: nil, options: [CBCentralManagerScanOptionAllowDuplicatesKey: false])
    }

    public func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
        guard isWhoop(peripheral, advertisementData: advertisementData) else { return }
        self.peripheral = peripheral
        peripheral.delegate = self
        central.stopScan()
        central.connect(peripheral, options: nil)
    }

    public func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        peripheral.discoverServices([heartRateService, batteryService, whoop5Service])
    }

    public func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
        resolvePending(error: error?.localizedDescription ?? "Impossible de connecter le WHOOP")
    }

    public func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        if pendingCall != nil && heartRate == nil {
            resolvePending(error: error?.localizedDescription ?? "WHOOP déconnecté avant réception de la FC")
        }
    }

    public func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        guard error == nil else {
            resolvePending(error: error?.localizedDescription ?? "Erreur de découverte Bluetooth")
            return
        }
        for service in peripheral.services ?? [] {
            if service.uuid == heartRateService {
                peripheral.discoverCharacteristics([heartRateMeasurement], for: service)
            } else if service.uuid == batteryService {
                peripheral.discoverCharacteristics([batteryLevel], for: service)
            }
            // The WHOOP 5 fd4b service is discovered here as a capability check.
            // Its richer characteristics are encrypted after official pairing;
            // this first EVO pass intentionally does not bypass that security.
        }
    }

    public func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        guard error == nil else { return }
        for characteristic in service.characteristics ?? [] {
            if characteristic.uuid == heartRateMeasurement {
                peripheral.setNotifyValue(true, for: characteristic)
            } else if characteristic.uuid == batteryLevel {
                peripheral.readValue(for: characteristic)
            }
        }
    }

    public func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
        guard error == nil, let data = characteristic.value else { return }
        if characteristic.uuid == heartRateMeasurement {
            heartRate = parseHeartRate(data)
            if heartRate != nil {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) { [weak self] in
                    guard let self, self.pendingCall != nil else { return }
                    self.resolvePending(error: nil)
                }
            }
        } else if characteristic.uuid == batteryLevel, let level = data.first {
            battery = Int(level)
        }
    }
}
