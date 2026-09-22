// Cari posisi baris untuk sisa rujukan yang belum diverifikasi.
const fs = require("fs");
const S = fs.readFileSync("skrip/store.js", "utf8").split("\n");
const H = fs.readFileSync("skrip/halaman.js", "utf8").split("\n");
const C = fs.readFileSync("aset/style.css", "utf8").split("\n");

const cari = (L, nama, re) => {
  L.forEach((l, i) => { if (re.test(l)) console.log(`${nama}:${i + 1}  ${l.trim().slice(0, 88)}`); });
};

console.log("--- store.js: select.value / nilai select ---");
cari(S, "S", /select\.value|\.value\s*=|opt\.value/);
console.log("\n--- store.js: lewatServer dipakai ---");
cari(S, "S", /lewatServer/);
console.log("\n--- store.js: timer mode masak (mulaiTimer/tombolTimer) ---");
cari(S, "S", /function mulaiTimer|tombolTimer|\.masak-timer/);
console.log("\n--- halaman.js: susunBelanja ---");
cari(H, "H", /susunBelanja/);
console.log("\n--- halaman.js: timer halaman resep ---");
cari(H, "H", /function mulaiTimer|hitungMundur/);
console.log("\n--- style.css: focus-visible ---");
cari(C, "C", /focus-visible/);
console.log("\n--- style.css: .grup/.kartu compact sekitar 295-335 ---");
C.slice(299, 335).forEach((l, i) => { if (/^\.|^  |^}/.test(l)) console.log((300 + i) + ": " + l.slice(0, 88)); });
console.log("\n--- style.css: [hidden] ---");
cari(C, "C", /\[hidden\]/);
console.log("\n--- halaman.js 224-232 (area.innerHTML) ---");
H.slice(223, 232).forEach((l, i) => console.log((224 + i) + ": " + l.slice(0, 88)));
console.log("\n--- halaman.js 843-860 (router) ---");
H.slice(842, 860).forEach((l, i) => console.log((843 + i) + ": " + l.slice(0, 88)));
console.log("\n--- store.js 160-168 (lewatServer body) ---");
S.slice(159, 168).forEach((l, i) => console.log((160 + i) + ": " + l.slice(0, 88)));
