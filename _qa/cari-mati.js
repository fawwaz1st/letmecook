// Cari fungsi dan variabel yang tidak dipakai di seluruh berkas situs.
// Dipakai untuk merapikan kode, bukan bagian dari website.
const fs = require("fs");

const berkasSitus = ["index.html", "katalog.html", "resep.html", "mealplan.html", "favorit.html", "tentang.html", "404.html", "skrip/store.js", "skrip/halaman.js", "skrip/resep-data.js", "aset/style.css"];
const semua = berkasSitus.map((f) => fs.readFileSync(f, "utf8")).join("\n");

console.log("=== FUNGSI store.js ===");
const tStore = fs.readFileSync("skrip/store.js", "utf8");
for (const m of tStore.matchAll(/^function (\w+)/gm)) {
  const nama = m[1];
  const pola = new RegExp("\\b" + nama + "\\b", "g");
  const jumlah = (semua.match(pola) || []).length;
  if (jumlah <= 1) console.log(`  TIDAK DIPAKAI: ${nama} (${jumlah} kemunculan)`);
}

console.log("\n=== FUNGSI halaman.js ===");
const tHal = fs.readFileSync("skrip/halaman.js", "utf8");
for (const m of tHal.matchAll(/^function (\w+)/gm)) {
  const nama = m[1];
  const pola = new RegExp("\\b" + nama + "\\b", "g");
  const jumlah = (semua.match(pola) || []).length;
  if (jumlah <= 1) console.log(`  TIDAK DIPAKAI: ${nama} (${jumlah} kemunculan)`);
}

console.log("\n=== KONSTAN store.js ===");
for (const m of tStore.matchAll(/^const ([A-Z_]+) =/gm)) {
  const nama = m[1];
  const pola = new RegExp("\\b" + nama + "\\b", "g");
  const jumlah = (semua.match(pola) || []).length;
  if (jumlah <= 1) console.log(`  TIDAK DIPAKAI: ${nama} (${jumlah} kemunculan)`);
}

console.log("\n=== BERKAS DI ROOT ===");
for (const f of fs.readdirSync(".")) {
  if (fs.statSync(f).isFile() && /\.(js|css|html|svg|png|webmanifest|xml|txt)$/.test(f)) {
    // Cek apakah berkas dirujuk di HTML
    const html = berkasSitus.filter((x) => x.endsWith(".html")).map((x) => fs.readFileSync(x, "utf8")).join("\n");
    if (!html.includes(f) && !["skrip/resep-data.js", "skrip/store.js", "skrip/halaman.js", "aset/style.css"].includes(f)) {
      console.log("  TIDAK DIRUJUK DI HTML:", f);
    }
  }
}
