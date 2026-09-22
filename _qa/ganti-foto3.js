// Ganti foto resep dengan pilihan yang sudah diperiksa keterangannya
// di Wikimedia Commons. Semua URL di sini berasal dari API imageinfo,
// jadi hash path-nya benar.
const fs = require("fs");

const GANTI = [
  // laksa-bogor: "Laksa Bogor 4" = gerobak. "1" = semangkuk laksa.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Laksa_Bogor_4.JPG/500px-Laksa_Bogor_4.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Laksa_Bogor_1.JPG/500px-Laksa_Bogor_1.JPG",
  ],
  // ikan-dabu-dabu: foto lama hanya sambal. Ganti ke ikan kakap bakar
  // yang keterangannya menyebut "dengan sambal dabu-dabu".
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Dabu-dabu_manta.JPG/500px-Dabu-dabu_manta.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Ikan_Kakap_Merah_Bakar.jpg/500px-Ikan_Kakap_Merah_Bakar.jpg",
  ],
  // sei-sapi: foto lama = restoran dari luar. Ganti ke hidangan sei sapi
  // Kupang yang sudah dimasak.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Sei_Sapi_-_Palembang%2C_SS_%2814_October_2021%29.jpg/500px-Sei_Sapi_-_Palembang%2C_SS_%2814_October_2021%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Sei_sapi_Pj_DSC_2925.jpg/500px-Sei_sapi_Pj_DSC_2925.jpg",
  ],
];

let t = fs.readFileSync("skrip/resep-data.js", "utf8");
let n = 0;
for (const [lama, baru] of GANTI) {
  if (t.includes(lama)) {
    t = t.split(lama).join(baru);
    n++;
    console.log("OK  " + lama.split("/").pop().slice(0, 42) + "\n -> " + baru.split("/").pop().slice(0, 42));
  } else {
    console.log("LEWAT: " + lama.split("/").pop().slice(0, 50));
  }
}
fs.writeFileSync("skrip/resep-data.js", t, "utf8");
console.log("\nDiganti:", n);
