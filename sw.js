const C='sf2studio-v6',A=['./','index.html','manifest.webmanifest','icon-192.png','logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{
    if(n.ok&&(e.request.url.startsWith(self.location.origin)||e.request.url.includes('cdn.jsdelivr.net'))){const c=n.clone();caches.open(C).then(x=>x.put(e.request,c))}
    return n}).catch(()=>caches.match('index.html'))));
});
