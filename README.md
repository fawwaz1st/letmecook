# LetMeCook

Situs resep masakan Indonesia. Statis, tanpa server, tanpa build tools.

**[▶ Buka Preview Lengkap](https://fawwaz1st.github.io/letmecook/)** · 44 resep · 44 video · takaran gram

---

## Isinya apa

44 resep dari seluruh Indonesia. Setiap resep punya bahan bertakar gram,
langkah yang menyebut tanda matang, video YouTube, dan timer.

| Bagian | Jumlah | Keterangan |
|---|---|---|
| Resep | 44 | Dari 20 provinsi, 4 kategori waktu makan |
| Video YouTube | 44 | Semua resep punya video, 8 di antaranya berbab |
| Foto | 44 | Wikimedia Commons, berlisensi bebas |
| Bab video | 8 | Bisa dilompati langsung ke menit tertentu |

## Yang bisa dipakai

**Mencari dan menyaring.** Cari menurut nama, daerah, deskripsi, atau nama bahan.
Saring menurut level, waktu maksimal, dan pantangan (vegetarian, aman anak,
tidak pedas, video berbab).

**Menyesuaikan porsi.** Tombol porsi mengubah semua jumlah bahan sekaligus.
Bahan yang dihitung per butir dibulatkan dan diberi tanda ± karena tidak bisa
dibelah dua.

**Mode masak.** Layar penuh, satu langkah sekali tampil. Teksnya besar supaya
kebaca dari jauh. Timer muncul sendiri di langkah yang menyebut menit.
Layar dibiarkan menyala selama memasak (kalau browser mendukung).

**Rencana makan 7 hari.** 21 slot (7 hari × 3 waktu makan). Daftar belanja
tersusun sendiri dari resep yang kamu isi, lalu digabung kalau bahan dan
satuannya sama.

**Video yang ringan.** Halaman tidak memuat 44 pemutar YouTube sekaligus.
Yang dimuat hanya thumbnail; iframe baru dibuat setelah kamu tekan play.
Video ditanam lewat `youtube-nocookie.com`.

## Cara memasang

**1. Buka langsung.** Unduh repo, klik dua kali `index.html`.

> **Catatan soal video.** Kalau halaman dibuka langsung dari berkas
> (alamatnya diawali `file://`), YouTube menolak memutar videonya karena
> tidak ada HTTP Referer (Error 153). Tombol play tetap ada, tapi ia
> membuka video di tab baru dan menjelaskan alasannya. Supaya videonya
> bisa diputar di dalam halaman, pakai salah satu cara di bawah.

**2. Server lokal.** Paling gampang untuk mencoba dengan video yang jalan:

```bash
npx serve .
# atau
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

**3. GitHub Pages.** Situsnya sudah terbit di
<https://fawwaz1st.github.io/letmecook/>. Untuk repo sendiri, cukup
**Settings → Pages → Source: Deploy from a branch → Branch: `main` / `root`**.
Workflow di `.github/workflows/pages.yml` juga bisa dipakai, tapi ia butuh
GitHub Pages dinyalakan lebih dulu lewat halaman Settings.

## Susunan berkas

```
index.html      Beranda: hero, resep hari ini, kategori, populer, jam masak
katalog.html    Katalog 44 resep + pencarian dan saringan
resep.html      Detail resep: bahan, langkah, video, timer, mode masak
mealplan.html   Rencana 7 hari + daftar belanja otomatis
favorit.html    Resep yang disimpan
tentang.html    Cara membaca takaran + ke mana data pergi
404.html        Halaman tidak ditemukan
style.css       Seluruh tampilan. Token warna dan jarak di bagian paling atas
store.js        Data 44 resep + semua fungsi bersama
icons.svg       Sprite ikon garis 24px
```

Berkas yang paling sering diubah kalau mau menambah resep adalah `store.js`.
Tiap resep satu objek di dalam larik `RESEP`. Salin satu objek yang sudah ada,
ganti isinya, dan halaman lain otomatis ikut karena semuanya membaca dari
larik yang sama.

## Datanya di mana

Favorit, rencana makan, centang belanja, dan centang langkah disimpan di
browser kamu sendiri di bawah kunci `letmecook:*`. Tidak ada yang dikirim
ke mana pun.

Konsekuensinya: hapus riwayat browser, data itu ikut hilang, dan tidak bisa
dibuka dari perangkat lain.

## Teknis

- HTML, CSS, dan JavaScript biasa. Tanpa framework, tanpa bundler.
- Warna memakai `oklch()`. Seluruh kontras teks lolos WCAG AA
  (terendah 6.5:1, ambangnya 4.5:1).
- Jarak memakai token `--sp-1` sampai `--sp-10`, bukan angka lepas.
- Dropdown, batang gulir, dan animasi gulir dibuat sendiri, bukan bawaan browser.
- Ada `@media (prefers-reduced-motion: reduce)` dan gaya khusus `@media print`.
- Video: pola facade. Thumbnail dulu, iframe menyusul setelah diklik.
- Foto dari Wikimedia Commons. Video dari YouTube, hak masing-masing pemilik.

## Menambah resep

Tambahkan satu objek ke larik `RESEP` di `store.js`:

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
  foto: "https://...",
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
- Bab harus mulai dari detik `0` dan angkanya naik terus.
- Langkah yang menyebut menit otomatis dapat tombol timer, jadi tulis
  waktunya sebagai angka: `"Masak 40 menit"`, bukan `"masak sampai matang"`.

## Kontak

Koreksi takaran atau usulan resep: halo@letmecook.id
