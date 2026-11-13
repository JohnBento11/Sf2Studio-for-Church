const C='sf2studio-v10',A=['./','index.html','manifest.webmanifest','icon-192.png','logo.png'];
const put=(r,n)=>{if(n.ok){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n};
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// arquivos do app: tenta a rede primeiro (sempre a versão nova); sem internet ou rede lenta, usa o guardado
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(r.url.startsWith(self.location.origin)){
    e.respondWith(Promise.race([fetch(r,{cache:'no-cache'}),new Promise((_,j)=>setTimeout(j,4000))]).then(n=>put(r,n)).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
    return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(n=>put(r,n))));
});
