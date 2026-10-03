// One-time import from the old public Firebase database into Postgres.
// Runs on the first dashboard load after the switch; records that already
// exist in Postgres (or were deleted there) are never overwritten.
const db = require("./db");
const store = require("./store");

const LEGACY_URL = (process.env.OBAN_LEGACY_FIREBASE_URL ?? "https://oban-wears-default-rtdb.firebaseio.com").replace(/\/+$/, "");

// Firebase path -> [collection, record key]
const SOURCES = {
  "oban-products": ["products", (p) => p && p.code && String(p.code).trim().toUpperCase()],
  "oban-orders": ["orders", (o) => o && o.ref && String(o.ref).trim().toUpperCase()],
  blog: ["articles", (a) => a && (a.id || a.filename)]
};

let running = null;

async function fetchPath(path) {
  const res = await fetch(`${LEGACY_URL}/${path}.json`, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : Object.values(data || {});
}

async function run() {
  if (!LEGACY_URL || await db.get("meta", "legacyImport")) return null;
  const summary = {};
  for (const [path, [collection, keyOf]] of Object.entries(SOURCES)) {
    const list = await fetchPath(path);
    const images = [];
    const records = {};
    list.forEach((raw, index) => {
      const key = keyOf(raw);
      if (!key || records[key]) return;
      const record = store.extractImages({ ...raw, importedAt: new Date().toISOString() }, images);
      if (collection === "products") record.code = key;
      if (collection === "orders") record.ref = key;
      if (collection === "articles") record.sortIndex = index;
      records[key] = record;
    });
    if (images.length) await db.apply("_images", {}, [], images);
    summary[collection] = (await db.insertMissing(collection, records)).length;
  }
  await db.put("meta", "legacyImport", { at: new Date().toISOString(), source: LEGACY_URL, summary });
  console.log("Imported legacy Firebase data:", summary);
  return summary;
}

// Never blocks the dashboard: a failed import is retried on the next load.
async function importOnce() {
  if (!running) {
    running = run().catch((err) => {
      console.error("Legacy import failed, will retry:", err);
      return null;
    }).finally(() => { running = null; });
  }
  return running;
}

module.exports = { importOnce };
