const CACHE='evo-fit-coach-v31';

self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE)
    .then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-180.jpg?v=3','./icon-512.jpg?v=3']))
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

  // Le code de l'app (JS/CSS) : sert le cache instantanément pour la vitesse,
  // mais revalide toujours en arrière-plan pour que les mises à jour soient
  // captées dès le chargement suivant, sans dépendre d'un ?v= bumpé à la main.
  if(u.pathname.indexOf('/fitness/js/')!==-1 || u.pathname.indexOf('/fitness/css/')!==-1){
    e.respondWith(
      caches.open(CACHE).then(cache=>
        cache.match(e.request).then(cached=>{
          const network=fetch(e.request).then(r=>{cache.put(e.request,r.clone());return r;}).catch(()=>cached);
          return cached||network;
        })
      )
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