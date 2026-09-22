// Kumpulkan sisa posisi untuk perbaikan dokumen (batch 2).
const fs = require("fs");
const H = fs.readFileSync("skrip/halaman.js", "utf8").split("\n");
const S = fs.readFileSync("skrip/store.js", "utf8").split("\n");

const potong = (L, a, b) => L.slice(a - 1, b).map((l, i) => (a + i) + ": " + l.slice(0, 92)).join("\n");

console.log("### halaman.js 190-230 (id/404/title/label)\n" + potong(H, 190, 230));
console.log("\n### halaman.js 293-380 (salin, gambarBahan, simpanProg, porsi, langkah)\n" + potong(H, 293, 380));
console.log("\n### halaman.js 498-512 (mode masak + JSON-LD)\n" + potong(H, 498, 512));
console.log("\n### store.js: cari 'masak-timer' di frame\n");
S.forEach((l, i) => { if (/masak-timer|masak mundur|Mulai timer/.test(l) && i < 640) console.log((i + 1) + ": " + l.trim().slice(0, 92)); });
console.log("\n### store.js 1100-1145 (pendengar objek)\n" + potong(S, 1100, 1145));
