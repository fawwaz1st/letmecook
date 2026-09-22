// Perbaiki semua rujukan nomor baris usang di PENJELASAN.MD.
// Setiap penggantian diverifikasi: harus ketemu tepat satu kali.
const fs = require("fs");
const FILE = "PENJELASAN.MD";
let t = fs.readFileSync(FILE, "utf8");

const G = [
  // --- Bagian 3: contoh alur ---
  ["`skrip/halaman.js:262`", "`skrip/halaman.js:226`"],
  ["router kecil (baris `skrip/halaman.js:837`)", "router kecil (baris `skrip/halaman.js:845`)"],
  ["router (baris 823) memanggil fungsi halaman", "router (baris 845) memanggil fungsi halaman"],

  // --- 5.1 ---
  ["Baris 29 memastikan larik tidak diterima", "Baris 28 memastikan larik tidak diterima"],

  // --- 5.7 ---
  ["asli** (baris 386)", "asli** (baris 378)"],
  ["Fitur papan tuntas di baris 408:", "Fitur papan tuntas di baris 401:"],

  // --- 5.8 ---
  ["(baris 441), bukan tiap ketikan", "(baris 444), bukan tiap ketikan"],
  ["sebelum digambar (baris 487)", "sebelum digambar (baris 482)"],

  // --- 5.9 ---
  ["(baris 560), bukan seluruh dokumen", "(baris 549), bukan seluruh dokumen"],

  // --- 5.10 ---
  [/\(baris 566[–-]1186\)/, "(baris 566–1180)"],
  ["kalau `lewatServer()` bernilai salah (baris 881)", "kalau `lewatServer()` bernilai salah (baris 740)"],
  ["oleh **kedua** arah (baris 1016 dan 1027)", "oleh **kedua** arah (baris 1016, dipanggil di 1026 dan 1034)"],

  // --- 5.11 ---
  [/\(baris 1072[–-]1098\)/, "(baris 1186–1207)"],
  ["masuk layar** (baris 1088)", "masuk layar** (baris 1201)"],

  // --- 5.12 ---
  [/\(baris 1100[–-]1147\)/, "(baris 1210–1264)"],
  ["| 1100 | `JUMLAH_RESEP` |", "| 1214 | `JUMLAH_RESEP` |"],

  // --- 6.1 ---
  [/### 6\.1 Router \(baris 823[–-]838\)/, "### 6.1 Router (baris 845–859)"],

  // --- 6.2 ---
  [/### 6\.2 `halamanIndex` — Beranda \(baris 16[–-]69\)/, "### 6.2 `halamanIndex` — Beranda (baris 16–64)"],
  ["| 44 | Bangun empat kotak kategori waktu makan |", "| 47 | Bangun empat kotak kategori waktu makan |"],
  ["| 63 | Isi empat resep berbab |", "| 60 | Isi empat resep berbab |"],
  ["| 67 | Panggil `siapkanHalaman()` |", "| 63 | Panggil `siapkanHalaman()` |"],

  // --- 6.3 ---
  [/### 6\.3 `halamanKatalog` — Katalog \(baris 71[–-]186\)/, "### 6.3 `halamanKatalog` — Katalog (baris 71–181)"],
  ["| 82 | Isi kotak cari dengan kata kunci yang sedang aktif |", "| 84 | Isi kotak cari dengan kata kunci yang sedang aktif |"],
  ["| 85 | Tandai chip kategori yang aktif |", "| 87 | Tandai chip kategori yang aktif |"],
  ["| 90 | Pencarian berikutnya tetap membawa kategori yang dipilih |", "| 92 | Pencarian berikutnya tetap membawa kategori yang dipilih |"],
  ["| 100 | `cocokKata`", "| 102 | `cocokKata`"],
  ["| 108 | Tabel nama kategori untuk judul halaman |", "| 109 | Tabel nama kategori untuk judul halaman |"],
  ["| 175 | Bangun JSON-LD `ItemList` untuk mesin pencari |", "| 167 | Bangun JSON-LD `ItemList` untuk mesin pencari |"],
  ["| 185 | Panggil `siapkanHalaman()` |", "| 162 | Panggil `siapkanHalaman()` |"],

  // --- 6.4 ---
  [/### 6\.4 `halamanResep` — Halaman Resep \(baris 188[–-]537\)/, "### 6.4 `halamanResep` — Halaman Resep (baris 188–550)"],
  ["| 205 | Ubah judul halaman", "| 204 | Ubah judul halaman"],
  ["| 227 | Bangun label kecil", "| 218 | Bangun label kecil"],
  ["| 236 | Bangun seluruh HTML halaman", "| 226 | Bangun seluruh HTML halaman"],
  ["| 306 | Tombol Simpan dan Salin tautan |", "| 294 | Tombol Simpan dan Salin tautan |"],
  ["| 329 | `gambarBahan`", "| 326 | `gambarBahan`"],
  ["| 358 | `simpanProg`", "| 350 | `simpanProg`"],
  ["| 364 | `gambarPorsi`", "| 356 | `gambarPorsi`"],
  ["| 371 | Tombol − dan + porsi |", "| 363 | Tombol − dan + porsi |"],
  ["| 381 | Bangun daftar langkah", "| 382 | Bangun daftar langkah"],
  ["| 445 | `gambarProg`", "| 469 | `gambarProg`"],
  ["| 450 | `mulaiTimer`", "| 474 | `mulaiTimer`"],
  ["| 475 | Tombol", "| 499 | Tombol"],
  ["| 478 | Bangun JSON-LD", "| 508 | Bangun JSON-LD"],
  ["| 521 | Hentikan timer", "| 540 | Hentikan timer"],
  ["| 528 | Resep pendamping", "| 545 | Resep pendamping"],
  ["| 535 | Panggil `siapkanHalaman()` |", "| 549 | Panggil `siapkanHalaman()` |"],

  // --- 6.5 ---
  ["| 540 | `HARI` (7 hari) dan `SLOT` (pagi/siang/malam) |", "| 558 | `HARI` (7 hari) dan `SLOT` (pagi/siang/malam) |"],
  ["| 543 | `ambilRencana` / `simpanRencana` |", "| 561 | `ambilRencana` / `simpanRencana` |"],
  ["| 554 | `gambarRencana`", "| 573 | `gambarRencana`"],
  ["| 613 | `gambarPilihan`", "| 642 | `gambarPilihan`"],
  ["| 633 | `bukaPemilih` / `tutupPemilih` |", "| 675 | `bukaPemilih` / `tutupPemilih` |"],
  ["| 652 | `susunBelanja`", "| 699 | `susunBelanja`"],
  ["| 686 | `ambilTambahan`", "| 724 | `ambilTambahan`"],
  ["| 694 | `barisBahan`", "| 731 | `barisBahan`"],
  ["| 727 | `gambarBelanja`", "| 760 | `gambarBelanja`"],
  ["| 767 | Form tambah bahan manual |", "| 799 | Form tambah bahan manual |"],
  ["| 783 | Panggil `siapkanHalaman()` |", "| 816 | Panggil `siapkanHalaman()` |"],
  [/[ \t]*\| 798 \| Panggil `siapkanHalaman\(\)` \|[\r\n]*/, ""],
  ["**Cara kerja daftar belanja otomatis** (baris 652):", "**Cara kerja daftar belanja otomatis** (baris 699):"],

  // --- 6.6 ---
  [/### 6\.6 `halamanFavorit` — Favorit \(baris 802[–-]821\)/, "### 6.6 `halamanFavorit` — Favorit (baris 823–839)"],
  ["| 803 | `gambar()`", "| 824 | `gambar()`"],
  ["| 810 | Tampilkan/sembunyikan keadaan kosong |", "| 828 | Tampilkan/sembunyikan keadaan kosong |"],
  ["| 817 | `isiKartu` dengan opsi", "| 834 | `isiKartu` dengan opsi"],
  ["| 819 | Panggil `siapkanHalaman()` |", "| 838 | Panggil `siapkanHalaman()` |"],

  // --- 9.1-9.4 ---
  [/### 9\.1 Token — satu tempat untuk semua nilai \(baris 10[–-]56\)/, "### 9.1 Token — satu tempat untuk semua nilai (baris 11–56)"],
  [/### 9\.2 Jebakan `\[hidden\]` \(baris ~52\)/, "### 9.2 Jebakan `[hidden]` (baris 85)"],
  [/### 9\.3 Kartu compact \(baris 295[–-]330\)/, "### 9.3 Kartu compact (baris 300–335)"],
  [/### 9\.4 `content-visibility` \(baris 310[–-]318\)/, "### 9.4 `content-visibility` (baris 319–320)"],

  // --- 10.1-10.6 ---
  ["(`skrip/store.js:760`)", "(`skrip/store.js:767`)"],
  ["(`skrip/halaman.js:450`)", "(`skrip/halaman.js:474`)"],
  ["(`skrip/store.js:693`)", "(`skrip/store.js:702`)"],
  ["(`skrip/halaman.js:829`)", "(`skrip/halaman.js:834`)"],

  // --- 11.2-11.3 ---
  ["(`skrip/halaman.js:410`), bukan `innerHTML`", "(`skrip/halaman.js:430`), bukan `innerHTML`"],
  ["tempat objek (`skrip/store.js:29`)", "tempat objek (`skrip/store.js:28`)"],
  ["(`skrip/halaman.js:686`) menyaring entri", "(`skrip/halaman.js:724`) menyaring entri"],

  // --- 12 ---
  ["(`skrip/store.js:951`)", "(`skrip/store.js:1067`)"],

  // --- 13 ---
  ["| `skrip/store.js:298` | Foto di bawah layar", "| `skrip/store.js:305` | Foto di bawah layar"],
  ["(`aset/style.css:482`)", "(`aset/style.css:1598`)"],
  ["| `skrip/store.js:441` |", "| `skrip/store.js:444` |"],
  ["| `skrip/store.js:487` |", "| `skrip/store.js:482` |"],
  ["| `skrip/store.js:560` |", "| `skrip/store.js:549` |"],
  ["| `skrip/halaman.js:521` |", "| `skrip/halaman.js:540` |"],

  // --- 15 ---
  ["`aset/style.css` (baris 10). Contoh, mau hijau", "`aset/style.css` (baris 11). Contoh, mau hijau"],
  ["(`aset/style.css:12`)", "(`aset/style.css:29`)"],
  ["Daftarkan di router (`skrip/halaman.js:823`)", "Daftarkan di router (`skrip/halaman.js:848`)"],
];

let ok = 0, gagal = 0;
for (const [lama, baru] of G) {
  const re = lama instanceof RegExp ? lama : new RegExp(lama.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const ketemu = t.match(new RegExp(re.source, "g"));
  if (!ketemu || ketemu.length !== 1) {
    console.log("GAGAL (" + (ketemu ? ketemu.length : 0) + "x): " + re.source.slice(0, 70));
    gagal++;
    continue;
  }
  t = t.replace(re, () => baru);
  ok++;
}
fs.writeFileSync(FILE, t);
console.log("Berhasil: " + ok + " | Gagal: " + gagal);
