/**
 * EVO Fit Coach — Cloudflare Worker : relais WHOOP (OAuth + lecture des données)
 *
 * Pourquoi un relais : WHOOP exige un « client secret » qui ne doit pas vivre dans
 * le téléphone, et son API n'est pas appelable directement depuis une page web.
 *
 * Déploiement :
 *  1. Cloudflare Dashboard -> Workers & Pages -> Create -> Worker, nom « evo-whoop »,
 *     coller ce fichier -> Deploy. L'adresse sera https://evo-whoop.<ton-compte>.workers.dev
 *  2. developer.whoop.com -> Create App : Redirect URL = <adresse du worker>/callback,
 *     scopes : offline, read:recovery, read:cycles, read:workout, read:sleep.
 *  3. Dans le Worker -> Settings -> Variables and Secrets, ajouter en SECRET :
 *       WHOOP_CLIENT_ID, WHOOP_CLIENT_SECRET (donnés par le Developer Dashboard WHOOP)
 *
 * Routes :
 *   GET  /login?state=…     -> redirige vers la page de connexion WHOOP
 *   GET  /callback          -> échange le code, renvoie les jetons à l'app (#whoop=…)
 *   POST /refresh {refresh_token}          -> nouveaux jetons
 *   POST /data    {access_token, days}     -> cycles, récupérations, sommeils, séances
 */

const ALLOWED_ORIGIN = "https://ilyasbenslamabenz-pixel.github.io";
const APP_URL = "https://ilyasbenslamabenz-pixel.github.io/fitness/";
const AUTH_URL = "https://api.prod.whoop.com/oauth/oauth2/auth";
const TOKEN_URL = "https://api.prod.whoop.com/oauth/oauth2/token";
const API = "https://api.prod.whoop.com/developer/v2/";
const SCOPES = "offline read:recovery read:cycles read:workout read:sleep";

function cors(extra) {
  return Object.assign({
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  }, extra || {});
}
function json(obj, status) { return new Response(JSON.stringify(obj), { status: status || 200, headers: cors() }); }
function b64url(str) { return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }

async function tokenRequest(env, params) {
  const body = new URLSearchParams(Object.assign({ client_id: env.WHOOP_CLIENT_ID, client_secret: env.WHOOP_CLIENT_SECRET }, params));
  const r = await fetch(TOKEN_URL, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.access_token) throw new Error(data.error_description || data.error || ("HTTP " + r.status));
  return { access_token: data.access_token, refresh_token: data.refresh_token || params.refresh_token || "", expires_in: Number(data.expires_in) || 3600 };
}

/* toutes les pages d'une collection (25 max par page) sur la période demandée */
async function collection(path, token, startIso) {
  const out = [];
  let next = "";
  for (let page = 0; page < 8; page++) {
    const u = new URL(API + path);
    u.searchParams.set("limit", "25");
    u.searchParams.set("start", startIso);
    if (next) u.searchParams.set("nextToken", next);
    const r = await fetch(u, { headers: { Authorization: "Bearer " + token } });
    if (r.status === 401) { const e = new Error("unauthorized"); e.status = 401; throw e; }
    if (!r.ok) throw new Error(path + " HTTP " + r.status);
    const d = await r.json();
    (d.records || []).forEach((x) => out.push(x));
    next = d.next_token || d.nextToken || "";
    if (!next) break;
  }
  return out;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors() });
    const self = url.origin;
    try {
      if (req.method === "GET" && url.pathname === "/login") {
        const state = (url.searchParams.get("state") || "").replace(/[^\w-]/g, "").slice(0, 64);
        if (state.length < 8) return new Response("state manquant", { status: 400 });
        const a = new URL(AUTH_URL);
        a.searchParams.set("response_type", "code");
        a.searchParams.set("client_id", env.WHOOP_CLIENT_ID);
        a.searchParams.set("redirect_uri", self + "/callback");
        a.searchParams.set("scope", SCOPES);
        a.searchParams.set("state", state);
        return Response.redirect(a.toString(), 302);
      }
      if (req.method === "GET" && url.pathname === "/callback") {
        const code = url.searchParams.get("code"), state = url.searchParams.get("state") || "";
        if (!code) return Response.redirect(APP_URL + "#whoop_error=" + encodeURIComponent(url.searchParams.get("error") || "refus"), 302);
        const t = await tokenRequest(env, { grant_type: "authorization_code", code, redirect_uri: self + "/callback" });
        /* le fragment (#…) n'est jamais envoyé à un serveur : les jetons ne sortent que vers le téléphone */
        const payload = b64url(JSON.stringify({ a: t.access_token, r: t.refresh_token, e: Date.now() + t.expires_in * 1000, s: state }));
        return Response.redirect(APP_URL + "#whoop=" + payload, 302);
      }
      if (req.method === "POST" && url.pathname === "/refresh") {
        const { refresh_token } = await req.json();
        if (!refresh_token) return json({ error: "refresh_token manquant" }, 400);
        const t = await tokenRequest(env, { grant_type: "refresh_token", refresh_token, scope: "offline" });
        return json({ a: t.access_token, r: t.refresh_token, e: Date.now() + t.expires_in * 1000 });
      }
      if (req.method === "POST" && url.pathname === "/data") {
        const { access_token, days } = await req.json();
        if (!access_token) return json({ error: "access_token manquant" }, 400);
        const n = Math.max(1, Math.min(30, Number(days) || 7));
        const start = new Date(Date.now() - n * 864e5).toISOString();
        const [cycles, recovery, sleep, workouts] = await Promise.all([
          collection("cycle", access_token, start),
          collection("recovery", access_token, start),
          collection("activity/sleep", access_token, start),
          collection("activity/workout", access_token, start),
        ]);
        return json({ cycles, recovery, sleep, workouts });
      }
      return new Response("Not found", { status: 404 });
    } catch (e) {
      if (e.status === 401) return json({ error: "unauthorized" }, 401);
      if (url.pathname === "/callback") return Response.redirect(APP_URL + "#whoop_error=" + encodeURIComponent(String(e.message || e)), 302);
      return json({ error: String(e.message || e) }, 502);
    }
  },
};
