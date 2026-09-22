// Cari kandidat foto pengganti untuk resep yang fotonya bermasalah.
const https = require("https");

const CARI = ["laksa bogor", "serombotan klungkung", "sei sapi palembang", "kohu kohu", "coto makassar"];

function cari(kata) {
  return new Promise((resolve) => {
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
      "&gsrsearch=" + encodeURIComponent(kata + " filetype:bitmap") +
      "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=420";
    https.get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0" } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(d);
          resolve(Object.values(j.query?.pages || {}).map((p) => ({
            nama: p.title.replace("File:", ""),
            thumb: (p.imageinfo?.[0]?.thumburl || "").replace("thumb.wikimedia.org", "upload.wikimedia.org").split("?")[0],
          })));
        } catch { resolve([]); }
      });
    }).on("error", () => resolve([]));
  });
}

(async () => {
  for (const k of CARI) {
    const h = await cari(k);
    console.log("\n=== " + k + " ===");
    h.forEach((x) => console.log("  " + x.nama + "\n    " + x.thumb));
    await new Promise((s) => setTimeout(s, 400));
  }
})();
