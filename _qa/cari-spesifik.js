// Cari foto yang benar-benar spesifik untuk kohu-kohu, serombotan,
// dan laksa bogor. Memakai API imageinfo supaya URL-nya pasti benar.
const https = require("https");

function cari(kata, batas = 20) {
  return new Promise((resolve) => {
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
      "&gsrsearch=" + encodeURIComponent(kata + " filetype:bitmap") +
      "&gsrnamespace=6&gsrlimit=" + batas + "&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=500";
    https.get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0" } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(d);
          resolve(Object.values(j.query?.pages || {}).map((p) => ({
            nama: p.title.replace("File:", ""),
            thumb: (p.imageinfo?.[0]?.thumburl || "").replace("thumb.wikimedia.org", "upload.wikimedia.org").split("?")[0],
            ket: (p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value || "").replace(/<[^>]+>/g, "").slice(0, 85),
          })));
        } catch { resolve([]); }
      });
    }).on("error", () => resolve([]));
  });
}

(async () => {
  const CARI = [
    "kohu kohu",
    "urap sayur",
    "serombotan klungkung bali",
    "laksa bogor kuah kuning",
    "laksa indonesia mangkuk",
  ];
  for (const k of CARI) {
    const h = await cari(k);
    console.log("\n=== " + k + " (" + h.length + ") ===");
    h.forEach((x) => console.log("  " + x.nama + "\n    " + x.ket));
    await new Promise((s) => setTimeout(s, 500));
  }
})();
