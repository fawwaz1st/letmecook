# PENJELASAN.MD — Panduan Lengkap Kode LetMeCook

Dokumen ini menjelaskan **seluruh** cara kerja website LetMeCook, ditulis untuk
orang yang baru belajar coding. Setelah membaca ini, kamu bisa mempresentasikan
website ini dari atas sampai bawah: apa fungsinya, bagaimana alurnya, kenapa
ditulis begitu, dan di mana harus mengubah kalau mau menambah sesuatu.

---

## Daftar Isi

1. [Gambaran Besar](#1-gambaran-besar)
2. [Peta Berkas](#2-peta-berkas)
3. [Alur Data Resep](#3-alur-data-resep)
4. [Alur Satu Halaman Dimuat](#4-alur-satu-halaman-dimuat)
5. [Penjelasan Tiap Berkas](#5-penjelasan-tiap-berkas)
6. [Fitur Utama dan Cara Kerjanya](#6-fitur-utama-dan-cara-kerjanya)
7. [Sistem Desain (style.css)](#7-sistem-desain-stylecss)
8. [Keamanan (CSP dan Lainnya)](#8-keamanan-csp-dan-lainnya)
9. [Aksesibilitas](#9-aksesibilitas)
10. [Optimasi Performa](#10-optimasi-performa)
11. [Pertanyaan yang Sering Muncul](#11-pertanyaan-yang-sering-muncul)
12. [Cara Menambah atau Mengubah Sesuatu](#12-cara-menambah-atau-mengubah-sesuatu)
13. [Istilah Teknis](#13-istilah-teknis)

---

## 1. Gambaran Besar

**LetMeCook** adalah website resep masakan Indonesia. Isinya 67 resep dari
berbagai daerah, masing-masing dengan:

- Bahan bertakar **gram dan mililiter** (bukan "secukupnya")
- Langkah yang menyebut **tanda matang** yang bisa dilihat mata
- **Video YouTube** yang bisa diputar sambil memasak
- **Timer** otomatis yang muncul kalau langkah menyebut waktu
- **Mode masak**: layar penuh, satu langkah besar sekaligus

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
├── index.html            Beranda: sorotan hari ini, kategori, populer
├── katalog.html          Daftar semua resep + pencarian + filter
├── resep.html            Halaman satu resep (diisi oleh JavaScript)
├── mealplan.html         Rencana makan 7 hari + daftar belanja
├── favorit.html          Resep yang disimpan pengunjung
├── tentang.html          Cara membaca takaran + penjelasan privasi
├── 404.html              Halaman kalau alamat tidak ditemukan
│
├── resep-data.js         ⭐ DATA: 67 resep + durasi video. Tidak ada logika.
├── store.js              ⭐ MESIN: semua fungsi bersama (baca data, kartu,
│                            dropdown, mode masak, timer, animasi)
├── halaman.js            ⭐ LOGIKA HALAMAN: satu fungsi per halaman,
│                            dipilih lewat <body data-halaman="...">
│
├── style.css             Seluruh tampilan (18 bagian bernomor)
├── icons.svg             Kumpulan 32 ikon SVG (satu berkas, dipanggil per id)
├── ikon-192.png          Ikon aplikasi 192px (untuk manifest PWA)
├── ikon-512.png          Ikon aplikasi 512px
├── manifest.webmanifest  Info aplikasi (nama, ikon, warna)
├── sitemap.xml           Daftar halaman untuk mesin pencari
├── robots.txt            Aturan untuk mesin pencari
│
├── _qa/                  Skrip pemeriksaan (tidak dipakai website)
└── README.md             Panduan singkat untuk pengembang
```

### Kenapa dipisah begitu?

Tiga berkas JavaScript punya **tanggung jawab yang jelas berbeda**:

| Berkas | Isinya | Perumpamaan |
|---|---|---|
| `resep-data.js` | Hanya data mentah | Buku resep |
| `store.js` | Fungsi yang dipakai semua halaman | Peralatan dapur |
| `halaman.js` | Apa yang dilakukan tiap halaman | Koki yang memakai peralatan |

Aturan emasnya: **kalau mau menambah resep, kamu hanya menyentuh
`resep-data.js`.** Tidak perlu mengubah HTML, CSS, atau JavaScript lainnya.

### Kenapa ada `_qa/`?

Isinya skrip Node.js untuk memeriksa kualitas — misalnya `audit-video.js`
memeriksa apakah ke-67 video YouTube masih bisa diputar. Skrip ini **tidak
dipakai oleh website**; hanya alat bantu saat mengembangkan. Kamu bisa
menjalankannya dengan `node _qa/nama-berkas.js`.

---

## 3. Alur Data Resep

Semua resep berbentuk satu larik (array) besar di `resep-data.js`:

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
    bab: [[0, "Persiapan"], ...],   // opsional: penanda waktu di video
    deskripsi: "...",
    rasa: "...", pedas: 3, veg: false, anak: false,
    kalori: "±420 kkal", protein: "32 g",
    pantangan: "...", sanding: ["nasi putih", "..."],
    minum: "...", suasana: "...",
    bahan: [                        // daftar bahan
      { nama: "bawang merah", jumlah: 80, satuan: "gram", bagi: 1 },
      // bagi: 0 = dihitung per butir (telur, daun), dibulatkan saat porsi diubah
    ],
    alat: ["wajan", "..."],
    langkah: [                      // daftar langkah (teks biasa)
      "Blender cabai dan bawang merah hingga halus merah pekat.",
      // Kalau menyebut waktu ("30 menit"), timer muncul otomatis.
      // Kalau ada "Tanda matang: ...", kotak tanda matang muncul.
    ],
    tips: "...",      // kotak kuning "Sering gagal di sini"
    selamat: "...",   // kotak hijau "Kalau sudah terjadi"
    simpan: "...",    // kotak biru "Menyimpan sisa"
  },
  // ... 66 resep lainnya
];

// Durasi tiap video (detik), diambil dari YouTube.
// Dipakai untuk menghitung bab otomatis pada resep tanpa data bab.
var DURASI_VIDEO = { rendang: 402, "soto-ayam": 511, ... };
```

**Kenapa `var`, bukan `const`?** Karena berkas ini dimuat sebagai skrip biasa
(bukan modul), dan `const` di skrip biasa tidak otomatis menjadi properti
`window` — akibatnya berkas lain tidak bisa membacanya. `var` bisa.

### Bagaimana data mengalir sampai ke layar?

```
resep-data.js          store.js                 halaman.js            Layar
─────────────         ─────────                ───────────           ─────
RESEP[]  ──────────►  cariResep(id)  ────────► halamanResep()  ────► innerHTML
                      kartuResepHTML()  ─────► halamanKatalog()
                      parseLangkah()    ─────► (badge teknik)
                      daftarBab()       ─────► (bab video)
```

Contoh nyata saat membuka `resep.html?id=rendang`:

1. `halaman.js` membaca `id` dari alamat → `"rendang"`
2. `cariResep("rendang")` di `store.js` mencari di larik `RESEP`
3. Ketemu objek resep → seluruh HTML halaman dibangun dari objek itu
4. `parseLangkah()` memecah tiap langkah jadi: teknik masak, besar api,
   tanda matang, dan teks sisa
5. `daftarBab()` menentukan bab video: pakai data `bab` kalau ada, kalau
   tidak dihitung dari durasi video dibagi jumlah langkah
6. Hasilnya dipasang ke `#area` dengan `innerHTML`

---

## 4. Alur Satu Halaman Dimuat

Setiap halaman HTML memuat tiga skrip di bagian bawah `<body>`:

```html
<script src="resep-data.js"></script>  <!-- 1. data -->
<script src="store.js"></script>       <!-- 2. alat -->
<script src="halaman.js"></script>     <!-- 3. logika halaman -->
```

`halaman.js` diakhiri router kecil yang membaca penanda di `<body>`:

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
1. Browser membaca HTML  → kerangka kosong tampil sebentar
2. resep-data.js dimuat  → larik RESEP tersedia
3. store.js dimuat       → semua fungsi tersedia, pendengar galat gambar
                            dipasang, gambar rusak yang telanjur terjadi
                            diperiksa manual
4. halaman.js dimuat     → router memanggil fungsi halaman yang cocok
5. Fungsi halaman:
   a. mengisi konten (kartu, langkah, bahan, dst.)
   b. memanggil siapkanHalaman() — "sapuan akhir" bersama:
      - menandai elemen untuk animasi gulir (.muncul)
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

## 5. Penjelasan Tiap Berkas

### 5.1 `resep-data.js` (2.500 baris)

Hanya data. Tidak ada fungsi, tidak ada logika. Dijelaskan di bagian 3.

### 5.2 `store.js` (1.075 baris) — mesin bersama

Inilah "peralatan dapur". Dibagi jadi beberapa bagian dengan komentar pembatas
`// ====...====`. Fungsi-fungsi pentingnya:

**Penyimpanan (localStorage)**

| Fungsi | Gunanya |
|---|---|
| `baca(kunci, cadangan)` | Baca dari localStorage; kalau isinya rusak, kembalikan nilai cadangan. Ini penting: data localStorage bisa saja diubah tangan atau setengah tertulis. |
| `tulis(kunci, nilai)` | Simpan. Mengembalikan `false` kalau penuh (localStorage hanya ~5MB). |
| `ambilFav()` / `toggleFav(id)` | Daftar favorit. `ambilFav` juga menyaring id yang resepnya sudah tidak ada. |
| `segarkanBadge()` | Isi angka di samping tulisan "Favorit" pada kepala halaman. |

Kunci penyimpanan semuanya berawalan `letmecook:` supaya tidak bentrok dengan
situs lain yang dibuka di browser yang sama:

```js
const KEY = {
  fav: "letmecook:fav",        // daftar id favorit
  meal: "letmecook:meal",      // rencana 7 hari
  gcheck: "letmecook:gcheck",  // centang belanja
  gmanual: "letmecook:gmanual",// bahan tambahan yang ditulis sendiri
  prog: "letmecook:prog",      // centang bahan + langkah per resep
};
```

**Format angka dan waktu**

| Fungsi | Contoh |
|---|---|
| `fmtQty(1.5)` | `"1 1/2"` — pecahan ditulis seperti di buku resep |
| `teksBahan(b, 2)` | `"160 gram bawang merah"` untuk porsi 2x; per butir diberi tanda `±` |
| `fmtWaktu(70)` | `"1 jam 10 mnt"` |
| `fmtDetik(91)` | `"01:31"` — atau `"2:59:58"` kalau lebih dari sejam |
| `esc(teks)` | Mengubah `<` jadi `&lt;` dsb. **Semua** data yang masuk HTML harus lewat sini supaya aman dari suntikan kode. |

**Membaca langkah (`parseLangkah`)**

Ini salah satu bagian paling menarik. Satu kalimat langkah seperti:

> "Tumis bumbu dengan api sedang selama 8 menit hingga harum. Tanda matang:
> minyak keluar dan bau wangi."

Dipecah otomatis menjadi:

```js
{
  teknik: "tumis",     // dari daftar kata kerja di RE_TEKNIK
  api: "sedang",       // dari pola "api ..." di RE_API
  matang: "minyak keluar dan bau wangi",  // setelah "Tanda matang:"
  sisa: "Tumis bumbu dengan api sedang selama 8 menit hingga harum."
}
```

Hasilnya dipakai untuk:
- **badge berwarna** di atas langkah (`badgeTeknikHTML`) — warna per teknik
  diatur di CSS lewat `[data-teknik="tumis"]`, bukan ditulis JS
- **meter api** (3 batang kecil, menyala sesuai besar api)
- **kotak "Matang kalau:"**

**Kartu resep (`kartuResepHTML` + `isiKartu`)**

`isiKartu(wadah, daftar, opsi)` mengisi satu wadah dengan banyak kartu.
Dua optimasi penting di dalamnya:

1. Daftar favorit dibaca **sekali** (`new Set(ambilFav())`) lalu dipakai untuk
   semua kartu. Tanpa ini, 67 kartu berarti 67 kali baca localStorage.
2. Opsi `setelahSimpan` memanggil fungsi setelah tombol hati diklik — dipakai
   halaman favorit untuk langsung menghapus kartu yang dilepas.

**Dropdown kustom (`pasangDropdown`)**

`<select>` bawaan browser diganti tombol + daftar buatan sendiri, tapi
**nilainya tetap disimpan di `<select>` asli**. Kenapa? Supaya logika filter
yang sudah ada (`fLevel.value`) tidak perlu diubah sama sekali — hanya
tampilannya yang diganti. Mendukung papan tuntas: panah atas/bawah dan Esc.

**Saran pencarian (`pasangSaranPencarian`)**

Saat mengetik di kotak cari, muncul daftar maksimal 7 resep yang cocok,
lengkap dengan foto kecil. Dua optimasi:

1. Teks pencarian semua resep digabung **sekali** saat halaman dimuat,
   bukan tiap ketikan
2. Ketikan ditunda 120ms sebelum digambar (`setTimeout`), supaya mengetik
   cepat tidak membuat layar berkedip

**Animasi gulir (`pasangAnimasi`)**

Elemen ber-class `.muncul` naik sedikit dan memudar saat masuk layar, memakai
`IntersectionObserver`. Dua hal penting:

1. Kalau pengunjung mengaktifkan "kurangi gerak" di sistemnya, animasi
   dilewati total (`prefers-reduced-motion`)
2. `MutationObserver` hanya memeriksa **elemen yang baru ditambahkan**, bukan
   seluruh dokumen — kalau tidak, menggambar 67 kartu berarti 67 pemindaian
   penuh dan halaman jadi lambat

**Mode masak (`bukaModeMasak`)** — fitur paling kompleks, dijelaskan di bagian 6.

**Bab video (`daftarBab`)**

```js
function daftarBab(resep, langkahTerurai) {
  // 1. Kalau resep punya data bab sendiri (8 resep), pakai itu
  if (Array.isArray(resep.bab) && resep.bab.length >= 2) return resep.bab;

  // 2. Kalau tidak, hitung dari durasi video dibagi jumlah langkah
  const durasi = DURASI_VIDEO[resep.id];
  // ...bagi rata, sisakan 8 detik di akhir untuk penutup,
  // label diambil dari awal kalimat langkahnya
}
```

Jadi **semua 67 resep punya bab yang bisa diklik** — 8 resep dengan bab
tulisan tangan (lebih akurat), 59 resep dengan bab otomatis.

**Sapuan akhir (`siapkanHalaman`)** — dijelaskan di bagian 4.

### 5.3 `halaman.js` (831 baris) — logika per halaman

Satu fungsi per halaman. Contoh yang paling penting:

**`halamanResep()`** — membangun seluruh halaman resep dari satu objek:

```
area.innerHTML = kepala resep (foto, judul, tag, info cepat, tombol)
              + dua kolom: bahan (kiri) + langkah (kanan)
              + panel rasa & gizi
              + panel alat
```

Lalu memasang interaksi:
- tombol hati → `toggleFav`
- tombol cetak → `window.print()`
- tombol salin → `navigator.share` kalau ada, kalau tidak `clipboard`
- stepper porsi → mengubah semua jumlah bahan sekaligus
- centang bahan & langkah → disimpan ke `localStorage` per resep
- timer per langkah → muncul kalau langkah menyebut waktu
- **JSON-LD** → data terstruktur untuk Google (dijelaskan di bagian 8)

**`halamanMealplan()`** — 21 slot makan (7 hari × 3 waktu):

- Klik "Isi" → dialog pemilih resep (dengan pencarian)
- Pilih resep → tersimpan, daftar belanja langsung disusun ulang
- **Daftar belanja** menggabungkan bahan yang sama dari beberapa resep:
  kalau dua resep sama-sama butuh "bawang merah", jumlahnya dijumlahkan
- Bahan manual (mis. "kecap manis 250 ml") disimpan terpisah di
  `KEY.gmanual` supaya tidak hilang saat halaman digambar ulang

### 5.4 `style.css` (1.619 baris) — 18 bagian bernomor

Diatur bernomor supaya mudah dicari: tekan `Ctrl+F` lalu ketik `12)` untuk
langsung lompat ke bagian dropdown, misalnya. Isi lengkapnya di bagian 7.

### 5.5 `icons.svg` — 32 ikon dalam satu berkas

Semua ikon digambar sebagai `<symbol>` di dalam satu berkas SVG, masing-masing
punya `id`. Cara memakainya:

```html
<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-heart"/></svg>
```

Keuntungannya: satu berkas berisi 32 ikon (hanya diunduh sekali), ukurannya
kecil, dan warnanya ikut warna teks (`currentColor`). `aria-hidden="true"`
artinya ikon dilewati pembaca layar — teks di sebelahnya yang dibaca.

---

## 6. Fitur Utama dan Cara Kerjanya

### 6.1 Mode Masak

Layar penuh berisi **satu langkah besar**. Ini fitur paling rumit, jadi layak
dijelaskan panjang.

**Kerangkanya dibangun sekali** (`siapkanMasak`), lalu dipakai ulang tiap
kali dibuka. Isinya:

```
┌─────────────────────────────────────┐
│ ▓▓▓▓▓░░░░░░░  (bilah kemajuan)      │
│ Langkah 3 dari 8      [Video] [Tutup]│
├─────────────────────────────────────┤
│  (panel video — muncul kalau diklik) │
│                                     │
│  Teks langkah besar                 │
│  [badge teknik] [api sedang]        │
│  Matang kalau: ...                  │
│  [Mulai timer 8 menit]              │
├─────────────────────────────────────┤
│ [Sebelumnya]        [Lanjut →]      │
│ Panah kiri/kanan pindah langkah...  │
└─────────────────────────────────────┘
```

**Masalah yang pernah terjadi dan solusinya** — ini pelajaran penting:

1. **Bug: buka mode masak → tutup → buka lagi → tombol Lanjut melompat dua
   langkah.** Penyebabnya: setiap kali dibuka, pendengar klik ditambahkan lagi
   ke tombol yang sama. Setelah dua kali buka, satu klik dijalankan dua kali.
   **Solusinya:** `lepasPendengarMasak()` melepas semua pendengar sesi lama
   sebelum memasang yang baru. Setiap pendengar disimpan di objek
   `masakState.pendengar`, jadi bisa dilepas satu per satu.

2. **Bug: tombol navigasi terdorong keluar layar saat video dibuka.**
   **Solusinya:** bagian tengah dibungkus `.masak-tengah` yang bisa digulir,
   sedangkan tombol navigasi di bawahnya tetap di tempat (`flex: none`).

3. **Bug: video tidak bisa diputar saat halaman dibuka dari berkas
   (`file://`).** YouTube menolak embed tanpa alamat `http/https` (Error 153).
   **Solusinya:** kalau `lewatServer()` bernilai salah, panel video tidak
   mencoba embed sama sekali, tapi menampilkan tautan "Buka di YouTube".

**Fitur di dalamnya:**

| Fitur | Cara kerja |
|---|---|
| Timer | Tombol muncul kalau langkah menyebut waktu. Spasi juga bisa menghidupkan. |
| Wake Lock | `navigator.wakeLock.request("screen")` — layar HP tidak mati saat memasak. Otomatis diminta lagi kalau pengunjung pindah tab lalu kembali. |
| Bab video | Daftar tombol waktu di bawah pemutar. Klik → `seekTo(detik)`. |
| Lanjut = ikut lompat video | Kalau panel video terbuka, menekan Lanjut memindahkan video ke bagian langkah berikutnya. |
| Geser layar | Geser kiri = Lanjut, geser kanan = Sebelumnya. Minimal 60px dan harus lebih mendatar daripada menurun, supaya menggulir layar tidak ikut pindah langkah. |
| Papan tuntas | ← → pindah langkah, Esc menutup, Spasi menghidupkan timer. |

### 6.2 Video YouTube

Video disimpan hanya sebagai **ID 11 karakter** (mis. `GNfRXKsvG04`), bukan
URL penuh. Alasannya: lebih pendek, dan format embed bisa berubah tanpa
menyentuh data.

**Pemuatan malas (lazy):** API YouTube (berkas besar) **tidak dimuat saat
halaman dibuka**. Baru dimuat saat pengunjung menekan tombol Video
(`muatApiYouTube`). Jadi pengunjung yang hanya membaca bahan tidak membayar
biaya memuat pemutar video sama sekali.

**Host nocookie:** pemutar dibuat dengan `host: "https://www.youtube-nocookie.com"`
supaya YouTube tidak menyimpan cookie pelacak sebelum videonya benar-benar
diputar.

**Kalau ada yang gagal** — semua jalur gagal ditangani dengan pesan yang
berguna, bukan layar kosong:

| Keadaan | Yang muncul |
|---|---|
| ID video tidak valid | "Resep ini belum punya video." |
| Halaman dibuka dari berkas | "Pemutar YouTube butuh alamat http..." + tautan ke YouTube |
| API gagal dimuat | "Pemutar YouTube gagal dimuat. Periksa koneksi internet." |
| Video tidak bisa diputar | "Video ini tidak bisa diputar di sini." + tautan ke YouTube |

### 6.3 Timer

Ada dua timer, **logikanya satu** (`hitungMundur` di `store.js`):

1. **Timer di halaman resep** — tombol kecil di samping langkah
2. **Timer di mode masak** — tombol besar di tengah layar

Dulu keduanya punya kode sendiri-sendiri (duplikat). Sekarang keduanya
memanggil `hitungMundur(detik, saatTik, saatHabis)`. Kalau nanti ada
perbaikan pada cara hitung mundur, cukup diubah di satu tempat.

Aturan penting: **satu timer saja yang jalan**. Memulai timer baru otomatis
menghentikan yang lama, supaya tidak ada dua hitungan bersamaan.

### 6.4 Daftar Belanja Otomatis

Saat resep dipilih di rencana makan:

1. `susunBelanja()` mengumpulkan semua bahan dari semua resep terpilih
2. Bahan dengan **nama dan satuan sama digabung** — kunci penggabungannya
   `"bawang merah|gram"`
3. Jumlahnya dijumlahkan, dan keterangan "untuk Rendang Sapi, Soto Ayam"
   menunjukkan asal bahannya
4. Hasilnya diurutkan A-Z supaya enak dibaca di pasar

Bahan yang ditulis sendiri disimpan **terpisah** (`KEY.gmanual`) dengan alasan
penting: kalau disimpan bersama bahan resep, dia akan terhapus setiap kali
daftar disusun ulang dari rencana makan.

### 6.5 Favorit

Tombol hati ada di dua tempat: di kartu katalog dan di halaman resep.
Keduanya memanggil `toggleFav(id)` yang sama.

Satu detail kecil yang penting: di halaman favorit, melepas simpan harus
**langsung menghilangkan kartunya**. Ini dilakukan lewat opsi
`setelahSimpan: gambar` — setelah tombol diklik, halaman menggambar ulang
daftarnya.

### 6.6 Pencarian

Dua jenis, sengaja dibedakan:

1. **Saran saat mengetik** (di kepala halaman) — mencari di nama, daerah,
   kategori, dan nama bahan. Maksimal 7 hasil. Klik langsung membuka resep.
2. **Halaman katalog** — pencarian penuh dengan kata kunci yang bisa lebih
   dari satu kata. Contoh: "soto santan" mencari resep yang memuat **kedua**
   kata itu.

Pencarian di katalog juga tetap membawa filter kategori yang sedang aktif —
kalau kamu sedang membuka "Makan malam" lalu mencari, hasilnya tetap dibatasi
ke makan malam. Ini membuat URL bisa dibagikan apa adanya.

### 6.7 Cetak

Tombol Cetak memakai `window.print()` biasa, tapi CSS `@media print` dirapikan
khusus supaya hasil cetaknya benar-benar berguna di dapur:

- Kepala halaman, navigasi, tombol, video, dan kaki halaman disembunyikan
- Foto resep diperkecil (hemat tinta)
- Bahan dan langkah disusun dua kolom supaya muat satu halaman
- Warna dihilangkan (hitam-putih), garis tipis tetap ada
- Tombol di rencana makan dan daftar belanja disembunyikan — di kertas tidak
  ada gunanya
- Tautan luar ditulis lengkap (`contoh.com` tercetak di sebelah tautannya)
- `break-inside: avoid` mencegah satu langkah terpotong ke halaman berikutnya

---

## 7. Sistem Desain (style.css)

### 7.1 Token — satu tempat untuk semua nilai

Di bagian paling atas ada `:root` berisi semua "angka ajaib" yang dipakai
berulang. Kalau mau mengubah warna seluruh situs, cukup ubah di sini:

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

### 7.2 18 bagian style.css

| No | Bagian | Isinya |
|---|---|---|
| 1 | Token | Semua variabel `:root` |
| 2 | Dasar | Reset, `body`, judul, tautan, fokus |
| 3 | Kepala | Kepala lengket, pencarian, navigasi, chip kategori |
| 4 | Tombol | `.tb` (tombol), `.tb-isi`, `.tb-halus`, `.tb-mini` |
| 5 | Kartu | Kartu resep (foto, nama, meta, tombol hati) |
| 6 | Panel | Wadah putih bertepi yang membungkus hampir semua isi |
| 7 | Beranda | Sorotan resep hari ini, kotak kategori |
| 8 | Halaman resep | Kepala resep, bahan, langkah, badge, kotak tips |
| 9 | Mode masak | Layar penuh, panel video, tombol navigasi |
| 10 | Rencana makan | Grid 7 hari, slot makan, daftar belanja |
| 11 | Isian | Input, label, form bahan manual |
| 12 | Dropdown kustom | Tombol + daftar pengganti `<select>` |
| 13 | Saran pencarian | Kotak saran di bawah kotak cari |
| 14 | Gulir kustom | Bilah gulir yang dirapikan (tipis, warna merek) |
| 15 | Gerak | Animasi `.muncul` → `.tampil` |
| 16 | Aksesibilitas & cetak | Fokus, `prefers-reduced-motion`, aturan `@media print` |
| 17 | Kaki halaman | Kaki dua kolom dengan tautan dan hak cipta |
| 18 | Responsif | Titik ubah 760px, 900px, 560px, 380px |

### 7.3 Kenapa `[hidden]` dipaksa `display: none`?

```css
[hidden] { display: none !important; }
```

Atribut `hidden` bawaan browser bisa **kalah** oleh `display: flex` di CSS.
Ini penyebab bug yang menjengkelkan: elemen yang seharusnya tersembunyi tetap
tampil karena aturan `display` lain lebih kuat. Aturan di atas memastikan
`hidden` selalu menang.

### 7.4 Kartu compact

Kartu resep sengaja dibuat pendek (±212px) supaya katalog terasa padat:

- Tinggi foto dipatok `aspect-ratio: 3 / 2`, `height: auto` — penting, karena
  atribut `height` di `<img>` kalau tidak di-override bisa mengalahkan
  `aspect-ratio`
- Nama dibatasi maksimal 2 baris (`-webkit-line-clamp: 2`)
- Hanya 3 informasi di kartu: waktu, daerah, rating

### 7.5 `content-visibility` — kartu di luar layar tidak digambar

```css
.kartu {
  content-visibility: auto;
  contain-intrinsic-size: auto 320px;
}
```

Katalog berisi 67 kartu. Dengan dua baris di atas, browser hanya menggambar
kartu yang terlihat di layar — **tanpa perlu JavaScript virtualisasi**. Baris
kedua (`contain-intrinsic-size`) memberi tahu browser tinggi cadangan supaya
bilah gulir tidak meloncat-loncat saat kartu baru masuk layar.

---

## 8. Keamanan (CSP dan Lainnya)

### 8.1 Content-Security-Policy (CSP)

Setiap halaman punya meta CSP di `<head>`. CSP adalah aturan yang memberi tahu
browser: "hanya boleh memuat kode dari daftar ini". Kalau ada kode asing yang
disuntikkan (misalnya lewat celah XSS), browser menolak menjalankannya.

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

**Syarat yang membuat CSP ini mungkin** — dan ini pelajaran paling penting
dari proyek ini:

| Yang dulu ada | Yang sekarang | Kenapa |
|---|---|---|
| 7 blok `<script>` di dalam HTML | Semua pindah ke `halaman.js` | CSP `'self'` memblokir skrip di dalam HTML |
| `onerror="imgFallback(this)"` di tiap `<img>` | Satu pendengar galat di `store.js` | CSP memblokir atribut `on*` |
| `style="margin-top:..."` di HTML | Class `.jarak-atas` di CSS | CSP memblokir atribut `style` |
| Warna badge ditulis `style="background:..."` | Pemilih CSS `[data-teknik="tumis"]` | Sama |

**Catatan penting soal CSP lewat meta:** beberapa direktif **diabaikan**
kalau ditulis di meta (bukan di header server): `frame-ancestors`, `sandbox`,
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

Dan satu jebakan halus: gambar yang **telanjur gagal** sebelum `store.js`
selesai dimuat tidak memicu kejadian apa pun lagi. Karena itu ada pemeriksaan
manual setelahnya:

```js
document.querySelectorAll("img").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) imgFallback(img);
});
```

### 8.2 Pencegahan suntikan kode (XSS)

Aturan mutlak di proyek ini: **semua** data yang berasal dari data resep dan
masuk ke HTML harus lewat `esc()`:

```js
esc("Rendang <pedas>")  // → "Rendang &lt;pedas&gt;"
```

Cara paling aman adalah `textContent` (bukan `innerHTML`), dan itu dipakai
di tempat-tempat penting — misalnya teks langkah dan tanda matang dibangun
dengan `textContent` + `createTextNode`, bukan `innerHTML`.

### 8.3 Izin iframe YouTube

Pemutar hanya diberi izin yang benar-benar dibutuhkan. `playsinline: 1`
membuat video tidak otomatis layar penuh di HP, `rel: 0` membatasi video
rekomendasi hanya dari kanal yang sama.

### 8.4 Privasi

- Tidak ada pelacak, tidak ada iklan, tidak ada analitik
- Data pengguna **tidak pernah** meninggalkan browser
- Pemutar video memakai host `youtube-nocookie.com`

---

## 9. Aksesibilitas

Website ini mengikuti **WCAG 2.2 level AA** pada hal-hal yang bisa dikerjakan
tanpa alat uji khusus.

| Yang dikerjakan | Di mana |
|---|---|
| Tautan "Lewati ke konten" | `<a class="skip">` di tiap halaman |
| Setiap halaman punya tepat satu `<h1>` | Diperiksa lewat QA otomatis |
| Semua tombol ikon punya `aria-label` | Tombol hati, tombol hapus, tombol tutup |
| Ikon hiasan diberi `aria-hidden="true"` | Semua `<svg class="ikon">` |
| Kontras teks minimal 4.5:1 | `--aksen-teks` sengaja digelapkan jadi 4.95:1 |
| Fokus keyboard terlihat jelas | `:focus-visible` dengan garis kontras |
| Angka porsi bisa diubah tanpa mouse | Tombol `+`/`−`, bukan slider |
| Mode masak bisa ditutup dengan Esc | `papanTuntas` |
| "Kurangi gerak" dihormati | `prefers-reduced-motion` |
| Dialog pemilih resep punya `role="dialog"` | `mealplan.html` |
| Tabel konversi pakai `<th scope="col">` | `tentang.html` |
| Ukuran sasaran sentuh ≥ 44px | Semua tombol utama |

**Catatan untuk pengembangan lanjutan:** HTML sekarang punya elemen
`<dialog>` bawaan yang memberi banyak hal gratis (fokus terkunci, latar
otomatis tidak bisa diklik, Esc menutup). Mode masak saat ini memakai
`<div role="dialog">` buatan sendiri. Kalau nanti ingin disederhanakan,
pindah ke `<dialog>` adalah langkah yang bagus — tapi harus diuji di semua
browser dulu, terutama Safari versi lama.

---

## 10. Optimasi Performa

| Teknik | Di mana | Manfaat |
|---|---|---|
| Foto berukuran 500px | `resep-data.js` | Total ±2MB untuk 67 foto (dari ±10MB di 1280px) |
| `loading="lazy"` | Semua foto kartu | Foto di bawah layar tidak diunduh dulu |
| `fetchpriority="high"` | Foto hero beranda | Foto terbesar diunduh lebih dulu |
| `width` + `height` di semua `<img>` | Semua | Tidak ada lompatan tata letak saat foto muncul (CLS) |
| `content-visibility: auto` | Kartu katalog | 67 kartu tidak digambar sekaligus |
| API YouTube dimuat saat diklik | `muatApiYouTube` | Pengunjung yang tidak menonton tidak membayar biayanya |
| Daftar favorit dibaca sekali | `isiKartu` | Dari 67 pembacaan localStorage jadi 1 |
| Teks pencarian digabung sekali | `pasangSaranPencarian` | Tidak menggabung ulang nama 67 bahan tiap ketikan |
| Ketikan ditunda 120ms | `pasangSaranPencarian` | Mengetik cepat tidak membuat layar berkedip |
| `MutationObserver` hanya node baru | `pasangAnimasi` | Tidak memindai seluruh dokumen tiap perubahan |
| `pagehide`, bukan `unload` | `halamanResep` | bfcache tetap bekerja — tombol "kembali" jadi instan |

**Target Core Web Vitals 2026:** LCP ≤ 2.5 detik, INP ≤ 200ms, CLS ≤ 0.1.

---

## 11. Pertanyaan yang Sering Muncul

**T: Kenapa ada tiga berkas JavaScript? Kenapa tidak satu saja?**

J: Karena tanggung jawabnya berbeda. `resep-data.js` hanya data — kalau mau
menambah resep, kamu tidak perlu menyentuh logika sama sekali. `store.js`
berisi alat yang dipakai semua halaman. `halaman.js` berisi apa yang dilakukan
tiap halaman. Kalau digabung jadi satu, berkasnya jadi 4.400 baris yang sulit
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

J: Dua cara. Delapan resep punya data `bab` tulisan tangan (paling akurat).
Sisanya dihitung otomatis oleh `daftarBab()`: durasi video dibagi rata sesuai
jumlah langkah, disisakan 8 detik di akhir untuk penutup, dan labelnya diambil
dari awal kalimat langkah itu.

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

J: Hanya `resep-data.js`:
1. Tambah satu objek di larik `RESEP` (ikuti bentuk resep yang sudah ada)
2. Tambah satu baris di `DURASI_VIDEO` dengan durasi video barunya

Semua angka di seluruh halaman ("67 resep") otomatis menyesuaikan karena
diambil dari `RESEP.length`. Tidak ada HTML atau CSS yang perlu disentuh.

**T: Bagaimana kalau foto Wikimedia gagal dimuat?**

J: Ada dua tahap cadangan (`imgFallback`): pertama diganti gambar SVG hijau
bawaan, kalau masih gagal jadi blok warna (`img-solid`). Jadi tidak akan
pernah ada ikon gambar rusak di halaman.

---

## 12. Cara Menambah atau Mengubah Sesuatu

### Menambah resep baru

1. Siapkan **ID video YouTube** (11 karakter). Semua resep wajib punya video.
2. Siapkan **URL foto Wikimedia** dengan pola `/500px-` (ukuran resmi yang
   diizinkan Wikimedia: 120, 250, 500, 1280, 1920, 3840).
3. Salin satu objek resep yang sudah ada di `resep-data.js` sebagai cetakan,
   lalu ganti isinya.
4. Tambahkan durasi videonya (detik) ke `DURASI_VIDEO`.
5. Jalankan pemeriksaan: `node _qa/audit-video.js` — semua ID video harus
   berstatus OK.

### Mengubah warna seluruh situs

Cukup ubah `:root` di bagian 1 `style.css`. Contoh, mau hijau lebih tua:

```css
--merek: oklch(0.35 0.09 155);
```

Semua tombol, ikon, garis, dan tautan ikut berubah.

### Mengubah jarak (spacing) seluruh situs

Semua jarak memakai token `--s1` sampai `--s8`. Mengubah satu token
mengubah seluruh situs secara konsisten.

### Menambah ikon baru

1. Buka `icons.svg`, tambahkan `<symbol id="i-nama-baru" viewBox="0 0 24 24">`
2. Pakai di HTML: `<svg class="ikon"><use href="icons.svg#i-nama-baru"/></svg>`

### Menambah halaman baru

1. Salin kerangka halaman yang sudah ada (mis. `tentang.html`)
2. Ganti `<body data-halaman="namabaru">`
3. Tambah fungsi `halamanNamaBaru()` di `halaman.js`
4. Daftarkan di router: `namabaru: halamanNamaBaru`
5. Jangan lupa: meta CSP, canonical, OG, dan `<script src="halaman.js">`

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
node _qa/audit-mojibake.js   # cari karakter rusak (Â, â€, dsb.)
node _qa/audit-video.js      # periksa 67 video masih bisa diputar
node _qa/audit-foto.js       # periksa pola URL foto
```

---

## 13. Istilah Teknis

| Istilah | Arti sederhana |
|---|---|
| **DOM** | Peta halaman yang dibuat browser dari HTML. JavaScript mengubah tampilan dengan mengubah DOM. |
| **innerHTML** | Cara mengisi elemen dengan teks HTML. Cepat, tapi harus hati-hati (wajib lewat `esc()`). |
| **localStorage** | Lemari kecil di browser untuk menyimpan data. Bertahan walau tab ditutup, hilang kalau riwayat dihapus. |
| **JSON-LD** | Data terstruktur yang dibaca mesin pencari (bukan manusia). Memberi tahu Google: "ini resep, bahannya ini, videonya itu". |
| **CSP** | Aturan yang membatasi dari mana kode boleh dimuat. Pertahanan terhadap suntikan kode. |
| **XSS** | Serangan menyuntikkan kode jahat ke halaman. Dicegah dengan `esc()` dan CSP. |
| **CSP fase tangkap** | Cara memasang pendengar yang menangkap kejadian **sebelum** sampai ke sasaran. Dipakai untuk galat gambar karena kejadiannya tidak menggelembung. |
| **IntersectionObserver** | Pengamat yang memberi tahu saat elemen masuk/keluar layar. Dipakai untuk animasi gulir. |
| **MutationObserver** | Pengamat yang memberi tahu saat DOM berubah. Dipakai untuk memberi animasi ke elemen baru. |
| **lazy loading** | Menunda memuat sesuatu sampai benar-benar dibutuhkan (mis. foto di bawah layar). |
| **facade** | Pola "ganti dulu dengan tombol, baru muat yang berat saat diklik". Dipakai untuk YouTube. |
| **wake lock** | Permintaan ke browser supaya layar tidak mati. Dipakai saat memasak. |
| **bfcache** | Cache halaman di memori browser, membuat tombol "kembali" instan. Rusak kalau memakai `unload`; karena itu dipakai `pagehide`. |
| **Core Web Vitals** | Tiga angka Google untuk mengukur pengalaman halaman: LCP (kecepatan muat), INP (responsivitas), CLS (kestabilan tata letak). |
| **CLS** | Seberapa banyak tata letak bergeser saat halaman dimuat. Dicegah dengan `width`/`height` di gambar. |
| **WCAG** | Pedoman aksesibilitas internasional. Versi terbaru yang berlaku: 2.2. |
| **OKLCH** | Cara menulis warna yang cocok dengan cara mata melihat. |
| **CRLF** | Penanda akhir baris Windows (`\r\n`). Berbeda dengan LF (`\n`) di Linux/Mac. |
| **mojibake** | Karakter rusak karena salah baca encoding, mis. `â€"` seharusnya `—`. |
| **manifest** | Berkas yang memberi tahu browser nama, ikon, dan warna aplikasi (untuk "pasang ke layar utama"). |
| **canonical** | Tag yang memberi tahu mesin pencari alamat resmi satu halaman. |
| **Open Graph** | Tag yang menentukan tampilan tautan saat dibagikan (judul, gambar, deskripsi). |

---

## Penutup

Prinsip yang dipegang di seluruh proyek ini:

1. **Satu tempat untuk satu hal.** Angka resep ada di satu larik. Jarak ada di
   token. Warna ada di `:root`. Timer ada di satu fungsi.
2. **Jelaskan "kenapa", bukan hanya "apa".** Hampir setiap fungsi punya
   komentar yang menjelaskan alasan keputusannya, bukan hanya kegiatannya.
3. **Tangani kegagalan dengan ramah.** Video gagal? Muncul tautan YouTube.
   Foto gagal? Muncul gambar cadangan. localStorage rusak? Pakai nilai
   cadangan. Tidak ada layar kosong tanpa penjelasan.
4. **Pemula dulu.** Tanpa build tool, tanpa framework, komentar berbahasa
   Indonesia yang jelas — supaya siapa pun bisa membuka, membaca, mengerti,
   dan mengubah.
