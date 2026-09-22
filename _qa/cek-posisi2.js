// Kumpulkan semua posisi yang perlu diverifikasi untuk perbaikan dokumen.
const fs = require("fs");
const S = fs.readFileSync("skrip/store.js", "utf8").split("\n");
const H = fs.readFileSync("skrip/halaman.js", "utf8").split("\n");
const C = fs.readFileSync("aset/style.css", "utf8").split("\n");

const potong = (L, a, b) => L.slice(a - 1, b).map((l, i) => (a + i) + ": " + l.slice(0, 95)).join("\n");

console.log("### store.js 1-15 (KEY)\n" + potong(S, 1, 15));
console.log("\n### store.js 592-600 (siapkanMasak awal)\n" + potong(S, 592, 600));
console.log("\n### store.js 638-660 (appendChild + pendengar)\n" + potong(S, 638, 660));
console.log("\n### store.js 820-835 (lompatKe)\n" + potong(S, 820, 835));
console.log("\n### store.js 885-935 (bukaVideo lewatServer + pause)\n" + potong(S, 885, 935));
console.log("\n### store.js 1010-1032 (pindahVideo)\n" + potong(S, 1010, 1032));
console.log("\n### store.js 1080-1096 (geser layar)\n" + potong(S, 1080, 1096));
console.log("\n### store.js 168-215 (gambar cadangan)\n" + potong(S, 168, 215));
console.log("\n### store.js 213-240 (RE_TEKNIK dll)\n" + potong(S, 213, 240));
console.log("\n### store.js 255-290 (IKON_TEKNIK + KARTU)\n" + potong(S, 255, 290));
console.log("\n### store.js 284-300 (kartuResepHTML)\n" + potong(S, 284, 300));
console.log("\n### store.js 333-345 (dropdown start)\n" + potong(S, 333, 345));
console.log("\n### store.js 384-392 (select asli)\n" + potong(S, 384, 392));
console.log("\n### store.js 423-435 (saran start)\n" + potong(S, 423, 435));
console.log("\n### store.js 509-520 (animasi start)\n" + potong(S, 509, 520));
console.log("\n### style.css [hidden] rules\n");
C.forEach((l, i) => { if (/\[hidden\]/.test(l)) console.log((i + 1) + ": " + l.trim().slice(0, 90)); });
console.log("\n### halaman.js 646-656 (konteks baris 652)\n" + potong(H, 646, 656));
