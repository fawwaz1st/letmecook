// Cari foto laksa bogor yang benar-benar semangkuk laksa.
const https = require("https");

function cari(kata, limit = 20) {
  return new Promise((resolve) => {
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
      "&gsrsearch=" + encodeURIComponent(kata) +
      "&gsrnamespace=6&gsrlimit=" + limit + "&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=500";
    https.get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0" } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(d);
          resolve(Object.values(j.query?.pages || {}).map((p) => ({
            nama: p.title.replace("File:", ""),
            thumb: (p.imageinfo?.[0]?.thumburl || "").replace("thumb.wikimedia.org", "upload.wikimedia.org").split("?")[0],
            ket: (p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value || "").replace(/<[^>]+>/g, "").slice(0, 80),
          })));
        } catch { resolve([]); }
      });
    }).on("error", () => resolve([]));
  });
}

(async () => {
  // Cari dengan nama kategori & istilah lain
  for (const k of ["incategory:\"Laksa\"", "laksa mie", "laksa kuah kuning", "laksa noodle bowl"]) {
    const h = await cari(k);
    console.log("\n=== " + k + " (" + h.length + ") ===");
    h.slice(0, 14).forEach((x) => console.log("  " + x.nama + "\n    " + x.ket));
    await new Promise((s) => setTimeout(s, 400));
  }
})();
