// LetMeCook — 44 resep seluruh Indonesia + localStorage.
// Foto dari Wikimedia Commons (lihat komentar "Foto:" di tiap resep) dan video dari YouTube.
// Kunci: letmecook:fav (id[]), letmecook:meal (7 hari), letmecook:gcheck, letmecook:prog (progress masak).

// ============================================================
// PENYIMPANAN
// Favorit, rencana makan, centang. Semua di browser sendiri.
// ============================================================
const KEY = {
  fav: "letmecook:fav",
  meal: "letmecook:meal",
  gcheck: "letmecook:gcheck",
  gmanual: "letmecook:gmanual",
  prog: "letmecook:prog",
};

// Baca dari localStorage. Kalau isinya rusak, pakai nilai cadangan.
function baca(kunci, cadangan) {
  try {
    const mentah = localStorage.getItem(kunci);
    if (mentah === null) return cadangan;
    const nilai = JSON.parse(mentah);
    if (Array.isArray(cadangan)) return Array.isArray(nilai) ? nilai : cadangan;
    if (cadangan && typeof cadangan === "object") {
      return nilai && typeof nilai === "object" ? nilai : cadangan;
    }
    return nilai ?? cadangan;
  } catch {
    return cadangan;
  }
}

function tulis(kunci, nilai) {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai));
    return true;
  } catch {
    return false;
  }
}

function cariResep(id) {
  return RESEP.find((r) => r.id === id);
}

function ambilFav() {
  return baca(KEY.fav, []).filter((id) => cariResep(id));
}

function sudahFav(id) {
  return ambilFav().includes(id);
}

function toggleFav(id) {
  if (!cariResep(id)) return [];
  let daftar = ambilFav();
  daftar = daftar.includes(id) ? daftar.filter((x) => x !== id) : [...daftar, id];
  tulis(KEY.fav, daftar);
  segarkanBadge();
  return daftar;
}

function segarkanBadge() {
  const el = document.getElementById("favCount");
  if (el) el.textContent = ambilFav().length;
}

window.addEventListener("storage", (e) => {
  if (e.key === KEY.fav) segarkanBadge();
});

// ============================================================
// FORMAT ANGKA, WAKTU, TEKS
// ============================================================

// 0.5 jadi "1/2", 1.5 jadi "1 1/2", 2 jadi "2".
function fmtQty(n) {
  if (!Number.isFinite(n)) return "";
  const pecahan = { 0.25: "1/4", 0.5: "1/2", 0.75: "3/4" };
  const bulat = Math.floor(n + 1e-9);
  const sisa = Math.round((n - bulat) * 4) / 4;
  if (sisa === 0) return String(bulat);
  if (sisa === 1) return String(bulat + 1);
  const teks = pecahan[sisa] || String(sisa);
  return bulat > 0 ? bulat + " " + teks : teks;
}

// Bahan jadi teks sesuai jumlah porsi.
// bagi:0 artinya dihitung per butir, jadi dibulatkan dan diberi tanda ±.
function teksBahan(b, faktor) {
  let q = b.jumlah * faktor;
  if (b.bagi === 0) q = Math.max(1, Math.round(q));
  else q = Math.round(q * 4) / 4;
  const awal = b.bagi === 0 && faktor !== 1 ? "±" : "";
  return awal + fmtQty(q) + " " + b.satuan + " " + b.nama;
}

// 70 jadi "1 jam 10 mnt", 45 jadi "45 mnt".
function fmtWaktu(menit) {
  if (menit < 60) return menit + " mnt";
  const jam = Math.floor(menit / 60);
  const sisa = menit % 60;
  return jam + " jam" + (sisa ? " " + sisa + " mnt" : "");
}

// 91 jadi "01:31", 10798 jadi "2:59:58". Dipakai daftar bab video
// dan hitungan mundur timer. Jam hanya muncul kalau perlu.
function fmtDetik(detik) {
  const d = Math.max(0, Math.floor(detik));
  const jam = Math.floor(d / 3600);
  const mnt = String(Math.floor((d % 3600) / 60)).padStart(2, "0");
  const dtk = String(d % 60).padStart(2, "0");
  return (jam ? jam + ":" : "") + mnt + ":" + dtk;
}

// Hitung mundur sekali jalan, dipakai timer di halaman resep dan di
// mode masak supaya logikanya cuma ada di satu tempat.
// saatTik dipanggil tiap detik dengan sisa detik, saatHabis sekali di
// akhir. Mengembalikan id interval supaya pemanggil bisa menghentikannya.
function hitungMundur(detik, saatTik, saatHabis) {
  let sisa = detik;
  saatTik(sisa);
  const id = setInterval(() => {
    sisa--;
    if (sisa <= 0) {
      clearInterval(id);
      saatHabis();
    } else {
      saatTik(sisa);
    }
  }, 1000);
  return id;
}

// Ubah teks jadi aman dipasang di HTML.
function esc(teks) {
  return String(teks)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Cari penyebutan waktu di teks langkah, misal "30 menit" atau "1 jam".
// Mengembalikan [teks asli, detik] atau null kalau tidak ada.
// Dipakai halaman resep dan mode masak supaya aturannya sama.
function waktuDiTeks(teks) {
  const kena = teks.match(/(\d+)\s*(jam|menit|detik)/);
  if (!kena) return null;
  return [kena[0], Number(kena[1]) * { jam: 3600, menit: 60, detik: 1 }[kena[2]]];
}

// ID video YouTube selalu 11 karakter.
function idVideoValid(id) {
  return typeof id === "string" && /^[A-Za-z0-9_-]{11}$/.test(id);
}

// Halaman dibuka lewat http/https, bukan diklik dari berkas.
// Dipakai untuk memutuskan apakah pemutar YouTube boleh ditanam.
function lewatServer() {
  return location.protocol === "http:" || location.protocol === "https:";
}

// ============================================================
// GAMBAR CADANGAN
// ============================================================
const GAMBAR_CADANGAN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#0d5c34"/>' +
      '<g fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="8" stroke-linecap="round">' +
      '<path d="M120 168h160v40a32 32 0 0 1-32 32h-96a32 32 0 0 1-32-32z"/>' +
      '<path d="M104 168h192"/>' +
      '<path d="M160 138v-16a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v16"/>' +
      "</g></svg>"
  );

// Dua tahap: gambar cadangan, lalu blok warna.
// Tahap disimpan di dataset supaya panggilan kedua tidak mengulang.
function imgFallback(el) {
  const tahap = Number(el.dataset.stage || 0);
  if (tahap === 0) {
    el.dataset.stage = 1;
    el.src = GAMBAR_CADANGAN;
    return;
  }
  el.dataset.stage = 2;
  el.style.display = "none";
  if (el.parentElement) el.parentElement.classList.add("img-solid");
}

// Satu pendengar untuk SEMUA gambar di halaman. Galat gambar tidak
// menggelembung, jadi dipasang di fase tangkap (capture) supaya tetap
// tertangkap. Cara ini menggantikan atribut onerror di tiap <img>,
// yang akan diblokir oleh Content-Security-Policy.
document.addEventListener("error", (e) => {
  if (e.target && e.target.tagName === "IMG") imgFallback(e.target);
}, true);

// Gambar yang telanjur gagal SEBELUM pendengar terpasang (koneksi putus
// sejak awal) tidak memicu kejadian apa pun lagi, jadi diperiksa manual.
document.querySelectorAll("img").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) imgFallback(img);
});

// ============================================================
// BACA LANGKAH
// Dari teks langkah, ambil teknik masak, besar api, dan tanda matang.
// ============================================================
const RE_TEKNIK = /(menumis|tumis|merebus|rebus|mengukus|kukus|membakar|bakar|menggoreng|goreng|memanggang|panggang|didihkan|didih|sangrai|ungkep|blender|haluskan|tumbuk|uleg|campur|aduk|masak|sajikan|tata|siram|tuang|masukkan|angkat|tiriskan|diamkan|simpan)/i;
const RE_API = /api\s+(terkecil|sangat kecil|kecil|sedang|besar|paling besar)/i;
const RE_MATANG = /tanda\s*matang\s*:\s*([^.]+)\.?/i;
const RE_HASIL = /(hingga|sampai|agar|supaya)\s+([^.]+)\.?/i;

const PADANAN_TEKNIK = {
  menumis: "tumis", tumis: "tumis",
  merebus: "rebus", rebus: "rebus", didihkan: "rebus", didih: "rebus",
  mengukus: "kukus", kukus: "kukus",
  membakar: "bakar", bakar: "bakar",
  menggoreng: "goreng", goreng: "goreng",
  memanggang: "panggang", panggang: "panggang",
  sangrai: "sangrai", ungkep: "ungkep",
  blender: "haluskan", haluskan: "haluskan", tumbuk: "haluskan", uleg: "haluskan",
  campur: "campur", aduk: "campur",
  masak: "masak", masukkan: "masak",
  sajikan: "sajikan", tata: "sajikan", siram: "sajikan", tuang: "sajikan",
  angkat: "sajikan", tiriskan: "sajikan",
  diamkan: "tunggu", simpan: "simpan",
};

function parseLangkah(teks) {
  const kena = (teks.match(RE_TEKNIK) || [])[1];
  const teknik = kena ? PADANAN_TEKNIK[kena.toLowerCase()] || kena.toLowerCase() : null;
  const api = ((teks.match(RE_API) || [])[1] || "").toLowerCase().replace(/\s+/g, " ") || null;

  let matang = ((teks.match(RE_MATANG) || [])[1] || "").trim() || null;
  let sisa = teks;

  if (matang) {
    sisa = teks.replace(RE_MATANG, "").trim();
  } else {
    const hasil = teks.match(RE_HASIL);
    if (hasil) matang = hasil[2].trim();
  }

  return { teknik, api, matang, sisa };
}

// Ikon per teknik masak. Warnanya diatur di style.css lewat
// pemilih [data-teknik="..."], jadi JS hanya perlu tahu nama ikonnya.
const IKON_TEKNIK = {
  tumis: "i-cooking-pot", masak: "i-cooking-pot",
  goreng: "i-flame", sangrai: "i-flame",
  rebus: "i-soup", ungkep: "i-soup",
  kukus: "i-cooking-pot", tunggu: "i-timer",
  bakar: "i-flame-kindling", panggang: "i-flame-kindling",
  haluskan: "i-list-checks", sajikan: "i-check",
  simpan: "i-basket", campur: "i-utensils",
};

function badgeTeknikHTML(urai) {
  if (!urai.teknik) return "";

  let meter = "";
  if (urai.api) {
    const tingkat = /kecil/.test(urai.api) ? 1 : /sedang/.test(urai.api) ? 2 : /besar/.test(urai.api) ? 3 : 0;
    if (tingkat) {
      let segmen = "";
      for (let i = 1; i <= 3; i++) segmen += '<i class="' + (i <= tingkat ? "on" : "") + '"></i>';
      meter = '<span class="api" role="img" aria-label="Api ' + urai.api + '">' + segmen + "</span>";
    }
  }

  return '<span class="badge" data-teknik="' + esc(urai.teknik) + '">' +
    '<svg class="ikon" aria-hidden="true"><use href="icons.svg#' + (IKON_TEKNIK[urai.teknik] || "i-cooking-pot") + '"/></svg>' +
    urai.teknik + (urai.api ? " · api " + urai.api : "") + "</span>" + meter;
}

// ============================================================
// KARTU RESEP
// Ringkas: foto, nama, satu baris meta, tombol simpan kecil.
// ============================================================
// Satu kartu resep.
// daftarSimpan = Set berisi id yang sudah disimpan. Dibaca sekali untuk
// semua kartu, bukan sekali per kartu, supaya localStorage tidak
// dibaca 67 kali setiap kali daftar digambar.
function kartuResepHTML(r, opsi, daftarSimpan) {
  opsi = opsi || {};
  const disimpan = daftarSimpan ? daftarSimpan.has(r.id) : sudahFav(r.id);
  const simpan = opsi.tanpaSimpan
    ? ""
    : '<button class="kartu-simpan" type="button" data-simpan aria-label="Simpan ' + esc(r.nama) + '"'
      + (disimpan ? ' aria-pressed="true"' : "") + ">"
      + '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-heart"/></svg></button>';

  return '<article class="kartu">'
    + '<a class="kartu-tautan" href="resep.html?id=' + esc(r.id) + '">'
    + '<span class="kartu-foto">'
    + '<img src="' + esc(r.foto) + '" alt="" loading="lazy" width="600" height="400">'
    + '<span class="kartu-level">' + esc(r.level) + "</span>"
    + "</span>"
    + '<span class="kartu-teks">'
    + '<span class="kartu-nama">' + esc(r.nama) + "</span>"
    + '<span class="kartu-meta">' + fmtWaktu(r.waktuTotal) + " · " + esc(r.daerah)
    + '<span class="kartu-bintang"><svg class="ikon" aria-hidden="true"><use href="icons.svg#i-star"/></svg>'
    + r.rating + "</span></span>"
    + "</span></a>"
    + simpan
    + "</article>";
}

// Pasang kartu ke wadah, sekaligus hidupkan tombol simpan.
function isiKartu(wadah, daftar, opsi) {
  opsi = opsi || {};
  const daftarSimpan = new Set(ambilFav());

  wadah.innerHTML = daftar.map((r) => kartuResepHTML(r, opsi, daftarSimpan)).join("");

  wadah.querySelectorAll("[data-simpan]").forEach((tombol) => {
    tombol.addEventListener("click", (e) => {
      e.preventDefault();
      const id = tombol.closest(".kartu").querySelector("a").getAttribute("href").split("id=")[1];
      toggleFav(id);
      tombol.setAttribute("aria-pressed", String(sudahFav(id)));
      if (opsi.setelahSimpan) opsi.setelahSimpan(id);
    });
  });
}

// ============================================================
// DROPDOWN KUSTOM
// <select> bawaan disembunyikan, diganti tombol + daftar sendiri.
// Nilainya tetap dibaca dari <select>, jadi logika filter tidak berubah.
// ============================================================
function pasangDropdown(select) {
  if (select.dataset.kustom) return;
  select.dataset.kustom = "1";

  const bungkus = document.createElement("div");
  bungkus.className = "dd";

  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = "dd-tombol";
  tombol.setAttribute("aria-haspopup", "listbox");
  tombol.setAttribute("aria-expanded", "false");
  tombol.innerHTML = '<span class="dd-teks"></span>'
    + '<svg class="ikon dd-panah" aria-hidden="true"><use href="icons.svg#i-chevron-down"/></svg>';

  const daftar = document.createElement("ul");
  daftar.className = "dd-daftar";
  daftar.setAttribute("role", "listbox");

  const teks = tombol.querySelector(".dd-teks");

  function gambar() {
    daftar.innerHTML = [...select.options].map((opt) =>
      '<li role="option" data-nilai="' + esc(opt.value) + '"'
      + (opt.value === select.value ? ' class="aktif" aria-selected="true"' : ' aria-selected="false"')
      + ">" + esc(opt.textContent) + "</li>"
    ).join("");

    const terpilih = select.options[select.selectedIndex];
    teks.textContent = terpilih ? terpilih.textContent : "";

    daftar.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => pilih(li.dataset.nilai));
    });
  }

  function pilih(nilai) {
    select.value = nilai;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    gambar();
    tutup();
  }

  function buka() {
    document.querySelectorAll(".dd.buka").forEach((d) => d.classList.remove("buka"));
    bungkus.classList.add("buka");
    tombol.setAttribute("aria-expanded", "true");
  }

  function tutup() {
    bungkus.classList.remove("buka");
    tombol.setAttribute("aria-expanded", "false");
  }

  tombol.addEventListener("click", (e) => {
    e.stopPropagation();
    bungkus.classList.contains("buka") ? tutup() : buka();
  });

  // Papan tuntas: panah atas/bawah memilih, Esc menutup.
  tombol.addEventListener("keydown", (e) => {
    const opsi = [...select.options];
    const pos = opsi.findIndex((o) => o.value === select.value);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      pilih(opsi[Math.min(pos + 1, opsi.length - 1)].value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      pilih(opsi[Math.max(pos - 1, 0)].value);
    } else if (e.key === "Escape") {
      tutup();
    }
  });

  document.addEventListener("click", (e) => {
    if (!bungkus.contains(e.target)) tutup();
  });

  select.classList.add("select-asli");
  bungkus.append(tombol, daftar);
  select.insertAdjacentElement("afterend", bungkus);
  select.addEventListener("change", gambar);
  gambar();
}

// ============================================================
// SARAN PENCARIAN
// Saat mengetik, muncul daftar resep yang cocok. Klik langsung
// membuka resepnya, tanpa lewat halaman katalog.
// ============================================================
function pasangSaranPencarian(input) {
  if (!input || input.dataset.saran) return;
  input.dataset.saran = "1";

  const kotak = document.createElement("div");
  kotak.className = "saran";
  kotak.hidden = true;
  input.insertAdjacentElement("afterend", kotak);

  let sorot = -1;

  // Teks pencarian tiap resep digabung SEKALI di sini, bukan tiap ketikan.
  // Tanpa ini, setiap huruf yang diketik menggabung ulang nama 67 bahan.
  const indeks = RESEP.map((r) => ({
    r,
    teks: (r.nama + " " + r.daerah + " " + r.kategori + " " + r.bahan.map((b) => b.nama).join(" ")).toLowerCase(),
  }));

  function cocokkan(kata) {
    const k = kata.toLowerCase().trim();
    if (k.length < 2) return [];
    const hasil = [];
    for (const { r, teks } of indeks) {
      if (teks.includes(k)) {
        hasil.push(r);
        if (hasil.length >= 7) break;
      }
    }
    return hasil;
  }

  function gambar() {
    const daftar = cocokkan(input.value);
    sorot = -1;
    if (!daftar.length) {
      kotak.hidden = true;
      return;
    }
    kotak.innerHTML = daftar.map((r) =>
      '<a class="saran-item" href="resep.html?id=' + esc(r.id) + '">'
      + '<img src="' + esc(r.foto) + '" alt="" loading="lazy" width="44" height="44">'
      + "<span><strong>" + esc(r.nama) + "</strong>"
      + "<small>" + esc(r.daerah) + " · " + fmtWaktu(r.waktuTotal) + "</small></span></a>"
    ).join("");
    kotak.hidden = false;
  }

  // Tunda sedikit supaya tidak menggambar ulang tiap huruf.
  let jeda = null;
  function gambarTertunda() {
    clearTimeout(jeda);
    jeda = setTimeout(gambar, 120);
  }

  function sorotKe(arah) {
    const item = [...kotak.querySelectorAll(".saran-item")];
    if (!item.length) return;
    sorot = (sorot + arah + item.length) % item.length;
    item.forEach((a, i) => a.classList.toggle("disorot", i === sorot));
  }

  input.addEventListener("input", gambarTertunda);
  input.addEventListener("focus", gambar);

  input.addEventListener("keydown", (e) => {
    if (kotak.hidden) return;
    if (e.key === "ArrowDown") { e.preventDefault(); sorotKe(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sorotKe(-1); }
    else if (e.key === "Enter" && sorot >= 0) {
      e.preventDefault();
      kotak.querySelectorAll(".saran-item")[sorot].click();
    } else if (e.key === "Escape") {
      kotak.hidden = true;
    }
  });

  document.addEventListener("click", (e) => {
    if (!kotak.contains(e.target) && e.target !== input) kotak.hidden = true;
  });
}

// ============================================================
// ANIMASI GULIR
// Elemen ber-class .muncul naik sedikit saat masuk layar.
// Kalau pengunjung minta "kurangi gerak", animasinya dilewati.
// ============================================================
function pasangAnimasi() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  const pengamat = new IntersectionObserver((masuk) => {
    masuk.forEach((m) => {
      if (!m.isIntersecting) return;
      m.target.classList.add("tampil");
      pengamat.unobserve(m.target);
    });
  }, { rootMargin: "0px 0px -5% 0px", threshold: 0.03 });

  let urutan = 0;

  // Amati satu elemen. Jeda berjenjang dihitung dari urutan kemunculan.
  function amatiSatu(el) {
    if (el.nodeType !== 1 || !el.classList || !el.classList.contains("muncul")) return;
    if (el.classList.contains("tampil")) return;
    el.style.setProperty("--jeda", (urutan++ % 8) * 35 + "ms");
    pengamat.observe(el);
  }

  function amatiDalam(akar) {
    if (akar.nodeType === 1) amatiSatu(akar);
    if (akar.querySelectorAll) akar.querySelectorAll(".muncul").forEach(amatiSatu);
  }

  document.querySelectorAll(".muncul").forEach(amatiSatu);

  // Hanya periksa node yang BARU ditambahkan, bukan seluruh dokumen.
  // Kalau memindai seluruh dokumen tiap mutasi, menggambar 67 kartu
  // berarti 67 pemindaian penuh.
  new MutationObserver((catatan) => {
    catatan.forEach((c) => c.addedNodes.forEach(amatiDalam));
  }).observe(document.body, { childList: true, subtree: true });
}

// Durasi tiap video dalam detik. Diambil dari YouTube, dipakai untuk
// menghitung posisi bab pada resep yang belum punya data bab sendiri.

// ============================================================
// MODE MASAK
// Layar penuh: langkah besar, timer, dan pemutar video.
//
// Kerangkanya dibangun SEKALI, lalu dipakai ulang tiap kali dibuka.
// Semua pendengar disimpan di satu objek, supaya saat mode dibuka lagi
// pendengar lama dilepas dulu. Tanpa itu, pendengar menumpuk dan satu
// klik tombol Lanjut bisa melompat beberapa langkah sekaligus.
// ============================================================
let masakEl = null;
let masakState = null;
let apiYouTube = null;

// Muat API pemutar YouTube sekali saja, saat benar-benar dibutuhkan.
function muatApiYouTube() {
  if (apiYouTube) return apiYouTube;
  const { promise, resolve, reject } = Promise.withResolvers();
  apiYouTube = promise;

  if (window.YT && window.YT.Player) {
    resolve();
    return apiYouTube;
  }
  const sebelumnya = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    if (sebelumnya) sebelumnya();
    resolve();
  };
  const s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api";
  s.onerror = () => reject(new Error("gagal memuat API YouTube"));
  document.head.appendChild(s);
  return apiYouTube;
}

// Bangun kerangka mode masak satu kali.
function siapkanMasak() {
  if (masakEl) return masakEl;

  masakEl = document.createElement("div");
  masakEl.className = "masak";
  masakEl.setAttribute("role", "dialog");
  masakEl.setAttribute("aria-modal", "true");
  masakEl.setAttribute("aria-label", "Mode masak");
  masakEl.innerHTML =
    '<div class="masak-atas">'
    + '<div class="masak-lacak"><i></i></div>'
    + '<div class="masak-baris">'
    + '<span class="masak-hitung"></span>'
    + '<button class="masak-tombol" type="button" data-video>'
    + '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-play"/></svg><span>Video</span></button>'
    + '<button class="masak-tombol" type="button" data-tutup>'
    + '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-x"/></svg>Tutup</button>'
    + "</div></div>"
    // Bagian tengah yang bisa digulir. Tombol navigasi di bawahnya
    // selalu terlihat, walau panel video sedang terbuka.
    + '<div class="masak-tengah">'
    + '<div class="masak-video" hidden></div>'
    + '<div class="masak-isi">'
    + '<p class="masak-teks"></p>'
    + '<div class="masak-tanda"></div>'
    + '<button class="masak-timer" type="button" hidden></button>'
    + "</div></div>"
    + '<div class="masak-nav">'
    + '<button class="masak-mundur" type="button">'
    + '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-arrow-left"/></svg>Sebelumnya</button>'
    + '<button class="masak-maju" type="button"><span>Lanjut</span>'
    + '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-arrow-right"/></svg></button>'
    + "</div>"
    // Petunjuk papan tuntas, hanya tampil di layar lebar.
    + '<p class="masak-papan">Panah kiri dan kanan pindah langkah · Esc menutup · Spasi menghidupkan timer</p>';

  document.body.appendChild(masakEl);
  return masakEl;
}

// Lepas semua pendengar dari sesi sebelumnya.
// Tiap kunci di pendengar adalah fungsi yang melepas satu pendengar.
function lepasPendengarMasak() {
  if (!masakState || !masakState.pendengar) return;
  const p = masakState.pendengar;
  p.mundur();
  p.maju();
  p.tutup();
  p.video();
  p.timer();
  p.geser();
  document.removeEventListener("keydown", p.papan);
  document.removeEventListener("visibilitychange", p.layar);
}

function bukaModeMasak(resep) {
  const el = siapkanMasak();

  // Bersihkan sisa sesi sebelumnya dulu.
  lepasPendengarMasak();
  if (masakState && masakState.timer) clearInterval(masakState.timer);

  const langkah = resep.langkah.map(parseLangkah);
  // Bab dihitung sekali di sini, lalu dipakai ulang tiap kali langkah pindah.
  masakState = {
    resep, langkah,
    bab: daftarBab(resep, langkah),
    indeks: 0,
    timer: null,
    pemutar: null,
    wakeLock: null,
    pendengar: {},
  };

  const $ = (sel) => el.querySelector(sel);
  const lacak = $(".masak-lacak i");
  const hitung = $(".masak-hitung");
  const teks = $(".masak-teks");
  const tanda = $(".masak-tanda");
  const tombolTimer = $(".masak-timer");
  const tombolMundur = $(".masak-mundur");
  const tombolMaju = $(".masak-maju");
  const panelVideo = $(".masak-video");
  const tombolVideo = $("[data-video]");

  // ---- Timer ----
  function hentikanTimer() {
    if (masakState.timer) {
      clearInterval(masakState.timer);
      masakState.timer = null;
    }
  }

  function jalankanTimer(detik) {
    hentikanTimer();
    tombolTimer.classList.add("jalan");
    masakState.timer = hitungMundur(detik, (sisa) => {
      tombolTimer.textContent = fmtDetik(sisa);
    }, () => {
      masakState.timer = null;
      tombolTimer.classList.remove("jalan");
      tombolTimer.textContent = "Waktunya habis";
      if (navigator.vibrate) navigator.vibrate(400);
    });
  }

  // ---- Layar tetap menyala selama memasak ----
  async function jagaLayar() {
    if (!("wakeLock" in navigator)) return;
    try {
      masakState.wakeLock = await navigator.wakeLock.request("screen");
    } catch {
      /* browser menolak, abaikan */
    }
  }

  function lepasLayar() {
    if (masakState.wakeLock) {
      masakState.wakeLock.release();
      masakState.wakeLock = null;
    }
  }

  // ---- Video: bangun pemutar untuk resep ini ----
  // Dipanggil sekali per sesi, saat panel video pertama kali dibuka.
  async function bangunPemutar() {
    if (!idVideoValid(resep.video)) {
      tampilkanTautanVideo("Resep ini belum punya video.");
      return;
    }

    if (!lewatServer()) {
      tampilkanTautanVideo("Pemutar YouTube butuh alamat http atau https. Halaman ini dibuka langsung dari berkas.");
      return;
    }

    panelVideo.innerHTML = '<div class="masak-pemutar"><p class="masak-catatan">Memuat pemutar…</p></div>';
    const wadah = panelVideo.querySelector(".masak-pemutar");

    try {
      await muatApiYouTube();
    } catch {
      tampilkanTautanVideo("Pemutar YouTube gagal dimuat. Periksa koneksi internet.");
      return;
    }

    // Sesi bisa sudah ditutup saat API selesai dimuat.
    if (masakState.resep !== resep) return;

    wadah.innerHTML = "";
    const target = document.createElement("div");
    wadah.appendChild(target);

    try {
      masakState.pemutar = new YT.Player(target, {
        videoId: resep.video,
        // host nocookie: pemutar tidak menyimpan cookie pelacak sampai
        // videonya benar-benar diputar.
        host: "https://www.youtube-nocookie.com",
        playerVars: { origin: location.origin, playsinline: 1, rel: 0 },
        events: {
          onReady: (e) => e.target.playVideo(),
          onError: () => tampilkanTautanVideo("Video ini tidak bisa diputar di sini."),
        },
      });
    } catch {
      tampilkanTautanVideo("Pemutar gagal dibuat.");
      return;
    }

    gambarDaftarBab(wadah);
  }

  // Daftar bab: bisa dari data resep, atau dihitung dari durasi video.
  // Dihitung sekali lalu disimpan, supaya tidak diulang tiap klik.
  function gambarDaftarBab(wadah) {
    const daftar = masakState.bab;
    if (!daftar.length) return;

    const kotak = document.createElement("div");
    kotak.className = "masak-bab";
    daftar.forEach(([detik, label], i) => {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.dataset.langkah = String(i);
      tombol.innerHTML = '<span class="menit">' + fmtDetik(detik) + "</span>" + esc(label);
      tombol.addEventListener("click", () => lompatKe(detik));
      kotak.appendChild(tombol);
    });
    wadah.appendChild(kotak);
    sorotBabAktif(masakState.indeks);
  }

  function lompatKe(detik) {
    if (masakState.pemutar && masakState.pemutar.seekTo) {
      masakState.pemutar.seekTo(detik, true);
      masakState.pemutar.playVideo();
    }
  }

  function tampilkanTautanVideo(pesan) {
    panelVideo.innerHTML = '<p class="masak-catatan">' + esc(pesan) + "</p>"
      + '<a class="masak-keluar" href="https://www.youtube.com/watch?v=' + esc(resep.video)
      + '" target="_blank" rel="noopener">Buka di YouTube</a>';
  }

  function bukaVideo() {
    const terbuka = panelVideo.hidden === false;
    panelVideo.hidden = terbuka;
    tombolVideo.classList.toggle("aktif", !terbuka);
    if (!terbuka && !masakState.pemutar && !panelVideo.dataset.dibuat) {
      panelVideo.dataset.dibuat = "1";
      bangunPemutar();
    }
  }

  // ---- Gambar satu langkah ----
  function gambar() {
    const i = masakState.indeks;
    const urai = langkah[i];
    const terakhir = i === langkah.length - 1;

    hitung.textContent = "Langkah " + (i + 1) + " dari " + langkah.length;
    lacak.style.width = ((i + 1) / langkah.length) * 100 + "%";
    teks.textContent = urai.sisa;
    tombolMundur.disabled = i === 0;

    // Isi teks tombol tanpa menghapus ikon di dalamnya.
    tombolMaju.querySelector("span").textContent = terakhir ? "Selesai" : "Lanjut";

    tanda.innerHTML = badgeTeknikHTML(urai);
    if (urai.matang) {
      const chip = document.createElement("span");
      chip.className = "badge badge-matang";
      chip.textContent = "Matang kalau: " + urai.matang;
      tanda.appendChild(chip);
    }

    // Timer muncul kalau langkah menyebut jam, menit, atau detik.
    hentikanTimer();
    tombolTimer.classList.remove("jalan");
    const waktu = waktuDiTeks(resep.langkah[i]);
    if (waktu) {
      tombolTimer.hidden = false;
      tombolTimer.dataset.detik = waktu[1];
      tombolTimer.textContent = "Mulai timer " + waktu[0];
    } else {
      tombolTimer.hidden = true;
    }

    sorotBabAktif(i);
  }

  // Tandai bab yang sedang berjalan, supaya penonton tahu posisinya.
  function sorotBabAktif(indeksLangkah) {
    const kotak = panelVideo.querySelector(".masak-bab");
    if (!kotak) return;
    kotak.querySelectorAll("button").forEach((b) => b.classList.remove("aktif"));
    const tombol = kotak.querySelector('button[data-langkah="' + indeksLangkah + '"]');
    if (tombol) tombol.classList.add("aktif");
  }

  // ---- Pindah langkah ----
  function mundur() {
    if (masakState.indeks > 0) {
      masakState.indeks--;
      gambar();
    }
  }

  function maju() {
    if (masakState.indeks < langkah.length - 1) {
      masakState.indeks++;
      gambar();
      // Kalau video sedang terbuka, ikut lompat ke bagian langkah ini.
      if (!panelVideo.hidden) {
        const bab = masakState.bab[masakState.indeks];
        if (bab) lompatKe(bab[0]);
      }
    } else {
      tutup();
    }
  }

  // ---- Buka dan tutup ----
  function tutup() {
    el.classList.remove("buka");
    document.body.classList.remove("masak-jalan");
    hentikanTimer();
    lepasLayar();
    // Pemutar dibuang supaya sesi berikutnya membangun ulang dari bersih.
    if (masakState.pemutar && masakState.pemutar.destroy) {
      try { masakState.pemutar.destroy(); } catch { /* sudah hilang */ }
    }
    masakState.pemutar = null;
    delete panelVideo.dataset.dibuat;
    panelVideo.hidden = true;
    panelVideo.innerHTML = "";
    tombolVideo.classList.remove("aktif");
    lepasPendengarMasak();
  }

  function papanTuntas(e) {
    if (!el.classList.contains("buka")) return;
    if (e.key === "ArrowRight") maju();
    else if (e.key === "ArrowLeft") mundur();
    else if (e.key === "Escape") tutup();
    else if (e.key === " " && !tombolTimer.hidden) {
      e.preventDefault();
      jalankanTimer(Number(tombolTimer.dataset.detik));
    }
  }

  function saatLayarKembali() {
    if (document.visibilityState === "visible" && el.classList.contains("buka")) jagaLayar();
  }

  // ---- Geser di layar sentuh ----
  // Tangan sering berminyak saat masak, jadi pindah langkah cukup
  // dengan menggeser, bukan menekan tombol kecil.
  let sentuhX = null;
  let sentuhY = null;

  function sentuhMulai(e) {
    sentuhX = e.touches[0].clientX;
    sentuhY = e.touches[0].clientY;
  }

  function sentuhSelesai(e) {
    if (sentuhX === null) return;
    const dx = e.changedTouches[0].clientX - sentuhX;
    const dy = e.changedTouches[0].clientY - sentuhY;
    sentuhX = sentuhY = null;

    // Geser mendatar minimal 60px dan lebih mendatar daripada menurun,
    // supaya menggulir layar tidak ikut pindah langkah.
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
    // Jangan bajak geseran yang dimulai dari pemutar video atau daftar bab.
    if (e.target.closest(".masak-video")) return;

    if (dx < 0) maju();
    else mundur();
  }

  const tengah = el.querySelector(".masak-tengah");
  tengah.addEventListener("touchstart", sentuhMulai, { passive: true });
  tengah.addEventListener("touchend", sentuhSelesai, { passive: true });

  // ---- Pasang pendengar, dan simpan untuk dilepas nanti ----
  const p = masakState.pendengar;
  p.mundur = () => tombolMundur.removeEventListener("click", mundur);
  p.maju = () => tombolMaju.removeEventListener("click", maju);
  p.tutup = () => el.querySelector("[data-tutup]").removeEventListener("click", tutup);
  p.video = () => tombolVideo.removeEventListener("click", bukaVideo);
  p.timer = () => tombolTimer.removeEventListener("click", jalankanTimerKlik);
  p.geser = () => {
    tengah.removeEventListener("touchstart", sentuhMulai);
    tengah.removeEventListener("touchend", sentuhSelesai);
  };
  p.papan = papanTuntas;
  p.layar = saatLayarKembali;

  function jalankanTimerKlik() {
    jalankanTimer(Number(tombolTimer.dataset.detik));
  }

  tombolMundur.addEventListener("click", mundur);
  tombolMaju.addEventListener("click", maju);
  el.querySelector("[data-tutup]").addEventListener("click", tutup);
  tombolVideo.addEventListener("click", bukaVideo);
  tombolTimer.addEventListener("click", jalankanTimerKlik);

  document.addEventListener("keydown", papanTuntas);
  document.addEventListener("visibilitychange", saatLayarKembali);

  gambar();
  el.classList.add("buka");
  document.body.classList.add("masak-jalan");
  jagaLayar();
}

// ============================================================
// BAB VIDEO
// Bab diambil dari data resep kalau ada. Kalau tidak ada, bab dihitung
// dari durasi video dibagi rata sesuai jumlah langkah, lalu diberi nama
// dari langkah itu sendiri. Jadi SEMUA resep punya bab yang bisa diklik.
// ============================================================
function daftarBab(resep, langkahTerurai) {
  if (Array.isArray(resep.bab) && resep.bab.length >= 2) return resep.bab;

  const durasi = DURASI_VIDEO[resep.id];
  if (!durasi || durasi < 30) return [];

  const langkah = langkahTerurai || resep.langkah.map(parseLangkah);
  const jumlah = langkah.length;
  // Tanpa langkah, tidak ada yang bisa dibagi. Cegah pembagian nol.
  if (!jumlah) return [];

  // Sisakan 8 detik di akhir untuk penutup, lalu bagi rata.
  const bisaDipakai = Math.max(10, durasi - 8);
  const jarak = bisaDipakai / jumlah;

  return langkah.map((urai, i) => {
    const detik = Math.round(i * jarak);
    // Label dari awal kalimat langkah, dipendekkan supaya muat di tombol.
    let label = urai.sisa.split(/[.,]/)[0].trim();
    if (label.length > 34) label = label.slice(0, 32).trim() + "…";
    return [detik, label || "Bagian " + (i + 1)];
  });
}

// ============================================================
// TOMBOL KEMBALI KE ATAS
// Muncul setelah halaman digulir 600px. Klik untuk kembali ke atas.
// ============================================================
function pasangKeAtas() {
  if (document.querySelector(".ke-atas")) return;

  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = "ke-atas";
  tombol.setAttribute("aria-label", "Kembali ke atas");
  tombol.innerHTML = '<svg class="ikon" aria-hidden="true"><use href="icons.svg#i-panah-atas"/></svg>';
  document.body.appendChild(tombol);

  // Tombol muncul setelah digulir, tapi disembunyikan lagi saat kaki
  // halaman masuk layar supaya tidak menutupi teksnya di layar sempit.
  const kaki = document.querySelector("footer");
  const atur = () => {
    const lewat = window.scrollY > 600;
    const kakiTerlihat = kaki && kaki.getBoundingClientRect().top < window.innerHeight - 40;
    tombol.classList.toggle("tampil", lewat && !kakiTerlihat);
  };
  window.addEventListener("scroll", atur, { passive: true });
  tombol.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  atur();
}

// ============================================================
// SINKRONISASI ANGKA
// Semua angka yang muncul di halaman diisi dari data, bukan ditulis
// manual di HTML. Jadi menambah resep cukup di satu tempat: larik RESEP.
// ============================================================
const JUMLAH_RESEP = RESEP.length;

// Isi semua tempat di halaman yang perlu angka resep.
// Cara pakai di HTML: <span data-jumlah></span>
function segarkanAngka() {
  document.querySelectorAll("[data-jumlah]").forEach((el) => {
    el.textContent = JUMLAH_RESEP;
  });

  // Tahun di kaki halaman ikut berjalan sendiri, tidak perlu disunting.
  // Cara pakai di HTML: <span data-tahun></span>
  const tahun = new Date().getFullYear();
  document.querySelectorAll("[data-tahun]").forEach((el) => {
    el.textContent = tahun;
  });

  // Judul halaman dan deskripsi juga ikut menyesuaikan.
  const ganti = (teks) => teks.replace(/\d+(\s+[Rr]esep)/, JUMLAH_RESEP + "$1");

  if (/\d+\s+[Rr]esep/.test(document.title)) {
    document.title = ganti(document.title);
  }

  const desk = document.querySelector('meta[name="description"]');
  if (desk && /\d+\s+resep/.test(desk.content)) {
    desk.setAttribute("content", ganti(desk.content));
  }
}

// ============================================================
// SAPUAN AWAL
// Dipanggil sekali di setiap halaman, setelah isi siap.
// ============================================================
function siapkanHalaman() {
  // Tandai elemen yang ikut animasi gulir.
  document.querySelectorAll(".wrap > section, .kartu, .hari, .sorot")
    .forEach((el) => el.classList.add("muncul"));

  segarkanAngka();
  pasangKeAtas();
  document.querySelectorAll("select").forEach(pasangDropdown);
  document.querySelectorAll(".cari input").forEach(pasangSaranPencarian);
  pasangAnimasi();
}
