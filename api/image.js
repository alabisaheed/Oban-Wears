// Serves product and article images that were uploaded from the dashboard.
// Image ids are content hashes, so responses can be cached forever.
const db = require("./_lib/db");
const { handler, send, query } = require("./_lib/http");

module.exports = handler({
  GET: async (req, res) => {
    const id = String(query(req).id || "");
    if (!/^[a-f0-9]{16,64}$/.test(id)) return send(res, 400, { error: "Invalid image id" });
    const image = await db.getImage(id);
    if (!image || !image.data) return send(res, 404, { error: "Image not found" });
    res.statusCode = 200;
    res.setHeader("Content-Type", /^image\/[a-z0-9.+-]+$/.test(image.type) ? image.type : "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.end(Buffer.from(image.data, "base64"));
  }
});
