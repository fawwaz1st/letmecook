// Tambah meta standar 2026 ke semua halaman:
// - color-scheme: situs ini hanya mode terang, jadi kontrol form dan
//   bilah gulir tidak ikut gelap saat sistem pengguna memakai mode gelap.
// - robots: max-image-preview:large supaya foto resep tampil besar di
//   hasil pencarian gambar dan Google Discover.
// - theme-color: versi terpisah untuk mode terang dan gelap.
const fs = require("fs");

const berkas = ["index.html", "katalog.html", "resep.html", "mealplan.html", "favorit.html", "tentang.html", "404.html"];

const LAMA = '<meta name="theme-color" content="#0d5c34">';
const BARU = [
  '<meta name="color-scheme" content="light">',
  '<meta name="robots" content="max-image-preview:large">',
  '<meta name="theme-color" content="#0d5c34" media="(prefers-color-scheme: light)">',
  '<meta name="theme-color" content="#0a3f24" media="(prefers-color-scheme: dark)">',
].join("\n  ");

for (const f of berkas) {
  let t = fs.readFileSync(f, "utf8");
  if (!t.includes(LAMA)) {
    console.log("LEWATI (tidak ketemu): " + f);
    continue;
  }
  t = t.replace(LAMA, BARU);
  fs.writeFileSync(f, t, "utf8");
  console.log("OK " + f);
}
