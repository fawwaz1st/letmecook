# PANDUAN PRESENTASI — LetMeCook

Panduan ini menuntun kamu mempresentasikan website LetMeCook **dari awal
sampai akhir**, berurutan, dengan kalimat yang bisa langsung dibaca. Cocok
untuk presentasi kelas, wawancara, atau demo ke teman.

**Total waktu:** 10–15 menit kalau lengkap, 5 menit kalau versi singkat.

---

## Persiapan Sebelum Mulai (2 menit)

1. **Nyalakan server lokal** supaya video bisa diputar:
   ```bash
   cd letmecook
   python -m http.server 8899 --bind 127.0.0.1
   ```
2. **Buka browser** ke `http://127.0.0.1:8899`
3. **Buka 3 tab** jauh-jauh hari supaya tidak menunggu saat presentasi:
   - Tab 1: `http://127.0.0.1:8899` (beranda)
   - Tab 2: `http://127.0.0.1:8899/katalog.html` (katalog)
   - Tab 3: `http://127.0.0.1:8899/resep.html?id=rendang` (halaman resep)
4. **Perbesar layar** (Ctrl + `+` satu kali) supaya teks terbaca dari jauh

> **Kalau tidak ada Python:** buka versi online
> <https://fawwaz1st.github.io/letmecook/> — semuanya sama, termasuk video.

---

## Bagian 1 — Pembuka (1 menit)

**Yang kamu ucapkan:**

> "Selamat pagi/siang. Saya akan memperkenalkan **LetMeCook**, website resep
> masakan Indonesia yang saya buat.
>
> Ada dua masalah yang sering terjadi kalau kita mengikuti resep dari
> internet. Pertama, takarannya kabur — 'garam secukupnya', 'santan
> secukupnya'. Untuk orang yang baru belajar masak, itu tidak membantu.
> Kedua, langkahnya tidak memberi tanda — 'masak sampai matang'. Matang yang
> seperti apa?
>
> LetMeCook menjawab dua masalah itu: **semua bahan punya angka**, dan
> **tiap langkah menyebut tanda yang bisa kita lihat sendiri**."

**Yang kamu lakukan:** tunjukkan beranda, diam sebentar biar orang melihat.

---

## Bagian 2 — Beranda (1,5 menit)

**Yang kamu tunjukkan, urut dari atas:**

1. **Foto besar** — "Ini foto nasi campur dengan aneka lauk, menggambarkan
   isi situsnya: 67 resep dari seluruh Indonesia."

2. **Judul** — "**'Dituntun di setiap langkah.'** Ini janji utamanya."

3. **Kotak "Resep hari ini"** — "Situsnya berganti sorotan setiap tanggal.
   Hari ini kebetulan menampilkan [sebutkan nama resepnya]."

4. **Empat kategori** — "Resepnya dibagi empat waktu makan: sarapan, makan
   siang, makan malam, dan camilan."

5. **"Paling sering dimasak"** — "Diurutkan dari yang paling banyak
   dimasak."

6. **"Video berpenanda bab"** — "Resep yang videonya punya penanda waktu,
   jadi bisa langsung lompat ke bagian yang dicari."

**Kalimat penutup bagian ini:**

> "Sekarang saya tunjukkan bagian utamanya, yaitu cara mencari resep."

---

## Bagian 3 — Katalog dan Pencarian (2 menit)

**Yang kamu lakukan:** pindah ke Tab 2 (katalog).

**Yang kamu tunjukkan:**

1. **Jumlah resep** — "Ada 67 resep. Angka ini muncul otomatis dari data,
   bukan ditulis manual — jadi kalau saya tambah resep, semua tulisan '67'
   di seluruh halaman ikut berubah sendiri."

2. **Coba ketik di kotak cari** — ketik `soto`, tunjukkan saran muncul
   dengan foto.

3. **Coba filter** — klik dropdown "Level" → pilih "Mudah", lalu tunjukkan
   jumlahnya berkurang.

4. **Pencarian ganda** — ketik `soto santan` di kotak cari. Jelaskan:
   > "Pencariannya mencari **semua** kata, bukan salah satu. Jadi 'soto
   > santan' hanya menampilkan resep yang memuat kedua kata itu."

**Kalimat penutup bagian ini:**

> "Sekarang saya buka salah satu resepnya."

---

## Bagian 4 — Halaman Resep (2,5 menit)

**Yang kamu lakukan:** pindah ke Tab 3 (resep rendang).

**Yang kamu tunjukkan, urut dari atas:**

1. **Kepala resep** — "Ada foto, asal daerah, tingkat kesulitan, dan empat
   informasi cepat: total waktu, waktu benar-benar di dapur, hasil berapa
   porsi, dan kalori."

2. **Tombol porsi** — klik `+` satu kali. Tunjukkan semua jumlah bahan
   berubah.
   > "Bahan-bahannya ikut menyesuaikan otomatis. Yang dihitung per butir
   > seperti telur dibulatkan dan diberi tanda ± karena tidak bisa dibelah
   > dua."

3. **Daftar bahan** — "Semuanya bertakar gram atau mililiter, bukan
   'secukupnya'."

4. **Daftar langkah** — ini bagian terpenting. Tunjukkan:
   - **Badge teknik** — "Tiap langkah punya label teknik masaknya: tumis,
     haluskan, kukus. Warnanya beda-beda supaya cepat dikenali."
   - **Meter api** — "Tiga batang kecil ini menunjukkan besar apinya."
   - **Penunjuk menit video** — "Di sini ada tulisan 'Menit 02:52'. Itu
     menunjukkan bagian video mana yang membahas langkah ini."
   - **Kotak "Matang kalau"** — "Ini tanda yang bisa kita periksa sendiri,
     bukan cuma lama waktunya."
   - **Tombol timer** — "Kalau langkahnya menyebut menit, tombol timer
     muncul otomatis. Coba saya klik." (klik, tunjukkan hitungan mundur)

5. **Tiga kotak bantuan di bawah langkah** — "Ada tips 'Sering bikin gagal',
   'Kalau sudah telanjur gagal', dan 'Menyimpan sisa masakan'."

**Kalimat penutup bagian ini:**

> "Sekarang saya tunjukkan bagian yang paling saya banggakan: mode masak."

---

## Bagian 5 — Mode Masak (4 menit) — BAGIAN UTAMA

**Yang kamu lakukan:** klik tombol **"Mode masak"** (tombol hijau di atas).

### 5A. Saat video BELUM dibuka — tunjukkan dulu bagian ini

1. **Layar penuh satu langkah** — "Layar jadi penuh, satu langkah sekali
   tampil, teksnya besar supaya kebaca dari jauh. Ini karena saat memasak,
   tangan kita sibuk dan tidak bisa memegang HP."

2. **Badge teknik + meter api** — "Tiap langkah punya label tekniknya, dan
   tiga batang ini menunjukkan besar apinya."

3. **Kotak "Matang kalau"** — "Ini tanda yang bisa diperiksa sendiri, bukan
   cuma lama waktunya."

4. **"Bahan di langkah ini"** — ini bagian yang penting untuk ditunjukkan.
   > "Perhatikan: di bawah ada daftar **hanya bahan yang dipakai di langkah
   > ini**. Jadi saya tidak perlu melihat 8 bahan sekaligus — cuma yang
   > relevan. Bahan yang tidak disebut di langkah ini tidak muncul."

5. **"Posisi langkah"** — tunjukkan daftar bernomor dengan yang aktif
   ditandai garis kuning.
   > "Dan ini posisi saya sekarang. Langkah yang sedang aktif ditandai,
   > yang sudah lewat diredupkan. Jadi saya tahu sudah sampai mana dan
   > masih berapa langkah lagi — tanpa keluar dari layar penuh."

6. **Timer** — kalau ada tombol timer, klik sekali.
   > "Kalau langkahnya menyebut menit, tombol timer muncul otomatis."

### 5B. Sekarang buka videonya — tunjukkan tata letak dua kolom

7. **Tombol "Video"** — klik. Tunggu video muncul.
   > "Sekarang saya buka videonya. Perhatikan: tata letaknya berubah jadi
   > **dua kolom** — video di kiri, teks langkah di kanan. Jadi saya bisa
   > melihat video dan membaca langkahnya **bersamaan**, tidak perlu
   > menggulir naik-turun."

8. **Klik "Lanjut"** — tunjukkan langkah pindah **dan** video ikut pindah.
   > "Waktu saya tekan Lanjut, videonya ikut melompat ke bagian yang cocok
   > dengan langkah baru. Jadi tidak perlu mencari menitnya sendiri."

9. **Klik "Sebelumnya"** — tunjukkan video mundur juga.
   > "Ini juga berlaku kalau mundur."

10. **Klik salah satu bab video** (daftar waktu di bawah pemutar)
    > "Daftar babnya bisa diklik langsung."

11. **Tutup video lagi** — tunjukkan rincian bahan & posisi langkah balik.
    > "Kalau videonya ditutup, rincian bahan dan posisi langkahnya muncul
    > lagi. Jadi tampilannya menyesuaikan: waktu video terbuka, ruangnya
    > dibagi dua; waktu video tertutup, ruangnya lega dan rinciannya
    > kembali."

12. **Geser layar** (kalau presentasi pakai layar sentuh) atau sebutkan:
    > "Di HP, cukup geser kiri-kanan untuk pindah langkah. Ini karena tangan
    > yang berminyak susah menekan tombol kecil."

13. **Tekan tombol Esc** — mode masak tertutup.
    > "Bisa ditutup dengan tombol Esc di keyboard."

**Kalimat penutup bagian ini:**

> "Sekarang bagian terakhir: merencanakan makan seminggu."

---

## Bagian 6 — Rencana Makan (2 menit)

**Yang kamu lakukan:** buka menu **"Rencana"** di kepala halaman.

**Yang kamu tunjukkan:**

1. **21 slot** — "Ada 7 hari × 3 waktu makan = 21 slot."

2. **Klik "Isi" di salah satu slot** — modal pemilih terbuka dengan foto.
   > "Pemilihnya menampilkan foto supaya cepat dikenali — orang mengenali
   > masakan dari tampilannya, bukan dari namanya."

3. **Pilih satu resep** — tunjukkan slot terisi.

4. **Lihat "Daftar belanja"** di bawah.
   > "Ini bagian yang paling menghemat waktu. Daftar belanja **tersusun
   > sendiri** dari resep yang saya pilih. Bahkan kalau dua resep
   > sama-sama butuh bawang merah, jumlahnya digabung otomatis."

5. **Tambah bahan manual** — ketik sesuatu seperti "kecap manis", klik
   Tambah.
   > "Bahan yang saya tulis sendiri juga tersimpan, jadi tidak hilang kalau
   > halaman dimuat ulang."

6. **Klik "Cetak"** — tunjukkan pratinjau cetak (atau sebutkan saja).
   > "Daftar belanjanya bisa dicetak. Tombol-tombolnya otomatis
   > disembunyikan di kertas, karena di kertas tidak ada gunanya."

---

## Bagian 7 — Tentang Teknis (1,5 menit)

**Yang kamu ucapkan** (tidak perlu buka apa pun, atau buka repo GitHub):

> "Sekarang saya jelaskan sedikit bagian teknisnya.
>
> Website ini dibuat dengan **HTML, CSS, dan JavaScript biasa** — tanpa
> framework seperti React atau Vue, dan tanpa alat build. Ini pilihan
> sengaja: supaya siapa pun bisa membuka berkasnya dan langsung mengerti,
> dan supaya tidak ada ratusan kilobyte JavaScript yang tidak perlu.
>
> **Tidak ada server dan tidak ada database.** Semua data 67 resep tertanam
> di satu berkas JavaScript. Data pengguna seperti favorit dan rencana makan
> disimpan di **localStorage** — penyimpanan kecil di browser pengunjung
> sendiri.
>
> Konsekuensinya bagus untuk privasi: **data pengunjung tidak pernah
> dikirim ke mana pun**. Tapi jujur ada batasnya: kalau pengunjung menghapus
> riwayat browser, datanya ikut hilang, dan tidak bisa dibuka dari perangkat
> lain.
>
> Dari sisi keamanan, tiap halaman memasang **Content-Security-Policy**:
> aturan yang memberi tahu browser hanya boleh memuat kode dari domain
> tertentu. Jadi kalau ada kode asing yang disuntikkan, browser menolaknya."

---

## Bagian 8 — Penutup (30 detik)

**Yang kamu ucapkan:**

> "Jadi ringkasnya, LetMeCook menyelesaikan dua masalah resep internet:
> **takaran yang kabur** dan **langkah tanpa tanda**. Plus tiga hal
> tambahan: video yang menyatu dengan langkah, daftar belanja yang tersusun
> sendiri, dan semuanya tanpa akun, tanpa iklan, tanpa pelacak.
>
> Silakan kalau ada pertanyaan."

---

## Versi Singkat (5 menit)

Kalau waktu terbatas, lakukan hanya ini:

| Waktu | Bagian | Yang ditunjukkan |
|---|---|---|
| 0:00 | Pembuka | Dua masalah: takaran kabur, langkah tanpa tanda |
| 0:30 | Beranda | Foto + judul "Dituntun di setiap langkah" |
| 1:00 | Katalog | Ketik "soto", tunjukkan saran + filter |
| 2:00 | Resep | Tombol porsi (bahan berubah) + penunjuk "Menit 02:52" |
| 3:00 | **Mode masak** | Rincian bahan per langkah + posisi langkah |
| 3:30 | **Mode masak + video** | Buka video → dua kolom; klik Lanjut → video ikut pindah |
| 4:00 | Rencana makan | Isi slot → daftar belanja tersusun sendiri |
| 4:30 | Teknis | Tanpa framework, tanpa server, data di browser sendiri |

---

## Pertanyaan yang Mungkin Ditanya (dan Jawabannya)

**"Kenapa tidak pakai React/Vue?"**

> "Karena isinya statis — tidak ada data yang berubah tanpa interaksi
> pengunjung. Framework akan menambah ratusan kilobyte JavaScript dan alat
> build, tanpa manfaat nyata di sini. Dan saya sengaja mau pemula bisa
> membaca kodenya langsung."

**"Data 67 resep disimpan di mana?"**

> "Di satu berkas JavaScript, `skrip/resep-data.js`, sebagai satu larik
> besar. Halaman lain membaca dari larik yang sama. Jadi kalau saya tambah
> resep, cukup tambah satu objek — tidak perlu menyentuh HTML atau CSS."

**"Kenapa video tidak bisa diputar kalau file HTML diklik dua kali?"**

> "YouTube menolak embed dari alamat `file://` karena tidak ada alamat
> `http/https` — ini batasan keamanan YouTube, bukan bug. Situsnya sudah
> menangani ini: kalau dibuka dari berkas, tombol video mengarahkan ke
> YouTube, bukan layar kosong."

**"Bagaimana video tahu menit berapa untuk tiap langkah?"**

> "Ada fungsi `daftarBab` yang selalu membuat **satu bab per langkah**.
> Kalau resepnya punya data bab tulisan tangan, waktunya diambil dari situ.
> Kalau tidak, durasi video dibagi rata sesuai jumlah langkah."

**"Kenapa tampilannya berubah jadi dua kolom saat video dibuka?"**

> "Supaya video dan teks langkah bisa dilihat **bersamaan** tanpa menggulir
> naik-turun. Saat memasak, tangan sibuk — menggulir layar untuk
> membandingkan video dengan langkah itu merepotkan. Di layar HP, kolomnya
> ditumpuk lagi karena dua kolom akan terlalu sempit."

**"Bagaimana sistem tahu bahan apa yang dipakai di langkah tertentu?"**

> "Sistem mencocokkan **teks langkah** dengan **nama bahan**. Contoh, kalau
> langkah menulis 'blender cabai dan bawang merah', maka yang muncul hanya
> bahan yang disebut di situ. Pencocokannya longgar: kata pertama bahan juga
> dihitung, karena orang menulis langkah secara singkat — 'masukkan bawang' —
> sedangkan daftar bahan ditulis lengkap, 'bawang merah 80 gram'."

**"Kenapa ratingnya 4,9? Itu dari mana?"**

> "Itu **angka contoh** di data, bukan ulasan pengguna sungguhan. Karena itu
> saya sengaja **tidak** mengirimkannya ke Google sebagai data terstruktur —
> mengirim rating palsu bisa berakibat sanksi. Kalau nanti ada sistem ulasan
> asli, baru boleh ditambahkan."

**"Aman tidak datanya?"**

> "Untuk privasi, sangat aman — datanya tidak pernah meninggalkan browser
> pengunjung. Tapi karena tidak ada server, datanya tidak bisa disinkronkan
> antar perangkat, dan hilang kalau riwayat browser dihapus. Itu
> trade-off yang saya pilih sadar."

**"Berapa lama membuatnya?"**

> "Paling lama bukan menulis kodenya, tapi **menyiapkan 67 resepnya**:
> mengukur bahan, menulis langkah, memeriksa video, dan memastikan tiap
> langkah menyebut tanda matang yang benar-benar bisa diperiksa."

**"Apa bagian tersulit?"**

> "Menyambungkan video dengan langkah. Awalnya bab videonya tidak cocok
> dengan urutan langkah, jadi videonya melompat ke bagian yang salah. Saya
> perbaiki dengan membuat **satu bab per langkah**, dan menambah percobaan
> ulang kalau YouTube mengabaikan perintah pindah waktu (misalnya saat
> sedang iklan)."

**"Kalau saya mau tambah resep, bagaimana?"**

> "Cukup tambah satu objek di `skrip/resep-data.js`, lalu tambah durasi
> videonya dan tanggal unggahnya. Semua angka '67 resep' di seluruh halaman
> ikut berubah sendiri, dan tinggal jalankan `node _qa/buat-sitemap.js`
> supaya resep barunya masuk sitemap."

---

## Checklist Sebelum Presentasi

- [ ] Server lokal sudah jalan (`python -m http.server 8899`)
- [ ] Tiga tab sudah dibuka (beranda, katalog, resep)
- [ ] Layar sudah diperbesar
- [ ] Sudah coba klik tombol Video sekali (supaya video ter-cache, tidak
      menunggu saat presentasi)
- [ ] Sudah coba klik tombol Lanjut sekali (memastikan sinkronisasi video
      bekerja)
- [ ] Volume speaker sudah diatur (kalau mau ada suara video)

---

## Tips Presentasi

1. **Jangan membaca kode.** Yang penting orang paham *kenapa*-nya, bukan
   *bagaimana*-nya. Simpan penjelasan kode untuk sesi tanya jawab.

2. **Sebut angka konkret.** "67 resep", "satu bab per langkah", "CLS turun
   dari 0,58 ke 0,03" — angka membuat presentasi terasa nyata.

3. **Akui batasannya.** Menyebutkan "video tidak bisa diputar dari file://"
   atau "data hilang kalau riwayat dihapus" justru menunjukkan kamu paham
   betul apa yang kamu buat.

4. **Demo jangan terlalu lama di satu fitur.** Mode masak paling menarik,
   tapi 3 menit sudah cukup.

5. **Siapkan rencana cadangan.** Kalau internet mati, video tidak akan
   muncul. Sebutkan saja: "Videonya butuh internet, tapi fitur lainnya jalan
   tanpa internet."
