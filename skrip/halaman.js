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
  const hari = RESEP[Math.floor(Date.now() / 86400000) % RESEP.length];
  document.getElementById("hariIni").innerHTML =
    '<div class="sorot">'
    + '<img src="' + esc(hari.foto) + '" alt="" width="440" height="330" fetchpriority="high" decoding="async">'
    + '<div class="teks">'
    + "<h3>" + esc(hari.nama) + "</h3>"
    + '<p class="lega">' + esc(hari.deskripsi) + "</p>"
    + '<p class="meta">'
    + '<span><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-clock"/></svg>' + fmtWaktu(hari.waktuTotal) + "</span>"
    + '<span><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-users"/></svg>' + hari.porsi + " porsi</span>"
    + '<span><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-pin"/></svg>' + esc(hari.daerah) + "</span>"
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
      + '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#' + ikon + '"/></svg>'
      + "<span><strong>" + nama + " · " + jumlah + "</strong>"
      + "<small>" + ket + "</small></span></a>";
  }).join("");

  // Empat resep terpopuler.
  isiKartu(document.getElementById("popGrup"),
    RESEP.toSorted((a, b) => b.rating - a.rating).slice(0, 4));

  // Empat resep yang videonya punya penanda bagian.
  isiKartu(document.getElementById("babGrup"),
    RESEP.filter((r) => Array.isArray(r.bab) && r.bab.length).slice(0, 4));

  // Data terstruktur WebSite + SearchAction: kotak cari di beranda
  // terdaftar sebagai tindakan pencarian situs di hasil mesin pencari.
  const ldSitus = document.createElement("script");
  ldSitus.type = "application/ld+json";
  ldSitus.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LetMeCook",
    url: "https://fawwaz1st.github.io/letmecook/",
    inLanguage: "id",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://fawwaz1st.github.io/letmecook/katalog.html?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  });
  document.head.appendChild(ldSitus);

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

  // Tandai chip kategori yang sedang aktif (visual + aria-current).
  document.querySelectorAll("#chipKategori a").forEach((a) => {
    if (a.dataset.kat === kat) { a.classList.add("aktif"); a.setAttribute("aria-current", "page"); }
  });

  // Pencarian berikutnya tetap membawa kategori yang sedang dipilih.
  document.getElementById("formCari").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = document.getElementById("inputCari").value.trim();
    const bagian = [];
    if (v) bagian.push("q=" + encodeURIComponent(v));
    if (kat) bagian.push("kat=" + encodeURIComponent(kat));
    location.href = "katalog.html" + (bagian.length ? "?" + bagian.join("&") : "");
  });

  // ---- Mode kulkas ----
  // Kullan textarea "bahan yang kupunya" (pisahkan koma), skor tiap resep
  // dari berapa bahan resep yang cocok, tampilkan yang >= 60%.
  const fKulkas = document.getElementById("fKulkas");
  const kulkasIsi = document.getElementById("kulkasIsi");
  const kulkasInput = document.getElementById("kulkasInput");
  let modeKulkas = false;
  let skorKulkas = null; // Map(id -> {cocok, total})
  let jumlahBahan = 0;
  if (fKulkas && kulkasIsi && kulkasInput) {
    fKulkas.addEventListener("change", () => {
      modeKulkas = fKulkas.checked;
      kulkasIsi.hidden = !modeKulkas;
      if (modeKulkas) {
        kulkasInput.focus();
        gambar();
      } else {
        skorKulkas = null;
        gambar();
      }
    });
    kulkasInput.addEventListener("input", () => {
      if (!modeKulkas) return;
      const milik = kulkasInput.value.split(/[,\n]/).map((s) => s.trim().toLowerCase()).filter(Boolean);
      jumlahBahan = milik.length;
      skorKulkas = new Map();
      for (const r of RESEP) {
        let cocok = 0;
        for (const b of r.bahan) {
          const nama = b.nama.toLowerCase().split("(")[0].trim();
          const kata = nama.split(/\s+/);
          if (milik.some((m) => m === nama || kata.some((k) => k.length > 2 && m.includes(k)) || nama.includes(m))) cocok++;
        }
        skorKulkas.set(r.id, { cocok, total: r.bahan.length });
      }
      gambar();
    });
  }

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

    // Mode kulkas: hanya resep yang memakai setidaknya 3 bahan milik user
    // (atau semua bila masukan < 3), urut yang paling cocok dulu.
    if (modeKulkas && skorKulkas) {
      const ambang = Math.min(3, jumlahBahan || 1);
      daftar = daftar.filter((r) => {
        const s = skorKulkas.get(r.id);
        return s && s.cocok >= ambang && s.total > 0 && s.cocok / s.total >= 0.2;
      }).toSorted((a, b) => {
        const sa = skorKulkas.get(a.id), sb = skorKulkas.get(b.id);
        return sb.cocok - sa.cocok || (sb.cocok / sb.total) - (sa.cocok / sa.total) || a.waktuTotal - b.waktuTotal;
      });
    }

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

    // NAMA_KAT dibaca lewat Object.hasOwn supaya nilai seperti "constructor"
    // di alamat halaman tidak bocor dari rantai prototipe bawaan JavaScript.
    const namaKat = Object.hasOwn(NAMA_KAT, kat) ? NAMA_KAT[kat] : NAMA_KAT[""];
    document.getElementById("judul").textContent =
      namaKat + (q ? ' untuk "' + q + '"' : "");
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
  const daftarLd = saring();
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog resep masakan Indonesia",
    numberOfItems: daftarLd.length,
    itemListElement: daftarLd.map((r, i) => ({
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
    const mr = document.createElement("meta"); mr.name = "robots"; mr.content = "noindex"; document.head.appendChild(mr);

    area.innerHTML = '<div class="panel"><div class="kosong">'
      + '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-search"/></svg>'
      + "<h1>Resep itu tidak ada</h1>"
      + "<p>Mungkin ID di alamatnya salah. Semua resep ada di katalog.</p>"
      + '<a class="tb tb-isi" href="katalog.html">Buka katalog</a>'
      + "</div></div>";
    siapkanHalaman();
    return;
  }

  document.title = r.nama + " — LetMeCook";
  const metaDesk = document.querySelector('meta[name="description"]');
  if (metaDesk) {
    const potong = r.deskripsi.length > 150 ? r.deskripsi.slice(0, 150).replace(/\s+\S*$/, "") : r.deskripsi;
    metaDesk.setAttribute("content", potong);
  }
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", "https://fawwaz1st.github.io/letmecook/resep.html?id=" + encodeURIComponent(r.id));
  const ogJudul = document.querySelector('meta[property="og:title"]');
  if (ogJudul) ogJudul.setAttribute("content", r.nama + " — LetMeCook");
  const ogGambar = document.querySelector('meta[property="og:image"]');
  if (ogGambar) ogGambar.setAttribute("content", r.foto);
  const kanonik = document.querySelector('link[rel="canonical"]');
  if (kanonik) kanonik.setAttribute("href", "https://fawwaz1st.github.io/letmecook/resep.html?id=" + encodeURIComponent(r.id));

  let porsiKini = r.porsi;
  let timerAktif = null;

  // Label kecil di atas judul.
  const label = ['<span class="tag">' + esc(r.level) + "</span>",
    '<span class="tag">' + esc(r.kategori) + "</span>"];
  if (r.veg) label.push('<span class="tag hijau">Vegetarian</span>');
  if (r.anak) label.push('<span class="tag hijau">Aman untuk anak</span>');
  if (r.pedas > 0) {
    label.push('<span class="tag merah"><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-flame-kindling"/></svg>Pedas ' + r.pedas + "/3</span>");
  }


  // ---- Kemajuan mode masak (dipakai tombol "Lanjutkan dari langkah N") ----
  const semuaProg = baca(KEY.prog, {});
  const tersimpan = semuaProg[r.id];
  const prog = {
    bahan: Array.isArray(tersimpan && tersimpan.bahan) ? tersimpan.bahan : [],
    langkah: Array.isArray(tersimpan && tersimpan.langkah) ? tersimpan.langkah : [],
  };

  area.innerHTML =
    '<article class="panel"><div class="kepala-resep">'
    + '<img src="' + esc(r.foto) + '" alt="' + esc(r.nama) + ", " + esc(r.daerah) + '"' + srcsetFoto(r.foto, ["500px", "1280px"]) + ' sizes="(min-width:760px) 50vw, 100vw" width="900" height="562" fetchpriority="high" decoding="async">'
    + '<div class="teks">'
    + '<div class="tag-baris">' + label.join("") + "</div>"
    + "<h1>" + esc(r.nama) + "</h1>"
    + '<p class="sub">'
    + '<span><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-pin"/></svg>' + esc(r.daerah) + "</span>"
    + ""
    + "</p>"
    + '<p class="lega">' + esc(r.deskripsi) + "</p>"

    + '<dl class="info-cepat">'
    + '<div><dt><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-clock"/></svg>Total</dt><dd>' + fmtWaktu(r.waktuTotal) + "</dd></div>"
    + '<div><dt><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-flame"/></svg>Di dapur</dt><dd>' + fmtWaktu(r.waktuAktif) + "</dd></div>"
    + '<div><dt><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-users"/></svg>Hasil</dt><dd id="porsiTeks">' + r.porsi + " porsi</dd></div>"
    + '<div><dt><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-leaf"/></svg>Kalori</dt><dd>' + esc(r.kalori) + "</dd></div>"
    + "</dl>"

    + '<div class="aksi-resep">'
    + (() => {
        const selesai = prog.langkah.filter(Boolean).length;
        if (selesai > 0) {
          return '<button class="tb" id="bLanjut" type="button"><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-play"/></svg>Lanjutkan dari langkah ' + (selesai + 1) + '</button>';
        }
        return "";
      })()
    + '<button class="tb tb-isi" id="bMasak" type="button"><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-play"/></svg>Mode masak</button>'
    + '<button class="tb" id="bFav" type="button"><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-heart"/></svg><span>' + (sudahFav(r.id) ? "Tersimpan" : "Simpan") + "</span></button>"
    + '<button class="tb tb-halus" id="bShare" type="button"><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-share"/></svg>Salin tautan</button>'
    + "</div></div></div></article>"
    + '<section class="panel catatan-panel" aria-labelledby="judulCatatan">'
    + '<div class="panel-kepala"><h2 id="judulCatatan"><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-notes"/></svg>Catatan saya</h2></div>'
    + '<div class="isi">'
    + '<label class="catatan-label" for="isiCatatan">Tulis catatan pribadi untuk resep ini (mis. "lain kali kurangi garam"). Tersimpan di browser ini saja.</label>'
    + '<textarea id="isiCatatan" class="catatan" rows="3" placeholder="Tulis catatan di sini..."></textarea>'
    + '<p class="catatan-simpan"><span id="catatanStatus" role="status"></span></p>'
    + '</div></section>'

    + '<div class="dua-kolom jarak-atas">'

    + '<section class="panel" aria-label="Bahan">'
    + '<div class="panel-kepala"><h2><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-list-checks"/></svg>Bahan</h2></div>'
    + '<div class="baris-porsi"><span>Untuk</span>'
    + '<div class="stepper">'
    + '<button id="pMin" type="button" aria-label="Kurangi porsi"><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-minus"/></svg></button>'
    + '<span id="pVal" role="status">' + r.porsi + " porsi</span>"
    + '<button id="pPlus" type="button" aria-label="Tambah porsi"><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-plus"/></svg></button>'
    + "</div></div>"
    + '<ul class="bahan" id="bahanList"></ul>'
    + "</section>"

    + '<section class="panel" aria-label="Langkah">'
    + '<div class="panel-kepala"><h2><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-cooking-pot"/></svg>Langkah</h2>'
    + '<span class="baris-info kepala-prog" id="progTeks" role="status"></span></div>'
    + '<ol class="langkah" id="langkahList"></ol>'
    + '<div class="kotak kuning"><h3><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-bulb"/></svg>Sering bikin gagal</h3><p>' + esc(r.tips) + "</p></div>"
    + '<div class="kotak hijau"><h3><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-check"/></svg>Kalau sudah telanjur gagal</h3><p>' + esc(r.selamat) + "</p></div>"
    + '<div class="kotak biru"><h3><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-clock"/></svg>Menyimpan sisa masakan</h3><p>' + esc(r.simpan) + "</p></div>"
    + "</section></div>"

    + '<section class="panel jarak-atas" aria-label="Rasa dan gizi">'
    + '<div class="panel-kepala"><h2><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-leaf"/></svg>Rasa dan gizi</h2></div>'
    + '<div class="isi">'
    + "<p><strong>Rasanya.</strong> " + esc(r.rasa) + "</p>"
    + '<div class="gizi">'
    + "<div><strong>" + esc(r.kalori) + "</strong><span>per porsi</span></div>"
    + "<div><strong>" + esc(r.protein) + "</strong><span>protein</span></div>"
    + "</div>"
    + '<p><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-alert"/></svg> <strong>Perhatikan.</strong> ' + esc(r.pantangan) + "</p>"
    + "<p><strong>Cocok dimakan dengan.</strong> " + esc(r.sanding.join(", ")) + "</p>"
    + "<p><strong>Cocok diminum dengan.</strong> " + esc(r.minum) + "</p>"
    + '<p class="pesan">' + esc(r.suasana) + "</p>"
    + "</div></section>"

    + '<section class="panel jarak-atas" aria-label="Alat">'
    + '<div class="panel-kepala"><h2><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-utensils"/></svg>Alat yang perlu disiapkan</h2></div>'
    + '<div class="isi"><p>' + esc(r.alat.join(" · ")) + "</p></div>"
    + "</section>";

  // ---- Simpan dan salin tautan ----
  const tombolFav = document.getElementById("bFav");
  tombolFav.setAttribute("aria-pressed", String(sudahFav(r.id)));
  tombolFav.addEventListener("click", (e) => {
    toggleFav(r.id);
    const disimpan = sudahFav(r.id);
    e.currentTarget.querySelector("span").textContent = disimpan ? "Tersimpan" : "Simpan";
    e.currentTarget.setAttribute("aria-pressed", String(disimpan));
  });

  document.getElementById("bShare").addEventListener("click", async (e) => {
    const tombol = e.currentTarget;
    const awal = tombol.innerHTML;
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
    setTimeout(() => { tombol.innerHTML = awal; }, 2000);
  });


  const bahanList = document.getElementById("bahanList");

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
      sp.textContent = teksBahan(b, porsiKini / r.porsi);

      const pengganti = cariPengganti(b.nama);
      if (pengganti) {
        const pg = document.createElement("small");
        pg.className = "pengganti";
        pg.textContent = "Ganti: " + pengganti;
        li.append(cb, sp, pg);
      } else {
        li.append(cb, sp);
      }
      bahanList.appendChild(li);
    });
  }

  function simpanProg() {
    semuaProg[r.id] = prog;
    tulis(KEY.prog, semuaProg);
    gambarProg();
  }

  function gambarPorsi() {
    document.getElementById("pVal").textContent = porsiKini + " porsi";
    document.getElementById("porsiTeks").textContent = porsiKini + " porsi";
    document.getElementById("pMin").disabled = porsiKini <= 1;
    document.getElementById("pPlus").disabled = porsiKini >= 12;
    gambarBahan();
  }

  document.getElementById("pMin").addEventListener("click", () => {
    if (porsiKini > 1) {
      porsiKini--;
      gambarPorsi();
    }
  });
  document.getElementById("pPlus").addEventListener("click", () => {
    if (porsiKini < 12) {
      porsiKini++;
      gambarPorsi();
    }
  });
  gambarPorsi();

  // ---- Daftar langkah ----
  const langkahList = document.getElementById("langkahList");
  const langkahTerurai = r.langkah.map(parseLangkah);
  // Bab video dihitung sekali. Satu bab per langkah, jadi tiap langkah
  // tahu menit berapa di videonya. Dipakai untuk menampilkan penunjuk
  // waktu "Menit 02:52" di tiap langkah.
  const babLangkah = daftarBab(r, langkahTerurai);

  r.langkah.forEach((teks, i) => {
    const urai = langkahTerurai[i];
    const li = document.createElement("li");
    if (prog.langkah[i]) li.classList.add("selesai");

    const nomor = document.createElement("span");
    nomor.className = "nomor";
    nomor.setAttribute("aria-hidden", "true");

    const isi = document.createElement("div");
    isi.className = "isi";

    // Baris atas: badge teknik + penunjuk waktu video.
    const kepalaBaris = document.createElement("div");
    kepalaBaris.className = "langkah-kepala";

    const badge = badgeTeknikHTML(urai);
    if (badge) {
      const kepala = document.createElement("div");
      kepala.innerHTML = badge;
      kepalaBaris.appendChild(kepala);
    }

    // Penunjuk waktu video: menit berapa langkah ini dibahas di video.
    // Membantu orang menyambungkan teks dengan tayangan videonya.
    if (babLangkah[i]) {
      const waktu = document.createElement("span");
      waktu.className = "langkah-menit";
      waktu.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-play"/></svg>'
        + '<span></span>';
      waktu.querySelector("span").textContent = "Menit " + fmtDetik(babLangkah[i][0]);
      kepalaBaris.appendChild(waktu);
    }

    if (kepalaBaris.childElementCount) isi.appendChild(kepalaBaris);

    const pTeks = document.createElement("p");
    pTeks.className = "teks-langkah";
    pTeks.textContent = urai.sisa;
    isi.appendChild(pTeks);

    // Tanda matang dibangun lewat textContent supaya teks data tetap aman.
    if (urai.matang) {
      const kotak = document.createElement("div");
      kotak.className = "tanda";
      kotak.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-check"/></svg><span></span>';
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
      tombolCek.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-check"/></svg>'
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
      tombolTimer.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-timer"/></svg>Timer ' + waktu[0];
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
      tombol.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-timer"/></svg>' + fmtDetik(sisa);
    };

    timerAktif = hitungMundur(detik, tulisSisa, () => {
      timerAktif = null;
      tombol.classList.remove("jalan");
      tombol.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-check"/></svg>Waktunya habis';
      if (navigator.vibrate) navigator.vibrate(400);
    });
  }

  gambarBahan();
  gambarProg();

  // ---- Mode masak: langkah besar + video ----
  document.getElementById("bMasak").addEventListener("click", () => bukaModeMasak(r));
  const bLanjut = document.getElementById("bLanjut");
  if (bLanjut) bLanjut.addEventListener("click", () => {
    const selesai = prog.langkah.filter(Boolean).length;
    bukaModeMasak(r, selesai);
  });

  // Catatan pribadi: dimuat dari localStorage, disimpan otomatis saat diketik.
  const isiCatatan = document.getElementById("isiCatatan");
  if (isiCatatan) {
    const semuaCatatan = baca(KEY.catatan, {});
    if (semuaCatatan && typeof semuaCatatan === "object") isiCatatan.value = semuaCatatan[r.id] || "";
    isiCatatan.addEventListener("input", () => {
      const baru = baca(KEY.catatan, {}) || {};
      baru[r.id] = isiCatatan.value;
      tulis(KEY.catatan, baru);
      const status = document.getElementById("catatanStatus");
      if (status) status.textContent = "Tersimpan " + new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    });
  }

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
    image: [r.foto.replace(/\/500px-/, "/1280px-")],
    url: "https://fawwaz1st.github.io/letmecook/resep.html?id=" + encodeURIComponent(r.id),
    author: { "@type": "Organization", name: "LetMeCook" },
    recipeCuisine: "Indonesia",
    recipeCategory: r.kategori,
    keywords: [r.nama, "resep " + r.nama, "masakan Indonesia"].join(", "),
    totalTime: "PT" + r.waktuTotal + "M",
    cookTime: "PT" + r.waktuAktif + "M",
    recipeYield: r.porsi + " porsi",
    recipeIngredient: r.bahan.map((b) => b.jumlah + " " + b.satuan + " " + b.nama),
    recipeInstructions: r.langkah.map((t) => ({ "@type": "HowToStep", text: t })),
    video: {
      "@type": "VideoObject",
      name: "Cara memasak " + r.nama,
      description: r.deskripsi,
      thumbnailUrl: "https://i.ytimg.com/vi/" + r.video + "/hqdefault.jpg",
      embedUrl: "https://www.youtube-nocookie.com/embed/" + r.video,
      // Tanggal unggah asli dari YouTube, bukan tanggal karangan.
      uploadDate: (TANGGAL_VIDEO[r.id] || "2024-01-01") + "T00:00:00+07:00",
      duration: "PT" + (DURASI_VIDEO[r.id] || 0) + "S",
    },
  });
  document.head.appendChild(ld);

  // Remah navigasi (BreadcrumbList): jalur Katalog > resep ini dipahami
  // mesin pencari sebagai susunan halaman situs.
  const ldRemah = document.createElement("script");
  ldRemah.type = "application/ld+json";
  ldRemah.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Katalog", item: "https://fawwaz1st.github.io/letmecook/katalog.html" },
      { "@type": "ListItem", position: 2, name: r.nama },
    ],
  });
  document.head.appendChild(ldRemah);

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

  // Susun 21 slot secara deterministik dari katalog: pagi utamakan sarapan,
  // siang/malam utamakan kategori sejenis, hindari id dobel, dan sebar level
  // mudah lebih dulu supaya minggu pertama tidak menakutkan.
  function susunRencana() {
    const KAT_SLOT = { pagi: "sarapan", siang: "siang", malam: "malam" };
    const dipakai = new Set();
    const hasil = {};
    HARI.forEach((hari) => {
      hasil[hari] = {};
      SLOT.forEach(([kode]) => {
        const kat = KAT_SLOT[kode];
        const kandidat = RESEP.filter((r) => !dipakai.has(r.id));
        const cocok = kandidat.filter((r) => r.kategori === kat);
        const sisa = cocok.length ? cocok : kandidat;
        // Urutkan: yang paling cepat dulu, supaya minggu ini bisa langsung dicoba.
        const urut = sisa.toSorted((a, b) => a.waktuTotal - b.waktuTotal || a.nama.localeCompare(b.nama, "id"));
        const pilih = urut[0];
        if (pilih) {
          dipakai.add(pilih.id);
          hasil[hari][kode] = { id: pilih.id, porsi: pilih.porsi };
        }
      });
    });
    return hasil;
  }

  // Jalankan fn(resep, hari, kode, porsi) untuk tiap slot yang sudah terisi.
  // Dipakai gambarRencana dan susunBelanja — dulu keduanya menyalin
  // loop hari x slot yang sama, jadi perbaikan harus ditulis dua kali.
  //
  // Slot boleh berisi dua bentuk: id saja (data lama) atau {id, porsi}
  // (data baru). Data lama tetap terbaca dan memakai porsi bawaan resep.
  function bacaSlot(nilai) {
    if (!nilai) return null;
    if (typeof nilai === "string") return { id: nilai, porsi: null };
    if (typeof nilai === "object" && typeof nilai.id === "string") {
      const p = Number(nilai.porsi);
      return { id: nilai.id, porsi: Number.isFinite(p) && p > 0 ? p : null };
    }
    return null;
  }

  function tiapSlot(rencana, fn) {
    HARI.forEach((hari) => {
      SLOT.forEach(([kode]) => {
        const slot = bacaSlot(rencana[hari] && rencana[hari][kode]);
        const resep = slot ? cariResep(slot.id) : null;
        if (resep) fn(resep, hari, kode, slot.porsi || resep.porsi);
      });
    });
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
      kotak.innerHTML = '<h3><svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-calendar"/></svg>' + hari + "</h3>";

      SLOT.forEach(([kode, label]) => {
        // Slot bisa berisi id saja (data lama) atau {id, porsi} (data baru).
        const slot = bacaSlot(rencana[hari] && rencana[hari][kode]);
        const resep = slot ? cariResep(slot.id) : null;
        if (resep) terisi++;

        const baris = document.createElement("div");
        baris.className = "slot" + (resep ? " terisi" : "");

        const waktu = document.createElement("span");
        waktu.className = "waktu";
        waktu.textContent = label;

        const isi = document.createElement("span");
        isi.className = "isi-slot";
        if (resep) {
          // Foto mini: orang mengenali masakan dari tampilannya. Membuat
          // slot terisi langsung terbaca tanpa harus membaca nama.
          const img = document.createElement("img");
          img.className = "slot-foto";
          img.src = resep.foto;
          img.alt = "";
          img.loading = "lazy";
          img.width = 32;
          img.height = 32;
          const ss = srcsetNilai(resep.foto, ["120px", "250px"]);
          if (ss) img.setAttribute("srcset", ss);
          img.setAttribute("sizes", "32px");

          const tautan = document.createElement("a");
          tautan.href = "resep.html?id=" + encodeURIComponent(resep.id);
          tautan.textContent = resep.nama;
          isi.append(img, tautan);
        } else {
          isi.classList.add("kosong-teks");
          isi.textContent = "Belum diisi";
        }

        const tombol = document.createElement("button");
        tombol.type = "button";
        tombol.textContent = resep ? "Ganti" : "Isi";
        tombol.setAttribute("aria-label", (resep ? "Ganti " : "Isi ") + hari + " " + label);
        tombol.addEventListener("click", () => bukaPemilih(hari, kode, label));

        baris.append(waktu, isi, tombol);

        if (resep) {
          const hapus = document.createElement("button");
          hapus.type = "button";
          hapus.className = "slot-hapus";
          hapus.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-x"/></svg>';
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
  let fokusPemilih = null;

  // Kategori yang paling masuk akal untuk tiap waktu makan. Dipakai untuk
  // menaruh saran yang cocok di urutan atas, bukan menyembunyikan yang lain.
  const KAT_SLOT = { pagi: "sarapan", siang: "siang", malam: "malam" };

  function gambarPilihan() {
    const kata = cariPilih.value.trim().toLowerCase();
    const katCocok = slotSasaran ? KAT_SLOT[slotSasaran.kode] : null;
    const hasil = RESEP.filter((r) => {
      if (!kata) return true;
      return (r.nama + " " + r.daerah + " " + r.kategori).toLowerCase().includes(kata);
    })
      // Dulu dipotong 40 dari 67: 27 resep tidak pernah bisa dipilih sama
      // sekali. Sekarang semua tampil, yang sesuai waktu makan di atas.
      .toSorted((a, b) => {
        const aCocok = katCocok && a.kategori === katCocok ? 0 : 1;
        const bCocok = katCocok && b.kategori === katCocok ? 0 : 1;
        return aCocok - bCocok || a.waktuTotal - b.waktuTotal || a.nama.localeCompare(b.nama, "id");
      });

    // Tiap pilihan menampilkan foto, nama, dan keterangan singkat.
    // Foto membuat pemilihan lebih cepat: orang mengenali masakan dari
    // tampilannya, bukan dari namanya.
    daftarPilih.innerHTML = hasil.map((r) =>
      '<li><button type="button" data-id="' + esc(r.id) + '">'
      + '<img class="pilih-foto" src="' + esc(r.foto) + '"'
      + srcsetFoto(r.foto, ["120px", "250px"])
      + ' sizes="56px" alt="" loading="lazy" width="56" height="56">'
      + '<span class="pilih-teks">'
      + '<span class="pilih-nama">' + esc(r.nama) + "</span>"
      + '<span class="pilih-ket">' + esc(r.daerah) + " · " + fmtWaktu(r.waktuTotal) + " · " + esc(r.level) + "</span>"
      + "</span>"
      + '<span class="pilih-tag">' + esc(r.kategori) + "</span>"
      + "</button></li>"
    ).join("");

    daftarPilih.querySelectorAll("button[data-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!slotSasaran) return;
        const baru = ambilRencana();
        if (!baru[slotSasaran.hari]) baru[slotSasaran.hari] = {};
        // Simpan porsi sekalian: daftar belanja harus ikut skala rumah,
        // bukan skala bawaan resep.
        const dipilih = cariResep(btn.dataset.id);
        baru[slotSasaran.hari][slotSasaran.kode] = { id: btn.dataset.id, porsi: dipilih ? dipilih.porsi : null };
        tutupPemilih();
        simpanRencana(baru);
      });
    });
  }

  // Ketikan ditunda sedikit supaya tidak menggambar ulang 40 kartu dan
  // 40 foto pada tiap huruf — sama seperti kotak saran di kepala halaman.
  let jedaPilihan = null;
  function gambarPilihanTertunda() {
    clearTimeout(jedaPilihan);
    jedaPilihan = setTimeout(gambarPilihan, 150);
  }

  function bukaPemilih(hari, kode, label) {
    slotSasaran = { hari, kode };
    // Simpan tombol yang membuka dialog, supaya fokus bisa dikembalikan.
    fokusPemilih = document.activeElement;
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
    // Kembalikan fokus ke tombol "Isi"/"Ganti" yang tadi diklik.
    if (fokusPemilih && fokusPemilih.focus) {
      try { fokusPemilih.focus(); } catch { /* elemen sudah hilang */ }
      fokusPemilih = null;
    }
  }

  // Tahan Tab di dalam dialog pemilih selama terbuka, supaya fokus
  // tidak kabur ke halaman di belakang (dialog ini aria-modal="true").
  function tahanFokusPemilih(e) {
    if (e.key !== "Tab" || !pilih.classList.contains("buka")) return;
    const bisaFokus = pilih.querySelectorAll(
      'button, input, [href], [tabindex]:not([tabindex="-1"])'
    );
    if (!bisaFokus.length) return;
    const pertama = bisaFokus[0];
    const terakhir = bisaFokus[bisaFokus.length - 1];
    if (e.shiftKey && document.activeElement === pertama) {
      e.preventDefault();
      terakhir.focus();
    } else if (!e.shiftKey && document.activeElement === terakhir) {
      e.preventDefault();
      pertama.focus();
    }
  }

  document.getElementById("pilihTutup").addEventListener("click", tutupPemilih);
  cariPilih.addEventListener("input", gambarPilihanTertunda);
  document.addEventListener("keydown", tahanFokusPemilih, true);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pilih.classList.contains("buka")) tutupPemilih();
  });

  // ---- Daftar belanja ----
  // Bahan dengan nama dan satuan sama digabung jumlahnya.
  function susunBelanja() {
    const rencana = ambilRencana();
    const gabung = {};

    tiapSlot(rencana, (resep, hari, kode, porsi) => {
      // Jumlah bahan mengikuti porsi yang dipilih di slot, bukan porsi
      // bawaan resep. Tanpa ini, rumah berdua tetap dibelanjakan
      // bahan untuk 4 porsi.
      const faktor = porsi / resep.porsi;
      resep.bahan.forEach((b) => {
        // Spasi ganda di nama tidak boleh memecah kunci: "bawang  merah"
        // dan "bawang merah" harus tetap dianggap bahan yang sama.
        const kunci = b.nama.toLowerCase().replace(/\s+/g, " ").trim() + "|" + b.satuan.toLowerCase().trim();
        if (!gabung[kunci]) gabung[kunci] = { nama: b.nama, satuan: b.satuan, jumlah: 0, dari: [] };
        gabung[kunci].jumlah += b.jumlah * faktor;
        if (!gabung[kunci].dari.includes(resep.nama)) gabung[kunci].dari.push(resep.nama);
      });
    });

    return Object.values(gabung).sort((a, b) => a.nama.localeCompare(b.nama, "id"));
  }

  // Bahan yang ditulis sendiri, disimpan supaya tidak hilang saat digambar ulang.
  // Isinya disaring: data rusak di localStorage (misalnya berisi null atau
  // angka) tidak boleh membuat halaman gagal dimuat selamanya.
  function ambilTambahan() {
    const isi = baca(KEY.gmanual, []);
    if (!Array.isArray(isi)) return [];
    return isi.filter((t) => t && typeof t.teks === "string" && t.teks.trim());
  }

  // Satu baris bahan. centang = objek centang yang sudah dibaca
  // pemanggil, supaya localStorage tidak dibaca ulang per baris.
  function barisBahan(teks, kunci, keterangan, centang) {
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
    // Dibaca sekali untuk semua baris, bukan sekali per baris.
    const centang = baca(KEY.gcheck, {});
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
        g.nama + "|" + g.satuan, "untuk " + g.dari.join(", "), centang));
    });

    tambahan.forEach((t) => {
      if (!t.id) t.id = "m" + Date.now().toString(36) + Math.random().toString(36).slice(2);
      const li = barisBahan(t.teks, "manual|" + t.id, null, centang);
      const hapus = document.createElement("button");
      hapus.type = "button";
      hapus.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-x"/></svg>';
      hapus.setAttribute("aria-label", "Hapus " + t.teks);
      hapus.addEventListener("click", () => {
        const baru = ambilTambahan();
        const idx = baru.findIndex((x) => x.id === t.id);
        if (idx >= 0) baru.splice(idx, 1);
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

  gambarRencana();
  gambarBelanja();

  // Bagikan daftar belanja: pakai Web Share bila ada, jatuh ke salin teks.
  const bBagikan = document.getElementById("bBagikan");
  if (bBagikan) bBagikan.addEventListener("click", async () => {
    const dariResep = susunBelanja();
    const tambahan = ambilTambahan();
    if (!dariResep.length && !tambahan.length) return;
    const baris = dariResep.map((g) => "- " + fmtQty(Math.round(g.jumlah * 4) / 4) + " " + g.satuan + " " + g.nama + (g.dari && g.dari.length ? " (untuk " + g.dari.join(", ") + ")" : ""));
    tambahan.forEach((t) => baris.push("- " + t.teks));
    const teks = "Daftar belanja LetMeCook:\n" + baris.join("\n");
    if (navigator.share) {
      try { await navigator.share({ title: "Daftar belanja", text: teks }); return; } catch { /* batal */ }
    }
    try {
      await navigator.clipboard.writeText(teks);
      bBagikan.textContent = "Daftar tersalin";
      setTimeout(() => { bBagikan.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-share"/></svg>Bagikan daftar'; }, 1800);
    } catch {
      bBagikan.textContent = "Gagal menyalin";
      setTimeout(() => { bBagikan.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="aset/icons.svg#i-share"/></svg>Bagikan daftar'; }, 1800);
    }
  });
  const bSusun = document.getElementById("bSusun");
  if (bSusun) bSusun.addEventListener("click", () => {
    simpanRencana(susunRencana());
  });
  const bKosongkan = document.getElementById("bKosongkan");
  if (bKosongkan) bKosongkan.addEventListener("click", () => {
    simpanRencana({});
  });

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

    const fokusSebelum = document.activeElement;
    const kartuFokus = fokusSebelum && fokusSebelum.closest ? fokusSebelum.closest(".kartu") : null;
    // Di halaman ini, melepas simpan berarti kartunya harus hilang.
    isiKartu(document.getElementById("grup"), daftar, { setelahSimpan: gambar });
    const grupBaru = document.getElementById("grup");
    if (kartuFokus && grupBaru && !grupBaru.contains(document.activeElement)) {
      const tautan = grupBaru.querySelector(".kartu-tautan");
      if (tautan) tautan.focus();
    }
  }

  gambar();

  // ---- Cadangkan / impor data (tanpa akun, tanpa server) ----
  // Berkas JSON disalin via textarea (CSP memblokir Blob URL).
  const bEkspor = document.getElementById("bEkspor");
  const hasilEkspor = document.getElementById("hasilEkspor");
  const imporStatus = document.getElementById("imporStatus");
  if (bEkspor && hasilEkspor) {
    bEkspor.addEventListener("click", async () => {
      const data = {
        fav: baca(KEY.fav, []),
        meal: baca(KEY.meal, {}),
        gcheck: baca(KEY.gcheck, {}),
        gmanual: baca(KEY.gmanual, []),
        prog: baca(KEY.prog, {}),
        catatan: baca(KEY.catatan, {}),
      };
      const json = JSON.stringify(data, null, 2);
      hasilEkspor.value = json;
      hasilEkspor.hidden = false;
      try {
        await navigator.clipboard.writeText(json);
        imporStatus.textContent = "Dicadangkan. JSON tersalin; simpan sebagai berkas di perangkatmu.";
      } catch {
        imporStatus.textContent = "JSON ditampilkan di kotak teks. Salin manual (Ctrl+C).";
      }
    });
  }
  const fImpor = document.getElementById("fImpor");
  if (fImpor) {
    fImpor.addEventListener("change", () => {
      const file = fImpor.files && fImpor.files[0];
      if (!file) return;
      const pembaca = new FileReader();
      pembaca.onload = () => {
        try {
          const data = JSON.parse(pembaca.result);
          if (!data || typeof data !== "object") throw new Error("bukan objek JSON");
          ["fav", "meal", "gcheck", "gmanual", "prog", "catatan"].forEach((kunci) => {
            const val = data[kunci];
            if (val === undefined || val === null) return;
            tulis(KEY[kunci], val);
          });
          if (imporStatus) imporStatus.textContent = "Cadangan diimpor. Halaman dimuat ulang...";
          setTimeout(() => location.reload(), 600);
        } catch (e) {
          if (imporStatus) imporStatus.textContent = "Gagal impor: berkas tidak valid (" + e.message + ")";
        }
      };
      pembaca.readAsText(file);
      fImpor.value = "";
    });
  }

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

// Service worker: situs tetap bisa dibuka saat offline (sw.js).
// Hanya lewat http/https — dibuka langsung dari berkas (file://)
// dilewati, karena browser tidak mengizinkan service worker di sana.
if ("serviceWorker" in navigator && (location.protocol === "https:" || ["localhost", "127.0.0.1"].includes(location.hostname))) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

