
export default async function handler(req, res) {
  const fullPath = req.url.replace(/^\/api/, '');
  const targetUrl = `http://moviview.infinityfreeapp.com/api${fullPath}`;

  try {
    const options = {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'X-Requested-With': 'XMLHttpRequest', // Trik untuk bypass beberapa firewall
        'Referer': 'http://moviview.infinityfreeapp.com/',
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
    
    // Copy headers penting
    const contentType = response.headers.get('content-type');
    const contentDisposition = response.headers.get('content-disposition');
    if (contentType) res.setHeader('Content-Type', contentType);
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);

    const buffer = await response.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);
    const textContent = nodeBuffer.toString();

    // Cek apakah kena blokir InfinityFree
    if (textContent.includes('__test') || textContent.includes('Checking your browser')) {
      return res.status(403).json({
        error: true,
        message: "Blokir InfinityFree (Anti-Bot) Terdeteksi.",
        debug: "Server Vercel gagal menembus firewall InfinityFree.",
        saran: "Buka website http://moviview.infinityfreeapp.com di tab baru, lalu refresh halaman Vercel ini."
      });
    }

    // Jika JSON, kirim JSON
    if (contentType && contentType.includes('application/json')) {
      try {
        return res.status(response.status).json(JSON.parse(textContent));
      } catch (e) {}
    }

    // Kirim sisanya (PDF/Excel/HTML)
    res.status(response.status).send(nodeBuffer);

  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
}
