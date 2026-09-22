// Peta ikon dan bagian CSS untuk dokumentasi.
const fs = require("fs");

const svg = fs.readFileSync("aset/icons.svg", "utf8");
const ids = [...svg.matchAll(/id="(i-[\w-]+)"/g)].map((m) => m[1]);
console.log("Ikon (" + ids.length + "):");
console.log(ids.join(", "));

console.log("\n=== BAGIAN style.css ===");
const css = fs.readFileSync("aset/style.css", "utf8").split("\n");
css.forEach((l, i) => {
  if (/^\/\* -+ \d+\)/.test(l)) console.log((i + 1) + ": " + l.trim());
});

console.log("\n=== BAGIAN halaman.js ===");
const hal = fs.readFileSync("skrip/halaman.js", "utf8").split("\n");
hal.forEach((l, i) => {
  if (/^function \w+/.test(l)) console.log((i + 1) + ": " + l.trim());
});
