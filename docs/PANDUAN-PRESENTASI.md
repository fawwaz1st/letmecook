# PANDUAN PRESENTASI — LetMeCook

Naskah presentasi **dari awal sampai akhir**, dengan kalimat yang bisa
langsung dibaca. Total waktu: **12 menit** (ada versi singkat 5 menit di
Bagian 6). Sesi tanya-jawab ada di bagian terakhir — tidak dihitung dalam
12 menit.

---

## Persiapan (sekali, sebelum mulai)

1. Nyalakan server lokal supaya video bisa diputar:
   ```bash
   cd letmecook
   python -m http.server 8899 --bind 127.0.0.1
   ```
   Tidak ada Python? Buka langsung <https://fawwaz1st.github.io/letmecook/>
   — semuanya sama.
2. Buka dua tab: `http://127.0.0.1:8899` (beranda) dan
   `http://127.0.0.1:8899/resep.html?id=rendang` (resep).
3. Klik tombol **Mode masak** sekali lalu tutup lagi — ini memanaskan
   halaman supaya saat presentasi tidak ada jeda muat.
4. Perbesar layar (Ctrl + `+` sekali) supaya teks terbaca dari jauh.

---

## Bagian 1 — Masalah dan Beranda (2 menit)

**Kamu ucapkan:**

> "Selamat pagi/siang. Saya akan memperkenalkan **LetMeCook**, website
> resep masakan Indonesia.
>
> Saat mengikuti resep dari internet ada dua masalah. Pertama, takarannya
> kabur — 'garam secukupnya', 'santan secukupnya'. Untuk orang yang baru
> belajar masak, itu tidak membantu. Kedua, langkahnya tidak memberi tanda
> — 'masak sampai matang'. Matang yang seperti apa?
>
> LetMeCook menjawab dua masalah itu: **semua bahan punya angka**, dan
> **tiap langkah menyebut tanda yang bisa kita lihat sendiri**."

**Yang kamu tunjukkan di beranda, urut dari atas:**

1. **Foto besar** — "Nasi campur dengan aneka lauk, mewakili isi situsnya:
   67 resep dari seluruh Indonesia."
2. **Judul** — "'Dituntun di setiap langkah.' Ini janji utamanya."
3. **"Resep hari ini"** — "Sorotannya berganti tiap tanggal. Hari ini
   kebetulan [sebutkan nama resepnya]."
4. **Empat kategori** — sarapan, makan siang, makan malam, camilan.
5. **"Paling sering dimasak"** dan **"Video berpenanda bab"** — "Yang
   videonya sudah punya penanda waktu, jadi bisa langsung lompat ke bagian
   yang dicari."

**Penutup:** "Sekarang saya tunjukkan cara mencari resepnya."

---

## Bagian 2 — Cari dan Resep (3 menit)

**Pindah ke katalog** (`katalog.html`).

1. **Jumlah resep** — "Angka 67 ini muncul otomatis dari data. Kalau saya
   tambah resep, semua tulisan '67' di seluruh halaman ikut sendiri."
2. **Ketik `soto`** di kotak cari — tunjukkan saran muncul dengan foto.
3. **Filter Level → Mudah** — tunjukkan jumlahnya berkurang.
4. **Ketik `soto santan`** — "Pencariannya mencari **semua** kata, bukan
   salah satu."

**Buka resep rendang.** Yang ditunjukkan, urut dari atas:

5. **Kepala resep** — foto, daerah, kesulitan, dan empat info cepat
   (total waktu, waktu di dapur, porsi, kalori).
6. **Tombol porsi `+`** — klik sekali. "Semua jumlah bahan berubah.
   Yang dihitung per butir seperti telur dibulatkan dan dikasih tanda ±."
7. **Daftar bahan** — "Semuanya gram atau mililiter, bukan 'secukupnya'."
8. **Daftar langkah** — tunjukkan badge teknik, meter api, penunjuk menit
   video ("Menit 02:52" — bagian video untuk langkah ini), kotak "Matang
   kalau", lalu **klik tombol timer** yang muncul otomatis.

**Penutup:** "Sekarang bagian yang paling saya banggakan: mode masak."

---

## Bagian 3 — Mode Masak (4 menit) — BAGIAN UTAMA

**Klik tombol "Mode masak"** (hijau, di atas).

### 3A. Tanpa video dulu

1. **Layar penuh satu langkah** — "Teksnya besar supaya kebaca dari jauh.
   Saat masak, tangan sibuk — tidak bisa pegang HP rapat."
2. **Badge teknik + meter api** — label teknik dan tiga batang besar api.
3. **"Bahan di langkah ini"** — "Cuma bahan yang dipakai di langkah ini
   yang muncul. Tidak perlu lihat 8 bahan sekaligus."
4. **"Posisi langkah"** — "Yang aktif ditandai, yang sudah lewat
   diredupkan. Jadi tahu sudah sampai mana tanpa keluar layar penuh."
5. **Timer** — kalau ada, klik sekali, tunjukkan hitungan mundur.

### 3B. Buka video

6. **Klik tombol "Video"** — "Tata letaknya berubah jadi **dua kolom**:
   video di kiri, teks langkah di kanan. Dilihat bersamaan, tidak perlu
   gulir naik-turun."
7. **Klik "Lanjut"** — langkah pindah **dan video ikut melompat** ke
   bagian yang cocok. "Tidak perlu cari menitnya sendiri."
8. **Klik "Sebelumnya"** — video ikut mundur juga.
9. **Tutup video lagi** — "Rincian bahan dan posisi langkah muncul
   kembali. Tampilannya menyesuaikan ruang yang tersedia."
10. **Tekan Esc** — mode masak tertutup.

**Penutup:** "Terakhir: merencanakan makan seminggu."

---

## Bagian 4 — Rencana Makan (2 menit)

**Buka "Rencana"** di kepala halaman.

1. **21 slot** — "7 hari × 3 waktu makan."
2. **Klik "Isi"** di salah satu slot — "Pemilihnya menampilkan foto,
   karena orang mengenali masakan dari tampilannya."
3. **Pilih satu resep** — tunjukkan slot terisi.
4. **"Daftar belanja"** — "Ini yang paling menghemat waktu: daftar
   belanja **tersusun sendiri** dari resep yang saya isi. Dua resep sama-
   sama butuh bawang merah? Jumlahnya digabung otomatis."
5. **Tambah bahan manual** — ketik "kecap manis", klik Tambah.
   "Bahan tulisan sendiri juga tersimpan, tidak hilang saat muat ulang."

---

## Bagian 5 — Teknis singkat dan penutup (1 menit)

**Kamu ucapkan** (tidak perlu buka apa pun):

> "Sedikit soal teknis. Website ini **HTML, CSS, JavaScript biasa** —
> tanpa framework, tanpa alat build, supaya siapa pun bisa langsung membaca
> kodenya. **Tidak ada server dan tidak ada database**: data 67 resep
> tertanam di satu berkas JavaScript, dan data pengunjung (favorit,
> rencana) disimpan di **localStorage** — tidak pernah dikirim ke mana pun.
> Tiap halaman memasang **Content-Security-Policy**, aturan yang membuat
> browser menolak kode asing.
>
> Ringkasnya, LetMeCook menyelesaikan dua masalah resep internet:
> **takaran kabur** dan **langkah tanpa tanda**. Ditambah video yang
> menyatu dengan langkah, daftar belanja yang tersusun sendiri, dan semuanya
> tanpa akun, tanpa iklan, tanpa pelacak. Silakan kalau ada pertanyaan."

---

## Bagian 6 — Versi Singkat (5 menit)

| Waktu | Bagian | Yang ditunjukkan |
|---|---|---|
| 0:00 | Pembuka | Dua masalah: takaran kabur, langkah tanpa tanda |
| 0:30 | Beranda | Foto + judul "Dituntun di setiap langkah" |
| 1:00 | Katalog | Ketik "soto", tunjukkan saran + filter |
| 2:00 | Resep | Tombol porsi (bahan berubah) + penunjuk "Menit 02:52" |
| 3:00 | **Mode masak** | Bahan per langkah + posisi langkah |
| 3:30 | **Mode masak + video** | Buka video → dua kolom; klik Lanjut → video ikut pindah |
| 4:00 | Rencana makan | Isi slot → daftar belanja tersusun sendiri |
| 4:30 | Teknis | Tanpa framework, tanpa server, data di browser sendiri |

---

## Pertanyaan yang Mungkin Ditanya (dan Jawabannya)

### Fondasi

**"Kenapa website ini dibuat?"**

> "Dua masalah waktu mengikuti resep internet: takarannya kabur ('garam
> secukupnya' tidak membantu orang yang belum pernah masak), dan langkahnya
> tidak memberi tanda ('masak sampai matang' — matang yang seperti apa?).
> Di sini semua bahan punya angka, dan tiap langkah menyebut tanda yang
> bisa diperiksa sendiri."

**"Untuk apa website ini? Apa saja yang bisa dilakukan?"**

> "Tiga hal: masak dengan angka pasti (porsi bisa disesuaikan), tahu kapan
> sesuatu sudah matang (tanda + timer otomatis), dan merencanakan makan
> seminggu (21 slot + daftar belanja yang tersusun sendiri)."

**"Siapa yang cocok memakai website ini?"**

> "Orang yang baru mulai masak, perantau yang ingin masak masakan rumah, dan
> siapa pun yang lebih suka mengikuti angka daripada menebak. Isinya 67
> masakan dari 22 provinsi — rendang, soto, gudeg, sampai juhu singkah umbut
> rotan dari Kalimantan."

**"Apa bedanya dengan situs resep lain?"**

> "Empat hal: takaran gram di semua resep, tanda matang di tiap langkah,
> video yang menyatu dengan langkah (tekan Lanjut, videonya ikut pindah),
> dan tanpa akun, iklan, atau pelacak."

**"Apakah website ini gratis? Perlu akun?"**

> "Gratis, tidak perlu akun, tidak ada iklan dan langganan. Buka langsung
> pakai."

**"Kenapa tidak ada kolom komentar, akun, atau fitur sosial?"**

> "Karena sengaja tidak punya server. Komentar dan akun butuh server plus
> moderator — menambah biaya dan menghilangkan alasan utama situs ini
> dibuat, yaitu privasi pengunjung. Semua datanya di browser sendiri, dan
> itu tidak mungkin kalau ada fitur sosial."

### Kode dan teknologi

**"Kenapa tidak pakai React/Vue?"**

> "Isinya statis — tidak ada data yang berubah tanpa interaksi pengunjung.
> Framework menambah ratusan kilobyte JavaScript dan alat build tanpa
> manfaat nyata di sini. Dan saya sengaja mau pemula bisa membaca kodenya
> langsung."

**"Kenapa ada tiga berkas JavaScript?"**

> "Tanggung jawabnya berbeda: `resep-data.js` cuma data (tambah resep =
> sentuh satu berkas ini saja), `store.js` alat bersama, `halaman.js`
> logika tiap halaman. Digabung jadi satu, berkasnya jadi 4.400 baris yang
> sulit dicari."

**"Kenapa `var RESEP`, bukan `const`?"**

> "Karena skripnya dimuat sebagai skrip biasa, bukan modul. Pada skrip
> biasa, `const` di tingkat atas tidak menjadi properti `window`, jadi
> berkas lain tidak bisa membacanya. `var` bisa. Ini jebakan klasik."

**"Data 67 resep disimpan di mana?"**

> "Di satu larik besar di `skrip/resep-data.js`. Semua halaman membaca
> larik yang sama, jadi angka '67 resep' di seluruh situs ikut menyesuaikan
> sendiri."

**"Aman tidak datanya?"**

> "Untuk privasi sangat aman — datanya tidak pernah meninggalkan browser.
> Tapi karena tidak ada server, datanya tidak bisa disinkronkan antar
> perangkat dan hilang kalau riwayat browser dihapus. Itu trade-off yang
> saya pilih sadar."

**"Kenapa CSS-nya satu berkas besar 1.780 baris?"**

> "Tanpa build tool, berkas terpisah berarti banyak permintaan HTTP.
> Satu berkas dengan 18 bagian bernomor: mudah dicari (Ctrl+F '12)') dan
> hanya satu unduhan."

**"Kenapa warnanya pakai `oklch()`, bukan `#hex`?"**

> "OKLCH cocok dengan cara mata melihat warna. Kalau dua warna punya angka
> kecerahan sama, keduanya benar-benar terlihat sama terang — jadi kontras
> teks lebih mudah dijaga untuk WCAG."

**"Kenapa tidak ada tombol Cetak?"**

> "Sengaja dihapus. Fiturnya jarang dipakai, dan blok CSS `@media print`-
> nya 2.093 karakter yang harus dirawat tiap tata letak berubah.
> Menghapusnya membuat kode jauh lebih sederhana. Kalau mau dikembalikan,
> cukup satu tombol `window.print()` dan satu blok `@media print`."

**"Kenapa bagian 'Jam berapa, masak apa' dihapus dari beranda?"**

> "Isinya duplikat dengan 'Resep hari ini' dan kategori waktu makan di
> halaman yang sama. Satu pertanyaan tidak perlu dijawab dua kali di satu
> layar, jadi saya hapus supaya beranda lebih padat dan jelas."

### Video

**"Kenapa video tidak bisa diputar kalau file HTML diklik dua kali?"**

> "YouTube menolak embed dari alamat `file://` — ini batasan keamanan
> YouTube (Error 153), bukan bug website. Situsnya sudah menangani: kalau
> dibuka dari berkas, tombol video mengarah ke YouTube, bukan layar
> kosong. Jalankan server lokal supaya videonya menyatu."

**"Bagaimana video tahu menit berapa untuk tiap langkah?"**

> "Ada fungsi `daftarBab` yang selalu membuat **satu bab per langkah**.
> Kalau resepnya punya data bab tulisan tangan, waktunya diambil dari situ.
> Kalau tidak, durasi video dibagi rata sesuai jumlah langkah, dengan
> 8 detik disisakan di akhir untuk penutup."

**"Kenapa tampilannya berubah jadi dua kolom saat video dibuka?"**

> "Supaya video dan teks bisa dilihat bersamaan tanpa menggulir. Saat
> memasak tangan sibuk — membandingkan video dengan langkah sambil
> menggulir itu merepotkan. Di layar HP kolomnya ditumpuk lagi karena dua
> kolom akan terlalu sempit."

**"Videonya dari mana? Apa bisa mati sewaktu-waktu?"**

> "Dari YouTube, disimpan hanya sebagai ID 11 karakter. Ada pemeriksa
> `_qa/audit-video.js` yang memakai oEmbed YouTube untuk memastikan 67
> videonya masih ada dan judulnya cocok dengan resepnya. Kalau pemiliknya
> menghapus video, alat itu melaporkan."

**"Kalau videonya tidak bisa diputar, apa yang terjadi?"**

> "Tidak ada layar kosong. Empat jalur kegagalan ditangani: ID tidak
> valid, halaman dibuka dari `file://`, API YouTube gagal dimuat, dan
> video gagal diputar. Semuanya menampilkan pesan plus tautan ke YouTube."

**"Suara video pernah terus menyala walau videonya disembunyikan. Kenapa
dan bagaimana?"**

> "Itu bug nyata yang saya temukan dan perbaiki: menyembunyikan panel tidak
> otomatis menghentikan pemutar. Sekarang setiap kali panel ditutup,
> videonya dipanggil `pauseVideo()`; saat dibuka lagi, `playVideo()`. Saat
> mode masak ditutup total, pemutarnya di-`destroy()` supaya sesi berikutnya
> mulai dari bersih."

### Fitur

**"Bagaimana sistem tahu bahan apa yang dipakai di langkah tertentu?"**

> "Sistem mencocokkan **teks langkah** dengan **nama bahan**. Kalau langkah
> menulis 'blender cabai dan bawang merah', yang muncul cuma bahan itu.
> Pencocokannya longgar — kata pertama bahan juga dihitung, karena orang
> menulis langkah singkat ('masukkan bawang') sedangkan daftar bahan
> ditulis lengkap ('bawang merah 80 gram')."

**"Kenapa ratingnya 4,9? Itu dari mana?"**

> "Itu angka contoh di data, bukan ulasan sungguhan. Karena itu saya
> sengaja **tidak** mengirimkannya ke Google sebagai data terstruktur —
> mengirim rating palsu bisa berakibat sanksi. Kalau nanti ada ulasan
> asli, baru ditambahkan."

**"Kenapa foto resepnya bukan foto asli masakan itu semua?"**

> "Sebagian besar tidak ada fotonya di Wikimedia Commons. Untuk kasus itu
> saya pakai foto terdekat yang masih jujur: kohu-kohu misalnya adalah urap
> dari Maluku, jadi fotonya urap sayur. Yang penting tidak menampilkan foto
> yang salah sama sekali — dulu ada yang memakai foto warung dan gerobak,
> sudah saya ganti semua."

**"Bagaimana memastikan fotonya tidak rusak?"**

> "Dulu ada pemeriksa `_qa/audit-foto.js` yang menguji semua URL foto satu
> per satu, plus halaman grid untuk melihat semuanya dengan mata — karena
> URL yang bisa dimuat belum tentu fotonya sesuai. Sekarang pemeriksaan
> pola URL sudah masuk ke `periksa.js`."

**"Kalau saya mau tambah resep, bagaimana?"**

> "Cukup tambah satu objek di `skrip/resep-data.js`, lalu durasi dan
> tanggal videonya di tabel yang sama. Semua angka '67 resep' di seluruh
> halaman ikut sendiri, dan tinggal jalankan `node _qa/buat-sitemap.js`."

### Pengalaman mengerjakan

**"Berapa lama membuatnya?"**

> "Paling lama bukan nulis kodenya, tapi menyiapkan 67 resepnya: mengukur
> bahan, menulis langkah, memeriksa video, dan memastikan tiap langkah
> menyebut tanda matang yang benar-benar bisa diperiksa."

**"Apa bagian tersulit?"**

> "Menyambungkan video dengan langkah. Awalnya bab videonya tidak cocok
> dengan urutan langkah, jadi videonya melompat ke bagian yang salah.
> Saya perbaiki dengan membuat satu bab per langkah, plus percobaan ulang
> kalau YouTube mengabaikan perintah pindah waktu — misalnya saat sedang
> iklan."

**"Bagaimana kode ini dijelaskan ke orang lain?"**

> "Ada `docs/PENJELASAN.MD` yang menuntun dari atas ke bawah. Tiap bagian
> menyebut berkas dan nomor barisnya — misalnya `skrip/store.js:124` —
> jadi pembaca bisa langsung membuka kodenya. Untuk fungsi-fungsi penting
> (`baca`, `parseLangkah`, mode masak) ada penjelasan **baris per baris**
> lengkap dengan alasan tiap keputusan."

**"Apa pelajaran terbesar dari proyek ini?"**

> "Dua. Pertama, bug paling menjengkelkan biasanya dari asumsi yang tidak
> diperiksa — menyembunyikan panel video ternyata tidak menghentikan
> suaranya, dan data localStorage bisa berbentuk aneh. Kedua, ukur jangan
> menebak: CLS katalog turun dari 0,58 ke 0,03 hanya setelah saya mengukur
> dan menemukan tinggi cadangan kartu salah tulis."

---

## Checklist Sebelum Presentasi

- [ ] Server lokal jalan (atau siap versi online)
- [ ] Dua tab terbuka: beranda dan resep rendang
- [ ] Mode masak sudah pernah dibuka sekali (halaman terpanas)
- [ ] Layar diperbesar, volume speaker diatur
- [ ] Sudah klik tombol Video sekali (video ter-cache, tidak menunggu)

## Tips

1. **Jangan baca kode.** Yang penting orang paham *kenapa*-nya. Penjelasan
   kode untuk sesi tanya jawab.
2. **Sebut angka konkret.** "67 resep", "satu bab per langkah", "CLS turun
   dari 0,58 ke 0,03" — angka membuat presentasi terasa nyata.
3. **Akui batasannya.** "Video tidak bisa dari file://" atau "data hilang
   kalau riwayat dihapus" justru menunjukkan kamu paham betul apa yang
   kamu buat.
4. **Demo mode masak maksimal 4 menit.** Bagian paling menarik, tapi
   jangan habiskan semua waktu di sana.
5. **Siapkan cadangan.** Internet mati? Lanjut tanpa video — mode masak
   tetap lengkap tanpa video, dan itu justru poin bagus untuk disebut.
