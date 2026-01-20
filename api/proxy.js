
export default async function handler(req, res) {
  const fullPath = req.url.replace(/^\/api/, '');
  const targetUrl = `http://moviview.infinityfreeapp.com/api${fullPath}`;

  try {
    const headers = {
      // Kita coba pakai Googlebot lagi karena berdasarkan pengalaman USER sebelumnya bisa tembus.
      // InfinityFree seringkali melakukan whitelisting terhadap bot mesin pencari.
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept': 'application/json, text/plain, */*',
      'X-Requested-With': 'XMLHttpRequest', // Wajib ada untuk bypass beberapa filter
      'Referer': 'http://moviview.infinityfreeapp.com/',
    };

    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }
    
    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type'];
    }

    const options = {
      method: req.method,
      headers: headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    
    // Ambil sebagai buffer
    const buffer = await response.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);
    const textContent = nodeBuffer.toString();

    // Pastikan kita selalu mengirim JSON jika terdeteksi blokir, agar frontend tidak crash (Unexpected token <)
    if (textContent.includes('__test') || textContent.includes('Checking your browser')) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(403).json({
        status: "error",
        message: "Blocked by InfinityFree Anti-Bot. Please open the site directly once.",
        is_bot_blocked: true
      });
    }

    // Copy headers penting
    const contentType = response.headers.get('content-type');
    const contentDisposition = response.headers.get('content-disposition');
    if (contentType) res.setHeader('Content-Type', contentType);
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);

    // Jika JSON, kirim JSON
    if (contentType && contentType.includes('application/json')) {
      try {
        return res.status(response.status).json(JSON.parse(textContent));
      } catch (e) {
        // Gagal parse, mungkin response korup
      }
    }

    // Kirim sisanya (PDF/Excel/HTML/Binary)
    res.status(response.status).send(nodeBuffer);

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
