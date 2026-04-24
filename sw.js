const CACHE_NAME = 'irq-cache-v1';
const urlsToCache = [
  '/aula2/',
  '/aula2/index.html',
  '/aula2/style.css',
  '/aula2/script.js',
  '/aula2/manifest.json',
  '/aula2/foto_trabalho.jpg',
  '/aula2/bandeira_brasil.jpg',
  '/aula2/bandeira_piaui.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});
