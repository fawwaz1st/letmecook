// LetMeCook — logika tiap halaman.
//
// Berkas ini menggantikan semua <script> yang dulu ditulis langsung
// di dalam HTML. Dua alasannya: seluruh kode halaman terkumpul di satu
// tempat yang mudah dicari, dan halaman bisa memakai Content-Security-
// Policy ketat tanpa izin 'unsafe-inline'.
//
// Cara kerjanya: tiap halaman menandai dirinya lewat <body data-halaman="...">,
// lalu router di bagian paling bawah memanggil fungsi yang cocok.
// Urutan muat: resep-data.js -> store.js -> halaman.js

// ============================================================
// BERANDA
// Sorotan hari ini, empat kategori, resep populer, dan resep berbab.
// ============================================================
function halamanIndex() {
  // Pencarian: ketik lalu Enter pindah ke katalog.
  document.getElementById("formCari").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("inputCari").value.trim();
    if (q) location.href = "katalog.html?q=" + encodeURIComponent(q);
  });

  // Resep untuk tanggal ini, berganti tiap tanggal.
  const hari = RESEP[new Date().getDate() % RESEP.length];
  document.getElementById("hariIni").innerHTML =
    '<div class="sorot">'
    + '<img src="' + esc(hari.foto) + '" alt="" width="440" height="330">'
    + '<div class="teks">'
    + "<h3>" + esc(hari.nama) + "</h3>"
    + '<p class="lega">' + esc(hari.deskripsi) + "</p>"
    + '<p class="meta">'
    + '<span><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-clock"/></svg>' + fmtWaktu(hari.waktuTotal) + "</span>"
    + '<span><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-users"/></svg>' + hari.porsi + " porsi</span>"
    + '<span><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-pin"/></svg>' + esc(hari.daerah) + "</span>"
    + "</p>"
    + '<a class="tb tb-isi" href="resep.html?id=' + esc(hari.id) + '">Masak resep ini</a>'
    + "</div></div>";

  // Empat kategori waktu makan.
  const kategori = [
    ["sarapan", "Sarapan", "Bubur, uduk, lontong.", "i-soup"],
    ["siang", "Makan siang", "Rendang, soto, gudeg.", "i-utensils"],
    ["malam", "Makan malam", "Rawon, betutu, ikan bakar.", "i-flame"],
    ["camilan", "Camilan", "Klepon, martabak, cendol.", "i-star"],
  ];
  document.getElementById("katGrup").innerHTML = kategori.map(([kode, nama, ket, ikon]) => {
    const jumlah = RESEP.filter((r) => r.kategori === kode).length;
    return '<a class="panel kat" href="katalog.html?kat=' + kode + '">'
      + '<svg class="ikon" aria-hidden="true"><use href="icons.svg#' + ikon + '"/></svg>'
      + "<span><strong>" + nama + " · " + jumlah + "</strong>"
      + "<small>" + ket + "</small></span></a>";
  }).join("");

  // Empat resep terpopuler.
  isiKartu(document.getElementById("popGrup"),
    RESEP.toSorted((a, b) => b.dimasak - a.dimasak).slice(0, 4));

  // Empat resep yang videonya punya penanda bagian.
  isiKartu(document.getElementById("babGrup"),
    RESEP.filter((r) => Array.isArray(r.bab) && r.bab.length).slice(0, 4));

  siapkanHalaman();
}

// ============================================================
// KATALOG
// Daftar semua resep dengan pencarian dan tiga saringan.
// Pilihan disimpan di alamat halaman, jadi bisa dibagikan apa adanya.
// ============================================================
function halamanKatalog() {
  const param = new URLSearchParams(location.search);
  const kat = param.get("kat") || "";
  const q = (param.get("q") || "").trim();

  const fLevel = document.getElementById("fLevel");
  const fWaktu = document.getElementById("fWaktu");
  const fDiet = document.getElementById("fDiet");
  const grup = document.getElementById("grup");
  const kosong = document.getElementById("kosong");
  const jumlahTeks = document.getElementById("jumlahTeks");
  const tombolReset = document.getElementById("tombolReset");

  document.getElementById("inputCari").value = q;

  // Tandai chip kategori yang sedang aktif.
  document.querySelectorAll("#chipKategori a").forEach((a) => {
    if (a.dataset.kat === kat) a.classList.add("aktif");
  });

  // Pencarian berikutnya tetap membawa kategori yang sedang dipilih.
  document.getElementById("formCari").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = document.getElementById("inputCari").value.trim();
    const bagian = [];
    if (v) bagian.push("q=" + encodeURIComponent(v));
    if (kat) bagian.push("kat=" + kat);
    location.href = "katalog.html" + (bagian.length ? "?" + bagian.join("&") : "");
  });

  // Kata kunci dicocokkan ke nama, daerah, deskripsi, dan nama bahan.
  function cocokKata(r, kata) {
    if (!kata) return true;
    const tumpuk = [r.nama, r.daerah, r.deskripsi, r.rasa, r.bahan.map((b) => b.nama).join(" ")]
      .join(" ").toLowerCase();
    return kata.toLowerCase().split(/\s+/).every((k) => tumpuk.includes(k));
  }

  const NAMA_KAT = {
    "": "Semua resep",
    sarapan: "Resep sarapan",
    siang: "Resep makan siang",
    malam: "Resep makan malam",
    camilan: "Resep camilan",
  };

  function saring() {
    let daftar = RESEP.filter((r) => !kat || r.kategori === kat);
    daftar = daftar.filter((r) => cocokKata(r, q));

    if (fLevel.value) daftar = daftar.filter((r) => r.level === fLevel.value);
    if (fWaktu.value) daftar = daftar.filter((r) => r.waktuTotal <= Number(fWaktu.value));
    if (fDiet.value === "veg") daftar = daftar.filter((r) => r.veg);
    if (fDiet.value === "anak") daftar = daftar.filter((r) => r.anak);
    if (fDiet.value === "nopedas") daftar = daftar.filter((r) => r.pedas === 0);
    if (fDiet.value === "bab") daftar = daftar.filter((r) => Array.isArray(r.bab) && r.bab.length);
    return daftar;
  }

  function gambar() {
    const daftar = saring();

    document.getElementById("judul").textContent =
      (NAMA_KAT[kat] || NAMA_KAT[""]) + (q ? ' untuk "' + q + '"' : "");
    jumlahTeks.textContent = "Menampilkan " + daftar.length + " dari " + RESEP.length + " resep";

    const adaSaringan = Boolean(q || fLevel.value || fWaktu.value || fDiet.value || kat);
    tombolReset.hidden = !adaSaringan;

    isiKartu(grup, daftar);

    const takAda = daftar.length === 0;
    kosong.hidden = !takAda;
    if (takAda) {
      document.getElementById("kosongJudul").textContent =
        q ? 'Tidak ada hasil untuk "' + q + '"' : "Tidak ada resep yang cocok";
    }
  }

  function hapusSemua() {
    location.href = "katalog.html";
  }

  tombolReset.addEventListener("click", hapusSemua);
  document.getElementById("kosongAksi").addEventListener("click", hapusSemua);
  [fLevel, fWaktu, fDiet].forEach((el) => el.addEventListener("change", gambar));

  gambar();
  siapkanHalaman();

  // ---- Data terstruktur: daftar resep untuk mesin pencari ----
  // ItemList membuat Google paham ini halaman daftar, dan tiap butir
  // menunjuk ke alamat resepnya. Posisi harus berurutan mulai dari 1.
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog resep masakan Indonesia",
    numberOfItems: RESEP.length,
    itemListElement: RESEP.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: "https://fawwaz1st.github.io/letmecook/resep.html?id=" + encodeURIComponent(r.id),
    })),
  });
  document.head.appendChild(ld);
}

// ============================================================
// HALAMAN RESEP
// Seluruh isi dibangun dari satu objek resep: bahan, langkah,
// timer per langkah, centang kemajuan, dan mode masak.
// ============================================================
function halamanResep() {
  const idResep = new URLSearchParams(location.search).get("id");
  const r = cariResep(idResep);
  const area = document.getElementById("area");

  if (!r) {
    area.innerHTML = '<div class="panel"><div class="kosong">'
      + '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-search"/></svg>'
      + "<h1>Resep itu tidak ada</h1>"
      + "<p>Mungkin ID di alamatnya salah. Semua resep ada di katalog.</p>"
      + '<a class="tb tb-isi" href="katalog.html">Buka katalog</a>'
      + "</div></div>";
    siapkanHalaman();
    return;
  }

  document.title = r.nama + " — LetMeCook";
  const metaDesk = document.querySelector('meta[name="description"]');
  if (metaDesk) metaDesk.setAttribute("content", r.deskripsi.slice(0, 150));
  const ogJudul = document.querySelector('meta[property="og:title"]');
  if (ogJudul) ogJudul.setAttribute("content", r.nama + " — LetMeCook");
  const ogGambar = document.querySelector('meta[property="og:image"]');
  if (ogGambar) ogGambar.setAttribute("content", r.foto);
  const kanonik = document.querySelector('link[rel="canonical"]');
  if (kanonik) kanonik.setAttribute("href", "https://fawwaz1st.github.io/letmecook/resep.html?id=" + encodeURIComponent(r.id));

  let faktorPorsi = 1;
  let timerAktif = null;

  // Label kecil di atas judul.
  const label = ['<span class="tag">' + esc(r.level) + "</span>",
    '<span class="tag">' + esc(r.kategori) + "</span>"];
  if (r.veg) label.push('<span class="tag hijau">Vegetarian</span>');
  if (r.anak) label.push('<span class="tag hijau">Aman anak</span>');
  if (r.pedas > 0) {
    label.push('<span class="tag merah"><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-flame-kindling"/></svg>Pedas ' + r.pedas + "/3</span>");
  }

  area.innerHTML =
    '<article class="panel"><div class="kepala-resep">'
    + '<img src="' + esc(r.foto) + '" alt="' + esc(r.nama) + ", " + esc(r.daerah) + '" width="900" height="562">'
    + '<div class="teks">'
    + '<div class="tag-baris">' + label.join("") + "</div>"
    + "<h1>" + esc(r.nama) + "</h1>"
    + '<p class="sub">'
    + '<span><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-pin"/></svg>' + esc(r.daerah) + "</span>"
    + '<span class="bintang"><svg class="ikon padat" aria-hidden="true"><use href="icons.svg#i-star"/></svg>' + r.rating + " dari 5</span>"
    + "<span>dimasak " + r.dimasak.toLocaleString("id-ID") + " kali</span>"
    + "</p>"
    + '<p class="lega">' + esc(r.deskripsi) + "</p>"

    + '<dl class="info-cepat">'
    + '<div><dt><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-clock"/></svg>Total</dt><dd>' + fmtWaktu(r.waktuTotal) + "</dd></div>"
    + '<div><dt><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-flame"/></svg>Di dapur</dt><dd>' + fmtWaktu(r.waktuAktif) + "</dd></div>"
    + '<div><dt><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-users"/></svg>Hasil</dt><dd id="porsiTeks">' + r.porsi + " porsi</dd></div>"
    + '<div><dt><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-leaf"/></svg>Kalori</dt><dd>' + esc(r.kalori) + "</dd></div>"
    + "</dl>"

    + '<div class="aksi-resep">'
    + '<button class="tb tb-isi" id="bMasak" type="button"><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-play"/></svg>Mode masak</button>'
    + '<button class="tb" id="bFav" type="button"><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-heart"/></svg><span>' + (sudahFav(r.id) ? "Tersimpan" : "Simpan") + "</span></button>"
    + '<button class="tb tb-halus" id="bPrint" type="button"><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-printer"/></svg>Cetak</button>'
    + '<button class="tb tb-halus" id="bShare" type="button"><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-share"/></svg>Salin tautan</button>'
    + "</div></div></div></article>"

    + '<div class="dua-kolom jarak-atas">'

    + '<section class="panel" aria-label="Bahan">'
    + '<div class="panel-kepala"><h2><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-list-checks"/></svg>Bahan</h2></div>'
    + '<div class="baris-porsi"><span>Untuk</span>'
    + '<div class="stepper">'
    + '<button id="pMin" type="button" aria-label="Kurangi porsi"><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-minus"/></svg></button>'
    + '<span id="pVal">' + r.porsi + " porsi</span>"
    + '<button id="pPlus" type="button" aria-label="Tambah porsi"><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-plus"/></svg></button>'
    + "</div></div>"
    + '<ul class="bahan" id="bahanList"></ul>'
    + "</section>"

    + '<section class="panel" aria-label="Langkah">'
    + '<div class="panel-kepala"><h2><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-cooking-pot"/></svg>Langkah</h2>'
    + '<span class="baris-info kepala-prog" id="progTeks"></span></div>'
    + '<ol class="langkah" id="langkahList"></ol>'
    + '<div class="kotak kuning"><h3><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-bulb"/></svg>Sering gagal di sini</h3><p>' + esc(r.tips) + "</p></div>"
    + '<div class="kotak hijau"><h3><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-check"/></svg>Kalau sudah terjadi</h3><p>' + esc(r.selamat) + "</p></div>"
    + '<div class="kotak biru"><h3><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-clock"/></svg>Menyimpan sisa</h3><p>' + esc(r.simpan) + "</p></div>"
    + "</section></div>"

    + '<section class="panel jarak-atas" aria-label="Rasa dan gizi">'
    + '<div class="panel-kepala"><h2><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-leaf"/></svg>Rasa dan gizi</h2></div>'
    + '<div class="isi">'
    + "<p><strong>Rasanya dari mana.</strong> " + esc(r.rasa) + "</p>"
    + '<div class="gizi">'
    + "<div><strong>" + esc(r.kalori) + "</strong><span>per porsi</span></div>"
    + "<div><strong>" + esc(r.protein) + "</strong><span>protein</span></div>"
    + "</div>"
    + '<p><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-alert"/></svg> <strong>Perhatikan.</strong> ' + esc(r.pantangan) + "</p>"
    + "<p><strong>Enak dimakan dengan.</strong> " + esc(r.sanding.join(", ")) + "</p>"
    + "<p><strong>Minumnya.</strong> " + esc(r.minum) + "</p>"
    + '<p class="pesan">' + esc(r.suasana) + "</p>"
    + "</div></section>"

    + '<section class="panel jarak-atas" aria-label="Alat">'
    + '<div class="panel-kepala"><h2><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-utensils"/></svg>Alat yang perlu disiapkan</h2></div>'
    + '<div class="isi"><p>' + esc(r.alat.join(" · ")) + "</p></div>"
    + "</section>";

  // ---- Simpan, cetak, salin tautan ----
  document.getElementById("bFav").addEventListener("click", (e) => {
    toggleFav(r.id);
    e.currentTarget.querySelector("span").textContent = sudahFav(r.id) ? "Tersimpan" : "Simpan";
  });

  document.getElementById("bPrint").addEventListener("click", () => window.print());

  document.getElementById("bShare").addEventListener("click", async (e) => {
    const tombol = e.currentTarget;
    const teksAwal = tombol.textContent.trim();
    try {
      if (navigator.share) {
        await navigator.share({ title: r.nama, url: location.href });
        return;
      }
      await navigator.clipboard.writeText(location.href);
      tombol.textContent = "Tautan tersalin";
    } catch {
      tombol.textContent = "Tidak bisa menyalin";
    }
    setTimeout(() => { tombol.textContent = teksAwal; }, 2000);
  });

  // ---- Bahan dan penyesuaian porsi ----
  const bahanList = document.getElementById("bahanList");
  const semuaProg = baca(KEY.prog, {});
  // Normalisasi: data dari localStorage bisa saja rusak atau setengah,
  // jadi pastikan bentuknya selalu lengkap sebelum dipakai.
  const tersimpan = semuaProg[r.id];
  const prog = {
    bahan: Array.isArray(tersimpan && tersimpan.bahan) ? tersimpan.bahan : [],
    langkah: Array.isArray(tersimpan && tersimpan.langkah) ? tersimpan.langkah : [],
  };

  function gambarBahan() {
    bahanList.innerHTML = "";
    r.bahan.forEach((b, i) => {
      const li = document.createElement("li");
      if (prog.bahan[i]) li.classList.add("selesai");

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = Boolean(prog.bahan[i]);
      cb.setAttribute("aria-label", b.nama);
      cb.addEventListener("change", () => {
        prog.bahan[i] = cb.checked;
        li.classList.toggle("selesai", cb.checked);
        simpanProg();
      });

      const sp = document.createElement("span");
      sp.textContent = teksBahan(b, faktorPorsi);

      li.append(cb, sp);
      bahanList.appendChild(li);
    });
  }

  function simpanProg() {
    semuaProg[r.id] = prog;
    tulis(KEY.prog, semuaProg);
    gambarProg();
  }

  function gambarPorsi() {
    const baru = Math.max(1, Math.round(r.porsi * faktorPorsi));
    document.getElementById("pVal").textContent = baru + " porsi";
    document.getElementById("porsiTeks").textContent = baru + " porsi";
    gambarBahan();
  }

  document.getElementById("pMin").addEventListener("click", () => {
    if (r.porsi * faktorPorsi > 1) {
      faktorPorsi = Math.max(0.5, faktorPorsi - 0.5);
      gambarPorsi();
    }
  });
  document.getElementById("pPlus").addEventListener("click", () => {
    faktorPorsi = Math.min(4, faktorPorsi + 0.5);
    gambarPorsi();
  });

  // ---- Daftar langkah ----
  const langkahList = document.getElementById("langkahList");
  const langkahTerurai = r.langkah.map(parseLangkah);

  r.langkah.forEach((teks, i) => {
    const urai = langkahTerurai[i];
    const li = document.createElement("li");
    if (prog.langkah[i]) li.classList.add("selesai");

    const nomor = document.createElement("span");
    nomor.className = "nomor";
    nomor.setAttribute("aria-hidden", "true");

    const isi = document.createElement("div");
    isi.className = "isi";

    const badge = badgeTeknikHTML(urai);
    if (badge) {
      const kepala = document.createElement("div");
      kepala.innerHTML = badge;
      isi.appendChild(kepala);
    }

    const pTeks = document.createElement("p");
    pTeks.className = "teks-langkah";
    pTeks.textContent = urai.sisa;
    isi.appendChild(pTeks);

    // Tanda matang dibangun lewat textContent supaya teks data tetap aman.
    if (urai.matang) {
      const kotak = document.createElement("div");
      kotak.className = "tanda";
      kotak.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-check"/></svg><span></span>';
      const kuat = document.createElement("strong");
      kuat.textContent = "Matang kalau: ";
      kotak.querySelector("span").append(kuat, document.createTextNode(urai.matang));
      isi.appendChild(kotak);
    }

    const baris = document.createElement("div");
    baris.className = "baris-aksi";

    const tombolCek = document.createElement("button");
    tombolCek.type = "button";
    tombolCek.className = "tb-mini";
    const tulisCek = () => {
      tombolCek.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-check"/></svg>'
        + (prog.langkah[i] ? "Selesai" : "Tandai selesai");
    };
    tulisCek();
    tombolCek.addEventListener("click", () => {
      prog.langkah[i] = !prog.langkah[i];
      li.classList.toggle("selesai", prog.langkah[i]);
      tulisCek();
      simpanProg();
    });
    baris.appendChild(tombolCek);

    // Timer muncul otomatis kalau langkah menyebut waktu.
    const waktu = waktuDiTeks(teks);
    if (waktu) {
      const tombolTimer = document.createElement("button");
      tombolTimer.type = "button";
      tombolTimer.className = "tb-mini";
      tombolTimer.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-timer"/></svg>Timer ' + waktu[0];
      tombolTimer.addEventListener("click", () => mulaiTimer(tombolTimer, waktu[1]));
      baris.appendChild(tombolTimer);
    }

    isi.appendChild(baris);
    li.append(nomor, isi);
    langkahList.appendChild(li);
  });

  function gambarProg() {
    const selesai = prog.langkah.filter(Boolean).length;
    document.getElementById("progTeks").textContent = selesai + " dari " + r.langkah.length + " langkah";
  }

  function mulaiTimer(tombol, detik) {
    // Satu timer saja supaya tidak ada dua hitungan bersamaan.
    if (timerAktif) {
      clearInterval(timerAktif);
      timerAktif = null;
      document.querySelectorAll(".tb-mini.jalan").forEach((b) => b.classList.remove("jalan"));
    }

    tombol.classList.add("jalan");
    const tulisSisa = (sisa) => {
      tombol.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-timer"/></svg>' + fmtDetik(sisa);
    };

    timerAktif = hitungMundur(detik, tulisSisa, () => {
      timerAktif = null;
      tombol.classList.remove("jalan");
      tombol.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-check"/></svg>Waktunya habis';
      if (navigator.vibrate) navigator.vibrate(400);
    });
  }

  gambarBahan();
  gambarProg();

  // ---- Mode masak: langkah besar + video ----
  document.getElementById("bMasak").addEventListener("click", () => bukaModeMasak(r));

  // ---- Data terstruktur untuk mesin pencari ----
  // Aturan yang dipatuhi (panduan Google 2026):
  // - VideoObject wajib punya name, thumbnailUrl, dan uploadDate.
  // - contentUrl hanya untuk berkas video langsung, jadi tidak dipakai.
  // - keywords tidak boleh berisi kategori atau daerah (itu bukan kata kunci).
  // - aggregateRating sengaja tidak diisi karena rating di situs ini
  //   adalah angka contoh, bukan ulasan pengguna sungguhan.
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.nama,
    description: r.deskripsi,
    image: [r.foto],
    author: { "@type": "Organization", name: "LetMeCook" },
    recipeCuisine: "Indonesia",
    recipeCategory: r.kategori,
    keywords: [r.nama, "resep " + r.nama, "masakan Indonesia"].join(", "),
    totalTime: "PT" + r.waktuTotal + "M",
    prepTime: "PT" + r.waktuAktif + "M",
    recipeYield: r.porsi + " porsi",
    recipeIngredient: r.bahan.map((b) => b.jumlah + " " + b.satuan + " " + b.nama),
    recipeInstructions: r.langkah.map((t) => ({ "@type": "HowToStep", text: t })),
    video: {
      "@type": "VideoObject",
      name: "Cara memasak " + r.nama,
      description: r.deskripsi,
      thumbnailUrl: "https://i.ytimg.com/vi/" + r.video + "/hqdefault.jpg",
      embedUrl: "https://www.youtube-nocookie.com/embed/" + r.video,
      uploadDate: "2026-01-01T00:00:00+07:00",
      duration: "PT" + (DURASI_VIDEO[r.id] || 0) + "S",
    },
  });
  document.head.appendChild(ld);

  // Hentikan timer kalau halaman ditinggalkan, supaya tidak jalan
  // diam-diam di latar belakang.
  window.addEventListener("pagehide", () => {
    if (timerAktif) { clearInterval(timerAktif); timerAktif = null; }
  });

  // ---- Resep pendamping: kategori berbeda biar bervariasi ----
  isiKartu(document.getElementById("sanding"),
    RESEP.filter((x) => x.id !== r.id && x.kategori !== r.kategori).slice(0, 4),
    { tanpaSimpan: true });

  siapkanHalaman();
}

// ============================================================
// RENCANA MAKAN
// 21 slot makan untuk seminggu, plus daftar belanja yang tersusun
// sendiri dari bahan resep yang dipilih.
// ============================================================
function halamanMealplan() {
  const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const SLOT = [["pagi", "Pagi"], ["siang", "Siang"], ["malam", "Malam"]];

  function ambilRencana() {
    const isi = baca(KEY.meal, {});
    return isi && typeof isi === "object" ? isi : {};
  }

  function simpanRencana(rencana) {
    tulis(KEY.meal, rencana);
    gambarRencana();
    gambarBelanja();
  }

  // ---- Rencana 7 hari ----
  function gambarRencana() {
    const rencana = ambilRencana();
    const grup = document.getElementById("mealGrup");
    let terisi = 0;
    grup.innerHTML = "";

    HARI.forEach((hari) => {
      const kotak = document.createElement("div");
      kotak.className = "hari";
      kotak.innerHTML = '<h3><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-calendar"/></svg>' + hari + "</h3>";

      SLOT.forEach(([kode, label]) => {
        const id = rencana[hari] && rencana[hari][kode];
        const resep = id ? cariResep(id) : null;
        if (resep) terisi++;

        const baris = document.createElement("div");
        baris.className = "slot";

        const waktu = document.createElement("span");
        waktu.className = "waktu";
        waktu.textContent = label;

        const isi = document.createElement("span");
        isi.className = "isi-slot" + (resep ? "" : " kosong-teks");
        if (resep) {
          const tautan = document.createElement("a");
          tautan.href = "resep.html?id=" + encodeURIComponent(resep.id);
          tautan.textContent = resep.nama;
          isi.appendChild(tautan);
        } else {
          isi.textContent = "belum diisi";
        }

        const tombol = document.createElement("button");
        tombol.type = "button";
        tombol.textContent = resep ? "Ganti" : "Isi";
        tombol.addEventListener("click", () => bukaPemilih(hari, kode, label));

        baris.append(waktu, isi, tombol);

        if (resep) {
          const hapus = document.createElement("button");
          hapus.type = "button";
          hapus.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-x"/></svg>';
          hapus.setAttribute("aria-label", "Kosongkan " + hari + " " + label);
          hapus.addEventListener("click", () => {
            const baru = ambilRencana();
            if (baru[hari]) delete baru[hari][kode];
            simpanRencana(baru);
          });
          baris.appendChild(hapus);
        }

        kotak.appendChild(baris);
      });

      grup.appendChild(kotak);
    });

    document.getElementById("isiTeks").textContent = terisi + " dari 21 slot terisi";
  }

  // ---- Pemilih resep ----
  const pilih = document.getElementById("pilih");
  const daftarPilih = document.getElementById("pilihDaftar");
  const cariPilih = document.getElementById("pilihCari");
  let slotSasaran = null;

  function gambarPilihan() {
    const kata = cariPilih.value.trim().toLowerCase();
    const hasil = RESEP.filter((r) => {
      if (!kata) return true;
      return (r.nama + " " + r.daerah + " " + r.kategori).toLowerCase().includes(kata);
    }).slice(0, 40);

    daftarPilih.innerHTML = hasil.map((r) =>
      '<li><button type="button" data-id="' + esc(r.id) + '">'
      + '<span class="pilih-nama">' + esc(r.nama) + "</span>"
      + '<span class="pilih-ket">' + esc(r.daerah) + " · " + fmtWaktu(r.waktuTotal) + " · " + esc(r.level) + "</span>"
      + "</button></li>"
    ).join("");

    daftarPilih.querySelectorAll("button[data-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!slotSasaran) return;
        const baru = ambilRencana();
        if (!baru[slotSasaran.hari]) baru[slotSasaran.hari] = {};
        baru[slotSasaran.hari][slotSasaran.kode] = btn.dataset.id;
        tutupPemilih();
        simpanRencana(baru);
      });
    });
  }

  function bukaPemilih(hari, kode, label) {
    slotSasaran = { hari, kode };
    document.getElementById("pilihJudul").textContent = "Pilih resep untuk " + hari + " " + label;
    cariPilih.value = "";
    gambarPilihan();
    pilih.classList.add("buka");
    document.body.classList.add("masak-jalan");
    cariPilih.focus();
  }

  function tutupPemilih() {
    pilih.classList.remove("buka");
    document.body.classList.remove("masak-jalan");
    slotSasaran = null;
  }

  document.getElementById("pilihTutup").addEventListener("click", tutupPemilih);
  cariPilih.addEventListener("input", gambarPilihan);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pilih.classList.contains("buka")) tutupPemilih();
  });

  // ---- Daftar belanja ----
  // Bahan dengan nama dan satuan sama digabung jumlahnya.
  function susunBelanja() {
    const rencana = ambilRencana();
    const gabung = {};

    HARI.forEach((hari) => {
      SLOT.forEach(([kode]) => {
        const id = rencana[hari] && rencana[hari][kode];
        const resep = id ? cariResep(id) : null;
        if (!resep) return;

        resep.bahan.forEach((b) => {
          const kunci = b.nama.toLowerCase().trim() + "|" + b.satuan.toLowerCase().trim();
          if (!gabung[kunci]) gabung[kunci] = { nama: b.nama, satuan: b.satuan, jumlah: 0, dari: [] };
          gabung[kunci].jumlah += b.jumlah;
          if (!gabung[kunci].dari.includes(resep.nama)) gabung[kunci].dari.push(resep.nama);
        });
      });
    });

    return Object.values(gabung).sort((a, b) => a.nama.localeCompare(b.nama, "id"));
  }

  // Bahan yang ditulis sendiri, disimpan supaya tidak hilang saat digambar ulang.
  function ambilTambahan() {
    const isi = baca(KEY.gmanual, []);
    return Array.isArray(isi) ? isi : [];
  }

  // Satu baris bahan.
  function barisBahan(teks, kunci, keterangan) {
    const centang = baca(KEY.gcheck, {});
    const li = document.createElement("li");
    if (centang[kunci]) li.classList.add("centang");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = Boolean(centang[kunci]);
    cb.setAttribute("aria-label", teks);
    cb.addEventListener("change", () => {
      const baru = baca(KEY.gcheck, {});
      baru[kunci] = cb.checked;
      tulis(KEY.gcheck, baru);
      li.classList.toggle("centang", cb.checked);
    });

    const sp = document.createElement("span");
    sp.textContent = teks;
    if (keterangan) {
      const ket = document.createElement("span");
      ket.className = "dari";
      ket.textContent = keterangan;
      sp.appendChild(ket);
    }

    li.append(cb, sp);
    return li;
  }

  function gambarBelanja() {
    const ul = document.getElementById("belanja");
    const dariResep = susunBelanja();
    const tambahan = ambilTambahan();
    ul.innerHTML = "";

    const total = dariResep.length + tambahan.length;
    document.getElementById("belanjaTeks").textContent = total ? total + " bahan" : "Belum ada bahan";

    if (!total) {
      const li = document.createElement("li");
      li.innerHTML = "<span>Isi minimal satu slot di atas, atau tambahkan bahan sendiri di bawah.</span>";
      ul.appendChild(li);
      return;
    }

    dariResep.forEach((g) => {
      const jumlah = fmtQty(Math.round(g.jumlah * 4) / 4);
      ul.appendChild(barisBahan(jumlah + " " + g.satuan + " " + g.nama,
        g.nama + "|" + g.satuan, "untuk " + g.dari.join(", ")));
    });

    tambahan.forEach((t, i) => {
      const li = barisBahan(t.teks, "manual|" + i, null);
      const hapus = document.createElement("button");
      hapus.type = "button";
      hapus.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-x"/></svg>';
      hapus.setAttribute("aria-label", "Hapus " + t.teks);
      hapus.addEventListener("click", () => {
        const baru = ambilTambahan();
        baru.splice(i, 1);
        tulis(KEY.gmanual, baru);
        gambarBelanja();
      });
      li.appendChild(hapus);
      ul.appendChild(li);
    });
  }

  document.getElementById("formManual").addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("mNama").value.trim();
    if (!nama) return;

    const jumlah = document.getElementById("mJumlah").value.trim();
    const satuan = document.getElementById("mSatuan").value.trim();
    const daftar = ambilTambahan();
    daftar.push({ teks: [jumlah, satuan, nama].filter(Boolean).join(" ") });
    tulis(KEY.gmanual, daftar);

    e.target.reset();
    gambarBelanja();
  });

  document.getElementById("tautanCetak").addEventListener("click", () => {
    window.print();
  });

  gambarRencana();
  gambarBelanja();
  siapkanHalaman();
}

// ============================================================
// FAVORIT
// Daftar resep yang disimpan di browser ini.
// ============================================================
function halamanFavorit() {
  function gambar() {
    const daftar = ambilFav().map(cariResep).filter(Boolean);
    segarkanBadge();

    document.getElementById("kosong").hidden = daftar.length > 0;
    document.getElementById("jumlahTeks").textContent = daftar.length
      ? daftar.length + " resep tersimpan di browser ini"
      : "Belum ada resep tersimpan";

    // Di halaman ini, melepas simpan berarti kartunya harus hilang.
    isiKartu(document.getElementById("grup"), daftar, { setelahSimpan: gambar });
  }

  gambar();
  siapkanHalaman();
}

// ============================================================
// ROUTER
// Halaman memilih fungsinya sendiri lewat <body data-halaman="...">.
// ============================================================
(function mulai() {
  segarkanBadge();

  const fn = {
    index: halamanIndex,
    katalog: halamanKatalog,
    resep: halamanResep,
    mealplan: halamanMealplan,
    favorit: halamanFavorit,
    tentang: siapkanHalaman,
    "404": siapkanHalaman,
  }[document.body.dataset.halaman];

  if (fn) fn();
})();
