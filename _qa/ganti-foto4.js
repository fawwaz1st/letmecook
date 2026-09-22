// Penggantian foto tahap akhir. Semua URL dari API imageinfo (hash benar)
// dan sudah diuji bisa dimuat.
const fs = require("fs");

const GANTI = [
  // laksa-bogor: foto sekarang ternyata masih gerobak. Ganti ke versi
  // yang keterangannya "Laksa Bogor ... boiling hot thick yellow" (semangkuk).
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Laksa_Bogor_1.JPG/500px-Laksa_Bogor_1.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Nasi_Liwet_Solo.jpg/500px-Nasi_Liwet_Solo.jpg",
  ],
];

// Catatan: penggantian laksa di atas salah pasang (nasi liwet).
// Skrip ini sengaja dipakai hanya untuk menukar dua URL, lalu
// penggantian sebenarnya dilakukan terpisah.
let t = fs.readFileSync("skrip/resep-data.js", "utf8");

// 1. Nasi Liwet Solo: foto sekarang = orang di meja. Ganti ke hidangannya.
const lamaNasi = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Nasi_Liwet_A.JPG/500px-Nasi_Liwet_A.JPG";
const baruNasi = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Nasi_Liwet_Solo.jpg/500px-Nasi_Liwet_Solo.jpg";

// 2. Se'i sapi: foto sekarang = daging mentah. Ganti ke hidangan Kupang.
const lamaSei = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Sei_sapi_Pj_DSC_2925.jpg/500px-Sei_sapi_Pj_DSC_2925.jpg";
const baruSei = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sei_sapi_Kupang.jpg/500px-Sei_sapi_Kupang.jpg";

// 3. Ikan dabu-dabu: pakai versi yang jelas ikan bakarnya.
const lamaIkan = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Ikan_Kakap_Merah_Bakar.jpg/500px-Ikan_Kakap_Merah_Bakar.jpg";
const baruIkan = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Ikan_Tude_Bakar.JPG/500px-Ikan_Tude_Bakar.JPG";

// 4. Laksa Bogor: cari URL yang sekarang, tukar ke versi mangkuk.
// (Laksa_Bogor_1 sudah versi mangkuk menurut keterangan API.)

const PASANG = [
  [lamaNasi, baruNasi, "nasi-liwet-solo"],
  [lamaSei, baruSei, "sei-sapi"],
  [lamaIkan, baruIkan, "ikan-dabu-dabu"],
];

let n = 0;
for (const [lama, baru, id] of PASANG) {
  if (t.includes(lama)) {
    t = t.split(lama).join(baru);
    n++;
    console.log("OK  " + id + ": " + lama.split("/").pop().slice(0, 35) + " -> " + baru.split("/").pop().slice(0, 35));
  } else {
    console.log("LEWAT " + id + ": tidak ketemu " + lama.split("/").pop().slice(0, 45));
  }
}
fs.writeFileSync("skrip/resep-data.js", t, "utf8");
console.log("\nDiganti:", n);
