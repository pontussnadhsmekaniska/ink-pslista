// Offline-cache. Själva sidan hämtas från nätet först (så att nya versioner syns direkt)
// och från cachen när nätet saknas; ikoner och manifest tas från cachen.
const CACHE = "veckohandling-v7";
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Inloggningens kod (versionslåst) sparas så att appen startar även utan nät
  if (e.request.method === "GET" && url.origin === "https://cdn.jsdelivr.net") {
    e.respondWith(caches.open(CACHE).then(async c => (await c.match(e.request)) ||
      fetch(e.request).then(res => { if (res.ok) c.put(e.request, res.clone()); return res; })));
    return;
  }
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request, { cache: "no-cache" })
        .then(res => { if (res.ok) caches.open(CACHE).then(c => c.put("index.html", res.clone())); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const network = fetch(e.request)
        .then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
