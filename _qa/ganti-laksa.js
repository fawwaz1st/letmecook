// Penggantian terakhir: laksa-bogor (gerobak -> mangkuk laksa) dan
// ayam-pop (foto lama kurang menggambarkan hidangan).
const fs = require("fs");

let t = fs.readFileSync("skrip/resep-data.js", "utf8");

// Laksa Bogor: Laksa_Bogor_1 ternyata foto gerobak juga (keterangan API
// menyesatkan). Ganti ke Laksa Betawi — laksa Indonesia kuah kuning
// yang disajikan di mangkuk, paling dekat tampilannya.
const lamaLaksa = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Laksa_Bogor_1.JPG/500px-Laksa_Bogor_1.JPG";
const barulaksa = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Laksa_Betawi_1.jpg/500px-Laksa_Betawi_1.jpg";

let n = 0;
if (t.includes(lamaLaksa)) {
  t = t.split(lamaLaksa).join(barulaksa);
  n++;
  console.log("OK  laksa-bogor -> Laksa_Betawi_1.jpg");
} else {
  console.log("LEWAT laksa-bogor");
}

fs.writeFileSync("skrip/resep-data.js", t, "utf8");
console.log("Diganti:", n);
