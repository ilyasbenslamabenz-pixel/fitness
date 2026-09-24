# App iOS (Capacitor)

Ce dossier + `ios/` à la racine forment le wrapper natif iOS de l'app web
(via [Capacitor](https://capacitorjs.com)). L'app web elle-même
(`index.html`, `js/`, `css/`, `sw.js`...) n'est pas modifiée : le wrapper
copie simplement ces fichiers dans un projet Xcode.

## Ce qui a déjà été fait ici

- `capacitor.config.json` (bundle ID `com.evofitcoach.app`, nom "EVO Fit Coach")
- `ios/` : projet Xcode généré par Capacitor
- `ios-app/www/` : copie synchronisée des fichiers web, dans une structure
  `fitness/...` qui reproduit les chemins absolus (`/fitness/js/...`) utilisés
  par `index.html` (nécessaire car le wrapper ne connaît pas le préfixe
  `/fitness/` ajouté automatiquement par GitHub Pages)
- Permissions iOS ajoutées dans `ios/App/App/Info.plist` : accès caméra
  (scanner de code-barres) et position (suivi GPS des courses) — sans ça,
  l'app plante dès qu'on utilise ces fonctions
- Icône App Store (1024×1024, sans transparence) et écran de lancement
  générés à partir du monogramme "IB" blanc sur fond bleu nuit
  (`scripts/gen-ios-branding.js`, `npm run gen:ios-branding` pour
  régénérer si la marque change)
- Testé : le bundle généré (`ios/App/App/public/`) charge bien l'app,
  0 requête en échec, 0 erreur JS

## Ce qu'il reste à faire (nécessite un Mac)

1. **Xcode** (App Store) et un compte **Apple Developer Program** (99$/an,
   [developer.apple.com](https://developer.apple.com)) — obligatoires,
   aucun outil ne peut contourner ça.
2. Cloner le repo sur le Mac, puis :
   ```
   npm install
   npm run cap:sync
   ```
   (`cap:sync` copie les derniers fichiers web dans le projet iOS **et**
   installe les dépendances natives via CocoaPods — à relancer après
   chaque changement du site avant un nouveau build)
3. Ouvrir `ios/App/App.xcworkspace` (pas `.xcodeproj`) dans Xcode.
4. Dans l'onglet *Signing & Capabilities* : sélectionner ton compte
   développeur comme "Team", et changer le Bundle Identifier si besoin
   (`com.evofitcoach.app` est un identifiant provisoire — Apple demande
   un identifiant unique lié à ton compte).
5. Lancer sur un simulateur ou un iPhone connecté (▶ dans Xcode) pour
   tester avant de songer à l'App Store.

## Restant à peaufiner avant une vraie soumission

- Captures d'écran et métadonnées App Store Connect (description,
  mots-clés, politique de confidentialité...).

## Garder le wrapper à jour

À chaque changement dans `index.html`/`js/`/`css/`/`img/`, relancer avant
tout nouveau build iOS :
```
npm run sync:ios
```
(ou `npm run cap:sync` si tu es sur le Mac avec Xcode, pour aussi mettre à
jour les dépendances natives).
