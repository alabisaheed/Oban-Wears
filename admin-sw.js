// Service worker for the installable dashboard. It passes every request
// straight to the network and caches nothing, so orders and stock are always
// live; it exists so phones can install the dashboard as an app.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request));
});
