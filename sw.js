const CACHE = 'tems-mta-v25';
const ASSETS = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  if (url.includes('nominatim.openstreetmap.org') || url.includes('api.open-meteo.com') ||
      url.includes('router.project-osrm.org') || url.includes('overpass-api.de')) {
    e.respondWith(fetch(e.request).catch(function() { return new Response('{}', {headers:{'Content-Type':'application/json'}}); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(cached) {
    return cached || fetch(e.request).then(function(r) {
      return caches.open(CACHE).then(function(c) { c.put(e.request, r.clone()); return r; });
    });
  }));
});
