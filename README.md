# LetMeCook

Situs resep masakan Indonesia. Statis, tanpa server, tanpa build tools.

**[▶ Buka Preview Lengkap](https://fawwaz1st.github.io/letmecook/)** · 67 resep · 67 video · takaran gram

---

## Isinya apa

67 resep dari seluruh Indonesia. Setiap resep punya bahan bertakar gram,
langkah yang menyebut tanda matang, dan video YouTube di dalam mode masak.

| Bagian | Jumlah | Keterangan |
|---|---|---|
| Resep | 67 | Dari 22 provinsi, 4 kategori waktu makan |
| Video YouTube | 67 | Diputar di dalam mode masak |
| Bab video | 67 | Semua resep, 8 pakai data asli, sisanya dihitung otomatis |
| Foto | 67 | Wikimedia Commons, berlisensi bebas |

## Yang bisa dipakai

**Mencari.** Ketik di kotak cari, saran muncul langsung dengan foto dan
daerahnya. Panah atas/bawah untuk memilih, Enter untuk membuka. Kalau
diteruskan, pencarian membuka halaman katalog dengan hasil lengkap.

**Menyaring.** Level, waktu maksimal, dan pantangan (vegetarian, aman anak,
tidak pedas, video berbab). Jumlah hasil selalu terlihat, dan tombol hapus
filter muncul saat ada yang perlu dihapus.

**Menyesuaikan porsi.** Tombol porsi mengubah semua jumlah bahan sekaligus.
Bahan yang dihitung per butir dibulatkan dan diberi tanda ± karena tidak bisa
dibelah dua.

**Mode masak.** Ini bagian utamanya. Layar penuh, satu langkah sekali tampil,
teksnya besar supaya kebaca dari jauh. Isinya:

- Tanda kemajuan dan hitungan langkah
- Badge teknik masak dan meter besar api
- Kotak "Matang kalau" berisi tanda yang bisa kamu periksa sendiri
- Timer yang muncul otomatis di langkah yang menyebut menit
- Pemutar video dengan daftar bab
- Layar dibiarkan menyala selama memasak, kalau browser mendukung
- Geser kiri/kanan di layar sentuh untuk pindah langkah
- Papan tuntas: panah kiri/kanan pindah langkah, spasi menyalakan timer,
  Esc menutup

**Video mengikuti langkah.** Tekan "Lanjut", dan videonya ikut melompat ke
bagian yang cocok dengan langkah itu. Untuk resep yang videonya sudah punya
penanda bagian asli, babnya dipakai apa adanya. Untuk sisanya, bab dihitung
dari durasi video dibagi rata sesuai jumlah langkah, lalu diberi nama dari
teks langkahnya sendiri. Jadi seluruh 67 resep punya bab yang bisa diklik.

**Rencana makan 7 hari.** 21 slot (7 hari × 3 waktu makan). Daftar belanja
tersusun sendiri dari resep yang kamu isi, digabung kalau bahan dan satuannya
sama. Bisa juga menambah bahan sendiri, dan itu tersimpan.

**Cetak.** Tombol cetak menghasilkan lembaran dapur yang rapi: kepala, tombol,
dan video disembunyikan; bahan dan langkah disusun dua kolom supaya muat satu
halaman; warna diubah jadi hitam putih supaya hemat tinta.

## Cara memasang

**1. Lewat server lokal.** Ini cara paling gampang kalau mau videonya jalan:

```bash
npx serve .
# atau
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

**2. GitHub Pages.** Situsnya sudah terbit di
<https://fawwaz1st.github.io/letmecook/>. Untuk repo sendiri:
**Settings → Pages → Source: Deploy from a branch → Branch: `main` / `root`**.

**3. Buka langsung dari berkas.** Klik dua kali `index.html` juga jalan,
tapi dua hal ini tidak bisa dipakai:

- Pemutar YouTube butuh alamat `http` atau `https`. Kalau dibuka dari
  berkas, tombol video akan mengarahkan ke YouTube di tab baru.
- Sebagian browser membatasi `localStorage` pada alamat `file://`, jadi
  favorit dan rencana makan bisa gagal tersimpan.

## Susunan berkas

```
index.html      Beranda: hero, resep hari ini, kategori, populer, video berbab
katalog.html    Katalog 67 resep + pencarian dan filter
resep.html      Detail resep: bahan, langkah, dan tombol mode masak
mealplan.html   Rencana 7 hari + daftar belanja otomatis
favorit.html    Resep yang disimpan
tentang.html    Cara membaca takaran + ke mana data pergi
404.html        Halaman tidak ditemukan
resep-data.js   DATA saja: larik RESEP + tabel durasi video
store.js        ALAT BERSAMA: penyimpanan, kartu, dropdown, mode masak, timer
halaman.js      LOGIKA HALAMAN: satu fungsi per halaman, dipilih lewat
                <body data-halaman="...">
style.css       Seluruh tampilan (18 bagian bernomor). Token di bagian 1
icons.svg       Sprite 32 ikon garis 24px
manifest.webmanifest  Info aplikasi (nama, ikon, warna)
ikon-192.png    Ikon aplikasi 192px
ikon-512.png    Ikon aplikasi 512px
sitemap.xml     Daftar halaman untuk mesin pencari
robots.txt      Aturan untuk mesin pencari
PENJELASAN.MD   Panduan lengkap kode, ditulis untuk pemula
_qa/            Skrip pemeriksaan (tidak dipakai website)
```

Data, alat, dan logika halaman dipisah supaya tiap berkas punya satu tugas.
`resep-data.js` 2.525 baris isinya data; `store.js` 1.075 baris isinya alat
bersama; `halaman.js` 831 baris isinya apa yang dilakukan tiap halaman.
Ketiganya dimuat berurutan sebagai skrip biasa:

```html
<script src="resep-data.js"></script>
<script src="store.js"></script>
<script src="halaman.js"></script>
```

Skrip biasa dipakai, bukan `type="module"`, supaya situs tetap bisa dibuka
langsung dari berkas tanpa server. Router kecil di ujung `halaman.js`
memanggil fungsi yang cocok dengan `<body data-halaman="...">`.

## Keamanan

Setiap halaman memasang **Content-Security-Policy** lewat meta tag: kode
hanya boleh dimuat dari domain sendiri, ditambah YouTube, Google Fonts, dan
Wikimedia. Karena CSP ketat memblokir skrip dan gaya yang ditulis langsung di
HTML, seluruh skrip halaman berada di `halaman.js` dan seluruh gaya berada di
`style.css`. Galat gambar ditangani satu pendengar di fase tangkap, bukan
atribut `onerror` di tiap `<img>`.

Catatan: GitHub Pages tidak bisa mengatur header HTTP, jadi beberapa direktif
CSP (`frame-ancestors`, `sandbox`) tidak tersedia. Itu batasan host.

## Pemeriksaan (QA)

```bash
node _qa/audit-mojibake.js   # cari karakter rusak (huruf aksen nyasar)
node _qa/audit-video.js      # periksa 67 video YouTube masih bisa diputar
node _qa/audit-foto.js       # periksa pola URL foto
node _qa/audit-srcset.js     # periksa varian ukuran foto Wikimedia
```

## Menambah resep

Cukup tambah satu objek ke larik `RESEP` di **`resep-data.js`**. Halaman lain
otomatis ikut karena semuanya membaca dari larik yang sama. Angka "67 resep"
di seluruh halaman juga ikut menyesuaikan sendiri.

```js
{
  id: "nama-pendek",          // dipakai di alamat: resep.html?id=nama-pendek
  nama: "Nama Resep",
  daerah: "Asal Daerah",
  kategori: "sarapan",        // sarapan | siang | malam | camilan
  waktuTotal: 60,             // menit
  waktuAktif: 20,             // menit
  level: "mudah",             // mudah | sedang | sulit
  porsi: 4,
  rating: 4.8,
  dimasak: 1200,
  foto: "https://upload.wikimedia.org/.../500px-Nama.jpg",
  video: "XXXXXXXXXXX",       // 11 karakter ID YouTube
  bab: [[0, "Pembuka"], [90, "Mulai memasak"]],  // opsional
  deskripsi: "...", rasa: "...", pedas: 0,
  veg: false, anak: true,
  kalori: "400-500 kkal", protein: "15-20g", pantangan: "...",
  sanding: ["..."], minum: "...", suasana: "...",
  bahan: [{ nama: "beras", jumlah: 200, satuan: "gram", bagi: 1 }],
  alat: ["Panci", "Wajan"],
  langkah: ["Didihkan air..."],
  tips: "...", selamat: "...", simpan: "...",
}
```

Aturan kecil yang perlu diikuti:

- `bagi: 1` untuk bahan yang bisa dibagi (gram, ml). `bagi: 0` untuk yang
  dihitung per butir (telur, siung bawang).
- `bab` boleh dilewati. Kalau kosong, bab dihitung otomatis. Kalau diisi,
  harus mulai dari detik `0` dan angkanya naik terus.
- Tambahkan durasi videonya ke `DURASI_VIDEO` di berkas yang sama (detik).
  Ini yang dipakai untuk menghitung bab otomatis.
- Langkah yang menyebut menit otomatis dapat tombol timer, jadi tulis
  waktunya sebagai angka: `"Masak 40 menit"`, bukan `"masak sampai matang"`.
- Kalau langkah memuat `"Tanda matang: ..."`, kalimat itu dipindah ke kotak
  hijau terpisah supaya lebih mudah dibaca sambil memasak.
- Foto sebaiknya pakai `/500px-` dari Wikimedia. Kartu hanya selebar ~250px,
  jadi 500px sudah cukup dan jauh lebih ringan daripada 1280px.

## Teknis

- HTML, CSS, dan JavaScript biasa. Tanpa framework, tanpa bundler, tanpa
  dependensi.
- Warna memakai `oklch()`. Seluruh kontras teks lolos WCAG AA.
- Jarak memakai token `--s1` sampai `--s8`, bukan angka lepas.
- Nama class dan fungsi memakai istilah Indonesia supaya mudah diikuti.
- Dropdown, kotak saran pencarian, batang gulir, dan tombol kembali ke atas
  dibuat sendiri, bukan bawaan browser.
- Video memakai YouTube IFrame API di host `youtube-nocookie.com`, dimuat
  hanya saat tombol video ditekan.
- Ada `@media (prefers-reduced-motion: reduce)` dan gaya khusus `@media print`.
- `content-visibility: auto` pada kartu: 67 kartu katalog tidak digambar
  sekaligus.
- Data terstruktur JSON-LD: Recipe + VideoObject di halaman resep, ItemList
  di katalog.
- Foto dari Wikimedia Commons. Video dari YouTube, hak masing-masing pemilik.

## Dokumen lain

- **[PENJELASAN.MD](PENJELASAN.MD)** — panduan lengkap seluruh kode: alur data,
  penjelasan tiap fungsi, sistem desain, keamanan, dan tanya-jawab. Ditulis
  untuk pemula yang ingin memahami atau mempresentasikan situs ini.

## Kontak

Koreksi takaran atau usulan resep: halo@letmecook.id
