// Cari URL thumb langsung (upload.wikimedia.org) untuk kandidat foto.
// Special:FilePath diblokir CSP halaman uji, jadi dipakai API imageinfo
// yang mengembalikan URL upload.wikimedia.org langsung.
const https = require("https");

const KANDIDAT = {
  "coto-makassar": ["Coto Makassar-dish.JPG", "Coto Makassar dish.JPG", "Coto Makassar 20251003.jpg", "Kuliner Coto Makassar.jpg"],
  "kohu-kohu": ["Kohu-jo.jpg", "Bali cuisine.jpg"],
  "keumamah": ["Keumamah Aceh.jpg", "Keumamah Aceh (cropped).jpg", "Keumamah.jpg"],
  "laksa-bogor": ["Laksa Bogor 1.JPG", "Laksa Bogor 3.JPG", "Laksa Bogor 4.JPG"],
  "serombotan": ["Serombotan.jpg", "Bali cuisine.jpg"],
  "sei-sapi": ["Sei Sapi - Palembang, SS (14 March 2021).jpg", "Sei Sapi - Palembang, SS (14 October 2021).jpg", "Sei sapi Pj DSC 2925.jpg"],
};

function infoThumb(nama) {
  return new Promise((resolve) => {
    const judul = "File:" + nama;
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo" +
      "&iiprop=url&iiurlwidth=500&titles=" + encodeURIComponent(judul);
    https
      .get(url, { headers: { "User-Agent": "LetMeCook-QA/1.0 (educational)" } }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try {
            const j = JSON.parse(d);
            const p = Object.values(j.query.pages)[0];
            resolve(p.imageinfo?.[0]?.thumburl || "");
          } catch {
            resolve("");
          }
        });
      })
      .on("error", () => resolve(""));
  });
}

(async () => {
  const hasil = {};
  for (const [id, daftar] of Object.entries(KANDIDAT)) {
    hasil[id] = [];
    for (const nama of daftar) {
      const url = await infoThumb(nama);
      hasil[id].push({ nama, url });
      await new Promise((s) => setTimeout(s, 350));
    }
    console.log(id + ": " + hasil[id].filter((x) => x.url).length + "/" + daftar.length + " dapat URL");
  }
  require("fs").writeFileSync("_qa/kandidat-url.json", JSON.stringify(hasil, null, 1), "utf8");
  console.log("Disimpan.");
})();
