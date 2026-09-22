// Verifikasi akhir dokumentasi: cek nomor baris usang dan hitung pertanyaan.
const fs = require("fs");

// Nomor baris yang mungkin masih usang (dari versi dokumen lama).
const USANG = ["1038", "1152", "1104", "1133", "635)", "907", "928", "951)", "800)", "712)", "817)", "1413)"];

console.log("=== CEK NOMOR BARIS USANG ===");
let temuan = 0;
for (const f of ["PENJELASAN.MD", "PANDUAN-PRESENTASI.md"]) {
  const baris = fs.readFileSync(f, "utf8").split("\n");
  baris.forEach((l, i) => {
    for (const u of USANG) {
      if (l.includes(u) && /(baris|:)\s*\d/.test(l)) {
        console.log(`  ${f}:${i + 1}  ${l.trim().slice(0, 80)}`);
        temuan++;
        break;
      }
    }
  });
}
console.log(temuan ? `Total temuan: ${temuan}` : "  tidak ada nomor usang");

console.log("\n=== JUMLAH PERTANYAAN ===");
for (const f of ["PENJELASAN.MD", "PANDUAN-PRESENTASI.md"]) {
  const t = fs.readFileSync(f, "utf8");
  const tanyaT = (t.match(/\*\*T: /g) || []).length;
  const tanyaKutip = (t.match(/\*\*"[A-Z][^"]*\?"\*\*/g) || []).length;
  console.log(`  ${f}: ${tanyaT + tanyaKutip} pertanyaan`);
}

console.log("\n=== UKURAN DOKUMEN ===");
for (const f of ["README.md", "PENJELASAN.MD", "PANDUAN-PRESENTASI.md"]) {
  const t = fs.readFileSync(f, "utf8");
  console.log(`  ${f}: ${t.split("\n").length} baris, ${Math.round(t.length / 1024)} KB`);
}
