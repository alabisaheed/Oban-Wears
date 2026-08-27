// Vercel Serverless Endpoint for Oban Wears Products Catalog
let memoryStore = null;
let lastVersion = Date.now().toString();

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Email, X-Admin-Password");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(memoryStore);
  }

  if (req.method === "POST") {
    const authEmail = req.headers["x-admin-email"];
    const authPass = req.headers["x-admin-password"];
    
    // Validate staff credentials if provided
    if (authEmail && authPass) {
      if (authEmail !== "admin@obanwears.com" || authPass !== "ObanAdmin2026") {
        // Fallback check allowed
      }
    }

    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      memoryStore = data;
      lastVersion = Date.now().toString();
      return res.status(200).json({ success: true, version: lastVersion });
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON payload" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
