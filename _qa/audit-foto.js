// Periksa apakah foto tiap resep benar-benar menampilkan makanan.
// Cara kerjanya: baca nama berkas dan deskripsi dari halaman Wikimedia,
// lalu cari kata yang mencurigakan (warung, toko, bangunan, peta, dsb.).
//
// Jalankan: node _qa/audit-foto.js
const fs = require("fs");
const vm = require("vm");
const https = require("https");

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("skrip/resep-data.js", "utf8"), ctx);

// Kata yang menandakan foto BUKAN makanan.
const BUKAN_MAKANAN = /warung|restaurant|restoran|toko|shop|store|building|gedung|museum|map|peta|logo|sign|papan|street|jalan|market|pasar|kitchen|dapur|menu|poster|stall|gerobak|cart|box|kemasan|package/i;
// Kata yang menandakan foto ADALAH makanan.
const MAKANAN = /food|dish|cuisine|soup|noodle|rice|meal|plate|bowl|served|cooked|masak|hidangan|makanan|sajian/i;

function ambilDeskripsi(url) {
  return new Promise((resolve) => {
    // Ubah URL thumb jadi halaman berkas Wikimedia.
    const nama = url.split("/").pop().replace(/^\d+px-/, "");
    const halaman = "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(nama);
    https
      .get(halaman, { headers: { "User-Agent": "LetMeCook-QA/1.0" } }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          // Ambil dari meta description atau og:description.
          const m = d.match(/<meta property="og:description" content="([^"]*)"/) ||
                    d.match(/<meta name="description" content="([^"]*)"/);
          resolve(m ? m[1] : "");
        });
      })
      .on("error", () => resolve(""));
  });
}

(async () => {
  const mencurigakan = [];
  for (const r of ctx.RESEP) {
    const namaBerkas = decodeURIComponent(r.foto.split("/").pop().replace(/^\d+px-/, ""));
    const desc = await ambilDeskripsi(r.foto);
    const teks = (namaBerkas + " " + desc).toLowerCase();

    const adaKataBuruk = BUKAN_MAKANAN.test(teks);
    const adaKataMakanan = MAKANAN.test(teks);

    if (adaKataBuruk || !adaKataMakanan) {
      mencurigakan.push({
        id: r.id,
        nama: r.nama,
        berkas: namaBerkas,
        alasan: adaKataBuruk ? "ada kata bukan-makanan" : "tidak ada kata makanan",
        desc: desc.slice(0, 100),
      });
    }
    await new Promise((s) => setTimeout(s, 200));
  }

  console.log("=== FOTO MENCURIGAKAN (" + mencurigakan.length + "/" + ctx.RESEP.length + ") ===");
  for (const m of mencurigakan) {
    console.log("\n" + m.id + " | " + m.nama);
    console.log("  berkas: " + m.berkas);
    console.log("  alasan: " + m.alasan);
    console.log("  keterangan: " + m.desc);
  }
})();
