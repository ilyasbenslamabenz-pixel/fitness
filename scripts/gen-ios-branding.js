#!/usr/bin/env node
/* Génère l'icône App Store (1024×1024, sans alpha) et l'écran de lancement
   iOS à partir d'un monogramme "IB" blanc sur fond bleu nuit (couleur de
   fond de l'app, manifest.json: background_color). À relancer si le
   monogramme ou la couleur de marque changent. */
const sharp = require("sharp");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BG = "#070b12";

const iconSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="${BG}"/>
  <text x="512" y="512" text-anchor="middle" dominant-baseline="central"
        font-family="Liberation Sans, Arial, sans-serif" font-weight="700"
        font-size="440" letter-spacing="-6" fill="#ffffff">IB</text>
</svg>`;

const splashSvg = `
<svg width="2732" height="2732" viewBox="0 0 2732 2732" xmlns="http://www.w3.org/2000/svg">
  <rect width="2732" height="2732" fill="${BG}"/>
  <text x="1366" y="1366" text-anchor="middle" dominant-baseline="central"
        font-family="Liberation Sans, Arial, sans-serif" font-weight="700"
        font-size="500" letter-spacing="-7" fill="#ffffff">IB</text>
</svg>`;

async function main() {
  await sharp(Buffer.from(iconSvg))
    .resize(1024, 1024)
    .flatten({ background: BG })
    .removeAlpha()
    .png()
    .toFile(path.join(ROOT, "ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png"));
  console.log("AppIcon-512@2x.png written (1024x1024)");

  const splashBuf = await sharp(Buffer.from(splashSvg))
    .resize(2732, 2732)
    .flatten({ background: BG })
    .removeAlpha()
    .png()
    .toBuffer();

  const splashDir = path.join(ROOT, "ios/App/App/Assets.xcassets/Splash.imageset");
  for (const name of ["splash-2732x2732.png", "splash-2732x2732-1.png", "splash-2732x2732-2.png"]) {
    await sharp(splashBuf).toFile(path.join(splashDir, name));
  }
  console.log("Splash images written (2732x2732 x3)");
}

main().catch((e) => { console.error(e); process.exit(1); });
