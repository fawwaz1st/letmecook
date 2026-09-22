// Cari foto pengganti yang benar untuk 8 resep yang dilaporkan.
// Fokus: foto harus menampilkan MAKANANNYA, bukan toko/warung/gerobak.
const https = require("https");

const CARI = {
  "ayam-pop": "Ayam pop Padang",
  "nasi-liwet-solo": "Nasi liwet Solo",
  "ikan-dabu-dabu": "Ikan bakar dabu-dabu",
  "kohu-kohu": "Kohu-kohu Maluku",
  "keumamah": "Keumamah Aceh masakan",
  "serombotan": "Serombotan Bali",
  "sei-sapi": "Sei sapi masakan",
  "laksa-bogor": "Laksa Bogor mangkuk",
};

function cari(kata) {
  return new Promise((resolve) => {
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
      "&gsrsearch=" + encodeURIComponent(kata + " filetype:bitmap") +
      "&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=500";
    https.get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0" } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(d);
          resolve(Object.values(j.query?.pages || {}).map((p) => ({
            nama: p.title.replace("File:", ""),
            thumb: (p.imageinfo?.[0]?.thumburl || "").replace("thumb.wikimedia.org", "upload.wikimedia.org").split("?")[0],
            ket: (p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value || "").replace(/<[^>]+>/g, "").slice(0, 70),
          })));
        } catch { resolve([]); }
      });
    }).on("error", () => resolve([]));
  });
}

(async () => {
  const semua = {};
  for (const [id, kata] of Object.entries(CARI)) {
    const h = await cari(kata);
    semua[id] = h;
    console.log("\n=== " + id + " (" + kata + ") ===");
    h.forEach((x) => console.log("  " + x.nama + "\n    " + x.ket));
    await new Promise((s) => setTimeout(s, 400));
  }
  require("fs").writeFileSync("_qa/kandidat2.json", JSON.stringify(semua, null, 1), "utf8");
})();
