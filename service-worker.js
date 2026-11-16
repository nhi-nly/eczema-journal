const CACHE_VERSION = 'eczema-journal-cache-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './assets/calendar.svg',
  './assets/camera-food.svg',
  './assets/camera-selfie.svg',
  './assets/check-clothes.svg',
  './assets/check-food.svg',
  './assets/check-med.svg',
  './assets/check-sleep-12.svg',
  './assets/check-sleep-14.svg',
  './assets/chevron-clothes.svg',
  './assets/chevron-food.svg',
  './assets/chevron-med.svg',
  './assets/chevron-others.svg',
  './assets/chevron-skin.svg',
  './assets/chevron-sleep.svg',
  './assets/chevron-symptoms.svg',
  './assets/mood-others.svg',
  './assets/next-day.svg',
  './assets/plus-others.svg',
  './assets/plus-symptoms.svg',
  './assets/prev-day.svg',
  './assets/radio-food.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
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

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
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
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('', { status: 503, statusText: 'Offline' });
        });
    })
  );
});
