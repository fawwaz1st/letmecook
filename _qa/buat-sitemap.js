// Buat sitemap.xml lengkap: 5 halaman utama + 67 halaman resep.
//
// Catatan soal lastmod: tanggalnya diambil dari waktu berkas terakhir
// diubah, BUKAN tanggal hari ini. Kalau diisi tanggal hari ini setiap
// kali dijalankan, mesin pencari melihat situs seolah berubah terus
// padahal isinya sama — itu bisa membuat lastmod diabaikan.
const fs = require("fs");
const vm = require("vm");

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("skrip/resep-data.js", "utf8"), ctx);

const dasar = "https://fawwaz1st.github.io/letmecook/";

// Tanggal ubah sebuah berkas, format YYYY-MM-DD.
const tanggalBerkas = (berkas) =>
  fs.statSync(berkas).mtime.toISOString().slice(0, 10);

const tanggalData = tanggalBerkas("skrip/resep-data.js");

const halaman = [
  ["index.html", "", "1.0"],
  ["katalog.html", "katalog.html", "0.9"],
  ["mealplan.html", "mealplan.html", "0.8"],
  ["tentang.html", "tentang.html", "0.5"],
  ["favorit.html", "favorit.html", "0.3"],
];

const baris = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

for (const [berkas, alamat, prioritas] of halaman) {
  const tgl = tanggalBerkas(berkas);
  baris.push(`  <url><loc>${dasar}${alamat}</loc><lastmod>${tgl}</lastmod><priority>${prioritas}</priority></url>`);
}

// Halaman resep: prioritas 0.7, karena isinya konten utama situs.
// Tanggalnya ikut tanggal ubah resep-data.js, karena isi halaman itu
// memang berasal dari berkas tersebut.
for (const r of ctx.RESEP) {
  baris.push(`  <url><loc>${dasar}resep.html?id=${encodeURIComponent(r.id)}</loc><lastmod>${tanggalData}</lastmod><priority>0.7</priority></url>`);
}

baris.push("</urlset>", "");
fs.writeFileSync("sitemap.xml", baris.join("\n"), "utf8");
console.log("sitemap.xml dibuat:", halaman.length + ctx.RESEP.length, "URL");
console.log("Tanggal data resep:", tanggalData);
