// Public order tracking. Exact reference lookup only, and only the fields the
// tracker page needs: no phone numbers, emails or addresses are returned.
const db = require("./_lib/db");
const { handler, send, query } = require("./_lib/http");

module.exports = handler({
  GET: async (req, res) => {
    const ref = String(query(req).ref || "").trim().toUpperCase().replace(/^#/, "").replace(/[^A-Z0-9-]/g, "").slice(0, 40);
    if (ref.length < 5) return send(res, 200, { found: false });
    const order = await db.get("orders", ref);
    if (!order) return send(res, 200, { found: false });
    send(res, 200, {
      found: true,
      ref: order.ref || ref,
      firstName: String(order.name || "Customer").trim().split(/\s+/)[0],
      date: order.date || "",
      piece: order.piece || "",
      fabricSource: order.fabricSource || "",
      currentStage: Number(order.currentStage ?? 1),
      total: Number(order.total) || 0
    });
  }
});
