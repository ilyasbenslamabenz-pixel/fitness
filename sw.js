const CACHE='evo-fit-coach-v68';

self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE)
    .then(c=>c.addAll(['./','./index.html','./manifest.json','./apple-touch-icon.png?v=6','./icon-512.png?v=6']))
    .then(()=>self.skipWaiting())
));

self.addEventListener('activate',e=>e.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
));

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return;

  // Always prefer the newest GitHub Pages version of the app shell.
  if(u.pathname.endsWith('/index.html') || u.pathname.endsWith('/fitness/')){
    e.respondWith(
      fetch(new Request(e.request,{cache:'no-store'}))
        .catch(()=>caches.match(e.request))
    );
    return;
  }

  // Le code de l'app (JS/CSS), le manifeste et les icônes : toujours la version la plus fraîche du réseau,
  // le cache ne sert que de secours hors-ligne (sinon les mises à jour restent
  // coincées un cycle de rechargement derrière, comme observé plusieurs fois).
  if(u.pathname.indexOf('/fitness/js/')!==-1 || u.pathname.indexOf('/fitness/css/')!==-1 ||
     /\/fitness\/(manifest\.json|icon-\d+\.png|apple-touch-icon\.png|favicon\.png)$/.test(u.pathname)){
    e.respondWith(
      fetch(new Request(e.request,{cache:'no-store'}))
        .then(r=>{caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;})
        .catch(()=>caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
      const copy=r.clone();
      caches.open(CACHE).then(x=>x.put(e.request,copy));
      return r;
    }))
  );
});