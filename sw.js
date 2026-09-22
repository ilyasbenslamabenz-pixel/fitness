const CACHE='evo-fit-coach-v26';

self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE)
    .then(c=>c.addAll(['./','./index.html','./manifest.json','./icon.svg','./ilyas-icon.jpg']))
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

  e.respondWith(
    caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
      const copy=r.clone();
      caches.open(CACHE).then(x=>x.put(e.request,copy));
      return r;
    }))
  );
});