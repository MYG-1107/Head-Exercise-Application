/* Static app-shell cache only. Camera frames and session data are never cached. */
'use strict';

const CACHE_NAME = 'head-exercise-application-shell-v2.7.0';
const REQUIRED_FILES = [
  './', './index.html', './style.css', './script.js', './tracker-core.js', './demo-3d.js',
  './favicon.svg', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './guide.html', './privacy.html', './safety.html', './social-card.png', './blog/', './blog/index.html'
];
const OPTIONAL_GUIDES = [
  './blog/camera-framing-lighting-and-distance.html',
  './blog/camera-mode-explained.html',
  './blog/camera-permission-troubleshooting.html',
  './blog/exporting-a-session-csv.html',
  './blog/first-time-using-head-exercise-application.html',
  './blog/fixing-camera-not-starting.html',
  './blog/installing-and-using-the-app-offline.html',
  './blog/manual-mode-guide.html',
  './blog/neutral-position-calibration.html',
  './blog/pause-resume-and-stop-a-session.html',
  './blog/privacy-camera-data-and-external-services.html',
  './blog/recovering-from-face-detection-loss.html',
  './blog/resetting-or-starting-a-new-session.html',
  './blog/safety-and-limitations-of-the-application.html',
  './blog/setting-a-session-goal.html',
  './blog/switching-between-front-and-rear-camera.html',
  './blog/understanding-live-direction-and-counts.html',
  './blog/voice-prompts-and-audio-settings.html',
  './blog/what-counts-as-a-repetition.html',
  './blog/where-session-data-is-stored-and-cleared.html'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(REQUIRED_FILES);
    // A missing optional article should not prevent the application itself from installing.
    await Promise.all(OPTIONAL_GUIDES.map(file => cache.add(file).catch(() => null)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('head-exercise-application-shell-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
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
        const cachedPage = await caches.match(request, { ignoreSearch: true });
        if (cachedPage) return cachedPage;

        if (url.pathname.endsWith('/blog/')) {
          const helpHome = await caches.match('./blog/index.html');
          if (helpHome) return helpHome;
        }
        if (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')) {
          const appHome = await caches.match('./index.html');
          if (appHome) return appHome;
        }
        return new Response('This page is not available offline. Reconnect to the internet and try again.', {
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
