import Foundation
import Capacitor
import CoreBluetooth

/// First EVO WHOOP bridge: reads the standard Bluetooth Heart Rate and Battery
/// characteristics exposed by WHOOP 5.0. No WHOOP account or cloud is used.
/// Deeper WHOOP-5 history/metrics are deliberately not decoded here yet.
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

    @objc public func sync(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            if self.pendingCall != nil {
                call.reject("Une synchronisation WHOOP est déjà en cours")
                return
            }
            self.pendingCall = call
            self.heartRate = nil
            self.battery = nil
            self.timeoutWorkItem?.cancel()
            self.central = CBCentralManager(delegate: self, queue: .main)
            self.finishAfterTimeout()
        }
    }

    @objc public func status(_ call: CAPPluginCall) {
        call.resolve([
            "available": central?.state == .poweredOn,
            "connected": peripheral?.state == .connected,
            "heartRate": heartRate as Any,
            "battery": battery as Any
        ])
    }

    private func finishAfterTimeout() {
        let work = DispatchWorkItem { [weak self] in
            guard let self else { return }
            if self.pendingCall != nil {
                self.resolvePending(message: self.heartRate == nil ? "Aucun signal FC WHOOP reçu" : nil)
            }
        }
        timeoutWorkItem = work
        DispatchQueue.main.asyncAfter(deadline: .now() + 8, execute: work)
    }

    private func resolvePending(message: String?) {
        guard let call = pendingCall else { return }
        pendingCall = nil
        timeoutWorkItem?.cancel()
        if let peripheral { central?.cancelPeripheralConnection(peripheral) }

        if let message, heartRate == nil {
            call.reject(message)
            return
        }

        var result: [String: Any] = [
            "connected": true,
            "source": "WHOOP BLE standard Heart Rate",
            "heartRate": heartRate as Any
        ]
        if let battery { result["battery"] = battery }
        call.resolve(result)
    }

    private func parseHeartRate(_ data: Data) -> Int? {
        guard let flags = data.first, data.count >= 2 else { return nil }
        let is16Bit = (flags & 0x01) != 0
        if is16Bit {
            guard data.count >= 3 else { return nil }
            return Int(UInt16(data[1]) | (UInt16(data[2]) << 8))
        }
        return Int(data[1])
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
        central.scanForPeripherals(withServices: [heartRateService], options: [CBCentralManagerScanOptionAllowDuplicatesKey: false])
    }

    public func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
        self.peripheral = peripheral
        peripheral.delegate = self
        central.stopScan()
        central.connect(peripheral, options: nil)
    }

    public func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        peripheral.discoverServices([heartRateService, batteryService])
    }

    public func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
        resolvePending(message: error?.localizedDescription ?? "Impossible de connecter le WHOOP")
    }

    public func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        if pendingCall != nil && heartRate == nil {
            resolvePending(message: error?.localizedDescription ?? "WHOOP déconnecté avant réception de la FC")
        }
    }

    public func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        guard error == nil else {
            resolvePending(message: error?.localizedDescription ?? "Erreur de découverte Bluetooth")
            return
        }
        for service in peripheral.services ?? [] {
            if service.uuid == heartRateService {
                peripheral.discoverCharacteristics([heartRateMeasurement], for: service)
            } else if service.uuid == batteryService {
                peripheral.discoverCharacteristics([batteryLevel], for: service)
            }
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
            if heartRate != nil { resolvePending(message: nil) }
        } else if characteristic.uuid == batteryLevel, let level = data.first {
            battery = Int(level)
        }
    }
}
