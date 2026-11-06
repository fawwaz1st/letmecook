// _qa/uji-dom.js — Gerbang QA DOM-mock untuk LetMeCook.
// Menjalankan resep-data.js + store.js + halaman.js di VM dengan mock DOM,
// lalu menguji tiap halaman, fitur, dan utilitas. Jalankan: node _qa/uji-dom.js
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const AKAR = path.resolve(__dirname, "..");
const baca = (f) => fs.readFileSync(path.join(AKAR, f), "utf8");

let elSeq = 0;
function mockEl(tag) {
  const el = {
    _id: ++elSeq, tagName: tag, _html: "", textContent: "", value: "", checked: false,
    hidden: false, dataset: {}, style: {}, children: [], scrollTop: 0, files: [], size: 0,
    className: "", _lis: {}, _classes: new Set(), _attr: {}, parentElement: null,
    classList: {
      add(c) { el._classes.add(c); }, remove(c) { el._classes.delete(c); },
      toggle(c) { el._classes.has(c) ? el._classes.delete(c) : el._classes.add(c); },
      contains(c) { return el._classes.has(c); },
    },
    setAttribute(k, v) { el._attr[k] = String(v); }, getAttribute(k) { return el._attr[k] ?? null; },
    addEventListener(ev, fn) { (el._lis[ev] = el._lis[ev] || []).push(fn); },
    removeEventListener() {},
    appendChild(c) { el.children.push(c); c.parentElement = el; return c; },
    append(...c) { c.forEach((x) => { el.children.push(x); x.parentElement = el; }); },
    querySelector() { return mockEl("div"); }, querySelectorAll() { return []; },
    insertAdjacentElement() {}, remove() {}, focus() {},
    getBoundingClientRect() { return { top: 0, height: 0 }; },
    dispatchEvent(ev) { (el._lis[ev.type] || []).forEach((fn) => fn(ev)); return true; },
  };
  const render = (node) => node._html || node.textContent || "";
  Object.defineProperty(el, "innerHTML", {
    get() { return el._html + el.children.map((c) => c._html || c.textContent || c.outerHTML || "").join(""); },
    set(v) { el._html = String(v); el.children = []; },
  });
  Object.defineProperty(el, "outerHTML", {
    get() { return "<" + el.tagName + ">" + el.innerHTML + "</" + el.tagName + ">"; },
    set(v) { el._html = String(v); el.children = []; },
  });
  Object.defineProperty(el, "className", {
    get() { return [...el._classes].join(" "); },
    set(v) { el._classes = new Set(String(v).split(/\s+/).filter(Boolean)); },
  });
  return el;
}
const noopObs = class { constructor(cb) {} observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };

function buatCtx(urlStr) {
  const u = new URL(urlStr);
  const elements = {};
  const simpanan = {};
  const localStorage = {
    getItem: (k) => (k in simpanan ? simpanan[k] : null),
    setItem(k, v) { simpanan[k] = String(v); },
    removeItem(k) { delete simpanan[k]; },
  };
  const doc = {
    body: { dataset: { halaman: "resep" }, classList: { add() {}, remove() {}, contains() { return false; } }, prepend() {} },
    head: { appendChild() {} }, documentElement: { scrollTop: 0 }, fonts: { check: () => true },
    getElementById(id) { if (!elements[id]) elements[id] = mockEl("div"); return elements[id]; },
    querySelector() { return mockEl("div"); }, querySelectorAll() { return []; },
    createElement(tag) { return mockEl(tag); }, createTextNode(t) { return { textContent: t }; },
    addEventListener() {},
  };
  const ctx = {
    console,
    document: doc,
    localStorage,
    location: { search: u.search, protocol: u.protocol, hostname: u.hostname, href: u.href, origin: u.origin, reload() {}, pathname: u.pathname },
    navigator: { onLine: true, vibrate: null, clipboard: { writeText: async () => {} }, share: null, userAgent: "uji" },
    window: {
      addEventListener() {}, dispatchEvent() {}, matchMedia: () => ({ matches: false, addEventListener() {} }),
      innerHeight: 800, innerWidth: 1200, scrollY: 0, scrollTo() {},
      IntersectionObserver: noopObs, MutationObserver: noopObs, ResizeObserver: noopObs,
      requestIdleCallback: (fn) => fn(), AudioContext: undefined, webkitAudioContext: undefined,
      location: { search: u.search, href: u.href, reload() {}, origin: u.origin, pathname: u.pathname },
      YT: undefined, onYouTubeIframeAPIReady: null, getComputedStyle: () => ({}),
    },
    requestIdleCallback: (fn) => fn(), cancelIdleCallback() {},
    MutationObserver: noopObs, IntersectionObserver: noopObs, ResizeObserver: noopObs,
    URLSearchParams, URL, setTimeout, clearTimeout, setInterval, clearInterval,
    JSON, Math, Date, Array, Object, String, Number, Promise, Boolean, RegExp, Error, Map, Set,
    Response: class {}, CSS: { supports: () => false }, performance: { now: () => 0 },
    CustomEvent: class { constructor(t, o) { this.type = t; Object.assign(this, o); } },
    history: { replaceState() {} },
  };
  vm.createContext(ctx);
  return { ctx, elements, simpanan, doc };
}

const data = baca("skrip/resep-data.js");
const store = baca("skrip/store.js");
const hal = baca("skrip/halaman.js");
const hasil = [];
const antrian = [];
const hitung = (html, kunci) => (String(html).match(new RegExp(kunci, "g")) || []).length;
const tidur = (ms) => new Promise((r) => setTimeout(r, ms));
// Rencana disimpan per hari: { senin: {pagi:{id,porsi}, siang:..., malam:...}, ... }
function HITUNG_SLOT(rencana) {
  let n = 0;
  for (const hari of Object.values(rencana || {})) {
    if (hari && typeof hari === "object") n += Object.values(hari).filter(Boolean).length;
  }
  return n;
}
function uji(nama, fn) {
  antrian.push((async () => {
    try { const r = await fn(); hasil.push({ nama, ok: true, r }); }
    catch (e) { hasil.push({ nama, ok: false, err: String((e && e.message) || e) }); }
  })());
}
const muat = (urlStr) => { const c = buatCtx(urlStr); vm.runInContext(data, c.ctx); vm.runInContext(store, c.ctx); vm.runInContext(hal, c.ctx); return c; };

// ---------- 1. Render tiap halaman ----------
uji("halamanResep render", () => {
  const { ctx, elements } = muat("https://fawwaz1st.github.io/letmecook/resep.html?id=rendang");
  vm.runInContext("halamanResep()", ctx);
  const a = elements.area.innerHTML;
  const l = elements.langkahList ? elements.langkahList.innerHTML : "";
  const r = { panjang: a.length, artikel: a.includes("<article"), catatan: a.includes("isiCatatan"), liLangkah: hitung(l, "<li") };
  r.ok = r.artikel && r.catatan && r.panjang > 3000 && r.liLangkah >= 5;
  return r;
});

uji("resume indeks eksplisit", () => {
  const { ctx, elements } = muat("https://fawwaz1st.github.io/letmecook/resep.html?id=rendang");
  ctx.localStorage.setItem("letmecook:prog", JSON.stringify({ rendang: { bahan: [], langkah: [true,true,true,false,false], indeks: 2 } }));
  vm.runInContext("halamanResep()", ctx);
  const a = elements.area.innerHTML;
  return { tombolLanjut: a.includes("bLanjut"), langkah3: a.includes("Lanjutkan dari langkah 3") };
});

uji("halamanKatalog render", () => {
  const { ctx, elements } = muat("https://fawwaz1st.github.io/letmecook/katalog.html");
  vm.runInContext("halamanKatalog()", ctx);
  return { kartu: hitung(elements.grup.innerHTML, 'class="kartu'), teks: elements.jumlahTeks.textContent };
});

uji("katalog filter + URL", () => {
  const { ctx, elements } = muat("https://fawwaz1st.github.io/letmecook/katalog.html?level=mudah&kat=sarapan");
  vm.runInContext("halamanKatalog()", ctx);
  return { level: elements.fLevel.value, kartu: hitung(elements.grup.innerHTML, 'class="kartu') };
});

uji("katalog mode kulkas", async () => {
  const { ctx, elements } = muat("https://fawwaz1st.github.io/letmecook/katalog.html");
  vm.runInContext("halamanKatalog()", ctx);
  elements.fKulkas.checked = true;
  elements.fKulkas.dispatchEvent({ type: "change" });
  elements.kulkasInput.value = "beras, ayam, bawang merah, kunyit";
  elements.kulkasInput.dispatchEvent({ type: "input" });
  await tidur(200);
  return { kartu: hitung(elements.grup.innerHTML, 'class="kartu'), terbuka: !elements.kulkasIsi.hidden, grupLen: (elements.grup.innerHTML || "").length };
});

uji("mealplan susun otomatis", () => {
  const { ctx, elements } = muat("https://fawwaz1st.github.io/letmecook/mealplan.html");
  vm.runInContext("halamanMealplan()", ctx);
  elements.bSusun.dispatchEvent({ type: "click" });
  const saved = JSON.parse(ctx.localStorage.getItem("letmecook:meal") || "null");
  const nTerisi = saved ? HITUNG_SLOT(saved) : 0;
  const nHari = saved ? Object.keys(saved).length : 0;
  const r = { nHari, nTerisi, teks: elements.isiTeks.textContent };
  r.ok = nHari === 7 && nTerisi === 21;
  return r;
});

uji("favorit render + panel data", () => {
  const { ctx, elements } = muat("https://fawwaz1st.github.io/letmecook/favorit.html");
  vm.runInContext("halamanFavorit()", ctx);
  return { adaEkspor: !!elements.bEkspor, adaImpor: !!elements.fImpor, teks: elements.jumlahTeks.textContent };
});

// ---------- 2. Utilitas ----------
uji("waktuDiTeks", () => {
  const { ctx } = muat("https://fawwaz1st.github.io/letmecook/");
  const kasus = [
    ["Masak 40 menit sampai matang", 2400],
    ["Diamkan 20 menit", 1200],
    ["Rebus 1 jam 30 menit", 3600],
    ["aduk tiap 5 menit", null],
    ["masak 2-3 menit", 180],
    ["Jaga 15 detik", 15],
    ["Rebus ± 40 menit", 2400],
    ["Tumis bumbu 5 menit, aduk tiap 5 menit", 300],
  ];
  return kasus.map(([s, exp]) => {
    const r = vm.runInContext("waktuDiTeks(" + JSON.stringify(s) + ")", ctx);
    const got = r ? r[1] : null;
    return { s, got, exp, ok: got === exp };
  });
});

uji("teksBahan skala", () => {
  const { ctx } = muat("https://fawwaz1st.github.io/letmecook/");
  const r = vm.runInContext('teksBahan({nama:"garam", jumlah:2, satuan:"sdt", bagi:1}, 0.05)', ctx);
  return { teks: r, ok: typeof r === "string" && !r.includes("0 sdt") };
});

uji("parseLangkah matang", () => {
  const { ctx } = muat("https://fawwaz1st.github.io/letmecook/");
  const r = vm.runInContext('parseLangkah("Tumis bawang hingga harum, angkat. Tanda matang: bawang kuning.")', ctx);
  return { matang: r.matang, sisa: r.sisa, ok: r.matang === "bawang kuning" };
});

uji("data RESEP utuh", () => {
  const { ctx } = muat("https://fawwaz1st.github.io/letmecook/");
  const R = ctx.RESEP;
  return {
    total: R.length,
    idUnik: new Set(R.map((r) => r.id)).size,
    bahanKosong: R.filter((r) => !r.bahan || !r.bahan.length).length,
    langkahKosong: R.filter((r) => !r.langkah || !r.langkah.length).length,
    waktuSalah: R.filter((r) => (r.waktuAktif || 0) > (r.waktuTotal || 0)).length,
    videoKosong: R.filter((r) => !r.video).length,
    babKosong: R.filter((r) => !Array.isArray(r.bab) || !r.bab.length).length,
  };
});

// ---------- 3. Laporan ----------
(async () => {
  await Promise.all(antrian);
  const gagal = hasil.filter((h) => !h.ok || (h.ok && h.r && h.r.ok === false));
  const utilGagal = hasil.filter((h) => h.ok && h.nama === "waktuDiTeks" && h.r.some((c) => !c.ok));
  const lulus = hasil.length - gagal.length - utilGagal.length;
  console.log("=== QA DOM-MOCK LetMeCook ===");
  for (const h of hasil) {
    if (h.ok && h.nama === "waktuDiTeks") {
      for (const c of h.r) console.log((c.ok ? "OK   " : "GAGAL ") + c.s + " -> " + c.got);
      continue;
    }
    console.log((h.ok ? "OK   " : "GAGAL ") + h.nama + (h.ok ? " " + JSON.stringify(h.r) : " :: " + h.err));
  }
  console.log("---");
  console.log("Total: " + hasil.length + ", lulus: " + lulus + ", gagal: " + (gagal.length + utilGagal.length));
  process.exit(gagal.length + utilGagal.length ? 1 : 0);
})().catch((e) => { console.log("HARNESS ERROR :: " + ((e && e.stack) || e)); process.exit(2); });
