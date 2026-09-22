// Verifikasi video: apakah judul video cocok dengan nama resepnya,
// dan apakah masih bisa diputar. Memakai oEmbed YouTube.
//
// Jalankan: node _qa/audit-video.js
const https = require("https");
const fs = require("fs");
const vm = require("vm");

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("skrip/resep-data.js", "utf8"), ctx);

function cek(id) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        if (res.statusCode !== 200) return resolve({ ok: false, err: res.statusCode });
        try {
          const j = JSON.parse(d);
          resolve({ ok: true, judul: j.title, kanal: j.author_name });
        } catch { resolve({ ok: false, err: "json" }); }
      });
    }).on("error", (e) => resolve({ ok: false, err: e.message }));
  });
}

(async () => {
  const ragu = [];
  const mati = [];
  for (const r of ctx.RESEP) {
    const h = await cek(r.video);
    if (!h.ok) {
      mati.push(`${r.id} | HTTP ${h.err} | ${r.video}`);
    } else {
      // Cek apakah judul video menyebut nama masakannya (kata pertama).
      const inti = r.nama.toLowerCase().split(" ")[0].replace(/[^a-z]/g, "");
      const cocok = inti.length < 4 || h.judul.toLowerCase().includes(inti);
      if (!cocok) ragu.push(`${r.id} | "${h.judul.slice(0, 65)}" | cari "${inti}"`);
    }
    await new Promise((s) => setTimeout(s, 200));
  }
  console.log("=== VIDEO MATI (" + mati.length + ") ===");
  mati.forEach((x) => console.log("  " + x));
  console.log("\n=== JUDUL PERLU DIPERIKSA (" + ragu.length + ") ===");
  ragu.forEach((x) => console.log("  " + x));
  if (!mati.length && !ragu.length) console.log("  tidak ada — semua video cocok");
})();
