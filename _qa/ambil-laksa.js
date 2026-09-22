// Ambil URL untuk kandidat laksa terbaik (Betawi: kuah kuning di mangkuk)
// dan verifikasi bisa dimuat.
const https = require("https");

const NAMA = ["Laksa Betawi 1.jpg", "Laksa Betawi 2.jpg", "Laksa 001.jpg"];

function info(nama) {
  return new Promise((resolve) => {
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo" +
      "&iiprop=url&iiurlwidth=500&titles=" + encodeURIComponent("File:" + nama);
    https.get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0" } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(d);
          const p = Object.values(j.query.pages)[0];
          resolve({ nama, thumb: (p.imageinfo?.[0]?.thumburl || "").replace("thumb.wikimedia.org", "upload.wikimedia.org").split("?")[0] });
        } catch { resolve({ nama, thumb: "" }); }
      });
    }).on("error", () => resolve({ nama, thumb: "" }));
  });
}

function cekUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      resolve(res.statusCode);
      res.destroy();
    }).on("error", () => resolve(0));
  });
}

(async () => {
  for (const n of NAMA) {
    const h = await info(n);
    if (!h.thumb) { console.log("TIDAK ADA: " + n); continue; }
    const st = await cekUrl(h.thumb);
    console.log((st === 200 ? "OK  " : "GAGAL ") + n + " (HTTP " + st + ")\n    " + h.thumb);
    await new Promise((s) => setTimeout(s, 400));
  }
})();
