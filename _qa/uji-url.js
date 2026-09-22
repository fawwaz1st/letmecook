// Verifikasi URL kandidat: pastikan bisa dimuat dan keterangannya benar.
const https = require("https");

const UJI = [
  ["Ikan Kakap Merah Bakar.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ikan_Kakap_Merah_Bakar.jpg/500px-Ikan_Kakap_Merah_Bakar.jpg"],
  ["Sei sapi Kupang.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Sei_sapi_Pj_DSC_2925.jpg/500px-Sei_sapi_Pj_DSC_2925.jpg"],
  ["Laksa Bogor 1.JPG", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Laksa_Bogor_1.JPG/500px-Laksa_Bogor_1.JPG"],
  ["Bali cuisine.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Bali_cuisine.jpg/500px-Bali_cuisine.jpg"],
  ["Keumamah Aceh.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Keumamah_Aceh.jpg/500px-Keumamah_Aceh.jpg"],
];

function cek(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      resolve(res.statusCode + " " + (res.headers["content-type"] || ""));
      res.destroy();
    }).on("error", (e) => resolve("ERR " + e.message));
  });
}

(async () => {
  for (const [nama, url] of UJI) {
    const h = await cek(url);
    const ok = h.startsWith("200");
    console.log((ok ? "OK  " : "GAGAL ") + nama + " -> " + h);
    await new Promise((s) => setTimeout(s, 250));
  }
})();
