// Buat ikon PNG 192px dan 512px untuk manifest.
// Gambarnya sederhana: latar hijau pandan, piring putih, dan isian kuning
// keemasan. Digambar per piksel supaya tidak butuh pustaka luar.
const fs = require("fs");
const zlib = require("zlib");

// CRC32 untuk potongan PNG.
const TABEL_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = TABEL_CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function potongan(tipe, data) {
  const panjang = Buffer.alloc(4);
  panjang.writeUInt32BE(data.length);
  const isi = Buffer.concat([Buffer.from(tipe, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(isi));
  return Buffer.concat([panjang, isi, crc]);
}

function buatPng(ukuran) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(ukuran, 0);
  ihdr.writeUInt32BE(ukuran, 4);
  ihdr[8] = 8; // kedalaman bit
  ihdr[9] = 6; // RGBA
  // 10..12 default: kompresi 0, filter 0, tanpa interlace

  // Warna merek.
  const hijau = [13, 92, 52];
  const putih = [250, 248, 243];
  const emas = [214, 158, 46];

  const tengah = ukuran / 2;
  const rPiring = ukuran * 0.34;
  const rIsi = ukuran * 0.2;
  const sudut = ukuran * 0.22; // sudut membulat

  const baris = [];
  for (let y = 0; y < ukuran; y++) {
    // Filter 0 di awal tiap baris.
    const barisData = Buffer.alloc(1 + ukuran * 4);
    barisData[0] = 0;
    for (let x = 0; x < ukuran; x++) {
      const dx = x - tengah + 0.5;
      const dy = y - tengah + 0.5;
      const jarak = Math.sqrt(dx * dx + dy * dy);

      // Pilih warna: isi, piring, atau latar.
      let w = hijau;
      if (jarak < rIsi) w = emas;
      else if (jarak < rPiring) w = putih;

      // Sudut membulat: hanya piksel di sudut asli (jarak x DAN y
      // sama-sama besar) yang diperiksa terhadap lingkaran sudut.
      let alfa = 255;
      const px = Math.abs(dx);
      const py = Math.abs(dy);
      if (px > tengah - sudut && py > tengah - sudut) {
        const cx = tengah - sudut;
        const ddx = px - cx;
        const ddy = py - cx;
        if (Math.sqrt(ddx * ddx + ddy * ddy) > sudut) alfa = 0;
      }

      const o = 1 + x * 4;
      barisData[o] = w[0];
      barisData[o + 1] = w[1];
      barisData[o + 2] = w[2];
      barisData[o + 3] = alfa;
    }
    baris.push(barisData);
  }

  const idat = zlib.deflateSync(Buffer.concat(baris), { level: 9 });
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    potongan("IHDR", ihdr),
    potongan("IDAT", idat),
    potongan("IEND", Buffer.alloc(0)),
  ]);
}

for (const ukuran of [192, 512]) {
  const nama = "ikon-" + ukuran + ".png";
  fs.writeFileSync(nama, buatPng(ukuran));
  console.log("Dibuat: " + nama + " (" + fs.statSync(nama).size + " byte)");
}
