// Cari foto laksa bogor yang benar (bukan gerobak) dan kandidat lain.
const https = require("https");

function cari(kata) {
  return new Promise((resolve) => {
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
      "&gsrsearch=" + encodeURIComponent(kata + " filetype:bitmap") +
      "&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=500";
    https.get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0" } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(d);
          resolve(Object.values(j.query?.pages || {}).map((p) => ({
            nama: p.title.replace("File:", ""),
            thumb: (p.imageinfo?.[0]?.thumburl || "").replace("thumb.wikimedia.org", "upload.wikimedia.org").split("?")[0],
            ket: (p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value || "").replace(/<[^>]+>/g, "").slice(0, 90),
          })));
        } catch { resolve([]); }
      });
    }).on("error", () => resolve([]));
  });
}

(async () => {
  for (const kata of ["laksa", "laksa bogor kuah", "kohu kohu urap", "sei sapi", "keumamah aceh"]) {
    const h = await cari(kata);
    console.log("\n=== " + kata + " ===");
    h.forEach((x) => console.log("  " + x.nama + "\n    " + x.ket));
    await new Promise((s) => setTimeout(s, 400));
  }
})();
