// Este es un Service Worker básico para permitir la instalación PWA
self.addEventListener('install', (e) => {
    console.log('PWA Service Worker instalado');
});

self.addEventListener('fetch', (e) => {
    // Aquí podrías programar el caché para modo offline después
    e.respondWith(fetch(e.request));
});