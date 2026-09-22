// Pemeriksaan cepat sebelum commit. Menjalankan empat pemeriksaan
// sekaligus supaya cukup satu perintah:
//
//   node _qa/periksa.js
//
// Yang diperiksa:
//   1. Karakter rusak (mojibake) di seluruh berkas situs
//   2. Fungsi dan konstanta yang tidak dipakai lagi
//   3. Ikon SVG yang tidak dipakai lagi
//   4. Pola URL foto resep
//
// Pemeriksaan yang butuh jaringan (video YouTube) sengaja dipisah ke
// audit-video.js supaya perintah ini tetap cepat.
const fs = require("fs");
const vm = require("vm");

const BERKAS_SITUS = [
  "index.html", "katalog.html", "resep.html", "mealplan.html",
  "favorit.html", "tentang.html", "404.html",
  "skrip/resep-data.js", "skrip/store.js", "skrip/halaman.js",
  "aset/style.css", "manifest.webmanifest",
];

let adaMasalah = false;
const lapor = (judul, temuan) => {
  const bersih = temuan.length === 0;
  if (!bersih) adaMasalah = true;
  console.log(`${bersih ? "OK  " : "XX  "} ${judul}${bersih ? "" : ": " + temuan.length + " temuan"}`);
  temuan.slice(0, 10).forEach((t) => console.log("      " + t));
  if (temuan.length > 10) console.log(`      ... dan ${temuan.length - 10} lagi`);
};

// ---------- 1. Mojibake ----------
// Pola khas: UTF-8 yang salah dibaca, muncul sebagai "â€" atau "Â".
const POLA_MOJIBAKE = /[ÂÃ][\u0080-\u00BF\u2013-\u2122]|â€[\u0080-\u00BF\u2013-\u2122]?|â€™|â€œ|â€“|â€”/g;
const temuanMojibake = [];
for (const f of BERKAS_SITUS) {
  if (!fs.existsSync(f)) continue;
  fs.readFileSync(f, "utf8").split(/\r?\n/).forEach((l, i) => {
    if (POLA_MOJIBAKE.test(l)) temuanMojibake.push(`${f}:${i + 1}  ${l.trim().slice(0, 60)}`);
    POLA_MOJIBAKE.lastIndex = 0;
  });
}
lapor("Karakter rusak (mojibake)", temuanMojibake);

// ---------- 2. Kode mati ----------
const semuaIsi = BERKAS_SITUS.filter((f) => fs.existsSync(f))
  .map((f) => fs.readFileSync(f, "utf8")).join("\n");

const temuanKode = [];
for (const f of ["skrip/store.js", "skrip/halaman.js"]) {
  const isi = fs.readFileSync(f, "utf8");
  const nama = [
    ...[...isi.matchAll(/^function (\w+)/gm)].map((m) => m[1]),
    ...[...isi.matchAll(/^const ([A-Z_]{3,}) =/gm)].map((m) => m[1]),
  ];
  for (const n of nama) {
    const jumlah = (semuaIsi.match(new RegExp("\\b" + n + "\\b", "g")) || []).length;
    if (jumlah <= 1) temuanKode.push(`${f}: ${n} tidak dipakai`);
  }
}
lapor("Fungsi dan konstanta tak terpakai", temuanKode);

// ---------- 3. Ikon mati ----------
const svg = fs.readFileSync("aset/icons.svg", "utf8");
const idIkon = [...svg.matchAll(/id="(i-[\w-]+)"/g)].map((m) => m[1]);
const ikonMati = idIkon.filter((id) => !semuaIsi.includes(id));
lapor(`Ikon SVG (${idIkon.length} ikon)`, ikonMati.map((i) => `${i} tidak dipakai`));

// ---------- 4. Pola foto ----------
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("skrip/resep-data.js", "utf8"), ctx);

const temuanFoto = [];
for (const r of ctx.RESEP) {
  if (!/\/500px-/.test(r.foto)) temuanFoto.push(`${r.id}: pola bukan /500px-`);
  if (!/^[A-Za-z0-9_-]{11}$/.test(r.video)) temuanFoto.push(`${r.id}: ID video tidak valid`);
  if (!ctx.DURASI_VIDEO[r.id]) temuanFoto.push(`${r.id}: durasi video belum diisi`);
  if (!ctx.TANGGAL_VIDEO || !ctx.TANGGAL_VIDEO[r.id]) temuanFoto.push(`${r.id}: tanggal video belum diisi`);
}
lapor(`Data resep (${ctx.RESEP.length} resep)`, temuanFoto);

// ---------- Ringkasan ----------
console.log("\n" + (adaMasalah ? "Ada yang perlu diperbaiki." : "Semua bersih."));
if (adaMasalah) process.exitCode = 1;
