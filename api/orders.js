// Persistent Cloud Database Bridge for Oban Wears Customer Orders
const FIREBASE_DB = "https://oban-wears-default-rtdb.firebaseio.com/oban-orders.json";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Email, X-Admin-Password");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const response = await fetch(FIREBASE_DB);
      if (response.ok) {
        const cloudData = await response.json();
        if (cloudData) {
          const list = Array.isArray(cloudData) ? cloudData : Object.values(cloudData);
          return res.status(200).json(list);
        }
      }
    } catch (e) {
      console.warn("Orders fetch error:", e);
    }
    return res.status(200).json([]);
  }

  if (req.method === "POST") {
    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      let currentOrders = [];
      try {
        const getRes = await fetch(FIREBASE_DB);
        if (getRes.ok) {
          const existing = await getRes.json();
          if (existing && Array.isArray(existing)) currentOrders = existing;
        }
      } catch (e) {}

      if (Array.isArray(data)) {
        currentOrders = data;
      } else if (data && typeof data === "object") {
        currentOrders.unshift(data);
      }

      await fetch(FIREBASE_DB, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentOrders)
      });

      return res.status(200).json({ success: true, count: currentOrders.length });
    } catch (err) {
      return res.status(400).json({ error: "Order save error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
