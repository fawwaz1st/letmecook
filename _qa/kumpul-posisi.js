// Kumpulkan posisi baris sebenarnya untuk memperbaiki rujukan di dokumen.
const fs = require("fs");
const S = fs.readFileSync("skrip/store.js", "utf8").split("\n");
const H = fs.readFileSync("skrip/halaman.js", "utf8").split("\n");
const C = fs.readFileSync("aset/style.css", "utf8").split("\n");

const potong = (L, a, b) => L.slice(a - 1, b).map((l, i) => (a + i) + ": " + l.slice(0, 88)).join("\n");

console.log("### store.js 143-162 (akhir seksi format)\n" + potong(S, 143, 162));
console.log("\n### store.js 380-392 (select asli dropdown)\n" + potong(S, 380, 392));
console.log("\n### store.js 873-887 (bukaVideo lewatServer)\n" + potong(S, 873, 887));
console.log("\n### store.js 686-694 (timer mode masak)\n" + potong(S, 686, 694));
console.log("\n### store.js 1063-1070 (papanTuntas)\n" + potong(S, 1063, 1070));
console.log("\n### store.js 544-552 (MutationObserver)\n" + potong(S, 544, 552));
console.log("\n### store.js 476-486 (jeda 120ms)\n" + potong(S, 476, 486));
console.log("\n### store.js 438-448 (teks gabung)\n" + potong(S, 438, 448));
console.log("\n### halaman.js 445-495 (timer halaman resep)\n" + potong(H, 445, 495));
console.log("\n### halaman.js 640-660 (pemilih mealplan)\n" + potong(H, 640, 660));
console.log("\n### halaman.js 752-775 (gambarBelanja)\n" + potong(H, 752, 775));
console.log("\n### halaman.js langkahList diisi\n");
H.forEach((l, i) => { if (/langkahList|area\.innerHTML/.test(l)) console.log((i + 1) + ": " + l.trim().slice(0, 88)); });
console.log("\n### style.css 1-58 (token)\n" + potong(C, 1, 58));
console.log("\n### style.css 850-862 (badge teknik)\n" + potong(C, 850, 862));
console.log("\n### style.css 292-335 (kartu compact + content-visibility)\n" + potong(C, 292, 335));
console.log("\n### style.css 1595-1607 (.muncul)\n" + potong(C, 1595, 1607));
console.log("\n### style.css 925-940 (masak-tengah)\n" + potong(C, 925, 940));
