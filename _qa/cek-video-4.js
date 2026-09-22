// Periksa video resep yang fotonya bermasalah: apakah videonya
// benar-benar membahas masakan yang sesuai.
const https = require("https");

const DAFTAR = [
  ["coto-makassar", "Coto Makassar", "hOl6ZlvaTs4"],
  ["kohu-kohu", "Kohu-Kohu", "uxlFrgYjAg4"],
  ["keumamah", "Keumamah Ikan Kayu", "3HFb_GLYU9s"],
  ["laksa-bogor", "Laksa Bogor", "pMr4ZbYL4gE"],
];

function cek(id) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          if (res.statusCode !== 200) return resolve({ ok: false, err: res.statusCode });
          const j = JSON.parse(d);
          resolve({ ok: true, judul: j.title, kanal: j.author_name });
        });
      })
      .on("error", (e) => resolve({ ok: false, err: e.message }));
  });
}

(async () => {
  for (const [id, nama, vid] of DAFTAR) {
    const h = await cek(vid);
    console.log(`\n${nama} (${id})`);
    if (h.ok) {
      console.log(`  judul video: ${h.judul}`);
      console.log(`  kanal: ${h.kanal}`);
      // Cek apakah judul video menyebut nama masakannya.
      const inti = nama.toLowerCase().split(" ")[0].replace(/-/g, " ");
      const cocok = h.judul.toLowerCase().includes(inti);
      console.log(`  cocok dengan "${inti}"? ${cocok ? "YA" : "TIDAK — perlu diperiksa"}`);
    } else {
      console.log(`  GAGAL: ${h.err}`);
    }
    await new Promise((s) => setTimeout(s, 300));
  }
})();
