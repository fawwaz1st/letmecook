// Audit 67 video YouTube via oEmbed — pastikan semua ID valid & bisa diputar
const https = require('https');
const fs = require('fs');
const src = fs.readFileSync('resep-data.js', 'utf8');
const ids = [...src.matchAll(/video:\s*"([^"]+)"/g)].map((m) => m[1]);
const uniq = [...new Set(ids)];

function cek(id) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const j = JSON.parse(d);
              resolve({ id, ok: true, judul: j.title, penulis: j.author_name });
            } catch (e) {
              resolve({ id, ok: false, err: 'json' });
            }
          } else resolve({ id, ok: false, err: 'HTTP ' + res.statusCode });
        });
      })
      .on('error', (e) => resolve({ id, ok: false, err: e.message }));
  });
}

(async () => {
  console.log('Total resep:', ids.length, '| unik:', uniq.length);
  const hasil = [];
  for (const id of uniq) hasil.push(await cek(id));
  const gagal = hasil.filter((h) => !h.ok);
  console.log('Valid:', hasil.length - gagal.length, '| Gagal:', gagal.length);
  if (gagal.length) console.log('GAGAL:', JSON.stringify(gagal, null, 1));
  fs.writeFileSync('_qa/video.txt', hasil.map((h) => `${h.ok ? 'OK ' : 'XX '}${h.id} ${h.judul || h.err || ''}`).join('\n'));
  console.log('Detail -> _qa/video.txt');
})();
