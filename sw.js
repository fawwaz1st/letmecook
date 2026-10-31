// LetMeCook — service worker: supaya situs tetap bisa dibuka tanpa internet.
//
// Pembagian tugas:
// - Aset inti (halaman, skrip, gaya, font, ikon) diunduh penuh saat
//   pemasangan, jadi kunjungan berikutnya bisa langsung dari cache.
// - Navigasi halaman: coba jaringan dulu (maks 3,5 detik) supaya
//   pembaruan cepat sampai; kalau jaringan mati, pakai salinan cache.
// - Aset lainnya: kasih dari cache, sambil segarkan diam-diam
//   (stale-while-revalidate).
// - Foto Wikimedia dan thumbnail YouTube: sama, tapi di cache terpisah
//   yang buang paling tuanya dibuang kalau penuh.
// - Pemutar YouTube: tidak bisa disimpan, dibiarkan ke jaringan.
//
// PENTING: naikkan VERSI setiap kali berkas situs berubah, supaya tab
// lama mengunduh berkas yang baru.
const VERSI = "letmecook-v1";
const GAMBAR = "letmecook-gambar";
const GAMBAR_MAKS = 90;
const INTI = [
  "./", "index.html", "katalog.html", "resep.html", "favorit.html",
  "mealplan.html", "tentang.html", "404.html", "manifest.webmanifest",
  "aset/style.css", "aset/icons.svg", "aset/ikon-192.png", "aset/ikon-512.png",
  "aset/fonts/fraunces-600.woff2", "aset/fonts/fraunces-700.woff2",
  "aset/fonts/pjs-400.woff2", "aset/fonts/pjs-600.woff2", "aset/fonts/pjs-700.woff2",
  "skrip/resep-data.js", "skrip/store.js", "skrip/halaman.js",
];

// ---------- PASANG: unduh semua aset inti -------------------
self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSI);
    // cache:"reload": lewati cache HTTP (GitHub Pages memakai
    // max-age 600), supaya yang tersimpan memang versi terbaru.
    await Promise.all(INTI.map((u) =>
      cache.add(new Request(u, { cache: "reload" })).catch(() => {})
    ));
    await self.skipWaiting();
  })());
});

// ---------- AKTIF: buang cache versi lama -------------------
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const daftar = await caches.keys();
    await Promise.all(daftar.filter((n) => n !== VERSI && n !== GAMBAR)
      .map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

const adalahGambarLuar = (url) =>
  url.hostname === "upload.wikimedia.org" || url.hostname === "i.ytimg.com";

// ---------- TERIMA PERMINTAAN ------------------------------
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Pihak ketiga: hanya gambar yang dipakai situs yang disimpan.
  if (url.origin !== location.origin) {
    if (!adalahGambarLuar(url)) return;
    e.respondWith(simpanLaluSegarkan(req, GAMBAR, GAMBAR_MAKS));
    return;
  }

  // Halaman: jaringan dulu, cache sebagai cadangan.
  if (req.mode === "navigate") {
    e.respondWith(jaringanDulu(req));
    return;
  }

  // Aset satu asal: cache dulu, segarkan di belakang.
  e.respondWith(simpanLaluSegarkan(req, VERSI));
});

// Jaringan dengan batas waktu; kegagalannya ditangkap pemanggil.
function jaringanBatas(req, ms) {
  const kendali = new AbortController();
  const t = setTimeout(() => kendali.abort(), ms);
  return fetch(req, { signal: kendali.signal }).finally(() => clearTimeout(t));
}

async function jaringanDulu(req) {
  let jaringan = null;
  try { jaringan = await jaringanBatas(req, 3500); } catch { /* offline */ }
  if (jaringan) {
    if (jaringan.ok) {
      const cache = await caches.open(VERSI);
      // Pakai req.url (string), bukan req-nya langsung: cache.put
      // menolak permintaan bermode navigate di sebagian browser.
      cache.put(req.url, jaringan.clone()).catch(() => {});
    }
    return jaringan;
  }
  const cache = await caches.open(VERSI);
  return (await cache.match(req))
    || (await cache.match(req, { ignoreSearch: true }))
    || (await cache.match("404.html"))
    || Response.error();
}

async function simpanLaluSegarkan(req, nama, maks = 0) {
  const cache = await caches.open(nama);
  const dariCache = await cache.match(req);
  const dariJaringan = fetch(req).then((res) => {
    if (res && res.ok) {
      cache.put(req.url, res.clone()).then(() => potong(cache, maks)).catch(() => {});
    }
    return res;
  }).catch(() => null);
  return dariCache || (await dariJaringan) || Response.error();
}

// Buang entri paling tua kalau cache gambar melebihi batas.
async function potong(cache, maks) {
  if (!maks) return;
  const kunci = await cache.keys();
  for (const k of kunci.slice(0, Math.max(0, kunci.length - maks))) {
    await cache.delete(k);
  }
}
