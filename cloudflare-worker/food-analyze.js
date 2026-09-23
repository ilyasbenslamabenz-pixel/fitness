/**
 * EVO Fit Coach — Cloudflare Worker: photo -> estimation calorique (Claude vision)
 *
 * Déploiement : Cloudflare Dashboard -> Workers & Pages -> Create -> coller ce
 * fichier -> Deploy, puis dans Settings -> Variables and Secrets, ajouter en
 * secret (pas en variable en clair) :
 *   - ANTHROPIC_API_KEY  : la clé API Anthropic (console.anthropic.com)
 *   - FIREBASE_PROJECT_ID: fitness-f423a
 *
 * Le Worker n'accepte que des requêtes portant un ID token Firebase valide
 * (celui déjà utilisé par la connexion Google dans l'app) pour éviter que
 * l'URL publique du Worker ne serve de proxy gratuit vers l'API payante.
 */

const ALLOWED_ORIGIN = "https://ilyasbenslamabenz-pixel.github.io";
const CLAUDE_MODEL = "claude-haiku-4-5-20251001";
const GOOGLE_JWKS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function b64urlToUint8Array(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  const bin = atob(b64 + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function verifyFirebaseIdToken(idToken, projectId) {
  const parts = idToken.split(".");
  if (parts.length !== 3) throw new Error("Format de token invalide");
  const [headerB64, payloadB64, sigB64] = parts;
  const header = JSON.parse(new TextDecoder().decode(b64urlToUint8Array(headerB64)));
  const payload = JSON.parse(new TextDecoder().decode(b64urlToUint8Array(payloadB64)));

  if (payload.aud !== projectId) throw new Error("aud invalide");
  if (payload.iss !== "https://securetoken.google.com/" + projectId) throw new Error("iss invalide");
  const now = Math.floor(Date.now() / 1000);
  if (typeof payload.exp !== "number" || payload.exp < now) throw new Error("token expiré");
  if (typeof payload.auth_time !== "number" || payload.auth_time > now) throw new Error("auth_time invalide");

  const certsRes = await fetch(GOOGLE_JWKS_URL);
  if (!certsRes.ok) throw new Error("impossible de récupérer les certificats Google");
  const certs = await certsRes.json();
  const pem = certs[header.kid];
  if (!pem) throw new Error("kid inconnu");

  const der = pemToDer(pem);
  const key = await crypto.subtle.importKey(
    "spki",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const signedData = new TextEncoder().encode(headerB64 + "." + payloadB64);
  const signature = b64urlToUint8Array(sigB64);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, signature, signedData);
  if (!ok) throw new Error("signature invalide");

  return payload;
}

function pemToDer(pem) {
  const b64 = pem.replace(/-----BEGIN CERTIFICATE-----/, "").replace(/-----END CERTIFICATE-----/, "").replace(/\s+/g, "");
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return extractSpkiFromCert(bytes);
}

// Lit un TLV DER (tag, longueur, position du contenu) à `offset`.
function readTLV(bytes, offset) {
  const tag = bytes[offset];
  const lenByte = bytes[offset + 1];
  var headerLen, length;
  if ((lenByte & 0x80) === 0) {
    length = lenByte;
    headerLen = 2;
  } else {
    const numBytes = lenByte & 0x7f;
    length = 0;
    for (let i = 0; i < numBytes; i++) length = (length << 8) | bytes[offset + 2 + i];
    headerLen = 2 + numBytes;
  }
  return { tag: tag, contentStart: offset + headerLen, length: length, totalLen: headerLen + length };
}

// Certificate ::= SEQUENCE { tbsCertificate, signatureAlgorithm, signatureValue }
// TBSCertificate ::= SEQUENCE { version[0], serialNumber, signature, issuer,
//   validity, subject, subjectPublicKeyInfo, ... }
// subjectPublicKeyInfo est le 7e enfant (index 6) de tbsCertificate.
function extractSpkiFromCert(bytes) {
  const cert = readTLV(bytes, 0);
  const tbs = readTLV(bytes, cert.contentStart);
  var pos = tbs.contentStart;
  const end = tbs.contentStart + tbs.length;
  var idx = 0;
  while (pos < end) {
    const el = readTLV(bytes, pos);
    if (idx === 6) return bytes.slice(pos, pos + el.totalLen).buffer;
    idx++;
    pos += el.totalLen;
  }
  throw new Error("SPKI introuvable dans le certificat");
}

async function handleAnalyze(request, env) {
  const authHeader = request.headers.get("Authorization") || "";
  const idToken = authHeader.replace(/^Bearer\s+/i, "");
  if (!idToken) return jsonError("Non authentifié", 401);

  try {
    await verifyFirebaseIdToken(idToken, env.FIREBASE_PROJECT_ID);
  } catch (e) {
    return jsonError("Token invalide : " + e.message, 401);
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonError("JSON invalide", 400);
  }
  const imageBase64 = body.image;
  const mediaType = body.mediaType || "image/jpeg";
  if (!imageBase64 || typeof imageBase64 !== "string" || imageBase64.length < 100) {
    return jsonError("Image manquante ou invalide", 400);
  }
  if (imageBase64.length > 6_000_000) {
    return jsonError("Image trop volumineuse", 400);
  }

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      system:
        "Tu es un nutritionniste expert. On te montre une photo d'un plat ou d'un aliment. " +
        "Estime la portion visible et réponds UNIQUEMENT avec un objet JSON strict, sans texte " +
        'autour, au format exact : {"name":"...", "qty":100, "kcal":0, "protein":0, "carbs":0, "fat":0, "confidence":"low|medium|high"}. ' +
        "name = nom court du plat en français. qty = poids estimé en grammes de la portion visible. " +
        "kcal/protein/carbs/fat = valeurs totales pour cette portion (pas pour 100g). " +
        "Si l'image ne montre pas de nourriture, réponds avec kcal:0 et confidence:\"low\".",
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
            { type: "text", text: "Analyse cette photo et donne l'estimation au format JSON demandé." },
          ],
        },
      ],
    }),
  });

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text();
    return jsonError("Erreur API Claude (" + anthropicRes.status + ") : " + errText.slice(0, 300), 502);
  }

  const data = await anthropicRes.json();
  const text = (data.content && data.content[0] && data.content[0].text) || "";
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return jsonError("Réponse IA illisible", 502);

  let parsed;
  try {
    parsed = JSON.parse(match[0]);
  } catch (e) {
    return jsonError("JSON IA invalide", 502);
  }

  return new Response(JSON.stringify(parsed), {
    status: 200,
    headers: { "content-type": "application/json", ...corsHeaders() },
  });
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders() },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== "POST") {
      return jsonError("Méthode non supportée", 405);
    }
    try {
      return await handleAnalyze(request, env);
    } catch (e) {
      return jsonError("Erreur serveur : " + (e && e.message), 500);
    }
  },
};
