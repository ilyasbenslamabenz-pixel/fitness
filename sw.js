const CACHE='evo-fit-coach-v12';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon.svg','./app-v12.js'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!=='evo-fit-coach-v12').map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  if(u.pathname.endsWith('/index.html') || u.pathname.endsWith('/fitness/')){
    e.respondWith(fetch(e.request).then(async r=>{
      const text=await r.text();
      const injected=text.includes('app-v12.js')?text:text.replace('</body>','<script src="./app-v12.js"></script></body>');
      return new Response(injected,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8'}});
    }).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,copy)); return r;
  })));
});