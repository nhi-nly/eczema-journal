const CACHE_VERSION = 'eczema-journal-cache-v5';

const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json'
];

const OPTIONAL_ASSETS = [
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192.svg',
  './icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(async (cache) => {
      await cache.addAll(CORE_ASSETS);
      await Promise.allSettled(
        OPTIONAL_ASSETS.map((url) => cache.add(url))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((oldName) => caches.delete(oldName))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Network-first with cache fallback: ensures GitHub Pages updates load immediately when online,
  // while still working 100% offline from cache when in airplane mode or without reception.
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          (networkResponse.status === 200 || networkResponse.type === 'opaque')
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('', { status: 503, statusText: 'Offline' });
        });
      })
  );
});
