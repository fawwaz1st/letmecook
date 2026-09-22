// Cari nama berkas foto yang benar di Wikimedia Commons memakai API.
// Hasilnya dipakai untuk memilih foto pengganti.
const https = require("https");

// Kata kunci pencarian per resep bermasalah.
const CARI = {
  "coto-makassar": "Coto Makassar",
  "kohu-kohu": "Kohu kohu",
  "keumamah": "Keumamah",
  "laksa-bogor": "Laksa Bogor",
  "serombotan": "Serombotan",
  "sei-sapi": "Se'i sapi",
};

function cari(kata) {
  return new Promise((resolve) => {
    const url =
      "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
      "&gsrsearch=" + encodeURIComponent(kata + " filetype:bitmap") +
      "&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=400";
    https
      .get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0 (educational)" } }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try {
            const j = JSON.parse(d);
            const pages = j.query?.pages || {};
            const hasil = Object.values(pages).map((p) => ({
              nama: p.title.replace("File:", ""),
              thumb: p.imageinfo?.[0]?.thumburl || "",
            }));
            resolve(hasil);
          } catch (e) {
            resolve([]);
          }
        });
      })
      .on("error", () => resolve([]));
  });
}

(async () => {
  const semua = {};
  for (const [id, kata] of Object.entries(CARI)) {
    const hasil = await cari(kata);
    semua[id] = hasil;
    console.log(`\n=== ${id} (${kata}) — ${hasil.length} hasil ===`);
    hasil.forEach((h) => console.log("  " + h.nama));
    await new Promise((s) => setTimeout(s, 400));
  }
  require("fs").writeFileSync("_qa/kandidat.json", JSON.stringify(semua, null, 1), "utf8");
  console.log("\nDisimpan ke _qa/kandidat.json");
})();
