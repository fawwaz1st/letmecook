// Analisis struktur PANDUAN-PRESENTASI.md sebelum ditulis ulang.
const fs = require("fs");
const t = fs.readFileSync("PANDUAN-PRESENTASI.md", "utf8");

console.log("=== STRUKTUR ===");
t.split("\n").forEach((l, i) => {
  if (/^#{1,3} /.test(l)) console.log((i + 1) + ": " + l);
});

const i = t.indexOf("## Pertanyaan yang Mungkin Ditanya");
if (i > -1) {
  console.log("\nBagian QA mulai baris:", t.slice(0, i).split("\n").length);
  console.log("Panjang:", t.slice(i).split("\n").length, "baris");
}

console.log("\n=== PERTANYAAN DI PANDUAN ===");
const re = /\*\*"([^"]+)"\*\*/g;
let m, n = 0;
while ((m = re.exec(t))) {
  n++;
  console.log(n + ". " + m[1].slice(0, 70));
}
