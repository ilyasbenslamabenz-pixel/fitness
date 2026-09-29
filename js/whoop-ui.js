/* EVO Fit Coach — panneau WHOOP
 * Interface prête pour le pont natif/Cloudflare existant.
 * Aucun score WHOOP n'est inventé : les valeurs restent "—" tant qu'une source réelle
 * (API/Worker ou plugin natif) n'est pas connectée.
 */
(function () {
  "use strict";

  var ID = "evo-whoop-card";
  var STYLE_ID = "evo-whoop-style";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = `
      #${ID}{margin:14px 0;padding:16px;border:1px solid rgba(255,255,255,.09);border-radius:22px;background:linear-gradient(145deg,rgba(20,27,43,.98),rgba(7,11,22,.98));box-shadow:0 12px 35px rgba(0,0,0,.18);color:#fff}
      #${ID} .evo-whoop-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
      #${ID} .evo-whoop-title{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px}
      #${ID} .evo-whoop-logo{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(145deg,#d6a63d,#8b6418);font-size:17px}
      #${ID} .evo-whoop-sub{font-size:12px;color:#8e9ab1;margin-top:2px}
      #${ID} .evo-whoop-status{font-size:11px;color:#78d99c;white-space:nowrap}
      #${ID} .evo-whoop-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
      #${ID} .evo-whoop-metric{padding:12px;border-radius:15px;background:rgba(255,255,255,.045)}
      #${ID} .evo-whoop-label{font-size:11px;color:#8995ac;margin-bottom:5px}
      #${ID} .evo-whoop-value{font-size:19px;font-weight:800}
      #${ID} .evo-whoop-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:13px}
      #${ID} .evo-whoop-note{font-size:11px;color:#7d899f;line-height:1.35}
      #${ID} .evo-whoop-btn{border:0;border-radius:13px;padding:10px 14px;background:#d8aa43;color:#10131b;font-weight:800;font-size:12px;white-space:nowrap}
      #${ID} .evo-whoop-btn:active{transform:scale(.98)}
      @media(min-width:600px){#${ID} .evo-whoop-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
    `;
    document.head.appendChild(s);
  }

  function metric(label, value, unit) {
    return '<div class="evo-whoop-metric"><div class="evo-whoop-label">' + label + '</div><div class="evo-whoop-value">' + value + (unit ? ' <small>' + unit + '</small>' : '') + '</div></div>';
  }

  function mount() {
    if (document.getElementById(ID)) return;
    var page = document.getElementById("today") || document.querySelector(".page.on");
    if (!page) return;

    injectStyle();

    var card = document.createElement("section");
    card.id = ID;
    card.setAttribute("aria-label", "Données WHOOP");
    card.innerHTML =
      '<div class="evo-whoop-head">' +
        '<div>' +
          '<div class="evo-whoop-title"><span class="evo-whoop-logo">⌁</span><span>WHOOP</span></div>' +
          '<div class="evo-whoop-sub">WHOOP 5.0 · données du jour</div>' +
        '</div>' +
        '<div class="evo-whoop-status" id="evo-whoop-status">Prêt</div>' +
      '</div>' +
      '<div class="evo-whoop-grid">' +
        metric('FC repos', '—', 'bpm') +
        metric('HRV', '—', 'ms') +
        metric('Sommeil', '—', '') +
        metric('Activité', '—', '') +
      '</div>' +
      '<div class="evo-whoop-foot">' +
        '<div class="evo-whoop-note">Les valeurs restent vides tant qu’EVO n’a pas reçu de données WHOOP réelles.</div>' +
        '<button class="evo-whoop-btn" type="button" id="evo-whoop-sync">Synchroniser</button>' +
      '</div>';

    var first = page.firstElementChild;
    if (first) page.insertBefore(card, first); else page.appendChild(card);

    var btn = document.getElementById("evo-whoop-sync");
    if (btn) btn.addEventListener("click", function () {
      var status = document.getElementById("evo-whoop-status");
      if (status) status.textContent = "Pont WHOOP à connecter";
      try {
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Whoop) {
          window.Capacitor.Plugins.Whoop.sync().then(function (data) {
            window.dispatchEvent(new CustomEvent("evo:whoop-data", { detail: data }));
          }).catch(function () {
            if (status) status.textContent = "Échec de synchronisation";
          });
        }
      } catch (e) {
        console.warn("EVO WHOOP:", e);
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
  window.addEventListener("load", mount);
  setTimeout(mount, 1200);
})();
