// Public product catalogue (read-only). Edited from the dashboard via /api/admin.
const db = require("./_lib/db");
const legacy = require("./_lib/legacy");
const { handler, send } = require("./_lib/http");

const CATEGORY_ORDER = { Kaftans: 1, Agbada: 2, "Father & Son": 3, "Suits & Pants": 4 };

function sortCatalog(list) {
  return list.sort((a, b) => {
    const ca = CATEGORY_ORDER[a.category] || 99;
    const cb = CATEGORY_ORDER[b.category] || 99;
    if (ca !== cb) return ca - cb;
    const pa = typeof a.position === "number" ? a.position : 999;
    const pb = typeof b.position === "number" ? b.position : 999;
    if (pa !== pb) return pa - pb;
    return String(a.code || "").localeCompare(String(b.code || ""), undefined, { numeric: true, sensitivity: "base" });
  });
}

module.exports = handler({
  GET: async (req, res) => {
    let products = Object.values(await db.list("products"));
    if (!products.length && await legacy.importOnce()) products = Object.values(await db.list("products"));
    const visible = products
      .filter((p) => p && p.code && !p.hidden)
      .map(({ updatedBy, importedAt, ...p }) => p);
    send(res, 200, sortCatalog(visible), { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=120" });
  }
});
