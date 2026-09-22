// Buat halaman berisi grid 67 foto resep, supaya bisa diperiksa
// sekaligus dengan mata. Halaman ini hanya untuk pemeriksaan, tidak
// dipakai website.
const fs = require("fs");
const vm = require("vm");

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("skrip/resep-data.js", "utf8"), ctx);

const kartu = ctx.RESEP.map((r) => `
  <figure>
    <img src="${r.foto}" alt="" loading="lazy">
    <figcaption><b>${r.id}</b><br>${r.nama}</figcaption>
  </figure>`).join("");

const html = `<!DOCTYPE html>
<html lang="id"><head><meta charset="UTF-8">
<title>Grid 67 Foto Resep</title>
<style>
  body { font: 13px system-ui; margin: 0; padding: 12px; background: #111; color: #eee; }
  .grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
  figure { margin: 0; background: #222; border-radius: 6px; overflow: hidden; }
  img { width: 100%; aspect-ratio: 3/2; object-fit: cover; display: block; background: #333; }
  figcaption { padding: 4px 6px; font-size: 11px; line-height: 1.3; }
</style></head>
<body><div class="grid">${kartu}</div></body></html>`;

fs.writeFileSync("_qa/grid-foto.html", html, "utf8");
console.log("Grid dibuat:", ctx.RESEP.length, "foto");
