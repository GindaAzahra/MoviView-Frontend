
export default async function handler(req, res) {
  const fullPath = req.url.replace(/^\/api/, '');
  // Gunakan HTTPS karena seringkali HTTP diredirect dan memicu bot detection
  const targetUrl = `https://moviview.infinityfreeapp.com/api${fullPath}`;

  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': 'https://moviview.infinityfreeapp.com/',
      'Origin': 'https://moviview.infinityfreeapp.com',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    };

    // Forward Authorization header
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }
    
    // Forward Content-Type
    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type'];
    }

    // Forward existing Cookies from browser to InfinityFree
    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }

    const options = {
      method: req.method,
      headers: headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    let response = await fetch(targetUrl, options);
    
    // Ambil body as buffer dulu supaya bisa dicek tanpa merusak stream
    let buffer = await response.arrayBuffer();
    let textContent = Buffer.from(buffer).toString();

    // --- BYPASS INFINITYFREE ANTI-BOT ---
    // Jika terdeteksi challenge document.cookie="__test=...", kita coba extract dan kirim ulang
    if (textContent.includes('__test') && textContent.includes('document.cookie')) {
      const cookieMatch = textContent.match(/document\.cookie\s*=\s*"(__test=[^;]+)/);
      if (cookieMatch) {
          const testCookie = cookieMatch[1];
          headers['Cookie'] = (headers['Cookie'] ? headers['Cookie'] + '; ' : '') + testCookie;
          
          // Beri tahu browser untuk simpan cookie ini juga supaya request berikutnya lancar
          res.setHeader('Set-Cookie', `${testCookie}; Path=/; HttpOnly; SameSite=None; Secure`);
          
          // Retry request dengan cookie yang baru didapat
          response = await fetch(targetUrl, options);
          buffer = await response.arrayBuffer();
          textContent = Buffer.from(buffer).toString();
      }
    }
    // ------------------------------------

    // Copy headers penting dari response target ke response kita
    const contentType = response.headers.get('content-type');
    const contentDisposition = response.headers.get('content-disposition');
    const setCookie = response.headers.get('set-cookie');

    if (contentType) res.setHeader('Content-Type', contentType);
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);
    if (setCookie) res.setHeader('Set-Cookie', setCookie);

    // Cek apakah masih kena blokir setelah upaya bypass
    if (textContent.includes('__test') || textContent.includes('Checking your browser')) {
      return res.status(403).json({
        error: true,
        message: "Blokir InfinityFree (Anti-Bot) Terdeteksi.",
        debug: "Server Vercel gagal menembus firewall InfinityFree meskipun sudah mencoba bypass.",
        saran: "InfinityFree mendeteksi Vercel sebagai bot. Coba akses API langsung dari browser sekali saja, atau gunakan hosting backend lain (seperti Render/Railway) untuk folder backend Anda."
      });
    }

    // Jika JSON, kirim JSON
    if (contentType && contentType.includes('application/json')) {
      try {
        return res.status(response.status).json(JSON.parse(textContent));
      } catch (e) {
        // Fallback jika gagal parse
      }
    }

    // Kirim sisanya (PDF/Excel/HTML/Binary)
    res.status(response.status).send(Buffer.from(buffer));

  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
}
