
export default async function handler(req, res) {
  const fullPath = req.url.replace(/^\/api/, '');
  const targetUrl = `http://moviview.infinityfreeapp.com/api${fullPath}`;

  try {
    const options = {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': req.headers.accept || '*/*',
        // TRIK: Berpura-pura berasal dari domain itu sendiri
        'Referer': 'http://moviview.infinityfreeapp.com/',
        'Origin': 'http://moviview.infinityfreeapp.com',
      },
    };

    if (req.headers.authorization) {
      options.headers['Authorization'] = req.headers.authorization;
    }
    
    if (req.headers['content-type']) {
      options.headers['Content-Type'] = req.headers['content-type'];
    }

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    const contentType = response.headers.get('content-type');
    
    if (contentType) res.setHeader('Content-Type', contentType);
    const contentDisposition = response.headers.get('content-disposition');
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);

    const buffer = await response.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);

    // Jika kena blokir (HTML), berikan info lebih detail
    if (contentType && contentType.includes('text/html')) {
        const text = nodeBuffer.toString();
        if (text.includes('__test')) {
            return res.status(403).json({
                error: true,
                message: "Blokir InfinityFree Aktif",
                info: "Proxy Vercel sudah bekerja, tapi InfinityFree menolak koneksi dari Server.",
                solusi: "Silakan buka URL backend Anda satu kali di browser ini agar browser mendapatkan cookie izin, lalu refresh website Vercel."
            });
        }
    }

    if (contentType && contentType.includes('application/json')) {
      try {
        const json = JSON.parse(nodeBuffer.toString());
        return res.status(response.status).json(json);
      } catch (e) {}
    }

    res.status(response.status).send(nodeBuffer);

  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
}
