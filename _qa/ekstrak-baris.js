// Ekstrak semua rujukan nomor baris dari PENJELASAN.MD untuk diaudit.
const fs = require("fs");
const L = fs.readFileSync("PENJELASAN.MD", "utf8").split("\n");

const pola = [
  /\(baris [\d–\-]+\)/i,          // (baris 18) atau (baris 557–822)
  /\(baris [\d–\-]+$/i,
  /baris \d+[–-]\d+/i,
  /(store|halaman|resep-data)\.js:\d+/i,
  /style\.css:\d+/i,
  /`baris \d+`/i,
  /\(baris ~?\d+\)/i,
];

L.forEach((l, i) => {
  for (const p of pola) {
    if (p.test(l)) {
      console.log((i + 1) + "| " + l.trim().slice(0, 110));
      break;
    }
  }
});
