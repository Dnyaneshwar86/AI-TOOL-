const CACHE_NAME = 'shikshasetu-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/courses.html',
  '/mock-tests.html',
  '/materials.html',
  '/live-classes.html',
  '/dashboard.html',
  '/mobile-app.html',
  '/platform-features.html',
  '/assets/style.css',
  '/js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((res) => res || fetch(event.request)));
});
