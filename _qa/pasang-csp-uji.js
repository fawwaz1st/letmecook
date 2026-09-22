// Sisipkan meta CSP ke halaman uji supaya gambar Wikimedia diizinkan.
const fs = require("fs");

const berkas = ["_qa/kandidat-foto.html", "_qa/grid-foto.html"];
const CSP = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src \'self\' data: https://upload.wikimedia.org; style-src \'unsafe-inline\'">';

for (const f of berkas) {
  if (!fs.existsSync(f)) continue;
  let t = fs.readFileSync(f, "utf8");
  if (t.includes("Content-Security-Policy")) {
    console.log(f + ": sudah ada CSP");
    continue;
  }
  t = t.replace("</title>", "</title>\n" + CSP);
  fs.writeFileSync(f, t, "utf8");
  console.log(f + ": CSP disisipkan");
}
