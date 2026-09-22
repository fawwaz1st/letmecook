// Ganti foto serombotan dan sei-sapi memakai URL yang benar.
const fs = require("fs");

const GANTI = [
  // Serombotan: foto lama menampilkan pasar. Ganti ke hidangan serombotan.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Serombotan.jpg/500px-Serombotan.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bali_cuisine.jpg/500px-Bali_cuisine.jpg",
  ],
  // Se'i sapi: foto lama daging mentah. Ganti ke hidangan sei sapi matang.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Sei_sapi_Pj_DSC_2925.jpg/500px-Sei_sapi_Pj_DSC_2925.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Sei_Sapi_-_Palembang%2C_SS_%2814_October_2021%29.jpg/500px-Sei_Sapi_-_Palembang%2C_SS_%2814_October_2021%29.jpg",
  ],
];

let t = fs.readFileSync("skrip/resep-data.js", "utf8");
let n = 0;
for (const [lama, baru] of GANTI) {
  if (t.includes(lama)) {
    t = t.split(lama).join(baru);
    n++;
    console.log("OK  " + lama.split("/").pop().slice(0, 40));
  } else {
    console.log("LEWAT: " + lama.split("/").pop().slice(0, 50));
  }
}
fs.writeFileSync("skrip/resep-data.js", t, "utf8");
console.log("Diganti:", n);
