
export default async function handler(req, res) {
  // Ambil path setelah /api
  const fullPath = req.url.replace(/^\/api/, '');
  const targetUrl = `http://moviview.infinityfreeapp.com/api${fullPath}`;

  try {
    const options = {
      method: req.method,
      headers: {
        // Gunakan User-Agent browser asli atau Googlebot untuk mencoba mem-bypass Anti-Bot
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    // Ambil token dari header asli jika ada
    if (req.headers.authorization) {
      options.headers['Authorization'] = req.headers.authorization;
    }

    // Jika ada body (POST/PUT), teruskan
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    const data = await response.json().catch(() => null);

    // Jika response bukan JSON (kemungkinan masih kena blokir HTML)
    if (!data) {
      const text = await response.text();
      if (text.includes('__test')) {
        return res.status(403).json({
          error: true,
          message: "InfinityFree Anti-Bot masih aktif. Hosting ini memblokir akses API dari server luar.",
          debug: "Silakan buka http://moviview.infinityfreeapp.com sekali di browser Anda, lalu coba lagi."
        });
      }
      return res.status(response.status).send(text);
    }

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
}
