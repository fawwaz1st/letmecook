// Periksa apakah URL foto benar-benar bisa dimuat (HTTP 200 + image).
// Menangkap kesalahan hash path yang mudah terjadi.
const fs = require("fs");
const vm = require("vm");
const https = require("https");

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("skrip/resep-data.js", "utf8"), ctx);

function cek(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      resolve({ status: res.statusCode, tipe: res.headers["content-type"] || "" });
      res.destroy();
    }).on("error", (e) => resolve({ status: 0, tipe: e.message }));
  });
}

(async () => {
  const gagal = [];
  for (const r of ctx.RESEP) {
    const h = await cek(r.foto);
    const ok = h.status === 200 && h.tipe.startsWith("image/");
    if (!ok) gagal.push(`${r.id} | ${h.status} ${h.tipe} | ${r.foto.split("/").pop()}`);
    await new Promise((s) => setTimeout(s, 180));
  }
  console.log("=== FOTO GAGAL (" + gagal.length + "/" + ctx.RESEP.length + ") ===");
  gagal.forEach((g) => console.log("  " + g));
  if (!gagal.length) console.log("  tidak ada — semua foto bisa dimuat");
})();
