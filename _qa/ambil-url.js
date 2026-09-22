// Ambil URL thumb yang benar untuk kandidat pengganti, langsung dari
// API imageinfo (bukan menebak hash path).
const https = require("https");

const NAMA = [
  "Laksa Bogor 1.JPG",
  "Nasi Liwet Solo.jpg",
  "Nasi Liwet.jpg",
  "Nasi liwet di Solo.jpg",
  "Ikan Tude Bakar.JPG",
  "Ikang Bakar Dabu-Dabu 2.jpg",
  "Ikan Bakar Dabu-dabu Ternate 3.jpg",
  "Sei sapi Kupang.jpg",
  "Ayam pop.JPG",
];

function info(nama) {
  return new Promise((resolve) => {
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo" +
      "&iiprop=url|extmetadata&iiurlwidth=500&titles=" + encodeURIComponent("File:" + nama);
    https.get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0" } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(d);
          const p = Object.values(j.query.pages)[0];
          if (p.missing !== undefined) return resolve({ nama, ada: false });
          const ii = p.imageinfo?.[0] || {};
          resolve({
            nama,
            ada: true,
            thumb: (ii.thumburl || "").replace("thumb.wikimedia.org", "upload.wikimedia.org").split("?")[0],
            ket: (ii.extmetadata?.ImageDescription?.value || "").replace(/<[^>]+>/g, "").slice(0, 75),
          });
        } catch { resolve({ nama, ada: false }); }
      });
    }).on("error", () => resolve({ nama, ada: false }));
  });
}

(async () => {
  for (const n of NAMA) {
    const h = await info(n);
    if (h.ada) {
      console.log("OK  " + h.nama);
      console.log("    " + h.thumb);
      console.log("    " + h.ket);
    } else {
      console.log("TIDAK ADA: " + n);
    }
    await new Promise((s) => setTimeout(s, 400));
  }
})();
