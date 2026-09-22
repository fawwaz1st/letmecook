// Buat halaman grid foto untuk resep tertentu, supaya bisa diperiksa
// dengan mata. Hanya untuk pemeriksaan.
const fs = require("fs");
const vm = require("vm");

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("skrip/resep-data.js", "utf8"), ctx);

const DAFTAR = process.argv[2]
  ? process.argv[2].split(",")
  : ["ayam-pop", "nasi-liwet-solo", "ikan-dabu-dabu", "kohu-kohu", "keumamah", "serombotan", "sei-sapi", "laksa-bogor"];

const kartu = ctx.RESEP.filter((r) => DAFTAR.includes(r.id)).map((r) => `
  <figure>
    <img src="${r.foto}" alt="">
    <figcaption><b>${r.id}</b><br>${r.nama}</figcaption>
  </figure>`).join("");

const CSP = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src \'self\' data: https://upload.wikimedia.org; style-src \'unsafe-inline\'">';

const html = `<!DOCTYPE html>
<html lang="id"><head><meta charset="UTF-8">${CSP}
<title>Grid Foto Periksa</title>
<style>
  body { font: 13px system-ui; margin: 0; padding: 12px; background: #111; color: #eee; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  figure { margin: 0; background: #222; border-radius: 6px; overflow: hidden; }
  img { width: 100%; aspect-ratio: 3/2; object-fit: cover; display: block; background: #333; }
  figcaption { padding: 5px 7px; font-size: 12px; line-height: 1.3; }
</style></head>
<body><div class="grid">${kartu}</div></body></html>`;

fs.writeFileSync("_qa/grid-periksa.html", html, "utf8");
console.log("Grid dibuat:", DAFTAR.length, "foto");
