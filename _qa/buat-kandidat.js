// Halaman pembanding kandidat foto, memakai URL upload.wikimedia.org
// langsung (dari _qa/kandidat-url.json). Hanya untuk pemeriksaan.
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("_qa/kandidat-url.json", "utf8"));

// API mengembalikan domain thumb.wikimedia.org; halaman ini memakai
// upload.wikimedia.org (sama isinya, dan domain itu yang diizinkan CSP).
const bersihkan = (u) => u.replace("thumb.wikimedia.org", "upload.wikimedia.org").split("?")[0];

let html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
<title>Kandidat Foto</title><style>
body{font:13px system-ui;background:#111;color:#eee;margin:0;padding:12px}
.grup{margin-bottom:22px;border-bottom:1px solid #333;padding-bottom:14px}
.grup h3{margin:0 0 10px;font-size:15px;color:#8fd}
.row{display:flex;gap:10px;flex-wrap:wrap}
figure{margin:0;width:250px;background:#222;border-radius:6px;overflow:hidden}
img{width:100%;aspect-ratio:3/2;object-fit:cover;display:block;background:#333}
figcaption{padding:5px 7px;font-size:11px;word-break:break-word;line-height:1.3}
</style></head><body>`;

for (const [resep, daftar] of Object.entries(data)) {
  const ada = daftar.filter((x) => x.url);
  if (!ada.length) continue;
  html += `<div class="grup"><h3>${resep}</h3><div class="row">`;
  for (const d of ada) {
    html += `<figure><img src="${bersihkan(d.url)}" loading="lazy" alt=""><figcaption>${d.nama}</figcaption></figure>`;
  }
  html += `</div></div>`;
}
html += "</body></html>";
fs.writeFileSync("_qa/kandidat-foto.html", html, "utf8");
console.log("Halaman kandidat dibuat");
