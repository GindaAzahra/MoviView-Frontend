
export default async function handler(req, res) {
  const fullPath = req.url.replace(/^\/api/, '');
  const targetUrl = `http://moviview.infinityfreeapp.com/api${fullPath}`;

  try {
    const options = {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': req.headers.accept || 'application/json',
      },
    };

    // Forward relevant headers
    if (req.headers.authorization) {
      options.headers['Authorization'] = req.headers.authorization;
    }
    
    if (req.headers['content-type']) {
      options.headers['Content-Type'] = req.headers['content-type'];
    }

    // Forward body if present
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    
    // Copy headers from target response to our response
    const contentType = response.headers.get('content-type');
    const contentDisposition = response.headers.get('content-disposition');
    
    if (contentType) res.setHeader('Content-Type', contentType);
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);

    // Read body as arrayBuffer to handle both JSON and Binary efficiently
    const buffer = await response.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);

    // Check if it's JSON
    if (contentType && contentType.includes('application/json')) {
      try {
        const json = JSON.parse(nodeBuffer.toString());
        return res.status(response.status).json(json);
      } catch (e) {
        // Fallback to sending as text if JSON parsing fails
      }
    }

    // Check for InfinityFree Anti-Bot in text responses
    if (contentType && contentType.includes('text/html')) {
        const text = nodeBuffer.toString();
        if (text.includes('__test')) {
            return res.status(403).json({
                error: true,
                message: "InfinityFree Anti-Bot detected.",
                debug: "Please visit the site directly in a browser first."
            });
        }
    }

    // Send as raw buffer (works for PDFs, Excel, etc.)
    res.status(response.status).send(nodeBuffer);

  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
}
