// Audit semua rujukan nomor baris di PENJELASAN.MD terhadap isi berkas sebenarnya.
// Untuk setiap rujukan "file.js:N", cetak isi baris N supaya bisa dinilai manual.
const fs = require("fs");
const L = fs.readFileSync("PENJELASAN.MD", "utf8").split("\n");

const berkas = {
  "store.js": fs.readFileSync("skrip/store.js", "utf8").split("\n"),
  "halaman.js": fs.readFileSync("skrip/halaman.js", "utf8").split("\n"),
  "resep-data.js": fs.readFileSync("skrip/resep-data.js", "utf8").split("\n"),
  "style.css": fs.readFileSync("aset/style.css", "utf8").split("\n"),
};

// Cari pola "nama.js:N" atau "nama.css:N"
const re = /(store|halaman|resep-data)\.js:(\d+)|style\.css:(\d+)/g;

let total = 0;
L.forEach((l, i) => {
  let m;
  re.lastIndex = 0;
  while ((m = re.exec(l)) !== null) {
    total++;
    const nama = m[1] ? m[1] + ".js" : "style.css";
    const n = parseInt(m[2] || m[3], 10);
    const isi = (berkas[nama][n - 1] || "(kosong)").trim().slice(0, 72);
    console.log(`doc:${i + 1} ${nama}:${n}  =>  ${isi}`);
  }
});
console.log("Total rujukan:", total);
