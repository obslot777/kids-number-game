const CACHE_NAME = "tapgame-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./images/icon192.png",
  "./images/icon512.png",
  // 数字画像
  "./images/num1.png",
  "./images/num2.png",
  "./images/num3.png",
  "./images/num4.png",
  "./images/num5.png",
  "./images/num6.png",
  "./images/num7.png",
  "./images/num8.png",
  "./images/num9.png",
  // サウンド
  "./sound/allcorrect.mp3",
  "./sound/num1.mp3",
  "./sound/num2.mp3",
  "./sound/num3.mp3",
  "./sound/num4.mp3",
  "./sound/num5.mp3",
  "./sound/num6.mp3",
  "./sound/num7.mp3",
  "./sound/num8.mp3",
  "./sound/num9.mp3",
  // ライブラリ
  "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
