const CACHE = "finanzas-quincena-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    // "reload" evita guardar copias viejas de la caché HTTP del navegador.
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS.map((url) => new Request(url, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  // Páginas (navegación): red primero para ver siempre la última versión.
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", clone));
          return resp;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Iconos y manifest: red primero, para que el icono y la pantalla de carga no se queden viejos.
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
