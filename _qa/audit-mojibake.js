// Cari sisa mojibake di semua berkas situs.
// Mojibake = UTF-8 yang salah dibaca sebagai Latin-1, muncul sebagai
// "â€”" alih-alih em dash, "Â" nyasar, dan sejenisnya.
const fs = require("fs");

const berkas = [
  "index.html", "katalog.html", "resep.html", "mealplan.html",
  "favorit.html", "tentang.html", "404.html",
  "skrip/store.js", "skrip/halaman.js", "skrip/resep-data.js", "aset/style.css",
  "README.md", "manifest.webmanifest", "sitemap.xml", "robots.txt",
];

// Pola khas mojibake: awalan byte UTF-8 yang terbaca sebagai huruf Latin.
const POLA = /[ÂÃ][\u0080-\u00BF\u2013-\u2122]|â€[\u0080-\u00BF\u2013-\u2122]?|â€™|â€œ|â€\u009d|â€“|â€”|Â (?=[a-z])/g;

let total = 0;
for (const f of berkas) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, "utf8");
  const baris = t.split(/\r?\n/);
  baris.forEach((l, i) => {
    const kena = l.match(POLA);
    if (kena) {
      total += kena.length;
      console.log(`${f}:${i + 1}  ${[...new Set(kena)].join(" ")}  ->  ${l.trim().slice(0, 90)}`);
    }
  });
}
console.log(total ? `\nTotal temuan: ${total}` : "Bersih, tidak ada mojibake.");
