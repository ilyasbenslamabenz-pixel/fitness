#!/usr/bin/env node
/* Génère toutes les icônes de l'app (iOS, écran d'accueil, favicon) à partir de
   branding/icon-source.png : retire le cadre noir et la bordure "verre" dessinés
   dans l'image (iOS arrondit lui-même les coins), remplit les coins, puis ravive
   légèrement couleurs et netteté. npm run gen:icon */
const sharp = require("sharp");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "branding/icon-source.png");
const BG = "#070b12";

async function master() {
  /* zone utile de l'image source (sans cadre noir ni liseré de 8 px) */
  const X = 44, Y = 33, S = 1165, R = 140;
  const crop = await sharp(SRC).removeAlpha().extract({ left: X, top: Y, width: S, height: S }).toBuffer();
  /* coins : version très floutée de l'image, recouverte par l'image nette arrondie */
  const blurred = await sharp(crop).blur(60).modulate({ brightness: 0.9 }).toBuffer();
  const mask = Buffer.from(`<svg width="${S}" height="${S}"><defs><filter id="f"><feGaussianBlur stdDeviation="6"/></filter></defs><rect x="6" y="6" width="${S - 12}" height="${S - 12}" rx="${R}" fill="#fff" filter="url(#f)"/></svg>`);
  const maskPng = await sharp(mask).resize(S, S).png().toBuffer();
  const sharpPart = await sharp(crop).ensureAlpha().composite([{ input: maskPng, blend: "dest-in" }]).png().toBuffer();
  const full = await sharp(blurred).composite([{ input: sharpPart }]).png().toBuffer();
  return sharp(full)
    .resize(1024, 1024, { kernel: "lanczos3" })
    .modulate({ saturation: 1.12, brightness: 1.02 })
    .linear(1.06, -6)
    .sharpen({ sigma: 0.9, m1: 0.6, m2: 1.6 })
    .removeAlpha()
    .png()
    .toBuffer();
}

async function main() {
  const icon = await master();
  await sharp(icon).toFile(path.join(ROOT, "branding/icon-1024.png"));
  await sharp(icon).toFile(path.join(ROOT, "ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png"));
  await sharp(icon).resize(512, 512, { kernel: "lanczos3" }).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(ROOT, "icon-512.jpg"));
  await sharp(icon).resize(192, 192, { kernel: "lanczos3" }).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(ROOT, "icon-192.jpg"));
  await sharp(icon).resize(180, 180, { kernel: "lanczos3" }).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(ROOT, "icon-180.jpg"));

  /* écran de lancement iOS : l'icône arrondie au centre sur le fond de l'app */
  const L = 2732, I = 640;
  const round = Buffer.from(`<svg width="${I}" height="${I}"><rect width="${I}" height="${I}" rx="${I * 0.2237}" fill="#fff"/></svg>`);
  const roundPng = await sharp(round).resize(I, I).png().toBuffer();
  const logo = await sharp(icon).resize(I, I).ensureAlpha().composite([{ input: roundPng, blend: "dest-in" }]).png().toBuffer();
  const splash = await sharp({ create: { width: L, height: L, channels: 3, background: BG } })
    .composite([{ input: logo, left: (L - I) / 2, top: (L - I) / 2 }]).png().toBuffer();
  const dir = path.join(ROOT, "ios/App/App/Assets.xcassets/Splash.imageset");
  for (const n of ["splash-2732x2732.png", "splash-2732x2732-1.png", "splash-2732x2732-2.png"]) await sharp(splash).toFile(path.join(dir, n));
  console.log("Icônes et écran de lancement générés");
}
main().catch((e) => { console.error(e); process.exit(1); });
