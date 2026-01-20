
export default async function handler(req, res) {
  const fullPath = req.url.replace(/^\/api/, '');
  // Kadang InfinityFree lebih galak di HTTPS, coba balik ke http dulu
  const targetUrl = `http://moviview.infinityfreeapp.com/api${fullPath}`;

  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': 'http://moviview.infinityfreeapp.com/',
      'Origin': 'http://moviview.infinityfreeapp.com',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    };

    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }
    
    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type'];
    }

    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }

    let options = {
      method: req.method,
      headers: headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    let response = await fetch(targetUrl, options);
    let buffer = await response.arrayBuffer();
    let textContent = Buffer.from(buffer).toString();

    // --- BYPASS INFINITYFREE ANTI-BOT v2 ---
    // Logika lebih agresif untuk mencari __test cookie
    if (textContent.includes('__test') || textContent.includes('document.cookie')) {
      const cookieMatch = textContent.match(/__test=([a-f0-9]+)/i);
      if (cookieMatch) {
          const testCookieValue = cookieMatch[1];
          const fullCookie = `__test=${testCookieValue}`;
          
          headers['Cookie'] = (headers['Cookie'] ? headers['Cookie'] + '; ' : '') + fullCookie;
          
          // Set cookie ke client browser juga agar request berikutnya lancar
          res.setHeader('Set-Cookie', `${fullCookie}; Path=/; Max-Age=31536000; SameSite=Lax`);
          
          // Retry dengan cookie
          response = await fetch(targetUrl, { ...options, headers });
          buffer = await response.arrayBuffer();
          textContent = Buffer.from(buffer).toString();
      }
    }
    // ------------------------------------

    const contentType = response.headers.get('content-type');
    const setCookie = response.headers.get('set-cookie');
    const contentDisposition = response.headers.get('content-disposition');

    if (contentType) res.setHeader('Content-Type', contentType);
    if (setCookie) res.setHeader('Set-Cookie', setCookie);
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);

    // Kirim response
    if (textContent.includes('__test') || textContent.includes('Checking your browser')) {
       // Jika masih gagal tembus, paksa kirim HTML challenge-nya ke browser (Content-Type: text/html)
       // Agar browser mengeksekusi JS challenge tersebut
       res.setHeader('Content-Type', 'text/html');
       return res.status(200).send(textContent);
    }

    if (contentType && contentType.includes('application/json')) {
      try {
        return res.status(response.status).json(JSON.parse(textContent));
      } catch (e) {
        // Gagal parse JSON
      }
    }

    res.status(response.status).send(Buffer.from(buffer));

  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
}
