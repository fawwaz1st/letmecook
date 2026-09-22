// Perbaiki URL Urap.JPG (hash benar d/d7, sebelumnya salah tebak 5/5b).
const fs = require("fs");

const LAMA = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Urap.JPG/500px-Urap.JPG";
const BARU = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Urap.JPG/500px-Urap.JPG";

let t = fs.readFileSync("skrip/resep-data.js", "utf8");
if (t.includes(LAMA)) {
  t = t.split(LAMA).join(BARU);
  fs.writeFileSync("skrip/resep-data.js", t, "utf8");
  console.log("URL Urap diperbaiki ke hash d/d7");
} else {
  console.log("URL lama tidak ketemu");
}
