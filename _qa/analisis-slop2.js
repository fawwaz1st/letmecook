// Analisis gaya penulisan resep: cari pola kalimat yang terdengar
// seperti mesin. Dipakai untuk memantau perbaikan, bukan untuk website.
const fs = require("fs");
const vm = require("vm");

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("skrip/resep-data.js", "utf8"), ctx);
const RESEP = ctx.RESEP;

// Pola yang menurut riset gaya penulisan harus dihindari.
const POLA = [
  [/Sebaiknya|Penderita/, "birokratik"],
  [/itu [a-z]+ khas/, "definisi ensiklopedia"],
  [/\bmemberi\b|\bmenyumbang\b|\bmenambah\b|\bmenghilangkan\b|\bmenahan\b|\bmemakan\b|dipadukan/, "verba kosong"],
  [/\bsementara\b/, "kontras palsu"],
  [/\bbukan [a-z]+ yang\b/, "struktur negasi"],
  [/\bpaling sering\b|\bbenar-benar\b|\bcukup banyak\b/, "puffery"],
  [/Kalau sudah (terlanjur|lembek|masih|kuah)/, "pembuka panjang"],
  [/untuk membantu|untuk menetralkan|untuk mencerna/, "klaim kesehatan"],
];

const BIDANG = ["deskripsi", "rasa", "pantangan", "tips", "selamat", "simpan", "minum", "suasana"];

console.log("=== PANJANG TEKS ===");
const hitung = (r) => BIDANG.reduce((n, b) => n + (r[b] || "").split(/\s+/).length, 0);
const rata = Math.round(RESEP.reduce((n, r) => n + hitung(r), 0) / RESEP.length);
console.log("  Rata-rata kata per resep:", rata);
console.log("  Terpanjang:", RESEP.map((r) => [r.id, hitung(r)]).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, n]) => id + " (" + n + ")").join(", "));

console.log("\n=== POLA SLOP ===");
let total = 0;
for (const [pola, nama] of POLA) {
  const kena = RESEP.filter((r) => BIDANG.some((b) => pola.test(r[b] || "")));
  total += kena.length;
  console.log(`  ${nama.padEnd(24)} ${kena.length}/${RESEP.length}  ${kena.map((r) => r.id).slice(0, 6).join(", ")}${kena.length > 6 ? "..." : ""}`);
}
console.log("\nTotal resep bermasalah:", total);
