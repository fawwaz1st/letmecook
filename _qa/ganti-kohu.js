// Ganti foto kohu-kohu dengan urap sayur (kohu-kohu adalah urap dari
// Maluku, jadi foto urap jauh lebih tepat daripada meja hidangan umum).
const fs = require("fs");

const LAMA = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Bali_cuisine.jpg/500px-Bali_cuisine.jpg";
const BARU = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Urap.JPG/500px-Urap.JPG";

let t = fs.readFileSync("skrip/resep-data.js", "utf8");

// Hanya ganti di resep kohu-kohu, bukan serombotan (keduanya masih
// memakai Bali cuisine). Cari blok resep kohu-kohu dulu.
const i = t.indexOf('id: "kohu-kohu"');
if (i < 0) { console.log("Resep kohu-kohu tidak ketemu"); process.exit(1); }

// Batas blok: sampai resep berikutnya.
const j = t.indexOf('id: "', i + 10);
const blok = t.slice(i, j);
if (!blok.includes(LAMA)) {
  console.log("Foto lama tidak ketemu di blok kohu-kohu. Isi blok:");
  console.log(blok.slice(0, 400));
  process.exit(1);
}
const blokBaru = blok.split(LAMA).join(BARU);
t = t.slice(0, i) + blokBaru + t.slice(j);
fs.writeFileSync("skrip/resep-data.js", t, "utf8");
console.log("kohu-kohu: foto diganti ke Urap.JPG");
