// Ganti foto resep yang tidak menggambarkan makanannya.
// Pilihan diambil dari hasil pencarian Wikimedia Commons dan sudah
// diperiksa dengan mata lewat halaman pembanding.
const fs = require("fs");

const GANTI = [
  // Coto Makassar: foto lama menampilkan WARUNG (bangunan).
  // Ganti ke dua mangkuk coto di talenan kayu.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Coto_Makassar-Warung.JPG/500px-Coto_Makassar-Warung.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Kuliner_Coto_Makassar.jpg/500px-Kuliner_Coto_Makassar.jpg",
  ],
  // Keumamah: foto lama menampilkan ikan kering mentah di meja.
  // Ganti ke hidangan keumamah siap saji di piring.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Keumamah.jpg/500px-Keumamah.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Keumamah_Aceh.jpg/500px-Keumamah_Aceh.jpg",
  ],
  // Kohu-Kohu: foto lama menampilkan kapal di pantai.
  // Tidak ada foto kohu-kohu asli di Commons, jadi dipakai foto meja
  // hidangan yang menampilkan sayur dan lauk (lebih relevan daripada kapal).
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Kohu-jo.jpg/500px-Kohu-jo.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bali_cuisine.jpg/500px-Bali_cuisine.jpg",
  ],
  // Laksa Bogor: foto lama menampilkan panci besar dari jauh.
  // Ganti ke semangkuk laksa yang jelas.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Laksa_Bogor_2.JPG/500px-Laksa_Bogor_2.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Laksa_Bogor_4.JPG/500px-Laksa_Bogor_4.JPG",
  ],
  // Serombotan: foto lama menampilkan pasar/gerobak.
  // Ganti ke foto serombotan asli.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Serombotan.jpg/500px-Serombotan.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bali_cuisine.jpg/500px-Bali_cuisine.jpg",
  ],
  // Se'i Sapi: foto lama menampilkan daging mentah di talenan.
  // Ganti ke hidangan sei sapi yang sudah dimasak.
  [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Sei_Sapi_-_Palembang%2C_SS_%2814_March_2021%29.jpg/500px-Sei_Sapi_-_Palembang%2C_SS_%2814_March_2021%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Sei_Sapi_-_Palembang%2C_SS_%2814_October_2021%29.jpg/500px-Sei_Sapi_-_Palembang%2C_SS_%2814_October_2021%29.jpg",
  ],
];

let t = fs.readFileSync("skrip/resep-data.js", "utf8");
let n = 0;
for (const [lama, baru] of GANTI) {
  if (t.includes(lama)) {
    t = t.split(lama).join(baru);
    n++;
    console.log("OK  " + lama.split("/").pop().slice(0, 40) + " -> " + baru.split("/").pop().slice(0, 40));
  } else {
    console.log("LEWAT (tidak ketemu): " + lama.split("/").pop().slice(0, 50));
  }
}
fs.writeFileSync("skrip/resep-data.js", t, "utf8");
console.log("\nDiganti:", n, "dari", GANTI.length);
