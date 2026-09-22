// Hapus ikon printer dan perbarui komentar bagian CSS.
const fs = require("fs");

// 1. Ikon printer tidak dipakai lagi setelah fitur cetak dihapus.
let s = fs.readFileSync("aset/icons.svg", "utf8");
const pola = /<symbol id="i-printer"[\s\S]*?<\/symbol>/;
if (pola.test(s)) {
  s = s.replace(pola, "");
  fs.writeFileSync("aset/icons.svg", s, "utf8");
  console.log("Ikon i-printer dihapus");
} else {
  console.log("i-printer tidak ketemu");
}

// 2. Komentar daftar isi di atas style.css masih menyebut cetak.
let c = fs.readFileSync("aset/style.css", "utf8");
c = c.replace("16 cetak", "16 aksesibilitas");
c = c.replace("16) AKSESIBILITAS & CETAK", "16) AKSESIBILITAS");
fs.writeFileSync("aset/style.css", c, "utf8");
console.log("Komentar CSS diperbarui");
