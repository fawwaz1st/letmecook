# PENJELASAN.MD — Panduan Lengkap Kode LetMeCook

Dokumen ini menjelaskan **seluruh** cara kerja website LetMeCook, baris per
baris, ditulis untuk orang yang baru belajar coding. Setelah membaca ini, kamu
bisa mempresentasikan website ini dari atas sampai bawah: apa fungsinya,
bagaimana alurnya, kenapa ditulis begitu, di berkas mana, di baris berapa, dan
di mana harus mengubah kalau mau menambah sesuatu.

> **Cara membaca dokumen ini.** Setiap bagian menyebutkan nama berkas dan
> nomor barisnya, misalnya `skrip/store.js:140`. Buka berkas itu di editor, tekan
> `Ctrl+G`, ketik nomornya, dan kamu langsung berada di kode yang dibahas.
> Jangan hafal — cukup tahu di mana harus mencari.

---

## Daftar Isi

1. [Gambaran Besar](#1-gambaran-besar)
2. [Peta Berkas](#2-peta-berkas)
3. [Alur Data Resep](#3-alur-data-resep)
4. [Alur Satu Halaman Dimuat](#4-alur-satu-halaman-dimuat)
5. [store.js — Peralatan Bersama (32 fungsi)](#5-storejs--peralatan-bersama)
6. [halaman.js — Logika Tiap Halaman](#6-halamansjs--logika-tiap-halaman)
7. [skrip/resep-data.js — Data 67 Resep](#7-resep-datajs--data-67-resep)
8. [Berkas HTML](#8-berkas-html)
9. [style.css — 18 Bagian](#9-stylecss--18-bagian)
10. [Fitur Utama dan Cara Kerjanya](#10-fitur-utama-dan-cara-kerjanya)
11. [Keamanan](#11-keamanan)
12. [Aksesibilitas](#12-aksesibilitas)
13. [Optimasi Performa](#13-optimasi-performa)
14. [Pertanyaan yang Sering Muncul](#14-pertanyaan-yang-sering-muncul)
15. [Cara Menambah atau Mengubah Sesuatu](#15-cara-menambah-atau-mengubah-sesuatu)
16. [Istilah Teknis](#16-istilah-teknis)

---

## 1. Gambaran Besar

**LetMeCook** adalah website resep masakan Indonesia. Isinya 67 resep dari
berbagai daerah, masing-masing dengan:

- Bahan bertakar **gram dan mililiter** (bukan "secukupnya")
- Langkah yang menyebut **tanda matang** yang bisa dilihat mata
- **Video YouTube** yang bisa diputar sambil memasak
- **Timer** otomatis yang muncul kalau langkah menyebut waktu
- **Mode masak**: layar penuh, satu langkah besar sekaligus

**Kenapa dibuat?** Dua masalah saat mengikuti resep internet: takarannya
kabur ("garam secukupnya" tidak membantu orang yang belum pernah masak), dan
langkahnya tidak memberi tanda ("masak sampai matang" — matang yang seperti
apa?). Situs ini menjawab keduanya: semua bahan punya angka, dan tiap langkah
menyebut tanda yang bisa diperiksa sendiri.

**Untuk apa?** Tiga hal: masak dengan angka pasti (porsi bisa disesuaikan),
tahu kapan sesuatu sudah matang (tanda + timer otomatis), dan merencanakan
makan seminggu (21 slot makan + daftar belanja yang tersusun sendiri).

**Siapa yang cocok memakainya?** Orang yang baru mulai masak, perantau yang
ingin masak masakan rumah, dan siapa pun yang lebih suka mengikuti angka
daripada menebak.

Website ini **tidak punya server dan tidak punya database**. Semua data resep
tertanam di dalam berkas JavaScript, dan semua data pengguna (favorit, rencana
makan, centang belanja) disimpan di **localStorage** — penyimpanan kecil di
dalam browser pengunjung sendiri.

Konsekuensinya:

- Tidak ada biaya server, bisa di-hosting gratis di GitHub Pages
- Data pengguna tidak pernah dikirim ke mana pun (bagus untuk privasi)
- Kalau pengunjung menghapus riwayat browser, datanya ikut hilang
- Data tidak bisa dibuka dari perangkat lain

**Teknologi yang dipakai:** hanya HTML, CSS, dan JavaScript biasa. Tanpa
framework (React, Vue, dsb.), tanpa build tool (webpack, Vite, dsb.). Ini
sengaja: supaya siapa pun bisa membuka berkasnya, langsung mengerti, dan
langsung mengubahnya tanpa perlu menginstal apa pun.

---

## 2. Peta Berkas

```
letmecook/
│
│  ── Halaman (dibuka pengunjung) ─────────────────────────────
├── index.html            Beranda: sorotan hari ini, kategori, populer
├── katalog.html          Daftar semua resep + pencarian + filter
├── resep.html            Halaman satu resep (diisi oleh JavaScript)
├── mealplan.html         Rencana makan 7 hari + daftar belanja
├── favorit.html          Resep yang disimpan pengunjung
├── tentang.html          Cara membaca takaran + penjelasan privasi
├── 404.html              Halaman kalau alamat tidak ditemukan
│
│  ── Logika (dipanggil halaman) ──────────────────────────────
├── skrip/
│   ├── skrip/resep-data.js     (2.599 baris)  DATA: 67 resep + tabel video
│   ├── store.js          (1.150 baris)  ALAT: 32 fungsi bersama
│   └── halaman.js        ( 865 baris)  LOGIKA: 5 fungsi + router
│
│  ── Tampilan (aset yang diunduh) ────────────────────────────
├── aset/
│   ├── style.css         (1.704 baris)  Seluruh tampilan (18 bagian)
│   ├── aset/icons.svg                      32 ikon SVG, dipanggil per id
│   ├── ikon-192.png                   Ikon aplikasi 192px (manifest)
│   └── ikon-512.png                   Ikon aplikasi 512px (manifest)
│
│  ── Untuk mesin pencari ─────────────────────────────────────
├── robots.txt            Aturan untuk robot pencari (3 baris)
├── sitemap.xml           Daftar 72 URL situs
├── manifest.webmanifest  Info aplikasi (nama, ikon, warna)
│
│  ── Dokumentasi ─────────────────────────────────────────────
├── README.md             Panduan singkat untuk pengembang
├── PENJELASAN.MD         Dokumen yang sedang kamu baca
├── PANDUAN-PRESENTASI.md Naskah presentasi 8 bagian, siap dibaca
│
│  ── Alat bantu (tidak ikut ter-deploy) ──────────────────────
└── _qa/
    ├── periksa.js        Satu perintah: mojibake, kode mati, ikon, data
    ├── audit-video.js    Periksa 67 video YouTube masih bisa diputar
    ├── buat-sitemap.js   Buat ulang sitemap.xml
    ├── buat-ikon.js      Buat ulang ikon aplikasi
    └── pasang-meta.js    Pasang meta ke halaman baru (sekali pakai)
```

### Kenapa HTML tetap di folder utama?

HTML **sengaja tidak** dipindah ke subfolder, karena:

1. Alamat `https://fawwaz1st.github.io/letmecook/katalog.html` sudah
   terindeks mesin pencari. Kalau dipindah, semua tautan itu rusak.
2. GitHub Pages mencari `index.html` di root. Kalau dipindah, alamat utama
   situs ikut berubah.

Yang dipindah adalah berkas yang **tidak** muncul di alamat mana pun:
JavaScript, CSS, dan ikon. Pengunjung tidak pernah melihat alamatnya, jadi
memindahkannya tidak merusak tautan.

### Kenapa dipisah begitu?

Tiga berkas JavaScript punya **tanggung jawab yang jelas berbeda**:

| Berkas | Isinya | Perumpamaan |
|---|---|---|
| `skrip/resep-data.js` | Hanya data mentah | Buku resep |
| `skrip/store.js` | Fungsi yang dipakai semua halaman | Peralatan dapur |
| `skrip/halaman.js` | Apa yang dilakukan tiap halaman | Koki yang memakai peralatan |

Aturan emasnya: **kalau mau menambah resep, kamu hanya menyentuh
`skrip/resep-data.js`.** Tidak perlu mengubah HTML, CSS, atau JavaScript
lainnya.

### Kenapa ada `_qa/`?

Isinya skrip Node.js untuk memeriksa kualitas — misalnya `audit-video.js`
memeriksa apakah ke-67 video YouTube masih bisa diputar. Skrip ini **tidak
dipakai oleh website** (dan tidak ikut ter-deploy, karena tertulis di
`.gitignore`); hanya alat bantu saat mengembangkan. Jalankan dengan
`node _qa/nama-berkas.js`.

### Isi `_qa/` — hanya lima berkas, semuanya berguna

| Berkas | Gunanya | Butuh jaringan? |
|---|---|---|
| `periksa.js` | Empat pemeriksaan sekaligus: mojibake, kode mati, ikon mati, kelengkapan data resep | Tidak |
| `audit-video.js` | Memeriksa 67 video YouTube masih bisa diputar | Ya |
| `buat-sitemap.js` | Membuat ulang `sitemap.xml` dari data resep | Tidak |
| `buat-ikon.js` | Membuat ulang ikon aplikasi PNG | Tidak |
| `pasang-meta.js` | Memasang meta tag 2026 ke halaman baru (sekali pakai) | Tidak |

**Kenapa cuma lima?** Sebelumnya ada puluhan skrip untuk memeriksa satu hal
masing-masing. Sekarang pemeriksaan yang sering dipakai digabung jadi satu
(`periksa.js`), dan skrip sekali-pakai dihapus setelah tugasnya selesai —
supaya folder alat tidak berubah jadi tempat sampah.

**Aturan yang dipegang:** satu berkas = satu tugas yang jelas, dan kalau
tugasnya sudah selesai, berkasnya dihapus. Kalau nanti butuh lagi, skrip
baru lebih mudah ditulis daripada mencari di tumpukan berkas lama.

### Cara pakai `periksa.js`

```bash
node _qa/periksa.js
```

Keluarannya seperti ini kalau semua bersih:

```
OK   Karakter rusak (mojibake)
OK   Fungsi dan konstanta tak terpakai
OK   Ikon SVG (32 ikon)
OK   Data resep (67 resep)

Semua bersih.
```

Kalau ada temuan, barisnya berubah jadi `XX` diikuti daftar lokasinya, dan
kode keluarnya bukan nol — jadi bisa dipakai di pemeriksaan otomatis (CI)
kalau nanti diperlukan.

---

## 3. Alur Data Resep

Semua resep berbentuk satu larik (array) besar di `skrip/resep-data.js`:

```js
var RESEP = [
  {
    id: "rendang",                  // dipakai di URL: resep.html?id=rendang
    nama: "Rendang Sapi",
    daerah: "Sumatera Barat",
    kategori: "malam",              // sarapan | siang | malam | camilan
    waktuTotal: 180,                // menit
    waktuAktif: 40,                 // menit benar-benar di dapur
    level: "sedang",                // mudah | sedang | sulit
    porsi: 6,
    rating: 4.9,                    // angka contoh, bukan ulasan asli
    dimasak: 2314,                  // angka contoh
    foto: "https://upload.wikimedia.org/.../500px-....jpg",
    video: "GNfRXKsvG04",           // 11 karakter ID YouTube — WAJIB ada
    bab: [[0, "Persiapan"], ...],   // opsional: titik acuan waktu video
    deskripsi: "...",
    rasa: "...", pedas: 3, veg: false, anak: false,
    kalori: "±420 kkal", protein: "32 g",
    pantangan: "...", sanding: ["Nasi putih", "..."],
    minum: "...", suasana: "...",
    bahan: [                        // daftar bahan
      { nama: "bawang merah", jumlah: 80, satuan: "gram", bagi: 1 },
      // bagi: 0 = dihitung per butir (telur, daun), dibulatkan saat porsi diubah
    ],
    alat: ["Wajan", "..."],
    langkah: [                      // daftar langkah (teks biasa)
      "Blender cabai dan bawang merah hingga halus merah pekat.",
      // Kalau menyebut waktu ("30 menit"), timer muncul otomatis.
      // Kalau ada "Tanda matang: ...", kotak tanda matang muncul.
    ],
    tips: "...",      // kotak kuning "Sering gagal di sini"
    selamat: "...",   // kotak hijau "Kalau gagal"
    simpan: "...",    // kotak biru "Menyimpan sisa"
  },
  // ... 66 resep lainnya
];

// Durasi tiap video (detik), diambil dari YouTube.
var DURASI_VIDEO = { rendang: 402, "soto-ayam": 511, ... };

// Tanggal unggah tiap video (YYYY-MM-DD), diambil dari halaman YouTube.
// Dipakai untuk field uploadDate di VideoObject.
var TANGGAL_VIDEO = { rendang: "2022-04-08", "soto-ayam": "2021-11-30", ... };
```

**Kenapa `var`, bukan `const`?** Karena berkas ini dimuat sebagai skrip biasa
(bukan modul), dan `const` di skrip biasa tidak otomatis menjadi properti
`window` — akibatnya berkas lain tidak bisa membacanya. `var` bisa. Ini
jebakan yang mudah bikin bingung pemula.

### Bagaimana data mengalir sampai ke layar?

```
skrip/resep-data.js          store.js                 halaman.js            Layar
─────────────         ─────────                ───────────           ─────
RESEP[]  ──────────►  cariResep(id)  ────────► halamanResep()  ────► innerHTML
                      kartuResepHTML()  ─────► halamanKatalog()
                      parseLangkah()    ─────► (badge teknik)
                      daftarBab()       ─────► (bab video)
```

Contoh nyata saat membuka `resep.html?id=rendang`:

1. `skrip/halaman.js:188` (`halamanResep`) membaca `id` dari alamat → `"rendang"`
2. `skrip/store.js:46` (`cariResep`) mencari di larik `RESEP`
3. Ketemu objek resep → seluruh HTML halaman dibangun dari objek itu
4. `skrip/store.js:237` (`parseLangkah`) memecah tiap langkah jadi: teknik masak,
   besar api, tanda matang, dan teks sisa
5. `skrip/store.js:1038` (`daftarBab`) menentukan bab video: satu bab per langkah
6. Hasilnya dipasang ke `#area` dengan `innerHTML` (baris `skrip/halaman.js:262`)

---

## 4. Alur Satu Halaman Dimuat

Setiap halaman HTML memuat tiga skrip di bagian bawah `<body>`:

```html
<script src="skrip/resep-data.js"></script>  <!-- 1. data -->
<script src="store.js"></script>       <!-- 2. alat -->
<script src="halaman.js"></script>     <!-- 3. logika halaman -->
```

`skrip/halaman.js` diakhiri router kecil (baris `skrip/halaman.js:823`) yang membaca
penanda di `<body>`:

```html
<body data-halaman="katalog">
```

```js
(function mulai() {
  segarkanBadge();                        // selalu: isi angka favorit di kepala

  const fn = {
    index: halamanIndex,
    katalog: halamanKatalog,
    resep: halamanResep,
    mealplan: halamanMealplan,
    favorit: halamanFavorit,
    tentang: siapkanHalaman,              // tidak ada logika khusus
    "404": siapkanHalaman,
  }[document.body.dataset.halaman];

  if (fn) fn();                           // panggil fungsi yang cocok
})();
```

**Kenapa begitu?** Karena halaman ini statis (tanpa server), kita tidak bisa
memilih skrip di sisi server. Jadi setiap halaman memuat semua berkas yang
sama, dan halaman "memilih sendiri" fungsinya lewat atribut `data-halaman`.
Ini juga yang membuat website bisa berjalan dengan **Content-Security-Policy
ketat**: tidak ada satu pun `<script>` yang ditulis langsung di dalam HTML.

### Urutan yang terjadi di dalam satu halaman

```
1. Browser membaca HTML     → kerangka kosong tampil sebentar
2. skrip/resep-data.js dimuat     → larik RESEP tersedia
3. store.js dimuat          → semua fungsi tersedia, pendengar galat gambar
                              dipasang (skrip/store.js:203), gambar rusak yang
                              telanjur terjadi diperiksa manual (skrip/store.js:209)
4. halaman.js dimuat        → router (baris 823) memanggil fungsi halaman
5. Fungsi halaman:
   a. mengisi konten (kartu, langkah, bahan, dst.)
   b. memanggil siapkanHalaman() — "sapuan akhir" bersama (skrip/store.js:1133):
      - menandai elemen di bawah layar untuk animasi gulir
      - menyamakan semua angka resep (data-jumlah)
      - mengisi tahun di kaki halaman (data-tahun)
      - memasang tombol kembali ke atas
      - mengubah <select> jadi dropdown kustom
      - memasang saran pencarian
      - menyalakan animasi gulir
```

`siapkanHalaman()` sengaja dibuat sebagai satu pintu: **setiap halaman
memanggilnya di akhir**, jadi perilaku bersama (animasi, dropdown, angka)
tidak perlu ditulis ulang di tujuh tempat.

---

## 5. store.js — Peralatan Bersama

1.150 baris, 32 fungsi. Dibagi jadi beberapa bagian dengan komentar pembatas
`// ====...====`. Berikut peta lengkapnya:

### 5.1 Penyimpanan (baris 1–75)

| Baris | Isi | Gunanya |
|---|---|---|
| 9 | `const KEY = {...}` | Nama kunci localStorage, semuanya berawalan `letmecook:` supaya tidak bentrok dengan situs lain |
| 18 | `baca(kunci, cadangan)` | Baca dari localStorage. Kalau isinya rusak, kembalikan nilai cadangan. **Penting:** data localStorage bisa saja diubah tangan atau setengah tertulis, jadi bentuknya selalu diperiksa. Baris 29 memastikan larik tidak diterima di tempat objek. |
| 37 | `tulis(kunci, nilai)` | Simpan. Mengembalikan `false` kalau penuh (localStorage hanya ~5MB). |
| 46 | `cariResep(id)` | Cari satu resep dari larik `RESEP` berdasarkan id |
| 50 | `ambilFav()` | Daftar favorit, sekaligus menyaring id yang resepnya sudah tidak ada |
| 54 | `sudahFav(id)` | Apakah resep ini sudah disimpan? |
| 58 | `toggleFav(id)` | Simpan/lepas simpan satu resep |
| 67 | `segarkanBadge()` | Isi angka di samping tulisan "Favorit" pada kepala halaman |

Kunci penyimpanan:

```js
const KEY = {
  fav: "letmecook:fav",        // daftar id favorit
  meal: "letmecook:meal",      // rencana 7 hari
  gcheck: "letmecook:gcheck",  // centang belanja
  gmanual: "letmecook:gmanual",// bahan tambahan yang ditulis sendiri
  prog: "letmecook:prog",      // centang bahan + langkah per resep
};
```

### 5.2 Format angka dan waktu (baris 77–148)

| Baris | Fungsi | Contoh |
|---|---|---|
| 81 | `fmtQty(1.5)` | `"1 1/2"` — pecahan ditulis seperti di buku resep |
| 94 | `teksBahan(b, 2)` | `"160 gram bawang merah"` untuk porsi 2x; per butir diberi tanda `±` |
| 103 | `fmtWaktu(70)` | `"1 jam 10 mnt"` |
| 112 | `fmtDetik(91)` | `"01:31"` — atau `"2:59:58"` kalau lebih dari sejam |
| 124 | `hitungMundur(detik, saatTik, saatHabis)` | Satu mesin hitung mundur untuk dua tempat (timer halaman resep + timer mode masak) |
| 140 | `esc(teks)` | Mengubah `<` jadi `&lt;` dsb. **Semua** data yang masuk HTML harus lewat sini supaya aman dari suntikan kode. |
| 152 | `waktuDiTeks(teks)` | Cari "30 menit"/"1 jam" di teks langkah, kembalikan `[teks, detik]` |

**Kenapa `hitungMundur` dibuat terpisah?** Dulu timer di halaman resep dan
timer di mode masak punya kode sendiri-sendiri (duplikat). Kalau ada perbaikan,
harus diubah di dua tempat — dan sering lupa salah satu. Sekarang keduanya
memanggil fungsi yang sama.

### 5.3 Pemeriksa kecil (baris 159–170)

| Baris | Fungsi | Gunanya |
|---|---|---|
| 159 | `idVideoValid(id)` | ID YouTube selalu 11 karakter; diperiksa dengan regex |
| 165 | `lewatServer()` | Halaman dibuka lewat http/https, bukan dari berkas? Dipakai untuk memutuskan apakah pemutar YouTube boleh ditanam. |

### 5.4 Gambar cadangan (baris 172–214)

| Baris | Isi | Gunanya |
|---|---|---|
| 172 | `GAMBAR_CADANGAN` | Gambar SVG bawaan (hijau pandan), ditulis sebagai data-URI supaya tidak perlu berkas terpisah |
| 186 | `imgFallback(el)` | Dua tahap: gambar cadangan → blok warna. Tahap disimpan di `dataset` supaya panggilan kedua tidak mengulang. |
| 203 | Pendengar galat gambar | **Satu** pendengar untuk semua `<img>`. Kejadian `error` tidak menggelembung, jadi dipasang di fase tangkap (argumen ketiga `true`). |
| 209 | Pemeriksaan manual | Gambar yang telanjur gagal sebelum pendengar terpasang tidak memicu kejadian apa pun lagi, jadi diperiksa langsung dengan `naturalWidth === 0`. |

### 5.5 Membaca langkah (baris 216–291)

Ini bagian paling menarik. Satu kalimat langkah seperti:

> "Tumis bumbu dengan api sedang selama 8 menit hingga harum. Tanda matang:
> minyak keluar dan bau wangi."

Dipecah otomatis oleh `parseLangkah` (baris 237) menjadi:

```js
{
  teknik: "tumis",     // dari daftar kata kerja di RE_TEKNIK (baris 216)
  api: "sedang",       // dari pola "api ..." di RE_API (baris 217)
  matang: "minyak keluar dan bau wangi",  // setelah "Tanda matang:" (baris 218)
  sisa: "Tumis bumbu dengan api sedang selama 8 menit hingga harum."
}
```

| Baris | Isi | Gunanya |
|---|---|---|
| 216 | `RE_TEKNIK` | Daftar kata kerja masak (tumis, rebus, kukus, ...) |
| 221 | `PADANAN_TEKNIK` | Menyamakan kata sejenis: "menumis" → "tumis", "uleg" → "haluskan" |
| 257 | `IKON_TEKNIK` | Nama ikon per teknik. **Warnanya diatur di CSS**, bukan di JS. |
| 267 | `badgeTeknikHTML(urai)` | Membuat badge berwarna + meter api (3 batang kecil) |

Hasilnya dipakai untuk:
- **badge berwarna** di atas langkah — warna per teknik diatur di CSS lewat
  `[data-teknik="tumis"]` (`aset/style.css:800`), bukan ditulis JS
- **meter api** (3 batang kecil, menyala sesuai besar api)
- **kotak "Matang kalau:"**

### 5.6 Kartu resep (baris 293–339)

| Baris | Fungsi | Gunanya |
|---|---|---|
| 293 | `kartuResepHTML(r, opsi, daftarSimpan)` | Membuat HTML satu kartu |
| 319 | `isiKartu(wadah, daftar, opsi)` | Mengisi satu wadah dengan banyak kartu |

Dua optimasi penting di `isiKartu`:
1. Daftar favorit dibaca **sekali** (`new Set(ambilFav())`, baris 321) lalu
   dipakai untuk semua kartu. Tanpa ini, 67 kartu berarti 67 kali baca
   localStorage.
2. Opsi `setelahSimpan` memanggil fungsi setelah tombol hati diklik — dipakai
   halaman favorit untuk langsung menghapus kartu yang dilepas.

### 5.7 Dropdown kustom (baris 341–429)

`<select>` bawaan browser diganti tombol + daftar buatan sendiri, tapi
**nilainya tetap disimpan di `<select>` asli** (baris 386). Kenapa? Supaya
logika filter yang sudah ada (`fLevel.value`) tidak perlu diubah sama
sekali — hanya tampilannya yang diganti.

Fitur papan tuntas di baris 408: panah atas/bawah memilih, Esc menutup.

### 5.8 Saran pencarian (baris 431–515)

Saat mengetik di kotak cari, muncul daftar maksimal 7 resep yang cocok,
lengkap dengan foto kecil. Dua optimasi:

1. Teks pencarian semua resep digabung **sekali** saat halaman dimuat
   (baris 441), bukan tiap ketikan
2. Ketikan ditunda 120ms sebelum digambar (baris 487), supaya mengetik
   cepat tidak membuat layar berkedip

### 5.9 Animasi gulir (baris 517–564)

Elemen ber-class `.muncul` memudar masuk saat masuk layar, memakai
`IntersectionObserver`. Dua hal penting:

1. Kalau pengunjung mengaktifkan "kurangi gerak" di sistemnya, animasi
   dilewati total (baris 518)
2. `MutationObserver` hanya memeriksa **elemen yang baru ditambahkan**
   (baris 560), bukan seluruh dokumen — kalau tidak, menggambar 67 kartu
   berarti 67 pemindaian penuh dan halaman jadi lambat

### 5.10 Mode masak (baris 566–1036)

Bagian terpanjang dan paling rumit. Dipecah begini:

| Baris | Isi | Gunanya |
|---|---|---|
| 566 | `masakEl`, `masakState`, `apiYouTube` | Tiga variabel penyimpan keadaan |
| 571 | `muatApiYouTube()` | Muat API pemutar YouTube **sekali saja**, saat benar-benar dibutuhkan |
| 593 | `siapkanMasak()` | Bangun kerangka mode masak **sekali**, lalu dipakai ulang |
| 635 | `lepasPendengarMasak()` | Lepas semua pendengar dari sesi sebelumnya |
| 648 | `bukaModeMasak(resep)` | Fungsi utama: membuka dan menjalankan mode masak |
| 1038 | `daftarBab(resep, langkahTerurai)` | Tentukan bab video |

**Masalah yang pernah terjadi dan solusinya** — ini pelajaran penting:

1. **Bug: buka mode masak → tutup → buka lagi → tombol Lanjut melompat dua
   langkah.** Penyebabnya: setiap kali dibuka, pendengar klik ditambahkan lagi
   ke tombol yang sama. Setelah dua kali buka, satu klik dijalankan dua kali.
   **Solusinya:** `lepasPendengarMasak` (baris 635) melepas semua pendengar
   sesi lama sebelum memasang yang baru. Setiap pendengar disimpan di objek
   `masakState.pendengar`, jadi bisa dilepas satu per satu.

2. **Bug: tombol navigasi terdorong keluar layar saat video dibuka.**
   **Solusinya:** bagian tengah dibungkus `.masak-tengah` yang bisa digulir
   (`aset/style.css:882`), sedangkan tombol navigasi di bawahnya tetap di tempat
   (`flex: none`).

3. **Bug: video tidak bisa diputar saat halaman dibuka dari berkas
   (`file://`).** YouTube menolak embed tanpa alamat `http/https` (Error 153).
   **Solusinya:** kalau `lewatServer()` bernilai salah (baris 712), panel
   video tidak mencoba embed sama sekali, tapi menampilkan tautan "Buka di
   YouTube".

4. **Bug: video melompat ke bagian yang tidak nyambung dengan langkahnya.**
   Penyebabnya: bab manual jumlahnya beda dengan jumlah langkah, tapi dipakai
   apa adanya. **Solusinya:** `daftarBab` (baris 1038) sekarang selalu
   menghasilkan **satu bab per langkah**, dengan waktu diambil dari bab manual
   kalau ada, atau dibagi rata dari durasi video kalau tidak ada.

5. **Bug: tombol Sebelumnya tidak memundurkan video.** Dulu hanya `maju()`
   yang memindahkan video. **Solusinya:** fungsi `pindahVideo()` dipanggil
   oleh **kedua** arah (baris 907 dan 928).

6. **Bug: perintah pindah waktu diabaikan YouTube saat iklan/buffering.**
   **Solusinya:** `lompatKe` (baris 800) mencoba ulang maksimal 8 kali,
   dipicu oleh timer 1,2 detik **dan** oleh perubahan keadaan pemutar
   (`onStateChange`). Ada batas percobaan supaya tidak berputar tanpa henti.

**Fitur di dalamnya:**

| Fitur | Di baris | Cara kerja |
|---|---|---|
| Timer | 693 | Tombol muncul kalau langkah menyebut waktu. Spasi juga bisa menghidupkan. |
| Wake Lock | 678 | `navigator.wakeLock.request("screen")` — layar HP tidak mati saat memasak |
| Bab video | 795 | Daftar tombol waktu di bawah pemutar. Klik → `seekTo(detik)`. |
| Lanjut = ikut lompat video | 907 | Kalau panel video terbuka, pindah langkah memindahkan video juga |
| Geser layar | 917 | Geser kiri = Lanjut, geser kanan = Sebelumnya. Minimal 60px dan harus lebih mendatar daripada menurun, supaya menggulir layar tidak ikut pindah langkah. |
| Papan tuntas | 951 | ← → pindah langkah, Esc menutup, Spasi menghidupkan timer |

### 5.11 Tombol kembali ke atas (baris 1072–1098)

Muncul setelah digulir 600px, tapi **disembunyikan lagi saat kaki halaman
masuk layar** (baris 1088) supaya tidak menutupi teksnya di layar sempit.

### 5.12 Sinkronisasi angka dan sapuan akhir (baris 1100–1147)

| Baris | Isi | Gunanya |
|---|---|---|
| 1100 | `JUMLAH_RESEP` | Dibaca sekali dari `RESEP.length` |
| 1104 | `segarkanAngka()` | Isi semua `<span data-jumlah>` dan `<span data-tahun>` di halaman |
| 1133 | `siapkanHalaman()` | Sapuan akhir bersama: animasi, angka, tombol ke atas, dropdown, saran |

**Kenapa angka tidak ditulis manual di HTML?** Supaya menambah resep cukup di
satu tempat. Kalau nanti resepnya jadi 70, semua tulisan "67 resep" di seluruh
halaman ikut berubah sendiri.

---

## 6. halaman.js — Logika Tiap Halaman

865 baris, 5 fungsi halaman + 1 router. Satu fungsi per halaman.

### 6.1 Router (baris 823–838)

Dijelaskan di bagian 4. Membaca `<body data-halaman="...">` lalu memanggil
fungsi yang cocok.

### 6.2 `halamanIndex` — Beranda (baris 16–69)

| Baris | Yang dilakukan |
|---|---|
| 18 | Pasang pendengar pencarian: ketik lalu Enter pindah ke katalog |
| 25 | Pilih resep untuk tanggal ini (`new Date().getDate() % RESEP.length`), lalu bangun kartu sorotan |
| 44 | Bangun empat kotak kategori waktu makan |
| 57 | Isi empat resep terpopuler (diurutkan dari `dimasak`) |
| 63 | Isi empat resep berbab |
| 67 | Panggil `siapkanHalaman()` |

### 6.3 `halamanKatalog` — Katalog (baris 71–186)

| Baris | Yang dilakukan |
|---|---|
| 72 | Baca parameter alamat: `?kat=` dan `?q=` |
| 82 | Isi kotak cari dengan kata kunci yang sedang aktif |
| 85 | Tandai chip kategori yang aktif |
| 90 | Pencarian berikutnya tetap membawa kategori yang dipilih |
| 100 | `cocokKata`: cocokkan kata kunci ke nama, daerah, deskripsi, rasa, dan nama bahan. **Semua kata harus ada** (bukan salah satu). |
| 108 | Tabel nama kategori untuk judul halaman |
| 117 | `saring()`: terapkan kategori + kata kunci + tiga filter |
| 130 | `gambar()`: gambar ulang daftar, perbarui judul dan jumlah |
| 158 | Tombol "Hapus filter" dan keadaan kosong |
| 175 | Bangun JSON-LD `ItemList` untuk mesin pencari |
| 185 | Panggil `siapkanHalaman()` |

### 6.4 `halamanResep` — Halaman Resep (baris 188–537)

Bagian terpanjang di halaman.js. Urutannya:

| Baris | Yang dilakukan |
|---|---|
| 189 | Baca `id` dari alamat, cari resepnya |
| 193 | Kalau tidak ketemu: tampilkan pesan "Resep itu tidak ada" |
| 205 | Ubah judul halaman + meta deskripsi + OG + canonical sesuai resep |
| 227 | Bangun label kecil (level, kategori, vegetarian, aman anak, pedas) |
| 236 | Bangun seluruh HTML halaman (kepala resep, bahan, langkah, gizi, alat) |
| 306 | Tombol Simpan, Cetak, Salin tautan |
| 329 | `gambarBahan`: gambar daftar bahan + centangnya |
| 358 | `simpanProg`: simpan kemajuan ke localStorage |
| 364 | `gambarPorsi`: ubah jumlah porsi, semua bahan ikut menyesuaikan |
| 371 | Tombol − dan + porsi |
| 381 | Bangun daftar langkah: nomor, badge teknik, tanda matang, timer |
| 445 | `gambarProg`: tulis "3 dari 8 langkah" |
| 450 | `mulaiTimer`: jalankan timer satu langkah |
| 475 | Tombol "Mode masak" |
| 478 | Bangun JSON-LD `Recipe` + `VideoObject` |
| 521 | Hentikan timer kalau halaman ditinggalkan (`pagehide`, bukan `unload`) |
| 528 | Resep pendamping: kategori berbeda supaya bervariasi |
| 535 | Panggil `siapkanHalaman()` |

### 6.5 `halamanMealplan` — Rencana Makan (baris 539–800)

| Baris | Yang dilakukan |
|---|---|
| 540 | `HARI` (7 hari) dan `SLOT` (pagi/siang/malam) |
| 543 | `ambilRencana` / `simpanRencana` |
| 554 | `gambarRencana`: bangun 21 slot (7 hari × 3 waktu) |
| 613 | `gambarPilihan`: daftar resep di dialog pemilih |
| 633 | `bukaPemilih` / `tutupPemilih` |
| 652 | `susunBelanja`: gabungkan bahan dari semua resep terpilih |
| 686 | `ambilTambahan`: bahan yang ditulis sendiri. **Disaring** supaya data rusak tidak membuat halaman gagal dimuat selamanya. |
| 694 | `barisBahan`: satu baris bahan dengan centang |
| 727 | `gambarBelanja`: gambar seluruh daftar belanja |
| 767 | Form tambah bahan manual |
| 784 | Tombol cetak |
| 798 | Panggil `siapkanHalaman()` |

**Cara kerja daftar belanja otomatis** (baris 652):
1. Kumpulkan semua bahan dari semua resep terpilih
2. Bahan dengan **nama dan satuan sama digabung** — kunci penggabungannya
   `"bawang merah|gram"`
3. Jumlahnya dijumlahkan, dan keterangan "untuk Rendang Sapi, Soto Ayam"
   menunjukkan asal bahannya
4. Hasilnya diurutkan A-Z supaya enak dibaca di pasar

Bahan yang ditulis sendiri disimpan **terpisah** (`KEY.gmanual`) dengan alasan
penting: kalau disimpan bersama bahan resep, dia akan terhapus setiap kali
daftar disusun ulang dari rencana makan.

### 6.6 `halamanFavorit` — Favorit (baris 802–821)

| Baris | Yang dilakukan |
|---|---|
| 803 | `gambar()`: ambil daftar favorit, gambar kartunya |
| 810 | Tampilkan/sembunyikan keadaan kosong |
| 817 | `isiKartu` dengan opsi `setelahSimpan: gambar` — melepas simpan langsung menghilangkan kartunya |
| 819 | Panggil `siapkanHalaman()` |

---

## 7. skrip/resep-data.js — Data 67 Resep

2.599 baris. **Hanya data. Tidak ada fungsi, tidak ada logika.** Strukturnya
dijelaskan di bagian 3.

Bagian akhir berkas berisi dua tabel:

| Baris | Isi | Gunanya |
|---|---|---|
| ~2550 | `var DURASI_VIDEO = {...}` | Durasi tiap video (detik), dipakai untuk menghitung bab otomatis |
| ~2580 | `var TANGGAL_VIDEO = {...}` | Tanggal unggah asli tiap video, dipakai untuk `uploadDate` di VideoObject |

---

## 8. Berkas HTML

### 8.1 Kerangka yang sama di semua halaman

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">                    <!-- huruf aman -->
  <meta name="viewport" ...>                 <!-- supaya rapi di HP -->
  <title>...</title>                         <!-- judul di tab browser -->
  <meta name="description" content="...">    <!-- ringkasan untuk Google -->
  <meta http-equiv="Content-Security-Policy" ...>  <!-- aturan keamanan -->
  <link rel="canonical" href="...">          <!-- alamat resmi halaman -->
  <meta property="og:title" ...>             <!-- tampilan saat dibagikan -->
  <meta name="color-scheme" content="light"> <!-- situs ini hanya mode terang -->
  <meta name="robots" content="...">         <!-- aturan untuk mesin pencari -->
  <meta name="theme-color" ...>              <!-- warna bilah browser -->
  <link rel="icon" href="data:image/svg+xml,...">  <!-- favicon bawaan -->
  <link rel="preconnect" href="...">         <!-- siapkan koneksi lebih awal -->
  <link href="https://fonts.googleapis.com/..." rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <link rel="manifest" href="manifest.webmanifest">  <!-- info aplikasi -->
</head>
<body data-halaman="...">   <!-- penanda untuk router di halaman.js -->
  <a class="skip" href="#main">Lewati ke konten</a>  <!-- untuk papan tuntas -->
  <header class="kepala">...</header>   <!-- kepala + pencarian + navigasi -->
  <main class="wrap" id="main">...</main>
  <footer>...</footer>                   <!-- kaki: merek, tautan, hak cipta -->
  <script src="skrip/resep-data.js"></script>
  <script src="store.js"></script>
  <script src="halaman.js"></script>
</body>
</html>
```

### 8.2 Peta tiap halaman

| Berkas | Baris | `data-halaman` | Isi utama |
|---|---|---|---|
| `index.html` | 147 | `index` | Hero, `#hariIni`, `#katGrup`, `#popGrup`, `#babGrup`, panel "Jam berapa, masak apa" |
| `katalog.html` | 143 | `katalog` | Form pencarian, chip kategori `#chipKategori`, tiga filter (`fLevel`, `fWaktu`, `fDiet`), `#grup`, `#kosong` |
| `resep.html` | 92 | `resep` | Cuma kerangka kosong + `#area` (diisi JavaScript) + `#sanding` |
| `mealplan.html` | 127 | `mealplan` | `#mealGrup` (21 slot), `#belanja`, form manual, dialog `#pilih` |
| `favorit.html` | 96 | `favorit` | `#grup` + `#kosong` |
| `tentang.html` | 136 | `tentang` | Tabel konversi, penjelasan video, penjelasan privasi |
| `404.html` | 77 | `404` | Pesan "Alamat ini tidak ada" + tombol ke katalog |

### 8.3 Kaki halaman (baris ~60 di tiap berkas)

Dua kolom: merek + ringkasan di kiri, dua kolom tautan di kanan, lalu baris
hak cipta. Tahun diisi otomatis dari `<span data-tahun>`. Ditulis sekali lalu
disalin ke tujuh halaman — kalau mengubahnya, ubah ketujuhnya.

### 8.4 `robots.txt` — surat izin untuk mesin pencari

Isinya cuma tiga baris:

```
User-agent: *
Allow: /

Sitemap: https://fawwaz1st.github.io/letmecook/sitemap.xml
```

**Apa ini?** Berkas kecil yang diletakkan di alamat paling dasar situs
(`/robots.txt`). Tugasnya seperti papan pengumuman di pintu masuk: memberi
tahu robot mesin pencari (Googlebot, Bingbot, dsb.) apa yang boleh dan tidak
boleh mereka jelajahi.

**Bacanya baris per baris:**

| Baris | Artinya |
|---|---|
| `User-agent: *` | Aturan ini berlaku untuk **semua** robot. Tanda `*` artinya "siapa pun". |
| `Allow: /` | Semua halaman **boleh** dijelajahi. Kalau suatu saat ada halaman yang tidak ingin diindeks, tinggal tambah `Disallow: /halaman-rahasia.html`. |
| `Sitemap: ...` | Alamat sitemap. Baris ini yang memberi tahu robot: "daftar lengkap halamanku ada di sini". |

**Kenapa `Allow: /` bukan `Disallow:`?** Karena seluruh isi situs ini memang
untuk umum. Kalau nanti ada halaman internal (misalnya halaman uji), baru
`Disallow` dipakai untuk halaman itu saja.

**Catatan penting untuk GitHub Pages:** berkas `robots.txt` hanya dibaca
kalau ada di **alamat paling dasar** domain (`https://situskamu.com/robots.txt`).
Situs ini dipasang di subfolder (`fawwaz1st.github.io/letmecook/`), jadi
`robots.txt` kita berada di `fawwaz1st.github.io/letmecook/robots.txt` —
Google tetap membacanya sebagai saran tambahan, tapi tidak dijamin. Karena
itu sitemap **juga didaftarkan langsung** ke Google Search Console (kalau
kamu punya aksesnya), supaya tidak bergantung pada `robots.txt` saja.

**Yang TIDAK dilakukan robots.txt:** dia tidak mengamankan apa pun. Halaman
yang tertulis `Disallow` masih bisa dibuka orang yang tahu alamatnya — dia
hanya "minta baik-baik" ke robot supaya tidak mengunjungi halaman itu. Untuk
benar-benar menutup halaman dari publik, itu urusan server, bukan robots.txt.

### 8.5 `sitemap.xml` — daftar isi untuk mesin pencari

**Apa ini?** Berkas XML berisi **daftar seluruh halaman** situs yang ingin
dikenalkan ke mesin pencari. Kalau `robots.txt` itu papan pengumuman,
`sitemap.xml` itu daftar menu lengkapnya.

Situs ini punya **72 URL** di dalamnya: 5 halaman utama (beranda, katalog,
rencana makan, tentang, favorit) + **67 halaman resep**.

**Bentuk tiap barisnya:**

```xml
<url>
  <loc>https://fawwaz1st.github.io/letmecook/resep.html?id=rendang</loc>
  <lastmod>2026-09-21</lastmod>
  <priority>0.7</priority>
</url>
```

| Tag | Artinya |
|---|---|
| `<loc>` | Alamat halamannya. Ini yang wajib ada. |
| `<lastmod>` | Kapan halaman ini terakhir berubah (format YYYY-MM-DD). Mesin pencari pakai ini untuk tahu kapan perlu mengunjungi ulang. |
| `<priority>` | Seberapa penting halaman ini dibanding halaman lain (0,0 sampai 1,0). Beranda 1.0, katalog 0.9, halaman resep 0.7. Ini cuma **saran**, bukan perintah — Google bisa mengabaikannya. |

**Kenapa halaman resep pakai format `resep.html?id=...`?** Karena situs ini
tidak punya server, jadi tidak ada "halaman" terpisah per resep — semuanya
satu berkas `resep.html` yang isinya diisi JavaScript sesuai `id` di alamat.
Mesin pencari tetap bisa mengindeksnya karena isinya dihasilkan JavaScript
(Google bisa menjalankan JavaScript saat mengindeks).

**Kenapa `lastmod` tidak diisi tanggal hari ini?** Ini jebakan yang mudah
terjadi. Kalau `lastmod` diisi tanggal hari ini setiap kali skrip dijalankan,
mesin pencari melihat situs seolah berubah terus padahal isinya sama. Lama
kelamaan `lastmod` diabaikan karena dianggap tidak akurat. Karena itu
`_qa/buat-sitemap.js` mengambil tanggal dari **waktu berkas terakhir diubah**
(`fs.statSync(...).mtime`) — jadi tanggalnya jujur.

**Cara membuat ulang sitemap:**

```bash
node _qa/buat-sitemap.js
```

Jalankan setiap kali menambah resep baru, supaya resep ke-68 ikut terdaftar.

### 8.6 Ringkasan: apa bedanya `robots.txt` dan `sitemap.xml`?

| | `robots.txt` | `sitemap.xml` |
|---|---|---|
| Bentuk | Teks biasa | XML |
| Isinya | Aturan: mana yang boleh dijelajahi | Daftar: halaman apa saja yang ada |
| Tujuan | Menyaring robot dari halaman yang tidak perlu | Mengenalkan halaman ke robot |
| Perumpamaan | Papan "Dilarang masuk" di pintu | Daftar menu di meja |
| Wajib? | Tidak, tapi membantu | Tidak, tapi sangat membantu |
| Di situs ini | 3 baris, mengizinkan semua + menunjuk sitemap | 72 URL, lengkap dengan tanggal ubah |

---

## 9. style.css — 18 Bagian

1.704 baris, dibagi 18 bagian bernomor. Tekan `Ctrl+F` lalu ketik `12)` untuk
langsung lompat ke bagian dropdown, misalnya.

| No | Baris | Bagian | Isinya |
|---|---|---|---|
| 1 | 10 | Token | Semua variabel `:root` |
| 2 | 58 | Dasar | Reset, `body`, judul, tautan, fokus |
| 3 | 139 | Kepala | Kepala lengket, pencarian, navigasi, chip kategori |
| 4 | 267 | Tombol | `.tb`, `.tb-isi`, `.tb-halus`, `.tb-mini` |
| 5 | 295 | Kartu | Kartu resep (foto, nama, meta, tombol hati) |
| 6 | 400 | Panel | Wadah putih bertepi yang membungkus hampir semua isi |
| 7 | 538 | Beranda | Sorotan resep hari ini, kotak kategori |
| 8 | 603 | Halaman resep | Kepala resep, bahan, langkah, badge, kotak tips |
| 9 | 865 | Mode masak | Layar penuh, panel video, tombol navigasi |
| 10 | 1118 | Rencana makan | Grid 7 hari, slot makan, daftar belanja |
| 11 | 1183 | Isian | Input, label, form bahan manual |
| 12 | 1235 | Dropdown kustom | Tombol + daftar pengganti `<select>` |
| 13 | 1315 | Saran pencarian | Kotak saran di bawah kotak cari |
| 14 | 1349 | Gulir kustom | Bilah gulir yang dirapikan (tipis, warna merek) |
| 15 | 1399 | Gerak | Animasi `.muncul` → `.tampil` |
| 16 | 1413 | Aksesibilitas & cetak | Fokus, `prefers-reduced-motion`, `@media print` |
| 17 | 1445 | Kaki halaman | Kaki dua kolom dengan tautan dan hak cipta |
| 18 | 1569 | Responsif | Titik ubah 760px, 900px, 560px, 380px |

### 9.1 Token — satu tempat untuk semua nilai (baris 10–56)

```css
:root {
  /* Jarak — dipakai untuk semua padding dan margin */
  --s1: 4px;  --s2: 8px;  --s3: 12px; --s4: 16px;
  --s5: 24px; --s6: 32px; --s7: 48px; --s8: 64px;

  /* Warna — hijau pandan sebagai warna merek */
  --merek: oklch(0.42 0.098 155);      /* hijau tua */
  --merek-muda: oklch(0.95 0.03 155);  /* hijau sangat muda */
  --aksen: oklch(0.75 0.15 75);        /* kuning keemasan */
  --tinta: oklch(0.22 0.015 155);      /* hampir hitam, sedikit hijau */
  --kartu: #fff;
  --garis: oklch(0.9 0.008 155);
  --redup: oklch(0.5 0.01 155);        /* teks sekunder */

  /* Bentuk */
  --r: 14px;        /* sudut membulat panel */
  --r-kecil: 9px;
  --pil: 999px;     /* kapsul penuh */

  /* Lapisan */
  --z-lekat: 40;    /* tombol kembali ke atas */
  --z-lapis: 60;    /* kepala halaman */
  --z-atas: 100;    /* mode masak */

  /* Gerak */
  --dur: 0.22s;
  --gerak: cubic-bezier(0.22, 1, 0.36, 1);  /* mulus, tidak kaku */
}
```

**Kenapa `oklch()`, bukan `#hex` atau `rgb()`?** OKLCH adalah cara menulis
warna yang cocok dengan cara mata manusia melihat. Keuntungan praktisnya:
kalau dua warna punya angka "kecerahan" (L) yang sama, keduanya benar-benar
terlihat sama terangnya. Ini membuat kontras teks lebih mudah dijaga.

### 9.2 Jebakan `[hidden]` (baris ~52)

```css
[hidden] { display: none !important; }
```

Atribut `hidden` bawaan browser bisa **kalah** oleh `display: flex` di CSS.
Ini penyebab bug yang menjengkelkan: elemen yang seharusnya tersembunyi tetap
tampil karena aturan `display` lain lebih kuat. Aturan di atas memastikan
`hidden` selalu menang.

### 9.3 Kartu compact (baris 295–330)

Kartu resep sengaja dibuat pendek (±215px) supaya katalog terasa padat:

- Tinggi foto dipatok `aspect-ratio: 3 / 2`, `height: auto` — penting, karena
  atribut `height` di `<img>` kalau tidak di-override bisa mengalahkan
  `aspect-ratio`
- Nama dibatasi maksimal 2 baris (`-webkit-line-clamp: 2`)
- Hanya 3 informasi di kartu: waktu, daerah, rating

### 9.4 `content-visibility` (baris 310–318)

```css
.kartu {
  content-visibility: auto;
  contain-intrinsic-size: auto 215px;
}
```

Katalog berisi 67 kartu. Dengan dua baris di atas, browser hanya menggambar
kartu yang terlihat di layar — **tanpa perlu JavaScript virtualisasi**.

**Penting:** angka `215px` harus sama dengan tinggi kartu sungguhan. Kalau
beda, tata letak bergeser saat kartu mulai digambar (CLS naik). Ini persis
bug yang pernah terjadi: dulu tertulis `320px`, padahal tinggi aslinya
`215px`, dan CLS katalog jadi 0,58.

### 9.5 Tinggi minimum untuk isi yang dibuat JavaScript

```css
.isi-grup:has(> .grup),
.isi-grup:has(> .kosong) { min-height: 60vh; }
#area:empty { min-height: 85vh; }
.meal-grup:empty { min-height: 640px; }
```

Ini perbaikan CLS paling besar. Sebelumnya: halaman dimuat dengan wadah
kosong, lalu JavaScript mengisi 67 kartu → tinggi halaman meloncat → browser
mencatatnya sebagai pergeseran tata letak. Dengan tinggi dipesan lebih dulu,
loncatan itu tidak terjadi.

Hasilnya: katalog 0,58 → 0,03; rencana makan 0,32 → 0,0001; halaman resep
0,57 → 0,0001. Semua di bawah ambang "baik" (0,1).

---

## 10. Fitur Utama dan Cara Kerjanya

### 10.1 Video YouTube

Video disimpan hanya sebagai **ID 11 karakter** (mis. `GNfRXKsvG04`), bukan
URL penuh. Alasannya: lebih pendek, dan format embed bisa berubah tanpa
menyentuh data.

**Pemuatan malas (lazy):** API YouTube (berkas besar) **tidak dimuat saat
halaman dibuka**. Baru dimuat saat pengunjung menekan tombol Video
(`muatApiYouTube`, `skrip/store.js:571`). Jadi pengunjung yang hanya membaca bahan
tidak membayar biaya memuat pemutar video sama sekali.

**Host nocookie** (`skrip/store.js:760`): pemutar dibuat dengan
`host: "https://www.youtube-nocookie.com"` supaya YouTube tidak menyimpan
cookie pelacak sebelum videonya benar-benar diputar.

**Kalau ada yang gagal** — semua jalur gagal ditangani dengan pesan yang
berguna, bukan layar kosong:

| Keadaan | Yang muncul |
|---|---|
| ID video tidak valid | "Resep ini belum punya video." |
| Halaman dibuka dari berkas | "Pemutar YouTube butuh alamat http..." + tautan ke YouTube |
| API gagal dimuat | "Pemutar YouTube gagal dimuat. Periksa koneksi internet." |
| Video tidak bisa diputar | "Video ini tidak bisa diputar di sini." + tautan ke YouTube |

### 10.2 Bab video (satu bab per langkah)

```js
function daftarBab(resep, langkahTerurai) {
  // 1. Kalau resep punya data bab manual, pakai sebagai titik acuan waktu
  const manual = Array.isArray(resep.bab) && resep.bab.length >= 2 ? resep.bab : null;
  // 2. Kalau tidak, bagi rata durasi video
  const bisaDipakai = Math.max(10, durasi - 8);   // sisakan 8 detik untuk penutup
  // 3. SELALU hasilkan satu bab per langkah
  return langkah.map((urai, i) => {
    const posisi = jumlah === 1 ? 0 : i / (jumlah - 1);
    const detik = manual
      ? manual[Math.round(posisi * (manual.length - 1))][0]
      : Math.round(posisi * bisaDipakai);
    // label dari awal kalimat langkah, dipendekkan
  });
}
```

Jadi **semua 67 resep punya bab yang bisa diklik dan selalu cocok dengan
langkahnya** — 8 resep dengan waktu dari bab tulisan tangan (lebih akurat),
59 resep dengan waktu dihitung dari durasi video.

### 10.3 Timer

Ada dua timer, **logikanya satu** (`hitungMundur`, `skrip/store.js:124`):

1. **Timer di halaman resep** — tombol kecil di samping langkah
   (`skrip/halaman.js:450`)
2. **Timer di mode masak** — tombol besar di tengah layar (`skrip/store.js:693`)

Aturan penting: **satu timer saja yang jalan**. Memulai timer baru otomatis
menghentikan yang lama, supaya tidak ada dua hitungan bersamaan.

### 10.4 Favorit

Tombol hati ada di dua tempat: di kartu katalog dan di halaman resep.
Keduanya memanggil `toggleFav(id)` yang sama.

Satu detail kecil yang penting: di halaman favorit, melepas simpan harus
**langsung menghilangkan kartunya**. Ini dilakukan lewat opsi
`setelahSimpan: gambar` (`skrip/halaman.js:817`) — setelah tombol diklik, halaman
menggambar ulang daftarnya.

### 10.5 Pencarian

Dua jenis, sengaja dibedakan:

1. **Saran saat mengetik** (di kepala halaman) — mencari di nama, daerah,
   kategori, dan nama bahan. Maksimal 7 hasil. Klik langsung membuka resep.
2. **Halaman katalog** — pencarian penuh dengan kata kunci yang bisa lebih
   dari satu kata. Contoh: "soto santan" mencari resep yang memuat **kedua**
   kata itu.

Pencarian di katalog juga tetap membawa filter kategori yang sedang aktif —
kalau kamu sedang membuka "Makan malam" lalu mencari, hasilnya tetap dibatasi
ke makan malam. Ini membuat URL bisa dibagikan apa adanya.

### 10.6 Cetak

Tombol Cetak memakai `window.print()` biasa, tapi CSS `@media print`
(`aset/style.css:1413`) dirapikan khusus supaya hasil cetaknya benar-benar berguna
di dapur:

- Kepala halaman, navigasi, tombol, video, dan kaki halaman disembunyikan
- Foto resep diperkecil (hemat tinta)
- Bahan dan langkah disusun dua kolom supaya muat satu halaman
- Warna dihilangkan (hitam-putih), garis tipis tetap ada
- Tombol di rencana makan dan daftar belanja disembunyikan
- Tautan luar ditulis lengkap (`contoh.com` tercetak di sebelah tautannya)
- `break-inside: avoid` mencegah satu langkah terpotong ke halaman berikutnya

---

## 11. Keamanan

### 11.1 Content-Security-Policy (CSP)

Setiap halaman punya meta CSP di `<head>`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://www.youtube.com;
  style-src 'self' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data: https://upload.wikimedia.org https://i.ytimg.com;
  frame-src https://www.youtube.com https://www.youtube-nocookie.com;
  connect-src 'self' https://www.youtube.com https://fonts.googleapis.com https://fonts.gstatic.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self'">
```

Bacanya: **"default-nya hanya boleh dari domain sendiri. Pengecualiannya:
skrip dari YouTube, gaya dari Google Fonts, gambar dari Wikimedia dan YouTube,
bingkai video dari YouTube."**

CSP adalah aturan yang memberi tahu browser: "hanya boleh memuat kode dari
daftar ini". Kalau ada kode asing yang disuntikkan (misalnya lewat celah XSS),
browser menolak menjalankannya.

**Syarat yang membuat CSP ini mungkin** — dan ini pelajaran paling penting
dari proyek ini:

| Yang dulu ada | Yang sekarang | Kenapa |
|---|---|---|
| 7 blok `<script>` di dalam HTML | Semua pindah ke `skrip/halaman.js` | CSP `'self'` memblokir skrip di dalam HTML |
| `onerror="imgFallback(this)"` di tiap `<img>` | Satu pendengar galat di `skrip/store.js:203` | CSP memblokir atribut `on*` |
| `style="margin-top:..."` di HTML | Class `.jarak-atas` di CSS | CSP memblokir atribut `style` |
| Warna badge ditulis `style="background:..."` | Pemilih CSS `[data-teknik="tumis"]` | Sama |

**Catatan penting soal CSP lewat meta:** beberapa direktif **diabaikan** kalau
ditulis di meta (bukan di header server): `frame-ancestors`, `sandbox`,
`report-uri`. GitHub Pages tidak bisa mengatur header, jadi kita menerima
keterbatasan itu — website ini tidak bisa dilindungi dari clickjacking lewat
CSP. Itu batasan host, bukan bug.

**Pelajaran untuk pendengar galat gambar:** kejadian `error` pada gambar
**tidak menggelembung** (tidak naik ke induknya). Karena itu pendengarnya
dipasang di fase **tangkap** (argumen ketiga `true`):

```js
document.addEventListener("error", (e) => {
  if (e.target && e.target.tagName === "IMG") imgFallback(e.target);
}, true);
```

Dan satu jebakan halus: gambar yang **telanjur gagal** sebelum `skrip/store.js`
selesai dimuat tidak memicu kejadian apa pun lagi. Karena itu ada pemeriksaan
manual setelahnya (`skrip/store.js:209`).

### 11.2 Pencegahan suntikan kode (XSS)

Aturan mutlak di proyek ini: **semua** data yang berasal dari data resep dan
masuk ke HTML harus lewat `esc()`:

```js
esc("Rendang <pedas>")  // → "Rendang &lt;pedas&gt;"
```

Cara paling aman adalah `textContent` (bukan `innerHTML`), dan itu dipakai
di tempat-tempat penting — misalnya teks langkah dan tanda matang dibangun
dengan `textContent` + `createTextNode` (`skrip/halaman.js:410`), bukan `innerHTML`.

### 11.3 Data localStorage yang rusak

localStorage bisa diubah tangan atau korup. Kalau tidak diperiksa, satu data
rusak bisa membuat halaman **gagal dimuat selamanya** (dan pengunjung tidak
tahu cara memperbaikinya). Tiga lapis pertahanan:

1. `baca()` (`skrip/store.js:18`) memeriksa bentuk data, dan menolak larik di
   tempat objek (`skrip/store.js:29`)
2. `ambilTambahan()` (`skrip/halaman.js:686`) menyaring entri yang bukan objek
   dengan teks
3. `ambilRencana()` (`skrip/halaman.js:543`) memastikan hasilnya objek

### 11.4 Privasi

- Tidak ada pelacak, tidak ada iklan, tidak ada analitik
- Data pengguna **tidak pernah** meninggalkan browser
- Pemutar video memakai host `youtube-nocookie.com`

---

## 12. Aksesibilitas

Website ini mengikuti **WCAG 2.2 level AA** pada hal-hal yang bisa dikerjakan
tanpa alat uji khusus.

| Yang dikerjakan | Di mana |
|---|---|
| Tautan "Lewati ke konten" | `<a class="skip">` di tiap halaman |
| Setiap halaman punya tepat satu `<h1>` | Diperiksa lewat QA otomatis |
| Semua tombol ikon punya `aria-label` | Tombol hati, tombol hapus, tombol tutup |
| Ikon hiasan diberi `aria-hidden="true"` | Semua `<svg class="ikon">` |
| Kontras teks minimal 4.5:1 | `--aksen-teks` sengaja digelapkan jadi 4.95:1 |
| Fokus keyboard terlihat jelas | `:focus-visible` dengan garis kontras (`aset/style.css:1415`) |
| Angka porsi bisa diubah tanpa mouse | Tombol `+`/`−`, bukan slider |
| Mode masak bisa ditutup dengan Esc | `papanTuntas` (`skrip/store.js:951`) |
| "Kurangi gerak" dihormati | `prefers-reduced-motion` (`skrip/store.js:518`) |
| Dialog pemilih resep punya `role="dialog"` | `mealplan.html:78` |
| Tabel konversi pakai `<th scope="col">` | `tentang.html:52` |
| Ukuran sasaran sentuh ≥ 44px | Semua tombol utama |

**Catatan untuk pengembangan lanjutan:** HTML sekarang punya elemen `<dialog>`
bawaan yang memberi banyak hal gratis (fokus terkunci, latar otomatis tidak
bisa diklik, Esc menutup). Mode masak saat ini memakai `<div role="dialog">`
buatan sendiri. Kalau nanti ingin disederhanakan, pindah ke `<dialog>` adalah
langkah yang bagus — tapi harus diuji di semua browser dulu.

---

## 13. Optimasi Performa

| Teknik | Di mana | Manfaat |
|---|---|---|
| Foto berukuran 500px | `skrip/resep-data.js` | Total ±2MB untuk 67 foto (dari ±10MB di 1280px) |
| `loading="lazy"` | `skrip/store.js:298` | Foto di bawah layar tidak diunduh dulu |
| `fetchpriority="high"` | `index.html:62` | Foto hero diunduh lebih dulu |
| `width` + `height` di semua `<img>` | Semua | Tidak ada lompatan tata letak saat foto muncul (CLS) |
| `content-visibility: auto` | `aset/style.css:310` | 67 kartu tidak digambar sekaligus |
| Tinggi minimum wadah JS | `aset/style.css:461` | CLS turun dari 0,58 ke 0,03 |
| Animasi hanya opacity | `aset/style.css:1399` | Menggeser elemen ikut tercatat sebagai CLS |
| API YouTube dimuat saat diklik | `skrip/store.js:571` | Pengunjung yang tidak menonton tidak membayar biayanya |
| Daftar favorit dibaca sekali | `skrip/store.js:321` | Dari 67 pembacaan localStorage jadi 1 |
| Teks pencarian digabung sekali | `skrip/store.js:441` | Tidak menggabung ulang nama 67 bahan tiap ketikan |
| Ketikan ditunda 120ms | `skrip/store.js:487` | Mengetik cepat tidak membuat layar berkedip |
| `MutationObserver` hanya node baru | `skrip/store.js:560` | Tidak memindai seluruh dokumen tiap perubahan |
| `pagehide`, bukan `unload` | `skrip/halaman.js:521` | bfcache tetap bekerja — tombol "kembali" jadi instan |

**Hasil pengukuran CLS (ambang "baik" = 0,1):**

| Halaman | Sebelum | Sesudah |
|---|---|---|
| Katalog | 0,58 | 0,03 |
| Rencana makan | 0,32 | 0,0001 |
| Halaman resep | 0,57 | 0,0001 |
| Beranda | — | 0,001 |
| Favorit | — | 0,007 |
| Tentang | — | 0,005 |
| 404 | — | 0,026 |

**Target Core Web Vitals 2026:** LCP ≤ 2.5 detik, INP ≤ 200ms, CLS ≤ 0.1.

---

## 14. Pertanyaan yang Sering Muncul

**T: Kenapa website ini dibuat?**

J: Karena dua masalah yang sering ditemui saat mengikuti resep internet.

Pertama, takarannya kabur. "Garam secukupnya", "santan secukupnya" tidak
membantu orang yang belum pernah masak — berapa itu secukupnya? Di sini
semua bahan punya angka: gram, mililiter, sendok, butir.

Kedua, langkahnya tidak memberi tanda. "Masak sampai matang" — matang yang
seperti apa? Di sini tiap langkah menyebut tanda yang bisa dilihat: kuah
menyusut, minyak keluar, warna kuning tua. Jadi kamu tidak perlu menebak.

**T: Untuk apa website ini? Apa saja yang bisa dilakukan?**

J: Tiga hal utama:

1. **Masak dengan angka pasti.** Bahan bertakar gram, dan porsi bisa
   disesuaikan — jumlah semua bahan ikut berubah sendiri.
2. **Tahu kapan sesuatu sudah matang.** Tiap langkah menyebut tanda yang
   bisa diperiksa mata, bukan cuma lama waktunya. Ada juga timer otomatis
   untuk langkah yang menyebut menit.
3. **Merencanakan makan seminggu.** Isi 21 slot (7 hari × 3 waktu makan),
   lalu daftar belanja tersusun sendiri dari bahan resep yang kamu pilih.

**T: Siapa yang cocok memakai website ini?**

J: Orang yang baru mulai masak, perantau yang ingin masak masakan rumah, dan
siapa pun yang lebih suka mengikuti angka daripada menebak. Isinya 67
masakan Indonesia dari berbagai daerah — rendang, soto, gudeg, sampai juhu
singkah umbut rotan dari Kalimantan.

**T: Apa bedanya dengan situs resep lain?**

J: Empat hal:

- **Takaran gram, bukan "secukupnya"** — di semua 67 resep.
- **Tanda matang di tiap langkah** — bukan cuma di akhir.
- **Video menyatu dengan langkah** — tekan Lanjut, videonya ikut pindah ke
  bagian yang cocok. Tidak perlu mencari menitnya sendiri.
- **Tanpa akun, tanpa iklan, tanpa pelacak** — favorit, rencana makan, dan
  centangmu tersimpan di browser sendiri dan tidak dikirim ke mana pun.

**T: Apakah website ini gratis? Perlu akun?**

J: Gratis, dan tidak perlu akun. Tidak ada iklan, tidak ada langganan,
tidak ada pendaftaran. Buka langsung pakai.

**T: Kenapa tidak ada kolom komentar, akun, atau fitur sosial?**

J: Karena website ini sengaja tidak punya server. Kolom komentar dan akun
butuh server untuk menyimpan data, plus orang untuk memoderasi — keduanya
menambah biaya dan menghilangkan alasan utama situs ini dibuat: privasi
pengunjung. Semua datamu disimpan di browser sendiri, dan itu tidak mungkin
kalau ada fitur sosial.

**T: Kenapa ada tiga berkas JavaScript? Kenapa tidak satu saja?**

J: Karena tanggung jawabnya berbeda. `skrip/resep-data.js` hanya data — kalau mau
menambah resep, kamu tidak perlu menyentuh logika sama sekali. `skrip/store.js`
berisi alat yang dipakai semua halaman. `skrip/halaman.js` berisi apa yang dilakukan
tiap halaman. Kalau digabung jadi satu, berkasnya jadi 4.600 baris yang sulit
dicari.

**T: Kenapa tidak pakai React/Vue saja?**

J: Website ini isinya statis — data tidak berubah tanpa interaksi pengunjung.
Framework akan menambah ratusan kilobyte JavaScript, alat build, dan konsep
yang harus dipelajari, tanpa manfaat nyata untuk kebutuhan ini. Vanilla JS
di sini juga sengaja supaya **pemula bisa membaca kodenya langsung**.

**T: Kenapa video tidak bisa diputar saat file HTML diklik dua kali?**

J: YouTube menolak embed dari halaman `file://` karena tidak ada alamat
`http/https` (Error 153). Ini batasan keamanan YouTube, bukan bug website.
Solusinya: jalankan server lokal (`python -m http.server 8899`) atau buka
versi GitHub Pages. Website sudah menangani keadaan ini dengan menampilkan
tautan ke YouTube, bukan layar kosong.

**T: Kenapa `var RESEP`, bukan `const RESEP`?**

J: Karena skrip dimuat sebagai skrip biasa (bukan modul ES). Pada skrip biasa,
`const` di tingkat atas **tidak** menjadi properti `window`, sehingga berkas
lain tidak bisa membacanya. `var` bisa. Ini jebakan yang mudah bikin bingung.

**T: Data pengguna disimpan di mana? Apakah aman?**

J: Di `localStorage` browser pengunjung sendiri, dengan awalan kunci
`letmecook:`. Tidak ada yang dikirim ke server mana pun — karena website ini
memang tidak punya server. Aman untuk privasi; konsekuensinya data hilang
kalau pengunjung menghapus riwayat browser.

**T: Bagaimana cara video tahu posisi menit tiap langkah?**

J: `daftarBab` (`skrip/store.js:1038`) selalu menghasilkan satu bab per langkah.
Kalau resep punya data `bab` tulisan tangan, waktu diambil dari situ (paling
akurat). Kalau tidak, durasi video dibagi rata sesuai jumlah langkah,
disisakan 8 detik di akhir untuk penutup.

**T: Kenapa rating dan jumlah "dimasak" terlihat seperti angka asli?**

J: Itu angka contoh di data, **bukan** ulasan pengguna sungguhan. Karena itu
`aggregateRating` **sengaja tidak dimasukkan** ke JSON-LD — mengirim rating
palsu ke Google bisa berakibat sanksi. Kalau nanti ada sistem ulasan asli,
baru boleh ditambahkan.

**T: Kenapa CSS-nya satu berkas besar 1.600 baris?**

J: Karena tanpa build tool, berkas terpisah berarti banyak permintaan HTTP
tambahan. Satu berkas + 18 bagian bernomor adalah kompromi terbaik untuk
proyek sebesar ini: tetap mudah dicari (`Ctrl+F` lalu ketik `12)`), tetap
hanya satu unduhan.

**T: Kenapa warna pakai `oklch()`, bukan `#hex`?**

J: OKLCH cocok dengan cara mata melihat warna. Kalau dua warna punya angka
kecerahan (L) sama, keduanya benar-benar terlihat sama terang. Ini membuat
kontras teks lebih mudah dijaga — persis yang dibutuhkan untuk WCAG.

**T: Kalau mau menambah resep ke-68, apa saja yang harus diubah?**

J: Hanya `skrip/resep-data.js`:
1. Tambah satu objek di larik `RESEP` (ikuti bentuk resep yang sudah ada)
2. Tambah satu baris di `DURASI_VIDEO` dengan durasi video barunya
3. Tambah satu baris di `TANGGAL_VIDEO` dengan tanggal unggahnya
4. Jalankan `node _qa/buat-sitemap.js` supaya sitemap ikut memuat resep baru

Semua angka di seluruh halaman ("67 resep") otomatis menyesuaikan karena
diambil dari `RESEP.length`. Tidak ada HTML atau CSS yang perlu disentuh.

**T: Bagaimana kalau foto Wikimedia gagal dimuat?**

J: Ada dua tahap cadangan (`imgFallback`, `skrip/store.js:186`): pertama diganti
gambar SVG hijau bawaan, kalau masih gagal jadi blok warna (`img-solid`).
Jadi tidak akan pernah ada ikon gambar rusak di halaman.

---

## 15. Cara Menambah atau Mengubah Sesuatu

### Menambah resep baru

1. Siapkan **ID video YouTube** (11 karakter). Semua resep wajib punya video.
2. Siapkan **URL foto Wikimedia** dengan pola `/500px-` (ukuran resmi yang
   diizinkan Wikimedia: 120, 250, 500, 1280, 1920, 3840).
3. Salin satu objek resep yang sudah ada di `skrip/resep-data.js` sebagai cetakan,
   lalu ganti isinya.
4. Tambahkan durasi videonya (detik) ke `DURASI_VIDEO`.
5. Tambahkan tanggal unggahnya (YYYY-MM-DD) ke `TANGGAL_VIDEO`.
6. Jalankan `node _qa/audit-video.js` — semua ID video harus berstatus OK.
7. Jalankan `node _qa/buat-sitemap.js` — sitemap ikut diperbarui.

### Mengubah warna seluruh situs

Cukup ubah `:root` di bagian 1 `aset/style.css` (baris 10). Contoh, mau hijau
lebih tua:

```css
--merek: oklch(0.35 0.09 155);
```

Semua tombol, ikon, garis, dan tautan ikut berubah.

### Mengubah jarak (spacing) seluruh situs

Semua jarak memakai token `--s1` sampai `--s8` (`aset/style.css:12`). Mengubah
satu token mengubah seluruh situs secara konsisten.

### Menambah ikon baru

1. Buka `aset/icons.svg`, tambahkan `<symbol id="i-nama-baru" viewBox="0 0 24 24">`
2. Pakai di HTML: `<svg class="ikon"><use href="aset/icons.svg#i-nama-baru"/></svg>`

32 ikon yang sudah ada: `i-clock`, `i-timer`, `i-users`, `i-gauge`, `i-flame`,
`i-flame-kindling`, `i-cooking-pot`, `i-chef-hat`, `i-soup`, `i-utensils`,
`i-list-checks`, `i-check`, `i-printer`, `i-share`, `i-heart`, `i-search`,
`i-plus`, `i-minus`, `i-arrow-left`, `i-arrow-right`, `i-star`, `i-pin`,
`i-calendar`, `i-basket`, `i-book`, `i-bulb`, `i-alert`, `i-leaf`, `i-play`,
`i-x`, `i-chevron-down`, `i-panah-atas`.

### Menambah halaman baru

1. Salin kerangka halaman yang sudah ada (mis. `tentang.html`)
2. Ganti `<body data-halaman="namabaru">`
3. Tambah fungsi `halamanNamaBaru()` di `skrip/halaman.js`
4. Daftarkan di router (`skrip/halaman.js:823`): `namabaru: halamanNamaBaru`
5. Jangan lupa: meta CSP, canonical, OG, dan `<script src="halaman.js">`
6. Tambahkan juga kaki halaman (salin dari halaman lain)
7. Tambahkan ke `_qa/buat-sitemap.js` lalu jalankan

### Menjalankan website di komputer sendiri

```bash
# Di folder proyek:
python -m http.server 8899 --bind 127.0.0.1
# Lalu buka http://127.0.0.1:8899
```

Kenapa perlu server? Supaya video YouTube bisa diputar (butuh alamat
`http://`). Membuka file HTML langsung juga bisa, tapi video akan dialihkan
ke tautan YouTube.

### Menjalankan pemeriksaan QA

```bash
node _qa/periksa.js           # satu perintah: mojibake, kode mati, ikon, data
node _qa/audit-video.js       # periksa 67 video YouTube masih bisa diputar
node _qa/buat-sitemap.js      # buat ulang sitemap.xml
node _qa/buat-ikon.js         # buat ulang ikon aplikasi (jarang dipakai)
node _qa/pasang-meta.js       # pasang meta 2026 ke halaman baru (sekali pakai)
```

`periksa.js` menjalankan empat pemeriksaan sekaligus:

| Pemeriksaan | Yang dicari |
|---|---|
| Karakter rusak | Mojibake seperti `â€` atau `Â` di seluruh berkas situs |
| Kode mati | Fungsi dan konstanta yang tidak dipakai lagi |
| Ikon mati | Ikon SVG yang tidak dipanggil halaman mana pun |
| Data resep | Pola foto, ID video, durasi, dan tanggal yang belum lengkap |

Karena tidak butuh jaringan, pemeriksaan ini aman dijalankan sebelum setiap
commit. Kalau ada temuan, kode keluarnya bukan nol — jadi bisa dipasang di
alur otomatis (CI) kalau nanti diperlukan.

---

## 16. Istilah Teknis

| Istilah | Arti sederhana |
|---|---|
| **DOM** | Peta halaman yang dibuat browser dari HTML. JavaScript mengubah tampilan dengan mengubah DOM. |
| **innerHTML** | Cara mengisi elemen dengan teks HTML. Cepat, tapi harus hati-hati (wajib lewat `esc()`). |
| **textContent** | Cara mengisi elemen dengan teks biasa. Selalu aman, tidak bisa disalahgunakan untuk menyuntikkan kode. |
| **localStorage** | Lemari kecil di browser untuk menyimpan data. Bertahan walau tab ditutup, hilang kalau riwayat dihapus. |
| **JSON-LD** | Data terstruktur yang dibaca mesin pencari (bukan manusia). Memberi tahu Google: "ini resep, bahannya ini, videonya itu". |
| **CSP** | Content-Security-Policy. Aturan yang membatasi dari mana kode boleh dimuat. Pertahanan terhadap suntikan kode. |
| **XSS** | Serangan menyuntikkan kode jahat ke halaman. Dicegah dengan `esc()` dan CSP. |
| **Fase tangkap** | Cara memasang pendengar yang menangkap kejadian **sebelum** sampai ke sasaran. Dipakai untuk galat gambar karena kejadiannya tidak menggelembung. |
| **IntersectionObserver** | Pengamat yang memberi tahu saat elemen masuk/keluar layar. Dipakai untuk animasi gulir. |
| **MutationObserver** | Pengamat yang memberi tahu saat DOM berubah. Dipakai untuk memberi animasi ke elemen baru. |
| **lazy loading** | Menunda memuat sesuatu sampai benar-benar dibutuhkan (mis. foto di bawah layar). |
| **facade** | Pola "ganti dulu dengan tombol, baru muat yang berat saat diklik". Dipakai untuk YouTube. |
| **wake lock** | Permintaan ke browser supaya layar tidak mati. Dipakai saat memasak. |
| **bfcache** | Cache halaman di memori browser, membuat tombol "kembali" instan. Rusak kalau memakai `unload`; karena itu dipakai `pagehide`. |
| **Core Web Vitals** | Tiga angka Google untuk mengukur pengalaman halaman: LCP (kecepatan muat), INP (responsivitas), CLS (kestabilan tata letak). |
| **CLS** | Cumulative Layout Shift. Seberapa banyak tata letak bergeser saat halaman dimuat. Ambang "baik" = di bawah 0,1. |
| **LCP** | Largest Contentful Paint. Kapan elemen terbesar selesai tampil. Ambang "baik" = di bawah 2,5 detik. |
| **WCAG** | Pedoman aksesibilitas internasional. Versi terbaru yang berlaku: 2.2. |
| **OKLCH** | Cara menulis warna yang cocok dengan cara mata melihat. |
| **CRLF** | Penanda akhir baris Windows (`\r\n`). Berbeda dengan LF (`\n`) di Linux/Mac. |
| **mojibake** | Karakter rusak karena salah baca encoding, mis. `â€"` seharusnya `—`. |
| **manifest** | Berkas yang memberi tahu browser nama, ikon, dan warna aplikasi (untuk "pasang ke layar utama"). |
| **canonical** | Tag yang memberi tahu mesin pencari alamat resmi satu halaman. |
| **Open Graph** | Tag yang menentukan tampilan tautan saat dibagikan (judul, gambar, deskripsi). |
| **oEmbed** | Layanan YouTube untuk memeriksa apakah sebuah video masih ada dan bisa diputar. |

---

## Penutup

Prinsip yang dipegang di seluruh proyek ini:

1. **Satu tempat untuk satu hal.** Angka resep ada di satu larik. Jarak ada di
   token. Warna ada di `:root`. Timer ada di satu fungsi. Bab video dihitung
   di satu fungsi.

2. **Jelaskan "kenapa", bukan hanya "apa".** Hampir setiap fungsi punya
   komentar yang menjelaskan alasan keputusannya, bukan hanya kegiatannya.
   Contoh: komentar di `aset/style.css:310` menjelaskan kenapa angka `215px` harus
   sama dengan tinggi kartu.

3. **Tangani kegagalan dengan ramah.** Video gagal? Muncul tautan YouTube.
   Foto gagal? Muncul gambar cadangan. localStorage rusak? Pakai nilai
   cadangan. Tidak ada layar kosong tanpa penjelasan.

4. **Ukur, jangan menebak.** Setiap perbaikan performa di dokumen ini punya
   angka sebelum dan sesudahnya. CLS katalog turun dari 0,58 ke 0,03 — itu
   hasil pengukuran, bukan perkiraan.

5. **Pemula dulu.** Tanpa build tool, tanpa framework, komentar berbahasa
   Indonesia yang jelas — supaya siapa pun bisa membuka, membaca, mengerti,
   dan mengubah.
