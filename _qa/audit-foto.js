// Audit pola URL foto di resep-data.js
const fs = require("fs");
const s = fs.readFileSync("skrip/resep-data.js", "utf8");
const pola = new Set();
let total = 0;
for (const m of s.matchAll(/foto:\s*"([^"]+)"/g)) {
  total++;
  const u = m[1];
  if (/\/500px-/.test(u)) pola.add("500px wikimedia");
  else if (/\/\d+px-/.test(u)) pola.add("lain: " + u.slice(0, 90));
  else pola.add("TANPA UKURAN: " + u.slice(0, 90));
}
[...pola].forEach((p) => console.log(p));
console.log("total foto:", total);
