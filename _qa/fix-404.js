// Perbaiki 3 URL foto yang 404 (hash path salah tebak).
// URL benar diambil dari API imageinfo Wikimedia, bukan ditebak.
const fs = require("fs");

const GANTI = [
  // Bali cuisine: hash benar 6/67 (salah tulis 6/6b).
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bali_cuisine.jpg/500px-Bali_cuisine.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Bali_cuisine.jpg/500px-Bali_cuisine.jpg",
  ],
  // Keumamah Aceh: hash benar 7/78 (salah tulis 0/0b).
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Keumamah_Aceh.jpg/500px-Keumamah_Aceh.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Keumamah_Aceh.jpg/500px-Keumamah_Aceh.jpg",
  ],
];

let t = fs.readFileSync("skrip/resep-data.js", "utf8");
let n = 0;
for (const [lama, baru] of GANTI) {
  if (t.includes(lama)) {
    const jml = t.split(lama).length - 1;
    t = t.split(lama).join(baru);
    n += jml;
    console.log("OK  " + jml + "x  " + lama.split("/").pop().slice(0, 45));
  } else {
    console.log("LEWAT: " + lama.split("/").pop().slice(0, 50));
  }
}
fs.writeFileSync("skrip/resep-data.js", t, "utf8");
console.log("Diperbaiki:", n);
