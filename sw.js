/* Cache only the four essential pages and application assets. Never cache camera frames or session data. */
'use strict';

const CACHE_NAME = 'head-exercise-application-shell-v2.8.0';
const APP_FILES = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './tracker-core.js',
  './favicon.svg',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './social-card.png',
  './guide.html',
  './privacy.html',
  './safety.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key.startsWith('head-exercise-application-shell-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch (_) {
        const cached = await caches.match(request, { ignoreSearch: true });
        if (cached) return cached;

        if (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')) {
          return (await caches.match('./index.html')) || new Response(
            'The application is not available offline yet. Reconnect and open it once before using it offline.',
            { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
          );
        }

        return new Response('This page is not available offline. Reconnect and try again.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
