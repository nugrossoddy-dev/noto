const C='noto-v5',A=['./','./index.html','./manifest.json','./icon.svg','https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(q,r)=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(q,cp))}return r};
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 if(q.mode==='navigate'){e.respondWith(fetch(q).then(r=>put(q,r)).catch(()=>caches.match(q,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));return}
 e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).then(res=>put(q,res)).catch(()=>caches.match('./index.html'))))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow('./index.html'))});
