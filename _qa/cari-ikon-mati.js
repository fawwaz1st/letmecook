// Cari ikon yang tidak dipakai di seluruh berkas situs.
const fs = require("fs");

const svg = fs.readFileSync("aset/icons.svg", "utf8");
const konten = ["index.html", "katalog.html", "resep.html", "mealplan.html", "favorit.html", "tentang.html", "404.html", "skrip/store.js", "skrip/halaman.js"]
  .map((f) => fs.readFileSync(f, "utf8"))
  .join("\n");

const ids = [...svg.matchAll(/id="(i-[\w-]+)"/g)].map((m) => m[1]);
const mati = ids.filter((id) => !konten.includes(id));

console.log("Total ikon:", ids.length);
console.log("Tidak dipakai (" + mati.length + "):", mati.join(", ") || "tidak ada");
