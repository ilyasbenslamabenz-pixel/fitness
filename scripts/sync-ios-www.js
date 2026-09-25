#!/usr/bin/env node
/* Copie les fichiers web réels (index.html, js/, css/, img/, sw.js, manifest.json, icônes)
   dans ios-app/www/fitness/, pour que le wrapper Capacitor serve les mêmes chemins absolus
   (/fitness/...) que la version web déployée sur GitHub Pages.
   À relancer après chaque changement dans index.html/js/css/img avant un build iOS. */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DEST = path.join(ROOT, "ios-app", "www", "fitness");
const FILES = ["index.html", "sw.js", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "favicon.png", "og-image.jpg"];
const DIRS = ["js", "css", "img"];

fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(DEST, { recursive: true });

for (const f of FILES) {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DEST, f));
}
for (const d of DIRS) {
  const src = path.join(ROOT, d);
  if (fs.existsSync(src)) fs.cpSync(src, path.join(DEST, d), { recursive: true });
}

const redirectHtml = `<!doctype html>
<html><head><meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=/fitness/index.html">
<script>location.replace("/fitness/index.html");</script>
</head><body></body></html>
`;
fs.writeFileSync(path.join(ROOT, "ios-app", "www", "index.html"), redirectHtml);

console.log("Synced web assets into ios-app/www/fitness for the Capacitor iOS wrapper.");
