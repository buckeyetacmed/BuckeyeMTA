// v26 — cache bust, never cache index.html
const CACHE = 'tems-mta-v26';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  // Delete ALL old caches on activate
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        return caches.delete(k);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;

  // NEVER cache the main HTML file — always fetch fresh from network
  if (url.includes('index.html') || url.endsWith('/') || url.endsWith('/mta/') || url.endsWith('/mta')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }

  // External APIs — network only
  if (url.includes('nominatim.openstreetmap.org') ||
      url.includes('api.open-meteo.com') ||
      url.includes('router.project-osrm.org') ||
      url.includes('overpass-api.de')) {
    e.respondWith(
      fetch(e.request).catch(function() {
        return new Response('{}', { headers: { 'Content-Type': 'application/json' }});
      })
    );
    return;
  }

  // Everything else — network first, cache fallback
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).then(function(response) {
      return caches.open(CACHE).then(function(cache) {
        cache.put(e.request, response.clone());
        return response;
      });
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
