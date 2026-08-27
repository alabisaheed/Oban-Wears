// Vercel Serverless Endpoint for Oban Wears Newsletter Subscribers
let subscribersStore = [];

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Email, X-Admin-Password");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(subscribersStore);
  }

  if (req.method === "POST") {
    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (Array.isArray(data)) {
        subscribersStore = data;
      } else if (data && typeof data === "object") {
        subscribersStore.unshift(data);
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON payload" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
