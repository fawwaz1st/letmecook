// LetMeCook — 44 resep seluruh Indonesia + localStorage.
// Foto dari Wikimedia Commons (lihat komentar "Foto:" di tiap resep) dan video dari YouTube.
// Kunci: letmecook:fav (id[]), letmecook:meal (7 hari), letmecook:gcheck, letmecook:prog (progress masak).

const RESEP = [
  {
    id: "bubur-ayam", nama: "Bubur Ayam Jakarta", daerah: "Jakarta", kategori: "sarapan",
    waktuTotal: 70, waktuAktif: 30, level: "mudah", porsi: 4, rating: 4.8, dimasak: 2314,
    // Foto: Sakurai Midori (CC BY 3.0) — https://commons.wikimedia.org/wiki/File:Bubur_ayam_chicken_porridge.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bubur_ayam_chicken_porridge.JPG/1280px-Bubur_ayam_chicken_porridge.JPG",
    video: "xBYoiqmXvJg",
    deskripsi: "Air 1500 ml dan beras 200 gram direbus 40 menit sampai butirnya pecah dan buburnya mengental. Dada ayam 300 gram ditumis dengan bawang sampai harum, lalu disuwir di atas bubur.",
    rasa: "Kuahnya keruh karena beras dan kaldu direbus 40 menit. Kecap asin dipakai di ayam suwir, bawang goreng ditabur terakhir supaya masih renyah.", pedas: 0, veg: false, anak: true,
    kalori: "350-450 kkal", protein: "15-20g", pantangan: "Tinggi natrium dari kecap asin dan kaldu.",
    sanding: ["Sate usus / ati ampela", "Telur rebus setengah matang", "Kerupuk + emping"],
    minum: "Teh manis hangat, diseduh pas bubur masih beruap.",
    suasana: "Pagi sebelum berangkat kerja. Bubur matang sambil kamu mandi, sisanya masuk kulkas.",
    bahan: [
      { nama: "beras", jumlah: 200, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 1500, satuan: "ml", bagi: 1 },
      { nama: "kaldu ayam cair", jumlah: 1000, satuan: "ml", bagi: 1 },
      { nama: "dada ayam tanpa tulang", jumlah: 300, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 4, satuan: "siung", bagi: 0 },
      { nama: "bawang merah", jumlah: 5, satuan: "butir", bagi: 0 },
      { nama: "jahe", jumlah: 2, satuan: "cm", bagi: 0 },
      { nama: "kunyit", jumlah: 2, satuan: "cm", bagi: 0 },
      { nama: "ketumbar bubuk", jumlah: 1, satuan: "sdt", bagi: 1 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "gula pasir", jumlah: 1, satuan: "sdt", bagi: 1 },
      { nama: "merica bubuk", jumlah: 0.5, satuan: "sdt", bagi: 1 },
      { nama: "minyak goreng", jumlah: 2, satuan: "sdm", bagi: 1 },
      { nama: "kecap asin", jumlah: 1, satuan: "sdm", bagi: 1 },
      { nama: "daun bawang", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "bawang goreng", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "kerupuk", jumlah: 100, satuan: "gram", bagi: 0 },
      { nama: "telur rebus", jumlah: 4, satuan: "butir", bagi: 0 },
    ],
    alat: ["Panci besar 4 liter", "Wajan 24 cm", "Spatula kayu", "Ulekan", "Pisau dan talenan", "Mangkuk saji"],
    langkah: [
      "Didihkan 1500 ml air, masukkan beras. Masak api kecil 40 menit, aduk tiap 5 menit sampai butir pecah dan kental meletup pelan.",
      "Tuang 1000 ml kaldu, masak 10 menit sampai licin. Tanda matang: sendok ditarik meninggalkan jejak 2 detik.",
      "Rebus dada ayam 15 menit sampai dalam putih solid dan tidak pink. Angkat, suwir 0.5 cm.",
      "Tumis bawang merah dan bawang putih 4 menit sampai cokelat keemasan dan harum manis. Masukkan jahe, kunyit, ketumbar, tumis 2 menit sampai minyak keluar.",
      "Masukkan ayam suwir, kecap asin, garam, gula, merica. Aduk 3 menit sampai kuning merata dan desis kering.",
      "Tuang bubur panas ke mangkuk. Tata ayam, telur, daun bawang, bawang goreng, kerupuk.",
    ],
    tips: "Bubur gosong karena api besar dan jarang diaduk.",
    selamat: "Pindah ke panci bersih tanpa kerok dasar, tambah 200 ml kaldu panas, masak api terkecil 5 menit.",
    simpan: "Bubur polos 2 hari, ayam suwir 3 hari di kulkas. Panaskan dengan 100 ml air per porsi.",
  },
  {
    id: "nasi-uduk", nama: "Nasi Uduk Betawi", daerah: "Jakarta", kategori: "sarapan",
    waktuTotal: 60, waktuAktif: 20, level: "mudah", porsi: 5, rating: 4.9, dimasak: 1987,
    // Foto: Gunawan Kartapranata (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Nasi_Uduk_Betawi.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Nasi_Uduk_Betawi.jpg/1280px-Nasi_Uduk_Betawi.jpg",
    video: "A7TlHQsRMzs",
    deskripsi: "Beras 500 gram dimasak bersama 700 ml santan, daun salam, dan sereh hingga empuk. Nasi lalu didiamkan tertutup 10 menit supaya pulen, lalu disajikan dengan ayam goreng dan tempe orek.",
    rasa: "Santan 700 ml meresap ke beras selama dimasak bersama salam dan sereh. Tempe orek yang ditumis sampai berkaramel bikin suapan kedua terasa manis.", pedas: 1, veg: false, anak: true,
    kalori: "500-650 kkal", protein: "12-18g", pantangan: "Santan + gorengan: tinggi lemak.",
    sanding: ["Ayam goreng / semur jengkol", "Tempe orek", "Telur balado"],
    minum: "Es jeruk dingin, diminum setelah suapan terakhir.",
    suasana: "Minggu malam, buat bekal kantor Senin. Nasi uduk tahan semalam di kulkas.",
    bahan: [
      { nama: "beras", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "santan sedang", jumlah: 700, satuan: "ml", bagi: 1 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "daun salam", jumlah: 3, satuan: "lembar", bagi: 0 },
      { nama: "sereh", jumlah: 2, satuan: "batang", bagi: 0 },
      { nama: "lengkuas", jumlah: 3, satuan: "cm", bagi: 0 },
      { nama: "ayam goreng", jumlah: 5, satuan: "potong", bagi: 0 },
      { nama: "tempe orek", jumlah: 200, satuan: "gram", bagi: 1 },
      { nama: "telur balado", jumlah: 5, satuan: "butir", bagi: 0 },
      { nama: "bawang goreng", jumlah: 30, satuan: "gram", bagi: 1 },
    ],
    alat: ["Rice cooker / dandang", "Wajan", "Sutil", "Pisau dan talenan", "Piring saji"],
    langkah: [
      "Cuci 500 gram beras. Masukkan ke rice cooker bersama 700 ml santan, garam, salam, sereh, lengkuas.",
      "Masak sampai matang. Begitu tombol naik, aduk sekali lalu tutup 10 menit agar pulen merata.",
      "Goreng ayam sampai kuning kecokelatan dan bunyi desis berhenti.",
      "Tumis tempe orek 5 menit sampai kering berkaramel dan tidak basah.",
      "Sajikan nasi hangat dengan ayam, orek, telur balado, tabur bawang goreng.",
    ],
    tips: "Santan pecah bikin nasi berminyak dan cepat basi.",
    selamat: "Aduk nasi, buang rempah, kukus 10 menit dengan 50 ml santan baru.",
    simpan: "Nasi 1 hari suhu ruang, 2 hari kulkas. Kukus ulang sebelum sajikan.",
  },
  {
    id: "lontong-sayur", nama: "Lontong Sayur", daerah: "Betawi", kategori: "sarapan",
    waktuTotal: 60, waktuAktif: 35, level: "mudah", porsi: 4, rating: 4.7, dimasak: 1204,
    // Foto: suhakri_hsu (CC BY 2.0) — https://commons.wikimedia.org/wiki/File:Lontong_sayur.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Lontong_sayur.jpg",
    video: "91T206VNMpk",
    deskripsi: "Labu siam 200 gram dan kacang panjang direbus 10 menit dalam 600 ml santan encer hingga empuk. Santan kental 200 ml dituang terakhir sambil diaduk supaya kuahnya tidak pecah.",
    rasa: "Ebi 50 gram direbus bareng santan sampai kuahnya keluar minyak kuning. Labu siam bikin manis, santan kental yang masuk terakhir bikin kuah lebih berat.", pedas: 1, veg: false, anak: true,
    kalori: "400-500 kkal", protein: "8-12g", pantangan: "Mengandung santan.",
    sanding: ["Telur pindang", "Rendang / opor ayam", "Kerupuk merah"],
    minum: "Teh tawar hangat, diseduh sebelum kuah disiram.",
    suasana: "Lebaran pagi, satu panci besar untuk tamu. Hajatan juga sering masak ini.",
    bahan: [
      { nama: "lontong siap pakai", jumlah: 400, satuan: "gram", bagi: 1 },
      { nama: "labu siam", jumlah: 200, satuan: "gram", bagi: 1 },
      { nama: "kacang panjang", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "santan kental", jumlah: 200, satuan: "ml", bagi: 1 },
      { nama: "santan encer", jumlah: 600, satuan: "ml", bagi: 1 },
      { nama: "ebi rendam", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "gula pasir", jumlah: 2, satuan: "sdt", bagi: 1 },
    ],
    alat: ["Panci besar", "Wajan", "Pisau", "Talenan", "Ulekan", "Mangkuk saji"],
    langkah: [
      "Rebus 600 ml santan encer dengan bumbu halus hingga mendidih dan harum santan matang.",
      "Masukkan labu siam dan kacang panjang, masak 10 menit hingga hijau layu lunak.",
      "Tuang 200 ml santan kental, aduk terus hingga meletup kecil agar tidak pecah.",
      "Tambahkan garam dan gula, koreksi hingga kuah gurih kuning cerah.",
      "Potong lontong, siram kuah panas hingga terendam dan beruap harum.",
    ],
    tips: "Santan pecah dan berminyak kalau didiamkan mendidih.",
    selamat: "Saring kuah, didihkan ulang dengan 50 ml santan baru sambil diaduk.",
    simpan: "Kuah dan lontong terpisah, 2 hari kulkas. Didihkan kuah sebelum sajikan.",
  },
  {
    id: "rendang", nama: "Rendang Sapi", daerah: "Sumatera Barat", kategori: "siang",
    waktuTotal: 240, waktuAktif: 60, level: "sulit", porsi: 6, rating: 5.0, dimasak: 3421,
    // Foto: User Hullie on nl.wikipedia (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Rendang_dish_closeup.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Rendang_dish_closeup.jpg",
    video: "GNfRXKsvG04",
    bab: [[0, "Intro"], [89, "Persiapan bahan"], [172, "Mulai membuat bumbu halus"], [193, "Mulai memasak"], [226, "Bumbui daging"], [331, "Masukkan santan"], [504, "Hidangan siap dan tahap plating"]],
    deskripsi: "Daging sapi 1 kg diungkep dalam 1500 ml santan selama 3 jam sampai menyusut dan berminyak. Cabai dan bawang yang digiling ditumis dulu sampai harum sebelum masuk wajan.",
    rasa: "Cabai giling 100 gram ditumis bareng bawang sampai minyaknya merah. Santan menyusut tiga jam jadi karamel, gula merah menambah manis di ujung.", pedas: 3, veg: false, anak: false,
    kalori: "450-550 kkal", protein: "25-30g", pantangan: "Lemak jenuh tinggi: santan + daging.",
    sanding: ["Nasi hangat", "Daun singkong rebus", "Sambal ijo + kerupuk jangek"],
    minum: "Air kelapa dingin, disiapkan sebelum rendang disantap.",
    suasana: "Masak sehari sebelum acara supaya bumbunya meresap. Empat jam di dapur, jadi pakai hari libur.",
    bahan: [
      { nama: "daging sapi paha", jumlah: 1000, satuan: "gram", bagi: 1 },
      { nama: "santan kental", jumlah: 1500, satuan: "ml", bagi: 1 },
      { nama: "cabai merah giling", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 80, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "lengkuas geprek", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "gula merah", jumlah: 10, satuan: "gram", bagi: 1 },
    ],
    alat: ["Wajan besar", "Blender", "Pisau", "Talenan", "Sutil kayu", "Tutup panci"],
    langkah: [
      "Blender cabai dan bawang merah hingga halus merah pekat.",
      "Didihkan santan sambil aduk hingga keluar minyak dan harum kelapa sangrai.",
      "Masukkan daging dan bumbu, masak api kecil 3 jam hingga kuah menyusut cokelat gelap.",
      "Aduk tiap 15 menit hingga daging empuk ditusuk garpu dan bumbu kering berminyak.",
      "Angkat saat rendang hitam kecokelatan dan tidak berair.",
    ],
    tips: "Api besar bikin gosong sebelum empuk. Santan harus kental tua.",
    selamat: "Pindah ke wajan baru tanpa kerok kerak, tambah 200 ml santan, masak ulang.",
    simpan: "7 hari kulkas tertutup. Panaskan api kecil hingga berminyak lagi.",
  },
  {
    id: "soto-ayam", nama: "Soto Ayam Lamongan", daerah: "Jawa Timur", kategori: "siang",
    waktuTotal: 75, waktuAktif: 45, level: "sedang", porsi: 5, rating: 4.9, dimasak: 2876,
    // Foto: Sakurai Midori (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Soto_ayam.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/1280px-Soto_ayam.JPG",
    video: "afD1GvxI_YE",
    deskripsi: "Ayam kampung 500 gram direbus 30 menit dalam 1500 ml air hingga empuk dan kaldunya bening. Bumbu kunyitnya ditumis sampai harum, lalu kuahnya disiram ke soun.",
    rasa: "Kunyit bakar 20 gram ditumis sampai harum, jadi kuahnya hangat dan tidak langu. Perasan jeruk nipis di akhir bikin suapan terakhir segar.", pedas: 1, veg: false, anak: true,
    kalori: "350-450 kkal", protein: "20-25g", pantangan: "Relatif aman; pisahkan sambal untuk anak.",
    sanding: ["Sate telur puyuh", "Perkedel", "Kerupuk udang + emping"],
    minum: "Es jeruk nipis, diminum sambil kuah masih panas.",
    suasana: "Hari hujan atau badan kurang enak. Kuah kuning ini paling enak diseruput panas.",
    bahan: [
      { nama: "ayam kampung", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 1500, satuan: "ml", bagi: 1 },
      { nama: "bawang merah goreng", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "kunyit bakar", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "gula pasir", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "soun rendam", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "jeruk nipis", jumlah: 2, satuan: "buah", bagi: 0 },
    ],
    alat: ["Panci", "Wajan", "Ulekan", "Pisau", "Talenan", "Saringan", "Mangkuk"],
    langkah: [
      "Rebus ayam dalam 1500 ml air 30 menit hingga kaldu kuning bening.",
      "Tumis bumbu halus hingga kuning keemasan dan harum tajam tidak langu.",
      "Masukkan tumisan ke kaldu, didihkan 15 menit hingga minyak kuning mengapung.",
      "Goreng ayam hingga kulit kuning kecokelatan dan desis berhenti, lalu suwir.",
      "Sajikan dengan soun dan kuah mendidih beruap harum kunyit.",
    ],
    tips: "Kunyit mentah bikin kuah langu dan pahit.",
    selamat: "Saring kuah keruh, didihkan ulang dengan garam dan 100 ml air.",
    simpan: "Kuah tanpa soun 3 hari kulkas. Didihkan hingga beruap sebelum sajikan.",
  },
  {
    id: "gudeg", nama: "Gudeg Nangka", daerah: "Yogyakarta", kategori: "siang",
    waktuTotal: 300, waktuAktif: 40, level: "sedang", porsi: 6, rating: 4.8, dimasak: 1543,
    // Foto: christian razukas from Honolulu, Hawaii (CC BY-SA 2.0) — https://commons.wikimedia.org/wiki/File:Nasi_Gudeg.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nasi_Gudeg.jpg/1280px-Nasi_Gudeg.jpg",
    video: "iYzso0Jkhks",
    bab: [[0, "Intro"], [81, "Persiapan bahan"], [154, "Merebus nangka"], [219, "Menghaluskan bumbu"], [256, "Menumis bumbu gudeg"], [325, "Memasak bahan gudeg lainnya"], [383, "Membuat areh"], [534, "Hidangan siap dan serving"]],
    deskripsi: "Nangka muda 800 gram diungkep dengan 1000 ml santan encer dan 100 gram gula merah selama 4 jam sampai menyusut. Santan kental dituang di akhir, lalu dimasak 30 menit lagi sampai berminyak.",
    rasa: "Gula merah 100 gram larut pelan selama empat jam. Santan kental yang masuk di akhir bikin kuah pekat dan berwarna cokelat gelap.", pedas: 1, veg: false, anak: true,
    kalori: "500-600 kkal", protein: "15-20g", pantangan: "Gula aren tinggi; hindari krecek untuk anak.",
    sanding: ["Ayam opor suwir", "Telur pindang", "Sambal krecek"],
    minum: "Kopi tubruk pahit, diminum setelah suapan manis.",
    suasana: "Malam Minggu pas keluarga kumpul. Orang Jawa masak gudeg semalam sebelum acara.",
    bahan: [
      { nama: "nangka muda", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "santan kental", jumlah: 500, satuan: "ml", bagi: 1 },
      { nama: "santan encer", jumlah: 1000, satuan: "ml", bagi: 1 },
      { nama: "gula merah", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "telur rebus", jumlah: 6, satuan: "butir", bagi: 0 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "ketumbar bubuk", jumlah: 2, satuan: "sdt", bagi: 1 },
    ],
    alat: ["Panci besar", "Pisau", "Talenan", "Tutup panci", "Sutil", "Mangkuk"],
    langkah: [
      "Tata nangka dan telur di panci, tuang santan encer hingga terendam.",
      "Tambahkan gula merah dan bumbu, tutup, masak api kecil 4 jam hingga menyusut.",
      "Tuang santan kental, masak 30 menit hingga kental cokelat gelap harum karamel.",
      "Cek nangka lunak ditekan sendok dan telur cokelat mengilap.",
      "Angkat saat tidak berair dan manis gurih meresap.",
    ],
    tips: "Sering buka tutup bikin warna pucat tidak merata.",
    selamat: "Tambah 30 gram gula merah cair, masak 30 menit lagi hingga cokelat.",
    simpan: "4 hari kulkas. Kukus 15 menit hingga panas merata.",
  },
  {
    id: "rawon", nama: "Rawon Sapi", daerah: "Jawa Timur", kategori: "malam",
    waktuTotal: 120, waktuAktif: 50, level: "sedang", porsi: 5, rating: 4.9, dimasak: 1765,
    // Foto: ESCapade (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Nasi_Rawon_A.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/20/Nasi_Rawon_A.JPG",
    video: "XYev1tljzUE",
    bab: [[0, "Intro"], [80, "Persiapan bahan"], [141, "Membuat bumbu halus dan masak"], [259, "Presto daging"], [300, "Membuat sambal"], [380, "Hidangan siap dan serving"]],
    deskripsi: "Kluwek 40 gram dihaluskan dengan bawang, lalu ditumis sampai harum. Daging sandung lamur 600 gram direbus 60 menit dalam 1500 ml air hingga empuk.",
    rasa: "Kluwek ditumis sampai hitam mengilap, dan itu yang bikin kuahnya pahit dalam. Lemak sandung lamur menambah gurih setelah direbus satu jam.", pedas: 2, veg: false, anak: false,
    kalori: "450-550 kkal", protein: "22-28g", pantangan: "Daging merah berlemak; kluwek mentah beracun.",
    sanding: ["Telur asin", "Tempe goreng", "Tauge pendek + kerupuk udang"],
    minum: "Es teh tawar, diminum setelah kuah habis.",
    suasana: "Malam dingin. Rawon banyak dijual di warung Jawa Timuran kalau kamu tidak mau masak.",
    bahan: [
      { nama: "daging sapi sandung lamur", jumlah: 600, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 1500, satuan: "ml", bagi: 1 },
      { nama: "kluwek", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 60, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "gula pasir", jumlah: 2, satuan: "sdt", bagi: 1 },
    ],
    alat: ["Panci", "Blender", "Wajan", "Pisau", "Talenan", "Saringan", "Sutil"],
    langkah: [
      "Belah kluwek, pastikan isi hitam pekat dan tidak pahit tengik.",
      "Blender kluwek dengan bawang hingga pasta hitam halus.",
      "Tumis pasta hingga hitam mengilap dan harum sangit khas keluar.",
      "Rebus daging 60 menit hingga empuk dan kuah hitam pekat berminyak.",
      "Bumbui garam dan gula hingga gurih dalam dan daging lunak digigit.",
    ],
    tips: "Kluwek ringan kopong bikin kuah pahit.",
    selamat: "Tambah 500 ml air dan 10 gram gula, didihkan 15 menit untuk encerkan pahit.",
    simpan: "3 hari kulkas. Didihkan hingga bergolak sebelum sajikan.",
  },
  {
    id: "ayam-betutu", nama: "Ayam Betutu", daerah: "Bali", kategori: "malam",
    waktuTotal: 180, waktuAktif: 50, level: "sulit", porsi: 4, rating: 4.9, dimasak: 987,
    // Foto: m4sh.3d (CC BY-SA 2.0) — https://commons.wikimedia.org/wiki/File:Ayam_Betutu.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ayam_Betutu.jpg/1280px-Ayam_Betutu.jpg",
    video: "8L2FdhuVbQM",
    bab: [[0, "Intro"], [71, "Persiapan bahan"], [160, "Membuat bumbu halus"], [289, "Tumis bumbu dan ungkep ayam"], [403, "Membuat kacang panjang bejek"], [450, "Membuat sambal matah"], [493, "Membuat sambal terasi"], [563, "Membuat kuah"], [587, "Hidangan siap dan serving"]],
    deskripsi: "Ayam utuh 800 gram dilumuri base genep 150 gram sampai rata, lalu dikukus 90 menit hingga empuk. Setelah itu kulitnya dipanggang 20 menit hingga kecokelatan.",
    rasa: "Base genep 150 gram dilumuri ke seluruh permukaan ayam, jadi pedasnya kena sampai daging dalam. Terasi bakar dan minyak kelapa bikin gurihnya tajam.", pedas: 3, veg: false, anak: false,
    kalori: "500-600 kkal", protein: "30-35g", pantangan: "Sangat pedas; tidak untuk anak dan lambung sensitif.",
    sanding: ["Nasi hangat / plecing kangkung", "Kacang + lawar", "Sate lilit"],
    minum: "Es kelapa muda, diminum sambil makan.",
    suasana: "Siapkan sehari sebelum tamu datang. Tiga jam di dapur, jadi pakai hari libur.",
    bahan: [
      { nama: "ayam kampung utuh", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "bumbu base genep", jumlah: 150, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 500, satuan: "ml", bagi: 1 },
      { nama: "minyak kelapa", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "gula pasir", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "terasi bakar", jumlah: 5, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panci kukus", "Wajan", "Blender", "Pisau", "Talenan", "Aluminium foil", "Mangkuk"],
    langkah: [
      "Lumuri ayam dengan base genep hingga kulit kuning berbumbu tebal.",
      "Bungkus foil rapat, kukus 90 menit hingga lunak dan aroma rempah tajam keluar.",
      "Buka foil, panggang 20 menit hingga kulit cokelat garing dan mendesis lemak.",
      "Siram sisa jus hingga permukaan mengilap berminyak.",
      "Suwir, pastikan dalam putih tidak merah muda dan juicy.",
    ],
    tips: "Bungkusan bocor bikin ayam kering.",
    selamat: "Siram 200 ml kaldu panas, kukus 15 menit hingga lembab lagi.",
    simpan: "3 hari kulkas terbungkus. Kukus 20 menit hingga panas dalam.",
  },
  {
    id: "ikan-bakar", nama: "Ikan Bakar Jimbaran", daerah: "Bali", kategori: "malam",
    waktuTotal: 50, waktuAktif: 35, level: "mudah", porsi: 4, rating: 4.8, dimasak: 1432,
    // Foto: Midori (CC BY 3.0) — https://commons.wikimedia.org/wiki/File:Ikan_kakap_bakar_madu.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Ikan_kakap_bakar_madu.JPG/1280px-Ikan_kakap_bakar_madu.JPG",
    video: "1a2b3I_afa0",
    deskripsi: "Ikan kakap 800 gram dilumuri air jeruk nipis 20 ml selama 10 menit sampai kesat. Kakap itu dibakar di atas arang 12 menit tiap sisi hingga kecokelatan.",
    rasa: "Bumbu kuning dioles saat ikan masih di atas arang, jadi manis dan pedasnya menempel. Sambal matah mentah ditabur terakhir biar pedasnya segar.", pedas: 2, veg: false, anak: true,
    kalori: "400-500 kkal", protein: "30-35g", pantangan: "Alergi seafood; jangan makan bagian gosong.",
    sanding: ["Plecing / lalapan + sambal dabu-dabu", "Tahu-tempe bakar", "Nasi liwet"],
    minum: "Air tebu dingin, diminum setelah ikan habis.",
    suasana: "Akhir pekan pas cuaca cerah. Bakar di halaman atau di pantai, makan pakai tangan.",
    bahan: [
      { nama: "ikan kakap utuh", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "bumbu kuning", jumlah: 60, satuan: "gram", bagi: 1 },
      { nama: "minyak kelapa", jumlah: 30, satuan: "ml", bagi: 1 },
      { nama: "air jeruk nipis", jumlah: 20, satuan: "ml", bagi: 1 },
      { nama: "garam", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "gula pasir", jumlah: 2, satuan: "sdt", bagi: 1 },
      { nama: "sambal matah", jumlah: 50, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panggangan arang", "Kuas", "Pisau", "Talenan", "Penjepit", "Mangkuk", "Kipas"],
    langkah: [
      "Kerat ikan 3 garis, lumuri jeruk dan garam 10 menit hingga kesat.",
      "Olesi bumbu dan minyak hingga kuning merata mengilap.",
      "Bakar arang 12 menit per sisi hingga kulit cokelat gosong ringan dan desis lemak.",
      "Oles sisa bumbu saat dibalik hingga karamel dan harum asap.",
      "Angkat saat daging putih opaque mudah lepas dari duri.",
    ],
    tips: "Bolak-balik lebih dari 2 kali bikin kulit sobek.",
    selamat: "Kerok bagian gosong pahit, oles minyak dan gula, bakar 2 menit.",
    simpan: "Maksimal 1 hari. Oven 180C 10 menit hingga kulit garing lagi.",
  },
  {
    id: "klepon", nama: "Klepon", daerah: "Jawa Tengah", kategori: "camilan",
    waktuTotal: 40, waktuAktif: 30, level: "mudah", porsi: 20, rating: 4.7, dimasak: 1654,
    // Foto: Robijuniarta (CC BY-SA 4.0) — https://commons.wikimedia.org/wiki/File:Klepon_Khas_Tulungagung.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Klepon_Khas_Tulungagung.jpg/1280px-Klepon_Khas_Tulungagung.jpg",
    video: "IBmpksUOywg",
    deskripsi: "Tepung ketan 250 gram diaduk dengan 200 ml air suji sampai kalis. Tiap bola diisi 5 gram gula merah, lalu direbus sampai mengapung dan digulingkan ke kelapa kukus.",
    rasa: "Gula merah 5 gram di tengah bola meleleh waktu digigit. Kelapa parut kukus yang diberi sedikit garam menahan manisnya.", pedas: 0, veg: true, anak: true,
    kalori: "200-250 kkal / 5 butir", protein: "2-3g", pantangan: "Gluten ketan + gula tinggi; lengket untuk balita.",
    sanding: ["Getuk", "Lupis", "Cenil (mix jajan pasar)"],
    minum: "Kopi hitam tanpa gula, diminum setelah dua butir.",
    suasana: "Takjil buka puasa atau arisan sore. Klepon habis sebelum acaranya selesai.",
    bahan: [
      { nama: "tepung ketan", jumlah: 250, satuan: "gram", bagi: 1 },
      { nama: "tepung beras", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "air daun suji", jumlah: 200, satuan: "ml", bagi: 1 },
      { nama: "gula merah sisir", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "kelapa parut kukus", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 1, satuan: "sdt", bagi: 1 },
    ],
    alat: ["Panci", "Mangkuk adon", "Sendok", "Saringan", "Piring", "Parutan"],
    langkah: [
      "Campur ketan dan air suji hingga kalis hijau lentur tidak lengket.",
      "Isi tiap bola 5 gram gula merah, cubit rapat hingga tidak bocor.",
      "Rebus dalam air mendidih hingga mengapung dan permukaan licin mengilap.",
      "Angkat setelah mengapung 1 menit; kenyal ditekan kembali.",
      "Gulingkan ke kelapa asin hingga putih menempel merata.",
    ],
    tips: "Cubitan longgar bikin gula bocor ke air.",
    selamat: "Kecilkan api agar tidak bergolak, angkat yang mengapung lebih cepat.",
    simpan: "1 hari kulkas. Kukus 5 menit hingga kenyal lagi.",
  },
  {
    id: "martabak-manis", nama: "Martabak Manis", daerah: "Jawa Barat", kategori: "camilan",
    waktuTotal: 90, waktuAktif: 30, level: "sedang", porsi: 8, rating: 4.8, dimasak: 2109,
    // Foto: Malikpb (CC BY-SA 4.0) — https://commons.wikimedia.org/wiki/File:Martabak_manis_coklat_keju_khas_indonesia.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Martabak_manis_coklat_keju_khas_indonesia.jpg/1280px-Martabak_manis_coklat_keju_khas_indonesia.jpg",
    video: "RErQc10w2kw",
    bab: [[0, "Intro"], [88, "Persiapan bahan"], [203, "Membuat adonan martabak"], [293, "Membuat martabak"], [439, "Beri topping"], [554, "Hidangan siap dan serving"]],
    deskripsi: "Terigu 250 gram diaduk dengan 300 ml air sampai licin, lalu didiamkan 60 menit. Adonannya dituang ke teflon panas dan dimasak tertutup sampai harum.",
    rasa: "Ragi yang didiamkan 60 menit bikin adonannya berpori dan empuk. Gula yang ditabur di teflon panas meleleh jadi karamel.", pedas: 0, veg: true, anak: true,
    kalori: "400-500 kkal / 2 potong", protein: "8-10g", pantangan: "Gula + gluten + susu/telur.",
    sanding: ["Keju-coklat-kacang", "Pisang + wijen", "Susu kental manis"],
    minum: "Teh wangi hangat, diminum sambil martabak masih panas.",
    suasana: "Malam Minggu pas nonton bola bareng teman. Adonan didiamkan 60 menit, jadi mulai dari sore.",
    bahan: [
      { nama: "tepung terigu", jumlah: 250, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 300, satuan: "ml", bagi: 1 },
      { nama: "gula pasir", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "ragi instan", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "soda kue", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "margarin cair", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "topping coklat keju", jumlah: 100, satuan: "gram", bagi: 1 },
    ],
    alat: ["Teflon martabak", "Mangkok", "Whisker", "Timbangan", "Tutup teflon", "Spatula"],
    langkah: [
      "Aduk terigu dan air hingga licin, diamkan 60 menit hingga berbusa pori.",
      "Panaskan teflon hingga tabur gula langsung karamel mendesis.",
      "Tuang adon, putar pinggir tipis, tutup hingga sarang semut muncul dan permukaan kering.",
      "Tabur gula selagi panas hingga bunyi kres dan meleleh.",
      "Oles margarin hingga mengilap, beri topping dan lipat.",
    ],
    tips: "Teflon kurang panas = bantat tanpa pori.",
    selamat: "Tambah 2 gram soda kue cair, panggang tipis jadi dadar lipat.",
    simpan: "Tanpa topping 2 hari. Panaskan teflon 3 menit hingga wangi lagi.",
  },
  {
    id: "es-cendol", nama: "Es Cendol", daerah: "Jawa Barat", kategori: "camilan",
    waktuTotal: 45, waktuAktif: 30, level: "mudah", porsi: 5, rating: 4.9, dimasak: 1876,
    // Foto: Supardisahabu (CC BY-SA 4.0) — https://commons.wikimedia.org/wiki/File:Es_Dawet.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Es_Dawet.jpg/1280px-Es_Dawet.jpg",
    video: "O7zVoBwMvQc",
    deskripsi: "Tepung beras 100 gram dimasak dengan 500 ml air pandan sampai kental. Santan 500 ml direbus dengan garam sampai harum, lalu disiram ke cendol bersama gula merah cair.",
    rasa: "Gula merah cair 200 gram dituang di dasar gelas. Santan matang yang direbus dengan garam bikin gurih, es serut mendinginkan semuanya.", pedas: 0, veg: true, anak: true,
    kalori: "250-350 kkal", protein: "2-4g", pantangan: "Gula cair tinggi.",
    sanding: ["Pisang goreng", "Mendoan", "Bubur sumsum (paket takjil)"],
    minum: "Es cendolnya sendiri sudah jadi minumannya.",
    suasana: "Siang terik atau pas buka puasa. Cendol dingin bisa langsung diminum.",
    bahan: [
      { nama: "tepung beras", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "tepung tapioka", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "air daun pandan", jumlah: 500, satuan: "ml", bagi: 1 },
      { nama: "santan matang", jumlah: 500, satuan: "ml", bagi: 1 },
      { nama: "gula merah cair", jumlah: 200, satuan: "gram", bagi: 1 },
      { nama: "es serut", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 1, satuan: "sdt", bagi: 1 },
    ],
    alat: ["Panci", "Cetakan cendol", "Mangkuk es", "Whisker", "Saringan", "Gelas"],
    langkah: [
      "Masak tepung dan air pandan sambil aduk hingga kental hijau transparan dan meletup.",
      "Cetak ke air es hingga jadi cacing hijau kenyal mengeras.",
      "Didihkan santan dengan garam hingga harum gurih dan meletup kecil.",
      "Tata es, cendol, gula cair hingga lapisan cokelat-hijau-putih jelas.",
      "Sajikan dingin dengan santan kental melapisi es.",
    ],
    tips: "Berhenti aduk = bergerindil dan cetakan mampet.",
    selamat: "Dinginkan 10 menit, cetak ulang dengan air es baru yang lebih dingin.",
    simpan: "Cendol dalam air matang 1 hari; santan dan gula terpisah 2 hari.",
  },
  // ===== SUMATERA (8) =====
  {
    id: "soto-padang", nama: "Soto Padang", daerah: "Sumatera Barat", kategori: "sarapan",
    waktuTotal: 90, waktuAktif: 40, level: "sedang", porsi: 5, rating: 4.8, dimasak: 1102,
    // Foto: Midori (CC BY 3.0) — https://commons.wikimedia.org/wiki/File:Soto_Padang_1.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Soto_Padang_1.JPG/1280px-Soto_Padang_1.JPG",
    video: "DNnoo3zWcAU",
    deskripsi: "Daging sandung lamur 500 gram direbus dalam 2000 ml air hingga empuk dan kaldunya bening. Dagingnya diiris tipis lalu digoreng hingga kecokelatan, dan kuahnya disiram ke soun.",
    rasa: "Daging direbus lama bersama pala dan serai, jadi kuahnya bening tapi gurih. Daging goreng yang ditabur di atasnya masih renyah di sendok pertama.", pedas: 1, veg: false, anak: true,
    kalori: "300-400 kkal", protein: "18-22g", pantangan: "Kaldu daging: hindari untuk kolesterol dan asam urat.",
    sanding: ["Perkedel kentang", "Kerupuk merah", "Soun"],
    minum: "Es jeruk nipis, diminum sebelum kuahnya habis.",
    suasana: "Sarapan pagi pas hujan. Kuah bisa disiapkan malam sebelumnya.",
    bahan: [
      { nama: "daging sapi sandung lamur", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 2000, satuan: "ml", bagi: 1 },
      { nama: "bawang merah", jumlah: 10, satuan: "siung", bagi: 0 },
      { nama: "bawang putih", jumlah: 6, satuan: "siung", bagi: 0 },
      { nama: "jahe", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "kunyit", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "serai", jumlah: 2, satuan: "batang", bagi: 0 },
      { nama: "daun jeruk", jumlah: 7, satuan: "lembar", bagi: 0 },
      { nama: "pala bubuk", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "soun kering", jumlah: 100, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panci besar", "Wajan", "Blender", "Pisau", "Talenan", "Saringan"],
    langkah: [
      "Rebus daging hingga empuk dan kuah bening kekuningan beraroma kaldu.",
      "Haluskan bawang, jahe, kunyit, pala lalu tumis hingga kuning keemasan dan harum tidak langu.",
      "Masukkan tumisan, serai, daun jeruk. Didihkan hingga kuah jernih berminyak tipis.",
      "Angkat daging, iris tipis lalu goreng garing hingga cokelat keemasan dan renyah di tepi.",
      "Siram soun dan perkedel dengan kuah mendidih hingga soun lunak transparan dan beruap harum.",
      "Taburi seledri dan bawang goreng hingga wangi gurih kecokelatan.",
    ],
    tips: "Kuah keruh dan langu bila bumbu belum matang saat masuk panci.",
    selamat: "Didihkan lagi api kecil sambil buang buih hingga jernih, tambah garam.",
    simpan: "Kuah dan daging terpisah, 3 hari kulkas. Panaskan hingga mendidih.",
  },
  {
    id: "dendeng-balado", nama: "Dendeng Balado", daerah: "Sumatera Barat", kategori: "siang",
    waktuTotal: 120, waktuAktif: 50, level: "sedang", porsi: 5, rating: 4.9, dimasak: 1340,
    // Foto: Midori (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Dendeng_balado.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Dendeng_balado.JPG/1280px-Dendeng_balado.JPG",
    video: "NIrfLm7EOsI",
    deskripsi: "Irisan daging has dalam 500 gram diungkep dengan 500 ml air kelapa sampai menyusut. Dendengnya digoreng hingga kecokelatan, lalu dibalur sambal 15 cabai yang ditumis sampai harum.",
    rasa: "Cabai keriting 15 biji ditumbuk kasar bareng tomat. Minyak merah dari sambal itu meresap ke dendeng yang sudah digoreng garing.", pedas: 3, veg: false, anak: false,
    kalori: "400-500 kkal", protein: "25-30g", pantangan: "Asin dan pedas: tidak untuk hipertensi dan maag akut.",
    sanding: ["Nasi hangat", "Daun singkong rebus", "Gulai nangka"],
    minum: "Es teh manis, disiapkan sebelum makan karena pedasnya kuat.",
    suasana: "Makan siang bareng keluarga, pakai nasi hangat. Siapkan air dingin di meja.",
    bahan: [
      { nama: "daging sapi has dalam", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "air kelapa", jumlah: 500, satuan: "ml", bagi: 1 },
      { nama: "cabai merah keriting", jumlah: 15, satuan: "buah", bagi: 0 },
      { nama: "bawang merah", jumlah: 8, satuan: "siung", bagi: 0 },
      { nama: "bawang putih", jumlah: 3, satuan: "siung", bagi: 0 },
      { nama: "tomat merah", jumlah: 1, satuan: "buah", bagi: 0 },
      { nama: "daun jeruk", jumlah: 2, satuan: "lembar", bagi: 0 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "kaldu sapi bubuk", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "minyak goreng", jumlah: 100, satuan: "ml", bagi: 1 },
    ],
    alat: ["Panci ungkep", "Cobek", "Wajan", "Pisau", "Talenan", "Pemukul daging"],
    langkah: [
      "Iris daging tipis 0,5 cm lalu pukul hingga serat merekah dan pipih merata.",
      "Ungkep dengan air kelapa dan garam hingga air susut dan daging empuk kecokelatan.",
      "Goreng dendeng hingga cokelat gelap garing di tepi dan mendesis kering.",
      "Tumbuk kasar cabai, bawang, tomat lalu tumis hingga merah gelap berminyak dan harum pedas.",
      "Masukkan dendeng ke sambal, aduk hingga menempel lembap berminyak.",
      "Koreksi rasa hingga asin pedas segar dan minyak merah jernih.",
    ],
    tips: "Dendeng alot bila irisan tebal dan ungkep kurang lama.",
    selamat: "Rebus kembali dalam air kelapa 15 menit hingga empuk, goreng ulang sebentar.",
    simpan: "Dengan minyak sambal, 5 hari kulkas. Hangatkan di wajan.",
  },
  {
    id: "gulai-ikan-kakap", nama: "Gulai Ikan Kakap", daerah: "Sumatera Barat", kategori: "siang",
    waktuTotal: 60, waktuAktif: 30, level: "mudah", porsi: 4, rating: 4.7, dimasak: 890,
    // Foto: Abdul Hanif Arromy (CC BY 4.0) — https://commons.wikimedia.org/wiki/File:Gulai_Kakap_101611.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Gulai_Kakap_101611.jpg/1280px-Gulai_Kakap_101611.jpg",
    video: "4DZDDTys_Ng",
    deskripsi: "Ikan kakap 800 gram dilumuri air jeruk nipis dan garam dulu supaya lendirnya hilang. Bumbu kunyitnya ditumis sampai harum, lalu santannya dituang dan dimasak api kecil sampai berminyak.",
    rasa: "Kunyit dan jahe ditumis dulu, jadi kuah santannya hangat dan tidak amis. Kakapnya lepas dari duri dan manis karena kuah meresap di api kecil.", pedas: 2, veg: false, anak: false,
    kalori: "450-550 kkal", protein: "28-32g", pantangan: "Santan: batasi untuk kolesterol dan alergi ikan laut.",
    sanding: ["Nasi hangat", "Sambal hijau", "Lalapan timun"],
    minum: "Jeruk hangat tawar, diminum sambil suapan ikan.",
    suasana: "Siang hari pas keluarga kumpul. Empat porsi cukup untuk makan siang bareng.",
    bahan: [
      { nama: "ikan kakap merah", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "santan sedang", jumlah: 500, satuan: "ml", bagi: 1 },
      { nama: "santan kental", jumlah: 150, satuan: "ml", bagi: 1 },
      { nama: "cabai merah keriting", jumlah: 10, satuan: "buah", bagi: 0 },
      { nama: "bawang merah", jumlah: 8, satuan: "siung", bagi: 0 },
      { nama: "bawang putih", jumlah: 4, satuan: "siung", bagi: 0 },
      { nama: "kunyit", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "jahe", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "serai", jumlah: 2, satuan: "batang", bagi: 0 },
      { nama: "daun jeruk", jumlah: 5, satuan: "lembar", bagi: 0 },
    ],
    alat: ["Wajan besar", "Blender", "Pisau", "Talenan", "Sendok kayu", "Mangkuk"],
    langkah: [
      "Lumuri ikan dengan air jeruk nipis dan garam hingga lendir hilang dan amis berkurang.",
      "Tumis bumbu halus, serai, daun jeruk hingga kuning oranye dan harum tajam.",
      "Tuang santan sedang, aduk perlahan hingga mendidih lembut dan tidak pecah.",
      "Masukkan ikan, masak api kecil hingga daging putih padat dan kuah kuning kental berminyak.",
      "Tuang santan kental, masak hingga mengilap dan beraroma santan matang.",
      "Cicipi hingga asin gurih seimbang dan ikan tidak hancur disendok.",
    ],
    tips: "Santan pecah dan amis bila api besar dan jarang diaduk.",
    selamat: "Kecilkan api, aduk satu arah, tambah 50 ml santan hangat.",
    simpan: "Maksimal 2 hari kulkas. Panaskan api kecil agar tidak pecah.",
  },
  {
    id: "ayam-pop", nama: "Ayam Pop", daerah: "Sumatera Barat", kategori: "siang",
    waktuTotal: 90, waktuAktif: 30, level: "sedang", porsi: 4, rating: 4.8, dimasak: 1023,
    // Foto: Midori (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Ayam_pop.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ayam_pop.JPG/1280px-Ayam_pop.JPG",
    video: "tWi78v_Kl3s",
    deskripsi: "Ayam kampung muda 800 gram diungkep dalam 1000 ml air kelapa hingga empuk dan kuahnya menyusut. Ayamnya didiamkan 20 menit sampai kesat, lalu digoreng sebentar hingga kecokelatan.",
    rasa: "Air kelapa 1000 ml dipakai mengungkep ayam, dan itu yang bikin gurihnya beda. Sambal tomat ditumis sampai merah pekat, pedasnya tidak tajam.", pedas: 0, veg: false, anak: true,
    kalori: "350-450 kkal", protein: "28-32g", pantangan: "Batasi sambal dan kuah santan untuk hipertensi.",
    sanding: ["Sambal merah padang", "Daun singkong rebus", "Nasi hangat"],
    minum: "Es teh tawar, diminum sambil makan ayam pop.",
    suasana: "Makan siang santai di rumah. Sambal tomat disiapkan terpisah kalau ada anak.",
    bahan: [
      { nama: "ayam kampung muda", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "air kelapa", jumlah: 1000, satuan: "ml", bagi: 1 },
      { nama: "santan", jumlah: 50, satuan: "ml", bagi: 1 },
      { nama: "bawang putih", jumlah: 6, satuan: "siung", bagi: 0 },
      { nama: "daun salam", jumlah: 3, satuan: "lembar", bagi: 0 },
      { nama: "serai", jumlah: 2, satuan: "batang", bagi: 0 },
      { nama: "jahe", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "kaldu jamur", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "minyak goreng", jumlah: 500, satuan: "ml", bagi: 1 },
    ],
    alat: ["Panci ungkep", "Wajan", "Cobek", "Pisau", "Talenan", "Penjepit"],
    langkah: [
      "Lumuri ayam dengan bawang putih dan garam hingga meresap dan bau mentah hilang.",
      "Ungkep dalam air kelapa, santan, salam, serai hingga empuk pucat dan kuah menyusut.",
      "Diamkan 20 menit hingga permukaan kesat dan bumbu meresap.",
      "Goreng sebentar dalam minyak panas hingga kulit putih kekuningan dan lembut tidak kering.",
      "Masak sambal tomat hingga merah pekat berminyak dan harum tidak langu.",
      "Sajikan dengan siraman minyak bawang hingga mengilap wangi gurih.",
    ],
    tips: "Ayam keras hambar bila air kelapa kurang dan ungkep singkat.",
    selamat: "Ungkep ulang 15 menit dengan air kelapa panas hingga empuk.",
    simpan: "Ayam ungkep belum goreng 3 hari kulkas. Goreng saat disajikan.",
  },
  {
    id: "mie-aceh", nama: "Mie Aceh", daerah: "Aceh", kategori: "malam",
    waktuTotal: 45, waktuAktif: 35, level: "sedang", porsi: 2, rating: 4.9, dimasak: 1567,
    // Foto: Yasmina Haryono (CC BY-SA 2.0) — https://commons.wikimedia.org/wiki/File:Mie_Aceh_with_crab.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Mie_Aceh_with_crab.jpg",
    video: "OGtn3u23Yjw",
    bab: [[0, "Intro"], [70, "Persiapan bahan"], [174, "Membuat bumbu halus"], [210, "Membuat acar bawang merah"], [240, "Potong bahan lain"], [266, "Membuat mie aceh"], [411, "Hidangan siap dan serving"]],
    deskripsi: "Mie kuning 500 gram direbus 2 menit lalu ditiriskan supaya tidak lembek. Bumbu karinya ditumis sampai harum, lalu daging 200 gram dan udang dimasak bersama 800 ml kaldu sampai menyusut.",
    rasa: "Cabai kering 50 gram digiling bersama kunyit, dan itu sumber pedasnya. Acar bawang dan timun di samping bikin suapan berikutnya segar.", pedas: 3, veg: false, anak: false,
    kalori: "500-650 kkal", protein: "22-28g", pantangan: "Tidak untuk maag dan alergi seafood bila pakai udang.",
    sanding: ["Acar bawang timun", "Emping melinjo", "Kerupuk"],
    minum: "Es timun serut, diminum sambil makan.",
    suasana: "Malam hari pas kumpul teman. Acar dan emping disiapkan di mangkuk kecil sebelum menyajikan.",
    bahan: [
      { nama: "mie basah kuning", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "daging sapi iris tipis", jumlah: 200, satuan: "gram", bagi: 1 },
      { nama: "udang kupas", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 80, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "cabai merah kering", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "kunyit", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "kol", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "tauge", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "kaldu sapi", jumlah: 800, satuan: "ml", bagi: 1 },
    ],
    alat: ["Wajan besar", "Blender", "Pisau", "Talenan", "Sutil", "Mangkuk saji"],
    langkah: [
      "Rebus mie 2 menit hingga kenyal tidak lembek lalu tiriskan hingga kesat.",
      "Tumis bumbu halus hingga merah gelap berminyak dan harum rempah tajam.",
      "Masukkan daging dan udang, tumis hingga daging kecokelatan dan udang oranye melengkung.",
      "Tuang kaldu, masukkan mie dan kol hingga kuah menyusut dan mie merah merata.",
      "Masukkan tauge dan tomat, masak hingga tauge renyah hijau segar dan kuah mengilap.",
      "Sajikan dengan acar dan emping hingga wangi kari pedas tercium.",
    ],
    tips: "Mie lembek dan bumbu langu bila mie direbus lama dan bumbu kurang matang.",
    selamat: "Tiriskan cepat, tumis ulang api besar hingga air susut dan bumbu menempel.",
    simpan: "Mie dan kuah terpisah 1 hari kulkas. Tumis ulang dengan sedikit air.",
  },
  {
    id: "saksang", nama: "Saksang", daerah: "Sumatera Utara", kategori: "siang",
    waktuTotal: 90, waktuAktif: 60, level: "sulit", porsi: 6, rating: 4.6, dimasak: 432,
    // Foto: Andreas Sihono (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Saksang.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/83/Saksang.jpg",
    video: "UkAOKQhLyHw",
    deskripsi: "Kelapa parut 50 gram disangrai sampai harum lalu dihaluskan. Bumbu andaliman 30 gram ditumis sampai harum, lalu daging 1 kg dimasak dalam 400 ml santan sampai berminyak.",
    rasa: "Andaliman 30 gram bikin getir dan kesemutan di lidah. Kelapa gongseng yang disangrai sampai cokelat gelap menambah gurih berasap.", pedas: 2, veg: false, anak: false,
    kalori: "500-600 kkal", protein: "22-28g", pantangan: "Non-halal. Tidak untuk kolesterol dan darah tinggi.",
    sanding: ["Nasi putih", "Daun singkong tumbuk", "Sambal andaliman"],
    minum: "Teh pahit hangat, diminum setelah suapan daging.",
    suasana: "Pesta adat Batak, dimakan bareng nasi. Keluarga besar masak dalam jumlah banyak.",
    bahan: [
      { nama: "daging campur lemak", jumlah: 1000, satuan: "gram", bagi: 1 },
      { nama: "santan", jumlah: 400, satuan: "ml", bagi: 1 },
      { nama: "andaliman", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "cabai merah", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 10, satuan: "siung", bagi: 0 },
      { nama: "bawang putih", jumlah: 6, satuan: "siung", bagi: 0 },
      { nama: "jahe", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "serai", jumlah: 2, satuan: "batang", bagi: 0 },
      { nama: "kelapa gongseng", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 15, satuan: "gram", bagi: 1 },
    ],
    alat: ["Wajan besar", "Blender", "Pisau", "Talenan", "Sendok kayu", "Mangkuk"],
    langkah: [
      "Sangrai kelapa parut hingga cokelat gelap harum kacang lalu haluskan.",
      "Tumis bumbu halus dan andaliman hingga cokelat kemerahan dan harum getir khas.",
      "Masukkan daging, aduk hingga permukaan pucat kesat dan sari keluar.",
      "Tuang santan, masak api kecil hingga empuk dan kuah cokelat kental berminyak.",
      "Masukkan kelapa gongseng, aduk hingga kuah pekat gelap mendidih lembut.",
      "Masak hingga amis hilang berganti aroma andaliman pedas dan daging lunak.",
    ],
    tips: "Amis dan pahit bila bahan kurang segar dan andaliman kebanyakan.",
    selamat: "Tambah santan panas, masak lebih lama hingga tajam berkurang dan gurih keluar.",
    simpan: "Maksimal 3 hari kulkas. Panaskan hingga mendidih.",
  },
  {
    id: "arsik-ikan-mas", nama: "Arsik Ikan Mas", daerah: "Sumatera Utara", kategori: "siang",
    waktuTotal: 90, waktuAktif: 30, level: "sedang", porsi: 4, rating: 4.8, dimasak: 765,
    // Foto: Gunawan Kartapranata (CC BY-SA 4.0) — https://commons.wikimedia.org/wiki/File:Arsik_Ikan_Mas_2.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Arsik_Ikan_Mas_2.jpg/1280px-Arsik_Ikan_Mas_2.jpg",
    video: "ejgo86-IOSg",
    deskripsi: "Kuali dialasi serai dan lokio 150 gram supaya ikannya tidak gosong. Ikan mas 1 kg dilumuri bumbu kunyit dan andaliman, lalu dimasak tertutup dengan 700 ml air sampai menyusut.",
    rasa: "Asam gelugur 20 gram disusun di dasar kuali, jadi asamnya naik dari bawah. Lokio dan serai yang jadi alas bikin daging ikannya beraroma segar.", pedas: 2, veg: false, anak: false,
    kalori: "300-400 kkal", protein: "28-32g", pantangan: "Hati-hati duri untuk anak; batasi untuk asam urat.",
    sanding: ["Nasi hangat", "Sambal andaliman", "Lalapan kemangi"],
    minum: "Jeruk nipis hangat, diminum sambil suapan ikan.",
    suasana: "Acara keluarga besar, sering dimasak sehari sebelumnya. Hati-hati durinya kalau ada anak.",
    bahan: [
      { nama: "ikan mas utuh", jumlah: 1000, satuan: "gram", bagi: 1 },
      { nama: "bawang batak lokio", jumlah: 150, satuan: "gram", bagi: 1 },
      { nama: "kacang panjang", jumlah: 150, satuan: "gram", bagi: 1 },
      { nama: "andaliman", jumlah: 25, satuan: "gram", bagi: 1 },
      { nama: "cabai merah keriting", jumlah: 15, satuan: "buah", bagi: 0 },
      { nama: "kunyit", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "jahe", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "serai", jumlah: 3, satuan: "batang", bagi: 0 },
      { nama: "air", jumlah: 700, satuan: "ml", bagi: 1 },
      { nama: "asam gelugur", jumlah: 20, satuan: "gram", bagi: 1 },
    ],
    alat: ["Kuali cekung", "Blender", "Pisau", "Talenan", "Tutup panci", "Sutil"],
    langkah: [
      "Alasi kuali dengan serai dan lokio hingga menutup dasar agar tidak gosong.",
      "Lumuri ikan bumbu halus hingga kuning merata dan bau rempah segar.",
      "Susun ikan, kacang, asam gelugur lalu tuang air hingga setengah badan terendam.",
      "Masak api kecil tertutup hingga air menyusut dan bumbu meresap kuning tua.",
      "Masak hingga sisik renyah, daging padat putih, kuah tinggal berminyak.",
      "Angkat saat harum andaliman keluar dan dasar berkerak tipis kecokelatan.",
    ],
    tips: "Ikan hancur dan pahit empedu bila api besar dan empedu pecah.",
    selamat: "Kecilkan api, jangan diaduk, tambah air panas sedikit hingga matang merata.",
    simpan: "3 hari kulkas. Kukus ulang hingga panas merata.",
  },
  {
    id: "tempoyak-patin", nama: "Tempoyak Ikan Patin", daerah: "Sumatera Selatan", kategori: "siang",
    waktuTotal: 45, waktuAktif: 25, level: "mudah", porsi: 4, rating: 4.7, dimasak: 689,
    // Foto: bingregory from Kuching, Malaysia (CC BY 2.0) — https://commons.wikimedia.org/wiki/File:Tempoyak.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Tempoyak.jpg",
    video: "PtzdPsEpEuk",
    deskripsi: "Ikan patin 800 gram dilumuri air jeruk nipis sampai lendirnya kesat. Tempoyak 100 gram ditumis dengan bumbu kunyit sampai harum, lalu ikan dimasak dalam 800 ml air sampai menyusut.",
    rasa: "Tempoyak 100 gram ditumis dulu bersama kunyit, dan itu sumber asamnya. Lemak ikan patin bikin kuahnya gurih dan agak pekat.", pedas: 3, veg: false, anak: false,
    kalori: "400-500 kkal", protein: "25-30g", pantangan: "Batasi untuk kolesterol, asam urat, sensitif bau durian.",
    sanding: ["Nasi hangat", "Lalapan petai", "Sambal terasi"],
    minum: "Es sirsak dingin, diminum sambil makan.",
    suasana: "Tengah hari pas ingin makan pedas. Buka jendela dapur, bau duriannya kuat.",
    bahan: [
      { nama: "ikan patin potong", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "tempoyak durian", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "cabai merah keriting", jumlah: 10, satuan: "buah", bagi: 0 },
      { nama: "bawang merah", jumlah: 8, satuan: "siung", bagi: 0 },
      { nama: "bawang putih", jumlah: 3, satuan: "siung", bagi: 0 },
      { nama: "kunyit", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "serai", jumlah: 2, satuan: "batang", bagi: 0 },
      { nama: "daun kunyit", jumlah: 1, satuan: "lembar", bagi: 0 },
      { nama: "air", jumlah: 800, satuan: "ml", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panci", "Blender", "Pisau", "Talenan", "Sendok kayu", "Mangkuk"],
    langkah: [
      "Cuci patin dengan jeruk nipis hingga lendir kesat dan amis berkurang.",
      "Tumis bumbu halus, serai, daun kunyit hingga kuning oranye dan harum tajam.",
      "Masukkan tempoyak, aduk hingga larut dan tercium asam manis fermentasi.",
      "Tuang air, didihkan hingga kuah kuning keruh bergelembung kecil.",
      "Masukkan ikan, masak api sedang hingga daging putih padat dan kuah kental asam pedas.",
      "Angkat saat minyak naik ke permukaan dan aroma asam pedas gurih menyengat sedap.",
    ],
    tips: "Amis menyengat bila ikan kurang bersih dan tempoyak terlalu tua.",
    selamat: "Tambah daun kunyit, didihkan 5 menit lagi hingga aroma segar keluar.",
    simpan: "2 hari kulkas, makin meresap. Panaskan hingga mendidih.",
  },
  // ===== JAWA + KALIMANTAN (8) =====
  {
    id: "nasi-liwet-solo", nama: "Nasi Liwet Solo", daerah: "Jawa Tengah", kategori: "malam",
    waktuTotal: 60, waktuAktif: 30, level: "mudah", porsi: 4, rating: 4.8, dimasak: 987,
    // Foto: ESCapade (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Nasi_Liwet_A.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Nasi_Liwet_A.JPG",
    video: "TVzSvLZw-M4",
    deskripsi: "Beras 400 gram diaron dengan 600 ml santan sampai menyusut. Setelah itu dikukus 20 menit hingga empuk dan pulen, lalu disajikan dengan ayam goreng dan lodeh labu.",
    rasa: "Santan diaron bersama beras, jadi gurihnya merata sampai butir bawah. Bawang merah iris yang ditumis sampai kuning bikin wangi manis.", pedas: 0, veg: false, anak: true,
    kalori: "450-550 kkal", protein: "14-18g", pantangan: "Santan + ayam berlemak: batasi untuk kolesterol.",
    sanding: ["Ayam suwir", "Sayur lodeh labu", "Kerupuk"],
    minum: "Wedang jahe hangat, diminum setelah suapan nasi.",
    suasana: "Makan malam lesehan bareng keluarga. Ayam dan lodeh dimasak lebih dulu, nasi dikukus menjelang makan.",
    bahan: [
      { nama: "beras", jumlah: 400, satuan: "gram", bagi: 1 },
      { nama: "santan sedang", jumlah: 600, satuan: "ml", bagi: 1 },
      { nama: "ayam kampung potong", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "labu siam potong", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "daun salam", jumlah: 3, satuan: "lembar", bagi: 0 },
      { nama: "serai memarkan", jumlah: 1, satuan: "batang", bagi: 0 },
      { nama: "bawang merah iris", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "bawang putih iris", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "gula pasir", jumlah: 5, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panci", "Kukusan", "Wajan", "Pisau", "Talenan", "Saringan santan"],
    langkah: [
      "Rebus beras, santan, salam, serai hingga santan asat dan beras setengah mekar.",
      "Kukus beras aron 20 menit hingga pulen tidak berair.",
      "Goreng ayam hingga kulit kuning keemasan dan daging matang.",
      "Tumis duo bawang hingga kuning kecokelatan dan harum.",
      "Masak labu dengan santan encer hingga mendidih dan labu empuk.",
      "Sajikan nasi dengan ayam suwir dan sayur lodeh.",
    ],
    tips: "Nasi lembek bila santan berlebih dan api terlalu besar.",
    selamat: "Kukus ulang 10 menit dengan tutup kain bila masih berair.",
    simpan: "Nasi dan lauk terpisah 2 hari kulkas. Panaskan dengan kukus.",
  },
  {
    id: "pecel-madiun", nama: "Pecel Madiun", daerah: "Jawa Timur", kategori: "sarapan",
    waktuTotal: 40, waktuAktif: 25, level: "mudah", porsi: 4, rating: 4.7, dimasak: 1120,
    // Foto: Hariadhi (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Pecel_Hariadhi.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pecel_Hariadhi.JPG/1280px-Pecel_Hariadhi.JPG",
    video: "DQPYJyTwWsU",
    bab: [[0, "Intro"], [17, "Buat bumbu kacang"], [48, "Cara buat serundeng"], [93, "Campur semua bahan"], [205, "Hasil jadi"], [207, "Resep lengkap"]],
    deskripsi: "Kacang tanah 250 gram disangrai sampai harum dan kulitnya terkelupas. Sambalnya digiling dengan 100 gram gula merah, lalu disiram ke sayur yang direbus 3 menit hingga empuk.",
    rasa: "Kacang tanah 250 gram disangrai dulu sebelum digiling. Air asam jawa 20 ml menahan manis gula merah yang larut di sambalnya.", pedas: 3, veg: true, anak: false,
    kalori: "350-450 kkal", protein: "10-14g", pantangan: "Alergi kacang dan asam urat: batasi.",
    sanding: ["Tempe goreng", "Tahu bacem", "Rempeyek"],
    minum: "Es teh melati, diminum setelah sambal habis.",
    suasana: "Pagi sebelum kerja, siap dalam 40 menit. Sambal bisa dibuat lebih banyak dan disimpan di toples.",
    bahan: [
      { nama: "kacang tanah goreng", jumlah: 250, satuan: "gram", bagi: 1 },
      { nama: "gula merah sisir", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "cabai merah keriting", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "cabai rawit merah", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "bawang putih goreng", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "daun jeruk", jumlah: 10, satuan: "lembar", bagi: 0 },
      { nama: "garam", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "air asam jawa", jumlah: 20, satuan: "ml", bagi: 1 },
      { nama: "kangkung rebus", jumlah: 200, satuan: "gram", bagi: 1 },
      { nama: "tauge rebus", jumlah: 200, satuan: "gram", bagi: 1 },
    ],
    alat: ["Wajan", "Ulekan atau blender", "Panci rebus", "Saringan", "Pisau", "Cobek"],
    langkah: [
      "Sangrai kacang hingga kuning kecokelatan dan kulit terkelupas.",
      "Goreng cabai, bawang, daun jeruk hingga layu dan harum.",
      "Giling semua bumbu hingga halus berminyak dan tercampur rata.",
      "Encerkan dengan 100 ml air panas hingga kental melapis sendok.",
      "Rebus sayur 2-3 menit hingga hijau cerah dan renyah.",
      "Siram sayur dengan sambal encer hangat.",
    ],
    tips: "Sambal tengik bila kacang kurang matang atau berminyak apek.",
    selamat: "Sangrai ulang sambal 5 menit hingga kering bila terlalu pahit.",
    simpan: "Sambal kering 14 hari di toples kedap, sayur 1 hari kulkas.",
  },
  {
    id: "tahu-campur", nama: "Tahu Campur Lamongan", daerah: "Jawa Timur", kategori: "siang",
    waktuTotal: 90, waktuAktif: 50, level: "sedang", porsi: 4, rating: 4.8, dimasak: 876,
    // Foto: Veriyanta Kusuma (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Tahu_Campur.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Tahu_Campur.jpg",
    video: "DuskwJbiKE0",
    deskripsi: "Sengkel sapi direbus 60 menit hingga empuk, lalu kuah petis udang yang sudah didihkan disiram ke tahu, mi, dan tauge.",
    rasa: "Petis udang diaduk ke kaldu sengkel, dan itu yang bikin gurihnya dalam. Daging yang direbus sampai kaldu keruh menambah manis.", pedas: 2, veg: false, anak: false,
    kalori: "500-650 kkal", protein: "20-25g", pantangan: "Petis + kaldu tinggi natrium: hindari untuk hipertensi.",
    sanding: ["Lento singkong", "Kerupuk udang", "Sambal petis"],
    minum: "Es jeruk nipis, diminum sambil makan.",
    suasana: "Siang hari Minggu, dimakan bareng lento singkong yang baru diangkat dari wajan.",
    bahan: [
      { nama: "daging sengkel sapi", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "tahu putih goreng", jumlah: 3, satuan: "buah", bagi: 0 },
      { nama: "tauge rebus", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "mi kuning basah", jumlah: 150, satuan: "gram", bagi: 1 },
      { nama: "petis udang", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang putih goreng", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "singkong parut", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "ketumbar sangrai", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "air kaldu", jumlah: 1500, satuan: "ml", bagi: 1 },
    ],
    alat: ["Panci besar", "Wajan", "Ulekan", "Saringan", "Pisau", "Talenan"],
    langkah: [
      "Rebus sengkel 60 menit hingga empuk dan kaldu keruh gurih.",
      "Goreng adonan lento hingga cokelat keemasan dan garing luar.",
      "Haluskan petis dan bawang dengan kaldu hingga larut licin.",
      "Didihkan kuah petis hingga meletup dan harum.",
      "Tata tahu, mi, tauge, daging di mangkok.",
      "Siram kuah panas dan taburi lento hancur.",
    ],
    tips: "Kuah encer dan amis bila petis murahan dan kaldu kurang pekat.",
    selamat: "Tambah 30 gram petis, didihkan 5 menit bila kurang gurih.",
    simpan: "Kuah 2 hari kulkas, lento dan tahu 1 hari.",
  },
  {
    id: "bakso-malang", nama: "Bakso Malang", daerah: "Jawa Timur", kategori: "malam",
    waktuTotal: 75, waktuAktif: 45, level: "sedang", porsi: 5, rating: 4.9, dimasak: 2034,
    // Foto: Bajinra (CC0) — https://commons.wikimedia.org/wiki/File:Bakso_Indonesian_Meatball_Soup_from_Solo.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bakso_Indonesian_Meatball_Soup_from_Solo.jpg/1280px-Bakso_Indonesian_Meatball_Soup_from_Solo.jpg",
    video: "gqcRtvIFArA",
    bab: [[0, "Intro"], [73, "Persiapan bahan"], [123, "Keringkan dan potong daging"], [163, "Membuat adonan bakso"], [278, "Membuat kuah bakso"], [381, "Rebus sawi hijau"], [412, "Bentuk bakso menjadi bulat dan mas"], [490, "Hidangan siap dan serving"]],
    deskripsi: "Daging sapi giling diaduk bersama 100 gram es serut sampai lengket, lalu tapioka dicampur hingga kalis dan bulatannya direbus sampai mengapung.",
    rasa: "Daging digiling bersama es serut dan bawang putih goreng, jadi baksonya kenyal. Asin dari kaldu tulang terasa di kuahnya.", pedas: 1, veg: false, anak: true,
    kalori: "400-500 kkal", protein: "20-25g", pantangan: "Daging merah: batasi untuk asam urat dan hipertensi.",
    sanding: ["Pangsit goreng", "Tahu bakso", "Siomay kukus"],
    minum: "Es teh tawar, diminum sambil kuah masih panas.",
    suasana: "Malam hujan saat semua orang malas keluar rumah. Rebus sendiri di dapur.",
    bahan: [
      { nama: "daging sapi giling", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "es batu serut", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "tepung tapioka", jumlah: 80, satuan: "gram", bagi: 1 },
      { nama: "telur ayam", jumlah: 1, satuan: "butir", bagi: 0 },
      { nama: "bawang putih goreng", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "merica bubuk", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "air kaldu tulang", jumlah: 2000, satuan: "ml", bagi: 1 },
      { nama: "mi kuning rebus", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "pangsit rebus", jumlah: 100, satuan: "gram", bagi: 1 },
    ],
    alat: ["Chopper", "Panci besar", "Mangkok es", "Saringan", "Pisau", "Sendok"],
    langkah: [
      "Giling daging, es, telur hingga lengket dan halus.",
      "Campur tapioka dan bumbu hingga kalis tidak menempel tangan.",
      "Bentuk bulat, rebus hingga mengapung dan kenyal.",
      "Didihkan kaldu dengan bawang hingga bening dan harum.",
      "Rebus pelengkap hingga mi lentur dan pangsit mengapung.",
      "Sajikan bakso dengan kuah mendidih dan taburan seledri.",
    ],
    tips: "Bakso lembek bila es berlebih dan kurang ulen.",
    selamat: "Tambah 20 gram tapioka, dinginkan 15 menit bila adonan lembek.",
    simpan: "Bakso matang 3 hari kulkas, kuah 2 hari terpisah.",
  },
  {
    id: "soto-banjar", nama: "Soto Banjar", daerah: "Kalimantan Selatan", kategori: "sarapan",
    waktuTotal: 70, waktuAktif: 40, level: "sedang", porsi: 6, rating: 4.8, dimasak: 743,
    // Foto: Gunawan Kartapranata (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Soto_Banjar.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Soto_Banjar.JPG/1280px-Soto_Banjar.JPG",
    video: "_bqjUsDmeWE",
    deskripsi: "Ayam kampung direbus 30 menit hingga empuk, lalu bumbu yang ditumis bersama kapulaga dan kayu manis dituang ke kaldu sampai harum.",
    rasa: "Kaldu ayam kampung direbus 30 menit, jadi kuahnya ringan. Kapulaga dan kayu manis menyumbang wangi hangat.", pedas: 1, veg: false, anak: true,
    kalori: "300-400 kkal", protein: "18-22g", pantangan: "Kurangi santan dan kuning telur untuk kolesterol.",
    sanding: ["Ketupat", "Telur rebus", "Perkedel kentang"],
    minum: "Teh hangat dengan jeruk nipis, diminum sebelum berangkat.",
    suasana: "Pagi sebelum berangkat kerja, waktu semua orang masih sempat duduk semeja.",
    bahan: [
      { nama: "ayam kampung potong", jumlah: 1000, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 2500, satuan: "ml", bagi: 1 },
      { nama: "bawang merah goreng", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "jahe memarkan", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "kapulaga", jumlah: 5, satuan: "butir", bagi: 0 },
      { nama: "cengkeh", jumlah: 3, satuan: "butir", bagi: 0 },
      { nama: "kayu manis", jumlah: 2, satuan: "cm", bagi: 0 },
      { nama: "garam", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "soun seduh", jumlah: 100, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panci besar", "Wajan", "Ulekan", "Saringan", "Pisau", "Kain rempah"],
    langkah: [
      "Rebus ayam 30 menit hingga empuk dan kaldu kuning bening.",
      "Tumis bumbu halus dan rempah hingga kuning harum dan berminyak.",
      "Masukkan tumisan ke kaldu, didihkan 15 menit hingga harum.",
      "Angkat ayam lalu suwir hingga serat lepas dan kering.",
      "Racik soun, telur, dan ayam di mangkok.",
      "Siram kuah mendidih dan taburi bawang goreng.",
    ],
    tips: "Kuah keruh dan anyir bila ayam tidak direbus buang darah awal.",
    selamat: "Saring kuah, tambah jahe bakar bila terlanjur amis.",
    simpan: "Kaldu 2 hari kulkas, suwiran ayam 2 hari terpisah.",
  },
  {
    id: "ketupat-kandangan", nama: "Ketupat Kandangan", daerah: "Kalimantan Selatan", kategori: "siang",
    waktuTotal: 80, waktuAktif: 45, level: "sedang", porsi: 4, rating: 4.7, dimasak: 521,
    // Foto: Midori (CC BY 3.0) — https://commons.wikimedia.org/wiki/File:Katupat_Kandangan_in_Kandangan.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Katupat_Kandangan_in_Kandangan.JPG/1280px-Katupat_Kandangan_in_Kandangan.JPG",
    video: "AcSi9ZqfjD8",
    deskripsi: "Ikan gabus dilumuri air asam jawa 10 menit lalu dibakar hingga kecokelatan, dan kuah santannya dituang ke atas ketupat.",
    rasa: "Air asam jawa meresap ke ikan gabus sebelum dibakar. Gurih santan muncul setelah bumbunya ditumis sampai pecah minyak.", pedas: 2, veg: false, anak: false,
    kalori: "500-600 kkal", protein: "22-26g", pantangan: "Alergi ikan air tawar dan hipertensi: hindari.",
    sanding: ["Ikan gabus panggang", "Sayur nangka", "Sambal binjai"],
    minum: "Es teh lemon, diminum sambil suapan kuah.",
    suasana: "Makan siang hari raya, waktu ketupat masih menumpuk di dapur.",
    bahan: [
      { nama: "ketupat janur matang", jumlah: 4, satuan: "buah", bagi: 0 },
      { nama: "ikan gabus potong", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "santan sedang", jumlah: 500, satuan: "ml", bagi: 1 },
      { nama: "bawang merah", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "kemiri sangrai", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "kunyit bakar", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "air asam jawa", jumlah: 10, satuan: "ml", bagi: 1 },
      { nama: "serai memarkan", jumlah: 2, satuan: "batang", bagi: 0 },
    ],
    alat: ["Wajan", "Panci", "Blender bumbu", "Panggangan", "Pisau", "Sutil"],
    langkah: [
      "Lumuri ikan dengan asam dan garam 10 menit hingga lendir hilang.",
      "Panggang ikan hingga kulit kecokelatan dan daging kokoh.",
      "Tumis bumbu halus hingga kuning keemasan dan pecah minyak.",
      "Masukkan santan, didihkan hingga kental melapis sendok.",
      "Masukkan ikan, masak 10 menit hingga bumbu meresap.",
      "Sajikan ketupat potong disiram kuah ikan panas.",
    ],
    tips: "Ikan hancur bila santan mendidih terlalu keras.",
    selamat: "Angkat ikan, kentalkan kuah lalu masukkan kembali.",
    simpan: "Kuah ikan 2 hari kulkas, ketupat 1 hari suhu ruang.",
  },
  {
    id: "ayam-cincane", nama: "Ayam Cincane", daerah: "Kalimantan Timur", kategori: "malam",
    waktuTotal: 90, waktuAktif: 30, level: "mudah", porsi: 4, rating: 4.8, dimasak: 634,
    // Foto: Kitabmasakan.com (GFDL) — https://commons.wikimedia.org/wiki/File:Ayam-cincane.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Ayam-cincane.jpg",
    video: "sEOpyxiwyaw",
    deskripsi: "Ayamnya diungkep dengan 400 ml santan sampai kuahnya menyusut, lalu dibakar di atas bara hingga kecokelatan.",
    rasa: "Gula merah 30 gram larut di santan, dan bumbu yang dioles tiap 5 menit bikin kulitnya berkaramel saat dibakar.", pedas: 1, veg: false, anak: true,
    kalori: "450-600 kkal", protein: "28-32g", pantangan: "Santan kental + kulit ayam: batasi untuk kolesterol.",
    sanding: ["Nasi kuning", "Sambal terasi", "Lalapan timun"],
    minum: "Air kelapa muda, diminum setelah suapan ayam.",
    suasana: "Malam hajatan keluarga besar. Lauk ini bisa disiapkan sejak pagi.",
    bahan: [
      { nama: "ayam kampung potong 4", jumlah: 1000, satuan: "gram", bagi: 1 },
      { nama: "santan kental", jumlah: 400, satuan: "ml", bagi: 1 },
      { nama: "bawang merah halus", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang putih halus", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "jahe memarkan", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "lengkuas memarkan", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "gula merah sisir", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "air asam jawa", jumlah: 10, satuan: "ml", bagi: 1 },
      { nama: "serai memarkan", jumlah: 2, satuan: "batang", bagi: 0 },
    ],
    alat: ["Wajan", "Panggangan atau oven", "Ulekan", "Kuas oles", "Pisau", "Mangkok"],
    langkah: [
      "Ungkep ayam dengan bumbu dan santan hingga menyusut dan bumbu pekat.",
      "Diamkan 30 menit hingga meresap ke serat.",
      "Panggang di atas bara hingga kulit merah kecokelatan dan berkaramel.",
      "Oles sisa bumbu tiap 5 menit hingga permukaan mengilap.",
      "Tusuk paha: jus bening tanpa darah tanda matang.",
      "Sajikan dengan sisa bumbu kental.",
    ],
    tips: "Gosong luar mentah dalam bila api terlalu besar.",
    selamat: "Oven 15 menit suhu 180 derajat bila dalam masih merah.",
    simpan: "Ayam ungkep 3 hari kulkas, panggang ulang sebelum saji.",
  },
  {
    id: "pisang-gapit", nama: "Pisang Gapit", daerah: "Kalimantan Timur", kategori: "camilan",
    waktuTotal: 30, waktuAktif: 20, level: "mudah", porsi: 4, rating: 4.7, dimasak: 812,
    // Foto: Ezagren (bicara / talk) (Attribution) — https://commons.wikimedia.org/wiki/File:Pisang_Gapit_processing.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pisang_Gapit_processing.jpg/1280px-Pisang_Gapit_processing.jpg",
    video: "G23L1eglhTE",
    deskripsi: "Pisang kepok dijepit lalu dibakar dengan margarin hingga kecokelatan, dan kinca dari 150 gram gula merah disiram selagi panas.",
    rasa: "Gula merah direbus bersama santan sampai mengental, dan margarin menempel di pisang saat dibakar.", pedas: 0, veg: true, anak: true,
    kalori: "300-400 kkal", protein: "3-5g", pantangan: "Gula merah + pisang matang: batasi untuk diabetes.",
    sanding: ["Kinca durian", "Taburan keju", "Kacang sangrai"],
    minum: "Kopi hitam, diminum setelah kinca habis.",
    suasana: "Hujan turun sore hari. Camilan ini siap dalam 30 menit.",
    bahan: [
      { nama: "pisang kepok matang", jumlah: 10, satuan: "buah", bagi: 0 },
      { nama: "margarin oles", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "gula merah sisir", jumlah: 150, satuan: "gram", bagi: 1 },
      { nama: "santan sedang", jumlah: 500, satuan: "ml", bagi: 1 },
      { nama: "tepung beras", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "daun pandan simpul", jumlah: 2, satuan: "lembar", bagi: 0 },
      { nama: "garam", jumlah: 3, satuan: "gram", bagi: 1 },
      { nama: "gula pasir", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 100, satuan: "ml", bagi: 1 },
    ],
    alat: ["Teflon datar", "Panci saus", "Penjepit kayu", "Pisau", "Sutil", "Mangkok"],
    langkah: [
      "Masak gula, santan, pandan hingga mendidih dan mengental melapis sendok.",
      "Jepit pisang, panggang dengan margarin hingga pipih kecokelatan.",
      "Balik sekali hingga kedua sisi berkaramel dan harum.",
      "Saring kinca hingga licin tidak bergerindil.",
      "Siram pisang panas dengan kinca kental.",
      "Sajikan hangat selagi kinca masih mengalir.",
    ],
    tips: "Kinca pecah bila santan dimasak api besar tanpa aduk.",
    selamat: "Blender, didihkan ulang dengan larutan tepung bila pecah.",
    simpan: "Kinca 2 hari kulkas, pisang bakar habiskan hari itu.",
  },
  // ===== SULAWESI + BALI + NUSA (8) =====
  {
    id: "coto-makassar", nama: "Coto Makassar", daerah: "Sulawesi Selatan", kategori: "sarapan",
    waktuTotal: 120, waktuAktif: 40, level: "sedang", porsi: 6, rating: 4.9, dimasak: 1287,
    // Foto: (Lofor) (CC BY 3.0) — https://commons.wikimedia.org/wiki/File:Coto_Makassar-Warung.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Coto_Makassar-Warung.JPG/1280px-Coto_Makassar-Warung.JPG",
    video: "hOl6ZlvaTs4",
    deskripsi: "Daging dan jeroan sapi direbus 90 menit dengan air cucian beras hingga empuk, lalu kuahnya diaduk dengan kacang tanah goreng yang dihaluskan.",
    rasa: "Kacang tanah goreng 70 gram dihaluskan lalu diaduk ke kuah, dan itu yang bikin gurih. Santan cair menambah rasa lembut.", pedas: 1, veg: false, anak: false,
    kalori: "450-550 kkal", protein: "22-26g", pantangan: "Jeroan + santan: hindari untuk kolesterol dan asam urat.",
    sanding: ["Buras", "Kerupuk udang", "Sambal tauco"],
    minum: "Teh tawar, diminum setelah kuah habis.",
    suasana: "Hari Minggu pagi, waktu kamu sempat sarapan berat dan makan buras.",
    bahan: [
      { nama: "daging sapi sandung lamur", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "jeroan sapi campur", jumlah: 250, satuan: "gram", bagi: 1 },
      { nama: "air cucian beras", jumlah: 2000, satuan: "ml", bagi: 1 },
      { nama: "santan cair", jumlah: 200, satuan: "ml", bagi: 1 },
      { nama: "kacang tanah goreng", jumlah: 70, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "kemiri sangrai", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "ketumbar sangrai", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panci besar", "Wajan", "Blender", "Pisau", "Talenan", "Saringan"],
    langkah: [
      "Rebus daging dan jeroan hingga buih kotor habis lalu buang air pertama yang keruh.",
      "Rebus lagi dengan air beras 90 menit hingga empuk ditusuk garpu dan kuah keruh.",
      "Sangrai dan haluskan bumbu hingga halus berminyak dan harum.",
      "Tumis bumbu hingga cokelat tua dan minyak terpisah di pinggir wajan.",
      "Masukkan bumbu dan kacang halus hingga kuah kental melapisi punggung sendok.",
      "Sajikan mengepul dengan bawang goreng garing dan daun bawang layu.",
    ],
    tips: "Air rebusan pertama amis jeroan dan mengunci di kuah.",
    selamat: "Tambah 30 gram kacang halus sangrai, didihkan hingga kental bila encer.",
    simpan: "Kuah dan isi terpisah 3 hari kulkas. Panaskan hingga mendidih.",
  },
  {
    id: "konro-bakar", nama: "Konro Bakar", daerah: "Sulawesi Selatan", kategori: "malam",
    waktuTotal: 180, waktuAktif: 45, level: "sulit", porsi: 4, rating: 4.9, dimasak: 654,
    // Foto: Veriyanta Kusuma (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Sop_Konro.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Sop_Konro.JPG",
    video: "rnaZA3TQ7Eo",
    deskripsi: "Iga sapi direbus 90 menit hingga empuk, lalu dioles kecap dan dibakar di atas arang hingga kecokelatan.",
    rasa: "Kecap dioles sebelum dibakar, jadi manisnya karamel di permukaan. Keluak memberi pahit yang dalam di serat dagingnya.", pedas: 1, veg: false, anak: false,
    kalori: "600-750 kkal", protein: "28-34g", pantangan: "Iga berlemak + kuah kental: hindari untuk kolesterol.",
    sanding: ["Nasi putih", "Sop konro", "Sambal mentah"],
    minum: "Es jeruk limau, diminum sambil makan iga.",
    suasana: "Akhir pekan, waktu kamu punya tiga jam untuk merebus iga sampai lepas dari tulang.",
    bahan: [
      { nama: "iga sapi", jumlah: 1000, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 2000, satuan: "ml", bagi: 1 },
      { nama: "kacang tanah goreng", jumlah: 60, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "keluak", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "ketumbar", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "gula merah", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "kecap manis", jumlah: 30, satuan: "ml", bagi: 1 },
    ],
    alat: ["Panci presto", "Wajan", "Blender", "Panggangan arang", "Kuas oles", "Pisau"],
    langkah: [
      "Rebus iga 90-120 menit hingga empuk dan mudah lepas dari tulang.",
      "Haluskan bumbu dan kacang hingga pasta halus berminyak tidak berbutir.",
      "Tumis bumbu hingga cokelat gelap dan harum tajam.",
      "Masak iga dengan bumbu hingga kuah menyusut kental melapisi iga.",
      "Oles kecap lalu bakar hingga gosong karamel dan beraroma asap.",
      "Sajikan dengan kuah panas mengepul dan minyak terpisah di permukaan.",
    ],
    tips: "Bakar sebelum empuk hanya mengeringkan luar tanpa melunakkan dalam.",
    selamat: "Presto 20 menit dengan 500 ml kuah bumbu bila alot.",
    simpan: "Iga berbumbu tanpa kuah bakar 3 hari kulkas. Bakar ulang suhu ruang.",
  },
  {
    id: "pallubasa", nama: "Pallubasa", daerah: "Sulawesi Selatan", kategori: "malam",
    waktuTotal: 150, waktuAktif: 35, level: "sedang", porsi: 6, rating: 4.8, dimasak: 543,
    // Foto: Cahyo Ramadhani (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Pallubasa.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Pallubasa.jpg/1280px-Pallubasa.jpg",
    video: "weQ6J9chQ1E",
    deskripsi: "Kelapa parut disangrai sampai berminyak, lalu 100 gram kelapa itu diaduk ke kuah. Kuning telur mentah dimasukkan terakhir saat kuahnya masih panas.",
    rasa: "Kuning telur mentah larut saat diaduk, dan itu yang bikin kuahnya lembut. Kelapa sangrai meninggalkan rasa berasap.", pedas: 1, veg: false, anak: false,
    kalori: "500-620 kkal", protein: "24-28g", pantangan: "Jeroan + kelapa sangrai + kuning telur: hindari untuk kolesterol.",
    sanding: ["Nasi putih", "Kerupuk udang", "Sambal lasuna"],
    minum: "Teh pahit, diminum setelah suapan kuah kental.",
    suasana: "Malam setelah pulang kerja, ketika badan capek dan kamu cuma ingin makan berkuah panas.",
    bahan: [
      { nama: "daging sapi has dalam", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "jeroan sapi", jumlah: 250, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 2000, satuan: "ml", bagi: 1 },
      { nama: "kelapa parut sangrai", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "kemiri", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "jintan sangrai", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "telur ayam mentah", jumlah: 1, satuan: "butir", bagi: 0 },
    ],
    alat: ["Panci besar", "Wajan", "Blender", "Ulekan", "Pisau", "Mangkuk saji"],
    langkah: [
      "Rebus daging dan jeroan hingga buih hilang lalu ganti air jernih.",
      "Rebus lagi 90 menit hingga empuk ditusuk lidi dan kaldu keruh gurih.",
      "Sangrai kelapa hingga cokelat tua kering lalu tumbuk hingga berminyak.",
      "Haluskan dan tumis bumbu hingga gelap dan harum.",
      "Masukkan bumbu dan kelapa sangrai hingga kuah pekat berminyak di permukaan.",
      "Sajikan dengan kuning telur mentah hingga larut creamy di kuah mendidih.",
    ],
    tips: "Skip kelapa sangrai menghilangkan pembeda pallubasa dan coto.",
    selamat: "Tambah 20 gram kelapa sangrai halus dan garam, didihkan 10 menit bila hambar.",
    simpan: "Kuah tanpa telur 3 hari kulkas. Tambah telur segar saat sajikan.",
  },
  {
    id: "tinutuan", nama: "Tinutuan", daerah: "Sulawesi Utara", kategori: "sarapan",
    waktuTotal: 60, waktuAktif: 20, level: "mudah", porsi: 4, rating: 4.7, dimasak: 698,
    // Foto: Midori (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Tinutuan_topping.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tinutuan_topping.JPG/1280px-Tinutuan_topping.JPG",
    video: "YqiORHQW_GU",
    deskripsi: "Beras direbus 30 menit sampai jadi bubur, lalu labu dan ubi dimasak di dalamnya hingga empuk. Bayam dan kangkung masuk terakhir supaya tetap hijau.",
    rasa: "Labu kuning dan jagung hancur di dalam bubur, jadi manisnya keluar dari situ. Kemangi menyumbang aroma segar di suapan terakhir.", pedas: 0, veg: true, anak: true,
    kalori: "250-350 kkal", protein: "8-12g", pantangan: "Ubi dan jagung manis: batasi porsi untuk diabetes.",
    sanding: ["Cakalang fufu", "Sambal roa", "Perkedel jagung"],
    minum: "Air jahe, diminum sebelum berangkat.",
    suasana: "Pagi sibuk, waktu kamu butuh sarapan ringan yang tetap mengenyangkan.",
    bahan: [
      { nama: "beras", jumlah: 150, satuan: "gram", bagi: 1 },
      { nama: "air", jumlah: 1500, satuan: "ml", bagi: 1 },
      { nama: "labu kuning", jumlah: 200, satuan: "gram", bagi: 1 },
      { nama: "bayam", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "kangkung", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "jagung manis pipil", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "ubi jalar", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "bawang merah goreng", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "kemangi", jumlah: 10, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panci besar", "Pisau", "Talenan", "Sendok kayu", "Mangkuk", "Kompor"],
    langkah: [
      "Rebus beras 30 menit hingga pecah menjadi bubur kental berkanji.",
      "Masukkan ubi dan labu hingga lunak hancur ditekan sendok.",
      "Masukkan jagung hingga kuning cerah dan meletus manis.",
      "Masukkan bayam dan kangkung 3 menit hingga layu hijau segar tidak lembek.",
      "Bumbui garam hingga gurih sayur keluar dan tidak hambar.",
      "Sajikan mengepul dengan bawang goreng garing.",
    ],
    tips: "Sayur hijau masuk awal bikin warna cokelat dan vitamin hilang.",
    selamat: "Tambah 50 gram labu lumat, masak hingga kental bila terlalu encer.",
    simpan: "Tanpa kemangi 2 hari kulkas. Tambah 100 ml air saat panaskan.",
  },
  {
    id: "ayam-woku", nama: "Ayam Woku", daerah: "Sulawesi Utara", kategori: "siang",
    waktuTotal: 60, waktuAktif: 30, level: "sedang", porsi: 4, rating: 4.8, dimasak: 923,
    // Foto: Sofi Solihah (CC BY 4.0) — https://commons.wikimedia.org/wiki/File:Ayam_Woku_1.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Ayam_Woku_1.jpg",
    video: "yba0iJAQCr4",
    deskripsi: "Ayam dilumuri air jeruk nipis, lalu diungkep 25 menit dengan cabai dan kunyit sampai menyusut. Kemangi masuk di akhir supaya wanginya tidak hilang.",
    rasa: "Cabai rawit ditumis bersama bumbu halus, dan kemangi yang masuk terakhir bikin aromanya segar.", pedas: 3, veg: false, anak: false,
    kalori: "380-480 kkal", protein: "28-32g", pantangan: "Cabai dan rempah tajam: hindari untuk maag dan GERD.",
    sanding: ["Nasi putih", "Ikan bakar", "Sayur bunga pepaya"],
    minum: "Es kelapa muda, diminum setelah suapan pedas.",
    suasana: "Siang hari waktu semua orang di rumah suka pedas dan nasi masih panas.",
    bahan: [
      { nama: "ayam kampung potong 8", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "cabai merah keriting", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "cabai rawit merah", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "jahe", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "kunyit", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "serai", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "daun kemangi", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
    ],
    alat: ["Wajan dalam", "Blender", "Pisau", "Talenan", "Spatula", "Tutup wajan"],
    langkah: [
      "Lumuri ayam dengan jeruk nipis hingga kesat tidak berlendir lalu bilas.",
      "Tumis bumbu halus hingga harum tajam dan minyak terpisah.",
      "Masukkan ayam hingga permukaan pucat kaku dan bumbu melapisi.",
      "Tutup dan ungkep 25 menit hingga empuk ditusuk garpu dan kuah menyusut berminyak.",
      "Masukkan daun bawang dan cabai utuh hingga layu namun masih utuh.",
      "Masukkan kemangi hingga layu harum tepat sebelum api dimatikan.",
    ],
    tips: "Kemangi masuk awal bikin aroma hilang dan daun menghitam pahit.",
    selamat: "Tambah 100 ml santan encer dan gula, didihkan 5 menit bila terlalu pedas.",
    simpan: "3 hari kulkas. Hangatkan dengan 50 ml air agar tidak gosong.",
  },
  {
    id: "ikan-dabu-dabu", nama: "Ikan Bakar Dabu-Dabu", daerah: "Sulawesi Utara", kategori: "siang",
    waktuTotal: 60, waktuAktif: 35, level: "sedang", porsi: 4, rating: 4.8, dimasak: 845,
    // Foto: Midori (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Dabu-dabu_manta.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Dabu-dabu_manta.JPG/1280px-Dabu-dabu_manta.JPG",
    video: "lEyhDqtC_Uc",
    deskripsi: "Ikan cakalang dibakar 20 menit tiap sisi hingga kecokelatan, lalu disiram sambal tomat yang baru diberi minyak kelapa panas.",
    rasa: "Air jeruk limau dicampur ke irisan tomat, dan terasi bakar meninggalkan asin yang tajam di ujung lidah.", pedas: 3, veg: false, anak: false,
    kalori: "300-400 kkal", protein: "30-34g", pantangan: "Alergi ikan laut dan maag: sambal mentah pedas.",
    sanding: ["Nasi jaha", "Tinutuan", "Sayur kangkung tumis"],
    minum: "Es teh lemon, diminum setelah sambal.",
    suasana: "Hari libur saat cuaca cerah. Bakar ikan di halaman belakang.",
    bahan: [
      { nama: "ikan cakalang utuh", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "tomat merah", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "cabai rawit merah", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "cabai merah besar", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "minyak kelapa panas", jumlah: 30, satuan: "ml", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "air jeruk limau", jumlah: 15, satuan: "ml", bagi: 1 },
      { nama: "gula", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "terasi bakar", jumlah: 5, satuan: "gram", bagi: 1 },
    ],
    alat: ["Panggangan", "Pisau", "Talenan", "Mangkuk", "Kuas oles", "Jepit bakar"],
    langkah: [
      "Bersihkan ikan hingga insang merah hilang dan lendir kesat.",
      "Bakar 20 menit per sisi hingga kulit berkerak dan daging putih padat mudah disuwir.",
      "Iris dadu tomat dan bawang hingga segar berair tidak memar.",
      "Siram sambal dengan minyak panas hingga berdesis dan harum keluar.",
      "Bumbui jeruk dan garam hingga asam asin seimbang.",
      "Sajikan ikan mengepul dengan sambal segar mentah di atasnya.",
    ],
    tips: "Minyak dingin bikin sambal langu dan bawang mentah tajam.",
    selamat: "Kerik bagian gosong pahit, oles minyak dan jeruk nipis bila gosong.",
    simpan: "Ikan dan sambal terpisah 2 hari. Sambal jangan dipanaskan.",
  },
  {
    id: "sate-lilit", nama: "Sate Lilit", daerah: "Bali", kategori: "camilan",
    waktuTotal: 60, waktuAktif: 40, level: "sedang", porsi: 4, rating: 4.8, dimasak: 1098,
    // Foto: Gunawan Kartapranata (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Nasi_Campur_Bali_Sate_Lilit.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Nasi_Campur_Bali_Sate_Lilit.jpg/1280px-Nasi_Campur_Bali_Sate_Lilit.jpg",
    video: "en0PfdIPO4A",
    deskripsi: "Adonan ayam dan kelapa dililitkan ke batang serai seberat 30 gram, lalu dibakar sambil diputar hingga kecokelatan.",
    rasa: "Kelapa parut dicampur ke ayam giling, jadi gurihnya keluar dari situ. Wangi serai yang terbakar ikut masuk ke dagingnya.", pedas: 2, veg: false, anak: false,
    kalori: "280-380 kkal", protein: "22-26g", pantangan: "Santan-kelapa: hindari untuk alergi dan kolesterol.",
    sanding: ["Lawar", "Sambal matah", "Nasi campur Bali"],
    minum: "Es daluman manis, diminum setelah beberapa tusuk.",
    suasana: "Sore hari waktu semua orang kumpul di halaman dan ngobrol santai.",
    bahan: [
      { nama: "daging ayam giling", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "kelapa parut muda", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "santan kental", jumlah: 30, satuan: "ml", bagi: 1 },
      { nama: "bawang merah", jumlah: 40, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "cabai merah", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "jahe", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "kunyit", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "serai tusuk", jumlah: 12, satuan: "batang", bagi: 0 },
    ],
    alat: ["Blender", "Wajan", "Mangkuk adonan", "Panggangan", "Pisau", "Jepit"],
    langkah: [
      "Tumis bumbu halus hingga kering harum dan kuning tua.",
      "Campur ayam dan kelapa hingga lengket bisa dipulung tidak rontok.",
      "Lilitkan 30 gram adonan ke serai hingga padat menempel tidak retak.",
      "Panggang sambil putar hingga kuning kecokelatan dan berkerak.",
      "Cek matang: sate kaku, desis berhenti, jus bening.",
      "Sajikan panas hingga aroma serai terbakar harum keluar.",
    ],
    tips: "Kelapa tua berserat kasar bikin adonan pecah saat dibakar.",
    selamat: "Tambah kelapa parut dan tapioka, dinginkan 15 menit bila lembek rontok.",
    simpan: "Sate mentah berlilit 2 hari kulkas. Bakar dari suhu ruang.",
  },
  {
    id: "plecing-kangkung", nama: "Plecing Kangkung", daerah: "Nusa Tenggara Barat", kategori: "siang",
    waktuTotal: 25, waktuAktif: 20, level: "mudah", porsi: 4, rating: 4.7, dimasak: 934,
    // Foto: Midori (CC BY 3.0) — https://commons.wikimedia.org/wiki/File:Pelecing_kangkung_Lombok.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Pelecing_kangkung_Lombok.JPG/1280px-Pelecing_kangkung_Lombok.JPG",
    video: "x8Y2coStc2I",
    deskripsi: "Terasi dibakar sampai harum lalu diulek kasar bersama cabai dan tomat. Kangkungnya direbus 2 menit saja supaya batangnya masih renyah.",
    rasa: "Cabai direbus dulu sebelum diulek, dan air jeruk limau menambah asam di ujung lidah.", pedas: 3, veg: true, anak: false,
    kalori: "120-180 kkal", protein: "5-8g", pantangan: "Maag akut dan alergi terasi udang: hindari.",
    sanding: ["Ayam taliwang", "Ikan bakar", "Nasi putih hangat"],
    minum: "Es teh manis, diminum setelah sambal.",
    suasana: "Siang terik, waktu kamu ingin lauk segar pendamping ayam taliwang.",
    bahan: [
      { nama: "kangkung segar", jumlah: 400, satuan: "gram", bagi: 1 },
      { nama: "tomat merah", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "cabai merah", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "cabai rawit", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "terasi bakar", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "gula merah", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 8, satuan: "gram", bagi: 1 },
      { nama: "air jeruk limau", jumlah: 15, satuan: "ml", bagi: 1 },
      { nama: "kacang tanah goreng", jumlah: 30, satuan: "gram", bagi: 1 },
      { nama: "air rebusan", jumlah: 500, satuan: "ml", bagi: 1 },
    ],
    alat: ["Panci", "Ulekan", "Saringan", "Pisau", "Mangkuk", "Sendok"],
    langkah: [
      "Rebus kangkung 2 menit hingga hijau cerah layu namun batang renyah patah.",
      "Tiriskan, rendam air es hingga dingin kesat dan hijau terkunci.",
      "Rebus cabai dan tomat hingga kulit mengelupas dan lunak.",
      "Ulek sambal hingga kasar berair dan biji masih terlihat.",
      "Bumbui hingga pedas asam asin manis seimbang di lidah.",
      "Sajikan kangkung dingin renyah disiram sambal dan taburan kacang garing.",
    ],
    tips: "Rebus terlalu lama bikin batang lembek hitam dan langu.",
    selamat: "Rendam 10 menit di air es lalu tiriskan bila lembek.",
    simpan: "Kangkung dan sambal terpisah 2 hari. Siram sambal saat sajikan.",
  },
  // ===== MALUKU + PAPUA + PENUTUP (8) =====
  {
    id: "papeda-kuah-kuning", nama: "Papeda Kuah Kuning", daerah: "Papua", kategori: "siang",
    waktuTotal: 60, waktuAktif: 45, level: "sedang", porsi: 4, rating: 4.8, dimasak: 587,
    // Foto: Gunawan Kartapranata (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Papeda,_Kuah_Kuning,_Ikan_Tude_Bakar_1.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Papeda%2C_Kuah_Kuning%2C_Ikan_Tude_Bakar_1.jpg/1280px-Papeda%2C_Kuah_Kuning%2C_Ikan_Tude_Bakar_1.jpg",
    video: "0_j_IwQBo0Y",
    deskripsi: "Bumbu kunyit dan serai ditumis sampai harum, lalu ikan kakap dimasak di kuahnya. Sagu 100 gram dilarutkan air dingin dulu, lalu disiram air mendidih sambil diaduk sampai bening.",
    rasa: "Kunyit bakar dan tomat dimasak bersama ikan kakap, dan itu sumber asamnya. Papeda yang bening menyerap kuah itu di mulut.", pedas: 1, veg: false, anak: true,
    kalori: "350-450 kkal", protein: "20-25g", pantangan: "Alergi ikan dan karbo tinggi: batasi.",
    sanding: ["Oseng kangkung", "Sambal terasi", "Ikan asin"],
    minum: "Es jeruk nipis, diminum sambil makan.",
    suasana: "Makan siang bareng keluarga, waktu anak-anak berebut menggulung papeda pakai sumpit.",
    bahan: [
      { nama: "tepung sagu", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "fillet ikan kakap", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 10, satuan: "butir", bagi: 0 },
      { nama: "bawang putih", jumlah: 5, satuan: "siung", bagi: 0 },
      { nama: "kunyit bakar", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "jahe", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "serai", jumlah: 2, satuan: "batang", bagi: 0 },
      { nama: "daun jeruk", jumlah: 6, satuan: "lembar", bagi: 0 },
      { nama: "tomat merah", jumlah: 2, satuan: "buah", bagi: 0 },
      { nama: "air", jumlah: 500, satuan: "ml", bagi: 1 },
    ],
    alat: ["Panci", "Wajan", "Pisau", "Talenan", "Sendok kayu", "Mangkuk"],
    langkah: [
      "Lumuri ikan dengan air jeruk nipis dan garam hingga kesat dan tidak amis.",
      "Tumis bumbu halus, serai, daun jeruk hingga harum dan minyak terpisah.",
      "Tuang 500 ml air, didihkan hingga bergelembung besar dan bumbu larut.",
      "Masukkan ikan, tomat, daun bawang hingga daging putih solid mudah disuwir.",
      "Cairkan sagu dengan 300 ml air dingin hingga licin tanpa gumpalan.",
      "Siram 700 ml air mendidih sambil aduk memutar hingga bening kental lengket seperti lem.",
    ],
    tips: "Papeda menggumpal bila air tidak benar-benar mendidih saat disiram.",
    selamat: "Saring, panaskan lagi dengan air mendidih sambil aduk cepat bila menggumpal.",
    simpan: "Kuah 2 hari kulkas, papeda selalu buat segar jangan disimpan.",
  },
  {
    id: "ikan-kuah-pala", nama: "Ikan Kuah Pala Banda", daerah: "Maluku", kategori: "malam",
    waktuTotal: 50, waktuAktif: 35, level: "mudah", porsi: 4, rating: 4.7, dimasak: 456,
    // Foto: M.akbar.raf (CC BY-SA 4.0) — https://commons.wikimedia.org/wiki/File:Ikan_kuah_kuning.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Ikan_kuah_kuning.jpg/1280px-Ikan_kuah_kuning.jpg",
    video: "hzGbGu1ERdI",
    deskripsi: "Ikan salem dilumuri asam jawa 10 menit, lalu bumbu halus dan pala parut ditumis sampai harum sebelum santannya dituang.",
    rasa: "Asam jawa meresap ke ikan sebelum dimasak. Pala parut menyumbang aroma hangat ke santannya.", pedas: 2, veg: false, anak: false,
    kalori: "300-400 kkal", protein: "25-30g", pantangan: "Alergi ikan dan hindari santan: batasi.",
    sanding: ["Nasi putih", "Urap daun pepaya", "Sambal bekasang"],
    minum: "Teh manis, diminum sambil kuah masih panas.",
    suasana: "Malam dingin, waktu kamu ingin nasi hangat dengan kuah santan.",
    bahan: [
      { nama: "ikan salem", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "santan", jumlah: 400, satuan: "ml", bagi: 1 },
      { nama: "bawang merah", jumlah: 6, satuan: "siung", bagi: 0 },
      { nama: "bawang putih", jumlah: 4, satuan: "siung", bagi: 0 },
      { nama: "buah pala", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "asam jawa", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "gula pasir", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "daun salam", jumlah: 3, satuan: "lembar", bagi: 0 },
      { nama: "air", jumlah: 500, satuan: "ml", bagi: 1 },
    ],
    alat: ["Wajan", "Pisau", "Talenan", "Cobek", "Mangkuk", "Spatula"],
    langkah: [
      "Balur ikan dengan asam jawa dan garam, diamkan 10 menit hingga kesat.",
      "Tumis bumbu halus dan pala parut hingga wangi dan keemasan.",
      "Tuang santan dan air, didihkan sambil aduk hingga merata tidak pecah.",
      "Masukkan ikan hingga daging putih padat dan kuah menyusut sedikit.",
      "Koreksi asam-garam hingga segar asam-pedas seimbang.",
      "Angkat setelah minyak santan muncul tipis di permukaan.",
    ],
    tips: "Santan pecah bila api terlalu besar dan jarang diaduk.",
    selamat: "Kecilkan api, aduk cepat, tambah 50 ml santan segar bila pecah.",
    simpan: "Maksimal 2 hari kulkas. Panaskan api kecil agar tidak pecah.",
  },
  {
    id: "kohu-kohu", nama: "Kohu-Kohu", daerah: "Maluku", kategori: "siang",
    waktuTotal: 40, waktuAktif: 30, level: "mudah", porsi: 4, rating: 4.6, dimasak: 389,
    // Foto: Ans~jawiki at Japanese Wikipedia (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Kohu-jo.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Kohu-jo.jpg",
    video: "uxlFrgYjAg4",
    deskripsi: "Tongkol dikukus 15 menit lalu disuwir, dan kelapa parutnya dikukus lagi bersama bawang merah sampai harum.",
    rasa: "Perasan jeruk nipis dicampur ke sayuran segar, dan kelapa kukus memberi gurih yang lembut.", pedas: 2, veg: false, anak: false,
    kalori: "250-350 kkal", protein: "20-25g", pantangan: "Alergi ikan dan kelapa: hindari.",
    sanding: ["Papeda", "Nasi jagung", "Ikan bakar"],
    minum: "Es jeruk limau, diminum sambil suapan sayur.",
    suasana: "Siang panas, waktu kamu ingin sayur dingin pendamping papeda.",
    bahan: [
      { nama: "daging ikan tongkol", jumlah: 350, satuan: "gram", bagi: 1 },
      { nama: "kelapa parut", jumlah: 150, satuan: "gram", bagi: 1 },
      { nama: "ketimun", jumlah: 250, satuan: "gram", bagi: 1 },
      { nama: "tauge", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "kacang panjang", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "daun kemangi", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "jeruk nipis", jumlah: 2, satuan: "buah", bagi: 0 },
      { nama: "bawang merah", jumlah: 5, satuan: "butir", bagi: 0 },
      { nama: "cabai rawit", jumlah: 10, satuan: "buah", bagi: 0 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
    ],
    alat: ["Kukusan", "Cobek", "Pisau", "Talenan", "Mangkuk besar", "Saringan"],
    langkah: [
      "Kukus tongkol 15 menit hingga putih dan mudah disuwir.",
      "Siram tauge air panas 1 menit hingga layu namun renyah.",
      "Haluskan bawang, cabai, kencur, terasi lalu campur ke kelapa hingga rata.",
      "Kukus kelapa berbumbu 10 menit hingga harum matang tidak langu.",
      "Campur ikan suwir, sayuran, kelapa hingga terbalut rata.",
      "Kucuri jeruk nipis hingga segar dan sajikan segera.",
    ],
    tips: "Amis bila ikan kurang segar atau kukusan kurang panas.",
    selamat: "Tambah jeruk nipis dan garam, diamkan 5 menit bila amis.",
    simpan: "Maksimal 1 hari kulkas. Makan dingin lebih segar.",
  },
  {
    id: "gohu-ikan", nama: "Gohu Ikan", daerah: "Maluku Utara", kategori: "malam",
    waktuTotal: 25, waktuAktif: 20, level: "sedang", porsi: 4, rating: 4.7, dimasak: 312,
    // Foto: M.akbar.raf (CC BY-SA 4.0) — https://commons.wikimedia.org/wiki/File:Gohu_Ikan_in_Ternate.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Gohu_Ikan_in_Ternate.jpg",
    video: "cAT6_8LUseM",
    deskripsi: "Kamu potong tuna jadi dadu 1 cm, lalu potongannya dilumuri air jeruk nipis. Bumbunya disiram minyak kelapa panas sampai harum.",
    rasa: "Cabai rawit dan jeruk nipis menempel di potongan tuna. Minyak panas mengeluarkan wangi bawang dan kemangi.", pedas: 3, veg: false, anak: false,
    kalori: "200-300 kkal", protein: "25-30g", pantangan: "Ikan mentah: tidak untuk hamil, anak, imun rendah.",
    sanding: ["Sagu lempeng", "Pisang rebus", "Nasi putih"],
    minum: "Teh jahe, diminum sebelum tidur.",
    suasana: "Sehabis magrib, waktu kamu ingin pembuka segar sebelum nasi.",
    bahan: [
      { nama: "fillet tuna segar", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 15, satuan: "butir", bagi: 0 },
      { nama: "cabai rawit", jumlah: 10, satuan: "buah", bagi: 0 },
      { nama: "daun kemangi", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "jeruk nipis", jumlah: 3, satuan: "buah", bagi: 0 },
      { nama: "kacang kenari", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "minyak kelapa", jumlah: 50, satuan: "ml", bagi: 1 },
      { nama: "garam", jumlah: 10, satuan: "gram", bagi: 1 },
    ],
    alat: ["Pisau tajam", "Talenan", "Mangkuk kaca", "Wajan kecil", "Sendok", "Saringan"],
    langkah: [
      "Potong tuna dadu 1 cm dengan pisau tajam hingga tegas tidak hancur.",
      "Lumuri tuna dengan air jeruk dan garam hingga memutih dan kesat.",
      "Iris bawang, cabai, kemangi lalu campur dengan kenari tumbuk kasar.",
      "Panaskan minyak hingga berasap tipis dan berdesis saat dites.",
      "Siram minyak panas ke bumbu hingga berdesis dan harum keluar.",
      "Aduk tuna dengan bumbu hingga rata, sajikan dalam 15 menit.",
    ],
    tips: "Gagal bila ikan tidak sashimi-grade: berlendir dan amis.",
    selamat: "Siram ikan dengan minyak benar-benar mendidih agar permukaan matang tipis.",
    simpan: "Jangan simpan mentah, habiskan maksimal 4 jam kulkas.",
  },
  {
    id: "ayam-colo-colo", nama: "Ayam Bakar Colo-Colo", daerah: "Maluku Utara", kategori: "malam",
    waktuTotal: 75, waktuAktif: 50, level: "sedang", porsi: 4, rating: 4.8, dimasak: 567,
    // Foto: Nisa usrifatul (CC BY-SA 4.0) — https://commons.wikimedia.org/wiki/File:Ayam_bakar.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ayam_bakar.jpg/1280px-Ayam_bakar.jpg",
    video: "TxNiXS91N0A",
    deskripsi: "Ayam dilumuri bawang putih dan kunyit selama 30 menit, lalu dibakar di atas bara hingga kecokelatan.",
    rasa: "Kunyit dan bawang putih meresap ke ayam. Sambal tomat mentahnya memberi asam dan pedas yang tajam.", pedas: 3, veg: false, anak: false,
    kalori: "400-550 kkal", protein: "28-32g", pantangan: "Ayam dan cabai pedas: hindari untuk sensitif.",
    sanding: ["Nasi putih", "Sagu lempeng", "Sayur kangkung"],
    minum: "Es jeruk nipis, diminum setelah suapan sambal.",
    suasana: "Malam Minggu saat bara di teras sudah merah. Bakar ayamnya lalu makan bareng di luar.",
    bahan: [
      { nama: "ayam potong", jumlah: 800, satuan: "gram", bagi: 1 },
      { nama: "bawang putih", jumlah: 5, satuan: "siung", bagi: 0 },
      { nama: "kunyit", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "tomat merah", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "tomat hijau", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "bawang merah", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "cabai rawit", jumlah: 20, satuan: "gram", bagi: 1 },
      { nama: "daun kemangi", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "jeruk limau", jumlah: 4, satuan: "buah", bagi: 0 },
      { nama: "minyak panas", jumlah: 50, satuan: "ml", bagi: 1 },
    ],
    alat: ["Panggangan", "Cobek", "Pisau", "Talenan", "Kuas oles", "Mangkuk"],
    langkah: [
      "Lumuri ayam dengan bawang putih, kunyit, garam hingga meresap 30 menit dan kuning rata.",
      "Bakar di atas bara sedang hingga kedua sisi kecokelatan dan garis bakar jelas.",
      "Oles minyak selama membakar hingga mengilap tidak kering.",
      "Tusuk paha: cairan bening tanpa darah tanda matang.",
      "Campur tomat, bawang, cabai, kemangi lalu siram minyak panas hingga berdesis.",
      "Kucuri jeruk limau ke colo-colo hingga segar, sajikan di atas ayam.",
    ],
    tips: "Gosong luar mentah dalam bila bara terlalu besar.",
    selamat: "Kerok hitam, oven 10 menit 180 derajat hingga cairan bening bila gosong.",
    simpan: "Ayam bakar 2 hari, colo-colo 1 hari terpisah kulkas.",
  },
  {
    id: "sagu-lempeng", nama: "Sagu Lempeng", daerah: "Maluku", kategori: "camilan",
    waktuTotal: 35, waktuAktif: 25, level: "mudah", porsi: 6, rating: 4.5, dimasak: 423,
    // Foto: Rik Schuiling / TropCrop - Tropical Crops Services (CC BY-SA 3.0) — https://commons.wikimedia.org/wiki/File:Sago_starch_product_sagu_lempeng_from_Maluku,ID_feb2002.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Sago_starch_product_sagu_lempeng_from_Maluku%2CID_feb2002.jpg",
    video: "elYW35dzPXk",
    deskripsi: "Sagu, kelapa parut, dan gula dicampur lalu dicetak pipih 1 cm, dan kepingannya disangrai dengan api kecil hingga kecokelatan.",
    rasa: "Kelapa parut ikut kering saat disangrai, dan gulanya cuma menambah manis yang tipis.", pedas: 0, veg: true, anak: true,
    kalori: "150-220 kkal", protein: "2-4g", pantangan: "Karbo tinggi: tidak untuk diet rendah karbo.",
    sanding: ["Gohu ikan", "Kohu-kohu", "Teh manis"],
    minum: "Kopi tubruk, diminum sambil keping sagu.",
    suasana: "Sore hari waktu kamu duduk minum teh di teras, atau bekal saat perjalanan jauh.",
    bahan: [
      { nama: "tepung sagu", jumlah: 500, satuan: "gram", bagi: 1 },
      { nama: "air panas", jumlah: 200, satuan: "ml", bagi: 1 },
      { nama: "garam", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "gula pasir", jumlah: 15, satuan: "gram", bagi: 1 },
      { nama: "kelapa parut", jumlah: 100, satuan: "gram", bagi: 1 },
    ],
    alat: ["Wajan datar", "Saringan", "Mangkuk", "Sendok kayu", "Cetakan pipih", "Spatula"],
    langkah: [
      "Saring sagu hingga halus tanpa gumpalan keras.",
      "Campur sagu, garam, gula, kelapa hingga rata.",
      "Perciki air panas sedikit demi sedikit hingga lembap dan menggumpal dikepal.",
      "Cetak pipih 1 cm hingga padat tidak retak.",
      "Sangrai api kecil hingga kedua sisi kering kecokelatan dan renyah diketuk.",
      "Dinginkan di rak hingga keras renyah tidak lembek dipatahkan.",
    ],
    tips: "Alot bila air terlalu banyak atau api terlalu besar.",
    selamat: "Panggang ulang api kecil hingga kering renyah bila lembek.",
    simpan: "Toples kedap 14 hari, tidak perlu kulkas.",
  },
  {
    id: "lapis-legit", nama: "Kue Lapis Legit", daerah: "Jakarta", kategori: "camilan",
    waktuTotal: 150, waktuAktif: 120, level: "sulit", porsi: 16, rating: 4.9, dimasak: 876,
    // Foto: Pudding4brains (Public domain) — https://commons.wikimedia.org/wiki/File:Spekkoek_en_Kue_lapis.jpg
    foto: "https://upload.wikimedia.org/wikipedia/commons/5/56/Spekkoek_en_Kue_lapis.jpg",
    video: "RtrUh6whaXg",
    deskripsi: "Kuning telur dan gula dikocok sampai pucat, lalu mentega dan tepung diaduk masuk. Adonan dituang 1,5 sendok sayur tiap lapis lalu dipanggang hingga kecokelatan, diulang sampai 18 lapis.",
    rasa: "30 kuning telur dan gula halus dikocok lama, dan bumbu spekuk memberi aroma hangat di setiap lapis.", pedas: 0, veg: true, anak: true,
    kalori: "350-450 kkal", protein: "5-8g", pantangan: "Telur, susu, gluten, diabetes: hindari.",
    sanding: ["Kopi tubruk", "Teh earl grey", "Es krim vanila"],
    minum: "Teh hitam, diminum setelah potongan mentega.",
    suasana: "Hari raya waktu tamu datang ke rumah. Kue dipotong tipis dan disajikan bareng kopi.",
    bahan: [
      { nama: "kuning telur", jumlah: 30, satuan: "butir", bagi: 0 },
      { nama: "gula halus", jumlah: 300, satuan: "gram", bagi: 1 },
      { nama: "butter", jumlah: 350, satuan: "gram", bagi: 1 },
      { nama: "tepung terigu", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "susu bubuk", jumlah: 50, satuan: "gram", bagi: 1 },
      { nama: "bumbu spekuk", jumlah: 10, satuan: "gram", bagi: 1 },
      { nama: "susu kental manis", jumlah: 75, satuan: "gram", bagi: 1 },
      { nama: "pasta vanila", jumlah: 5, satuan: "ml", bagi: 1 },
    ],
    alat: ["Loyang 20 cm", "Oven", "Mixer", "Spatula", "Sendok sayur", "Kertas roti"],
    langkah: [
      "Kocok kuning telur dan gula hingga kental berjejak dan pucat.",
      "Masukkan butter kocok dan SKM hingga licin mengilap.",
      "Tuang 1,5 sendok sayur ke loyang, panggang hingga kecokelatan merata.",
      "Tekan tiap lapis hingga padat tanpa gelembung udara.",
      "Ulangi hingga 18 lapis setinggi 7 cm dan padat.",
      "Dinginkan 2 jam hingga set, iris pisau tajam tanpa remah.",
    ],
    tips: "Lapis bergelombang bila takaran tiap lapis tidak sama.",
    selamat: "Kerok gosong tipis, oles butter sebelum lapis berikut bila gosong.",
    simpan: "Wadah kedap 7 hari kulkas. Suhu ruang 30 menit sebelum makan.",
  },
  {
    id: "bika-ambon", nama: "Bika Ambon", daerah: "Sumatera Utara", kategori: "camilan",
    waktuTotal: 180, waktuAktif: 60, level: "sedang", porsi: 12, rating: 4.8, dimasak: 1045,
    // Foto: Taman Renyah (CC BY 3.0) — https://commons.wikimedia.org/wiki/File:Bika_Ambon.JPG
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bika_Ambon.JPG/1280px-Bika_Ambon.JPG",
    video: "emD8U2jH7AE",
    deskripsi: "Tepung, telur, dan santan diaduk sampai licin, lalu adonannya didiamkan 2 jam sebelum dipanggang 45 menit hingga kecokelatan.",
    rasa: "Gula pasir dan air kelapa dipakai mengaktifkan ragi. Santan yang direbus dengan pandan memberi gurih di serat kenyalnya.", pedas: 0, veg: true, anak: true,
    kalori: "250-350 kkal", protein: "4-6g", pantangan: "Telur, gluten, diabetes: hindari.",
    sanding: ["Kopi susu", "Teh manis", "Durian"],
    minum: "Kopi Medan, diminum sambil potongan bika yang kenyal.",
    suasana: "Sore santai, waktu kamu memotong kue untuk camilan atau membungkusnya jadi oleh-oleh.",
    bahan: [
      { nama: "tepung tapioka", jumlah: 125, satuan: "gram", bagi: 1 },
      { nama: "tepung terigu", jumlah: 100, satuan: "gram", bagi: 1 },
      { nama: "santan", jumlah: 300, satuan: "ml", bagi: 1 },
      { nama: "gula pasir", jumlah: 200, satuan: "gram", bagi: 1 },
      { nama: "telur", jumlah: 4, satuan: "butir", bagi: 0 },
      { nama: "ragi instan", jumlah: 6, satuan: "gram", bagi: 1 },
      { nama: "air kelapa", jumlah: 125, satuan: "ml", bagi: 1 },
      { nama: "garam", jumlah: 5, satuan: "gram", bagi: 1 },
      { nama: "daun pandan", jumlah: 2, satuan: "lembar", bagi: 0 },
    ],
    alat: ["Loyang", "Oven", "Panci", "Mangkuk", "Whisk", "Saringan"],
    langkah: [
      "Aktifkan ragi dengan air kelapa dan gula hingga berbuih 15 menit.",
      "Rebus santan dengan pandan hingga mendidih kecil, dinginkan hingga hangat kuku.",
      "Campur tepung, telur, gula, santan hingga licin tanpa gumpalan.",
      "Diamkan 2 jam hingga mengembang dan muncul gelembung kecil.",
      "Panggang 45 menit hingga keemasan dan pori sarang jelas.",
      "Dinginkan, potong setelah serat kenyal tidak lengket diiris.",
    ],
    tips: "Tidak bersarang bila ragi mati atau fermentasi kurang.",
    selamat: "Iris tipis, panggang ulang sebagai bika kering renyah bila bantat.",
    simpan: "3 hari suhu ruang, 5 hari kulkas lalu kukus 5 menit.",
  },
];

const KEY = {
  fav: "letmecook:fav",
  meal: "letmecook:meal",
  gcheck: "letmecook:gcheck",
  gmanual: "letmecook:gmanual",
  prog: "letmecook:prog",
};

function baca(kunci, cadangan) {
  try {
    const m = localStorage.getItem(kunci);
    if (m === null) return cadangan;
    const v = JSON.parse(m);
    if (Array.isArray(cadangan)) return Array.isArray(v) ? v : cadangan;
    if (cadangan && typeof cadangan === "object") return v && typeof v === "object" ? v : cadangan;
    return v ?? cadangan;
  } catch { return cadangan; }
}

function tulis(kunci, nilai) {
  try { localStorage.setItem(kunci, JSON.stringify(nilai)); return true; }
  catch (e) { return false; }
}

function cariResep(id) { return RESEP.find((r) => r.id === id); }

// Favorit
function ambilFav() { return baca(KEY.fav, []).filter((id) => cariResep(id)); }
function sudahFav(id) { return ambilFav().includes(id); }
function toggleFav(id) {
  if (!cariResep(id)) return [];
  let f = ambilFav();
  f = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
  tulis(KEY.fav, f);
  segarkanBadge();
  return f;
}

function segarkanBadge() {
  const el = document.getElementById("favCount");
  if (el) el.textContent = ambilFav().length;
}
window.addEventListener("storage", (e) => { if (e.key === KEY.fav) segarkanBadge(); });

// Format takaran: 0.5 -> "1/2", 0.25 -> "1/4", 1.5 -> "1 1/2"
function fmtQty(n) {
  if (!Number.isFinite(n)) return "";
  const pecah = { 0.25: "1/4", 0.5: "1/2", 0.75: "3/4" };
  const bulat = Math.floor(n + 1e-9);
  const sisa = Math.round((n - bulat) * 4) / 4;
  if (sisa === 0) return String(bulat);
  if (sisa === 1) return String(bulat + 1);
  const s = pecah[sisa] || String(sisa);
  return bulat > 0 ? bulat + " " + s : s;
}

// Teks bahan dengan faktor porsi. Satuan utuh (bagi:0) dibulatkan + tanda ±.
function teksBahan(b, faktor) {
  let q = b.jumlah * faktor;
  if (b.bagi === 0) q = Math.max(1, Math.round(q));
  else q = Math.round(q * 4) / 4;
  const awal = b.bagi === 0 && faktor !== 1 ? "±" : "";
  return awal + fmtQty(q) + " " + b.satuan + " " + b.nama;
}

// Waktu: 70 -> "1 jam 10 mnt", 45 -> "45 mnt"
function fmtWaktu(mnt) {
  if (mnt < 60) return mnt + " mnt";
  const j = Math.floor(mnt / 60), s = mnt % 60;
  return j + " jam" + (s ? " " + s + " mnt" : "");
}

// Fallback gambar berlapis: foto -> svg kategori -> blok warna.
// Gambar pengganti saat foto asli gagal dimuat. Dipakai sebagai data URI
// supaya tidak ada permintaan berkas tambahan yang bisa gagal lagi.
const GAMBAR_CADANGAN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
    '<rect width="400" height="300" fill="#0d5c34"/>' +
    '<g fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M120 168h160v40a32 32 0 0 1-32 32h-96a32 32 0 0 1-32-32z"/>' +
    '<path d="M104 168h192"/>' +
    '<path d="M160 138v-16a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v16"/>' +
    "</g></svg>"
  );

// Ganti gambar yang gagal dimuat. Dua tahap: gambar cadangan, lalu
// blok warna kalau cadangan pun tidak tampil.
//
// Penjaga tahap: kalau halaman ini juga memasang pendengar error sendiri,
// fungsi ini bisa terpanggil dua kali untuk satu kegagalan. Karena tahap
// disimpan di dataset, panggilan kedua langsung lompat ke blok warna tanpa
// melewati gambar cadangan.
function imgFallback(el) {
  const tahap = Number(el.dataset.stage || 0);
  if (tahap === 0) {
    el.dataset.stage = 1;
    el.onerror = null;                 // matikan penanganan inline
    el.src = el.dataset.fb || GAMBAR_CADANGAN;
    return;
  }
  el.dataset.stage = 2;
  el.onerror = null;
  el.style.display = "none";
  if (el.parentElement) el.parentElement.classList.add("img-solid");
}

// Visualisasi langkah: deteksi teknik + api + tanda matang dari teks.
// Teknik: tumis/rebus/kukus/bakar/panggang/goreng + blender/campur/masak/sajikan.
// Api: kecil/sedang/besar. Matang: pola "hingga/sampai ...".
const RE_TEKNIK = /(menumis|tumis|merebus|rebus|mengukus|kukus|membakar|bakar|menggoreng|goreng|memanggang|panggang|didihkan|didih|sangrai|ungkep|blender|haluskan|tumbuk|uleg|campur|aduk|masak|tumis|tumis|rebus|sajikan|tata|siram|tuang|masukkan|angkat|tiriskan|diamkan|simpan)/i;
const RE_API = /api\s+(terkecil|sangat kecil|kecil|sedang|besar|paling besar)/i;
const RE_MATANG = /tanda\s*matang\s*:\s*([^.]+)\.?/i;
const RE_HASIL = /(hingga|sampai|agar|supaya)\s+([^.]+)\.?/i;

function parseLangkah(teks) {
  const norm = { menumis: "tumis", merebus: "rebus", mengukus: "kukus", membakar: "bakar", menggoreng: "goreng", memanggang: "panggang", didihkan: "rebus", didih: "rebus", blender: "haluskan", haluskan: "haluskan", tumbuk: "haluskan", uleg: "haluskan", campur: "campur", aduk: "campur", masak: "masak", sajikan: "sajikan", tata: "sajikan", siram: "sajikan", tuang: "sajikan", masukkan: "masak", angkat: "sajikan", tiriskan: "sajikan", diamkan: "tunggu", simpan: "simpan" };
  let teknik = (teks.match(RE_TEKNIK) || [])[1];
  teknik = teknik ? (norm[teknik.toLowerCase()] || teknik.toLowerCase()) : null;
  const api = ((teks.match(RE_API) || [])[1] || "").toLowerCase().replace(/\s+/g, " ") || null;
  let matang = ((teks.match(RE_MATANG) || [])[1] || "").trim() || null;
  let sisa = teks;
  if (!matang) {
    const m2 = teks.match(RE_HASIL);
    if (m2) { matang = m2[2].trim(); }
  } else {
    sisa = teks.replace(RE_MATANG, "").trim();
  }
  return { teknik, api, matang, sisa };
}

// Warna badge per teknik: [latar, teks, ikon]. Semua dari token di style.css.
// Tumis/masak = hangat (kunyit), rebus/kukus/ungkep = sejuk (biru), bakar = merah.
const WARNA_TEKNIK = {
  tumis: ["oklch(0.97 0.045 85)", "oklch(0.40 0.09 75)", "i-cooking-pot"],
  masak: ["oklch(0.97 0.045 85)", "oklch(0.40 0.09 75)", "i-cooking-pot"],
  goreng: ["oklch(0.97 0.045 85)", "oklch(0.40 0.09 75)", "i-flame"],
  sangrai: ["oklch(0.97 0.045 85)", "oklch(0.40 0.09 75)", "i-flame"],
  rebus: ["oklch(0.97 0.015 250)", "oklch(0.42 0.13 250)", "i-soup"],
  ungkep: ["oklch(0.97 0.015 250)", "oklch(0.42 0.13 250)", "i-soup"],
  kukus: ["oklch(0.97 0.02 290)", "oklch(0.44 0.13 290)", "i-cooking-pot"],
  tunggu: ["oklch(0.97 0.02 290)", "oklch(0.44 0.13 290)", "i-timer"],
  bakar: ["oklch(0.96 0.03 27)", "oklch(0.45 0.16 27)", "i-flame-kindling"],
  panggang: ["oklch(0.96 0.03 27)", "oklch(0.45 0.16 27)", "i-flame-kindling"],
  siapkan: ["oklch(0.96 0.028 155)", "oklch(0.33 0.082 155)", "i-list-checks"],
  haluskan: ["oklch(0.96 0.028 155)", "oklch(0.33 0.082 155)", "i-list-checks"],
  sajikan: ["oklch(0.96 0.028 155)", "oklch(0.33 0.082 155)", "i-check"],
  simpan: ["oklch(0.96 0.028 155)", "oklch(0.33 0.082 155)", "i-basket"],
  campur: ["oklch(0.95 0.005 155)", "oklch(0.42 0.02 155)", "i-utensils"],
};

// HTML badge teknik + meter api. Kosong bila tidak terdeteksi.
function badgeTeknikHTML(parsed) {
  if (!parsed.teknik) return "";
  const w = WARNA_TEKNIK[parsed.teknik] || ["oklch(0.96 0.028 155)", "oklch(0.33 0.082 155)", "i-cooking-pot"];
  let meter = "";
  if (parsed.api) {
    const lvl = /kecil/.test(parsed.api) ? 1 : /sedang/.test(parsed.api) ? 2 : /besar/.test(parsed.api) ? 3 : 0;
    if (lvl) {
      let seg = "";
      for (let i = 1; i <= 3; i++) seg += '<i class="' + (i <= lvl ? "on" : "") + '"></i>';
      meter = '<span class="api-meter" role="img" aria-label="Api ' + parsed.api + '">' + seg + "</span>";
    }
  }
  return '<span class="badge-teknik" style="background:' + w[0] + ";color:" + w[1] + '">' +
    '<svg class="icon" aria-hidden="true"><use href="icons.svg#' + w[2] + '"/></svg>' +
    parsed.teknik + (parsed.api ? " · api " + parsed.api : "") + "</span>" + meter;
}

// ============================================================
// BAGIAN BERSAMA SEMUA HALAMAN
// Dipakai index.html, katalog.html, favorit.html, resep.html.
// ============================================================

// Ubah teks jadi aman dipasang di HTML, supaya tanda kutip di nama
// resep tidak merusak halaman.
function esc(teks) {
  return String(teks)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ID video YouTube selalu 11 karakter: huruf, angka, minus, garis bawah.
function idVideoValid(id) {
  return typeof id === "string" && /^[A-Za-z0-9_-]{11}$/.test(id);
}

// Detik jadi "02:31", untuk daftar bab video.
function fmtDetik(detik) {
  const d = Math.max(0, Math.floor(detik));
  return String(Math.floor(d / 60)).padStart(2, "0") + ":" + String(d % 60).padStart(2, "0");
}

// Satu kartu resep dipakai di semua halaman.
// opsi.ringkas = tanpa tombol Simpan (dipakai di bagian "Disandingkan").
function kartuResepHTML(r, opsi) {
  opsi = opsi || {};
  const tombolSimpan = opsi.ringkas
    ? ""
    : '<button class="btn btn-halus btn-kecil" type="button" data-simpan>'
      + (sudahFav(r.id) ? "Tersimpan" : "Simpan") + "</button>";

  return '<article class="card">'
    + '<a class="foto" href="resep.html?id=' + esc(r.id) + '">'
    + '<span class="lvl">' + esc(r.level) + "</span>"
    + '<img src="' + esc(r.foto) + '" alt="' + esc(r.nama) + '" loading="lazy" width="900" height="675" onerror="imgFallback(this)">'
    + "</a>"
    + '<div class="info">'
    + '<a class="nama" href="resep.html?id=' + esc(r.id) + '">' + esc(r.nama) + "</a>"
    + '<span class="daerah"><svg class="icon" aria-hidden="true"><use href="icons.svg#i-pin"/></svg>' + esc(r.daerah) + "</span>"
    + '<div class="meta">'
    + '<span><svg class="icon" aria-hidden="true"><use href="icons.svg#i-clock"/></svg>' + fmtWaktu(r.waktuTotal) + "</span>"
    + '<span><svg class="icon isi bintang" aria-hidden="true"><use href="icons.svg#i-star"/></svg>' + r.rating + "</span>"
    + (r.veg ? '<span><svg class="icon" aria-hidden="true"><use href="icons.svg#i-leaf"/></svg>Vege</span>' : "")
    + "</div>"
    + '<div class="row">' + tombolSimpan
    + '<a class="btn btn-solid btn-kecil" href="resep.html?id=' + esc(r.id) + '">Masak</a>'
    + "</div></div></article>";
}

// Pasang kartu ke wadah sekaligus hidupkan tombol Simpan.
// opsi.setelahSimpan dipanggil tiap kali tombol Simpan ditekan. Halaman
// favorit memakainya untuk menggambar ulang daftar, karena di sana
// melepas simpan berarti kartunya harus hilang.
function isiKartu(wadah, daftar, opsi) {
  opsi = opsi || {};
  wadah.innerHTML = daftar.map((r) => kartuResepHTML(r, opsi)).join("");
  wadah.querySelectorAll("[data-simpan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tautan = btn.closest(".card").querySelector("a.nama").getAttribute("href");
      const idResep = tautan.split("id=")[1];
      toggleFav(idResep);
      btn.textContent = sudahFav(idResep) ? "Tersimpan" : "Simpan";
      if (opsi.setelahSimpan) opsi.setelahSimpan(idResep);
    });
  });
}

// ============================================================
// VIDEO YOUTUBE
// Thumbnail dulu, iframe menyusul setelah diklik. Halaman jadi
// ringan karena 44 pemutar tidak dimuat sekaligus.
// ============================================================
function pasangVideo(wadah, idVideo, daftarBab, judulResep) {
  wadah.innerHTML = "";

  // ID tidak sah: tawarkan tautan keluar, jangan tanam apa pun.
  if (!idVideoValid(idVideo)) {
    wadah.innerHTML = '<a class="btn-yt" href="https://www.youtube.com/results?search_query='
      + encodeURIComponent(judulResep + " resep") + '" target="_blank" rel="noopener">Cari video di YouTube</a>';
    return;
  }

  const tautanTonton = "https://www.youtube.com/watch?v=" + idVideo;

  // Tombol facade: thumbnail + ikon play. Ini yang dilihat sebelum diklik.
  const facade = document.createElement("button");
  facade.type = "button";
  facade.className = "video-facade";
  facade.setAttribute("aria-label", "Putar video: " + judulResep);
  facade.innerHTML = '<img src="https://i.ytimg.com/vi/' + idVideo + '/hqdefault.jpg" alt="" loading="lazy" decoding="async" width="480" height="360">'
    + '<span class="video-play" aria-hidden="true"></span>';
  wadah.appendChild(facade);

  // Thumbnail gagal dimuat: ganti jadi tautan keluar.
  facade.querySelector("img").addEventListener("error", () => {
    facade.remove();
    const bab = wadah.querySelector(".video-bab");
    if (bab) bab.remove();
    wadah.insertAdjacentHTML("afterbegin",
      '<a class="btn-yt" href="' + tautanTonton + '" target="_blank" rel="noopener">Buka di YouTube</a>');
  });

  // Daftar bab, hanya kalau datanya ada.
  if (Array.isArray(daftarBab) && daftarBab.length) {
    const kotakBab = document.createElement("div");
    kotakBab.className = "video-bab";
    kotakBab.setAttribute("aria-label", "Lompat ke bagian video");
    daftarBab.forEach((bab) => {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className = "bab-btn";
      tombol.innerHTML = '<span class="menit">' + fmtDetik(bab[0]) + "</span>" + esc(bab[1]);
      tombol.addEventListener("click", () => muatPemutar(bab[0]));
      kotakBab.appendChild(tombol);
    });
    wadah.appendChild(kotakBab);
  }

  // Ganti facade dengan iframe. Kalau iframe sudah ada, cukup ubah src.
  function muatPemutar(detikMulai) {
    const mulai = typeof detikMulai === "number" && detikMulai > 0 ? Math.floor(detikMulai) : 0;
    const src = "https://www.youtube-nocookie.com/embed/" + idVideo
      + "?rel=0&autoplay=1" + (mulai ? "&start=" + mulai : "");

    const lama = wadah.querySelector("iframe");
    if (lama) { lama.src = src; return; }

    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "Video tutorial: " + judulResep;
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    facade.replaceWith(iframe);
  }

  facade.addEventListener("click", () => muatPemutar(0));
}
