// Storage for the Oban Wears /api functions. Browsers never talk to the database.
//
// Production: Postgres (Neon, added from the Vercel dashboard). Vercel sets
// DATABASE_URL automatically when the database is connected to the project.
// Local development without DATABASE_URL: a JSON file at .data/dev-db.json.
// Tests (OBAN_TEST_PGLITE=1): an in-memory Postgres, to exercise the SQL.
//
// Every record lives in one table keyed by (collection, key), so saving one
// record never touches another. Deletes leave a tombstone so dashboards can
// fetch "everything that changed since X" instead of whole collections.
const fs = require("fs");
const path = require("path");

const DATABASE_URL = (process.env.DATABASE_URL || process.env.POSTGRES_URL || "").trim();
const BACKEND = DATABASE_URL ? "postgres"
  : process.env.OBAN_TEST_PGLITE ? "pglite"
  : process.env.VERCEL ? "none"
  : "file";
const USE_FILE_DB = BACKEND === "file";
const FILE_DB_PATH = process.env.OBAN_DEV_DB_FILE || path.join(__dirname, "..", "..", ".data", "dev-db.json");
// Changes committed slightly before a dashboard's previous check are sent
// again, so nothing is missed while transactions are still finishing.
const CURSOR_OVERLAP_MS = 10000;

class DbError extends Error {
  constructor(message, status = 503) {
    super(message);
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Postgres
// ---------------------------------------------------------------------------
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS records (
     collection TEXT NOT NULL,
     key TEXT NOT NULL,
     data JSONB NOT NULL,
     deleted BOOLEAN NOT NULL DEFAULT FALSE,
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     PRIMARY KEY (collection, key)
   )`,
  `CREATE INDEX IF NOT EXISTS records_changes ON records (collection, updated_at)`,
  `CREATE TABLE IF NOT EXISTS images (
     id TEXT PRIMARY KEY,
     type TEXT NOT NULL,
     data TEXT NOT NULL
   )`
];

let clientPromise = null;

async function createClient() {
  if (BACKEND === "postgres") {
    const { neon } = require("@neondatabase/serverless");
    const sql = neon(DATABASE_URL);
    return {
      query: (text, params = []) => sql.query(text, params),
      transaction: (statements) => sql.transaction(statements.map((s) => sql.query(s.text, s.params || [])))
    };
  }
  if (BACKEND === "pglite") {
    const { PGlite } = await import("@electric-sql/pglite");
    const pg = new PGlite();
    return {
      query: async (text, params = []) => (await pg.query(text, params)).rows,
      transaction: (statements) => pg.transaction(async (tx) => {
        const results = [];
        for (const s of statements) results.push((await tx.query(s.text, s.params || [])).rows);
        return results;
      })
    };
  }
  throw new DbError("Database is not configured. Connect a Postgres database to the Vercel project.");
}

async function client() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const c = await createClient();
      await c.transaction(SCHEMA.map((text) => ({ text })));
      return c;
    })().catch((err) => {
      clientPromise = null;
      if (err instanceof DbError) throw err;
      console.error("Database connection failed:", err);
      throw new DbError("Database is unavailable, please try again shortly");
    });
  }
  return clientPromise;
}

async function run(fn) {
  const c = await client();
  try {
    return await fn(c);
  } catch (err) {
    if (err instanceof DbError) throw err;
    console.error("Database query failed:", err);
    throw new DbError("Database is unavailable, please try again shortly");
  }
}

const UPSERT_SQL = `INSERT INTO records (collection, key, data, deleted, updated_at)
  VALUES ($1, $2, $3::jsonb, FALSE, now())
  ON CONFLICT (collection, key) DO UPDATE SET data = EXCLUDED.data, deleted = FALSE, updated_at = now()`;
const DELETE_SQL = `UPDATE records SET deleted = TRUE, data = '{}'::jsonb, updated_at = now()
  WHERE collection = $1 AND key = $2 AND NOT deleted`;
const IMAGE_SQL = `INSERT INTO images (id, type, data) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING`;

const sqlBackend = {
  async list(collection) {
    return run(async (c) => {
      const rows = await c.query("SELECT key, data FROM records WHERE collection = $1 AND NOT deleted", [collection]);
      return Object.fromEntries(rows.map((r) => [r.key, r.data]));
    });
  },
  async get(collection, key) {
    return run(async (c) => {
      const rows = await c.query("SELECT data FROM records WHERE collection = $1 AND key = $2 AND NOT deleted", [collection, String(key)]);
      return rows.length ? rows[0].data : null;
    });
  },
  async findByField(collection, field, value) {
    return run(async (c) => {
      const rows = await c.query(
        "SELECT data FROM records WHERE collection = $1 AND NOT deleted AND lower(trim(data->>$2)) = lower(trim($3))",
        [collection, field, String(value)]
      );
      return rows.map((r) => r.data);
    });
  },
  async put(collection, key, record) {
    await run((c) => c.query(UPSERT_SQL, [collection, String(key), JSON.stringify(record)]));
  },
  async remove(collection, key) {
    await run((c) => c.query(DELETE_SQL, [collection, String(key)]));
  },
  async createIfAbsent(collection, key, record) {
    return run(async (c) => {
      const rows = await c.query(
        `INSERT INTO records (collection, key, data, deleted, updated_at)
         VALUES ($1, $2, $3::jsonb, FALSE, now())
         ON CONFLICT (collection, key) DO UPDATE SET data = EXCLUDED.data, deleted = FALSE, updated_at = now()
         WHERE records.deleted
         RETURNING key`,
        [collection, String(key), JSON.stringify(record)]
      );
      return rows.length > 0;
    });
  },
  // Writes several records, deletions and images in one transaction.
  async apply(collection, upserts = {}, removes = [], images = []) {
    const statements = [
      ...images.map((img) => ({ text: IMAGE_SQL, params: [img.id, img.type, img.data] })),
      ...Object.entries(upserts).map(([key, record]) => ({ text: UPSERT_SQL, params: [collection, String(key), JSON.stringify(record)] })),
      ...removes.map((key) => ({ text: DELETE_SQL, params: [collection, String(key)] }))
    ];
    if (statements.length) await run((c) => c.transaction(statements));
  },
  // Full snapshot when `since` is empty, otherwise only rows changed after it.
  async changesSince(collections, since) {
    return run(async (c) => {
      const [nowRows, rows] = await c.transaction([
        { text: "SELECT now() AS now" },
        since
          ? { text: "SELECT collection, key, data, deleted FROM records WHERE collection = ANY($1::text[]) AND updated_at > $2::timestamptz", params: [collections, since] }
          : { text: "SELECT collection, key, data, deleted FROM records WHERE collection = ANY($1::text[]) AND NOT deleted", params: [collections] }
      ]);
      const cursor = new Date(new Date(nowRows[0].now).getTime() - CURSOR_OVERLAP_MS).toISOString();
      return { cursor, rows };
    });
  },
  // Adds records whose keys have never existed (not even deleted ones).
  // Used to recover data from dashboard browsers without overwriting anything.
  async insertMissing(collection, records = {}) {
    const entries = Object.entries(records);
    if (!entries.length) return [];
    const results = await run((c) => c.transaction(entries.map(([key, record]) => ({
      text: `INSERT INTO records (collection, key, data, deleted, updated_at)
             VALUES ($1, $2, $3::jsonb, FALSE, now())
             ON CONFLICT (collection, key) DO NOTHING RETURNING key`,
      params: [collection, String(key), JSON.stringify(record)]
    }))));
    return results.flat().map((r) => r.key);
  },
  async count(collection) {
    return run(async (c) => {
      const rows = await c.query("SELECT count(*)::int AS n FROM records WHERE collection = $1 AND NOT deleted", [collection]);
      return rows[0].n;
    });
  },
  async getImage(id) {
    return run(async (c) => {
      const rows = await c.query("SELECT type, data FROM images WHERE id = $1", [id]);
      return rows.length ? rows[0] : null;
    });
  }
};

// ---------------------------------------------------------------------------
// Local JSON file (development only)
// ---------------------------------------------------------------------------
function readFile() {
  try {
    const data = JSON.parse(fs.readFileSync(FILE_DB_PATH, "utf8"));
    return { records: data.records || {}, images: data.images || {} };
  } catch (e) {
    return { records: {}, images: {} };
  }
}

function writeFile(data) {
  fs.mkdirSync(path.dirname(FILE_DB_PATH), { recursive: true });
  fs.writeFileSync(FILE_DB_PATH, JSON.stringify(data, null, 2));
}

function fileRows(data, collection) {
  return data.records[collection] || (data.records[collection] = {});
}

// Strictly increasing timestamps so "changed since" works within one millisecond.
let lastStamp = 0;
function stamp() {
  lastStamp = Math.max(Date.now(), lastStamp + 1);
  return new Date(lastStamp).toISOString();
}

const fileBackend = {
  async list(collection) {
    const rows = fileRows(readFile(), collection);
    return Object.fromEntries(Object.entries(rows).filter(([, r]) => !r.deleted).map(([k, r]) => [k, r.data]));
  },
  async get(collection, key) {
    const row = fileRows(readFile(), collection)[String(key)];
    return row && !row.deleted ? row.data : null;
  },
  async findByField(collection, field, value) {
    const wanted = String(value).trim().toLowerCase();
    return Object.values(fileRows(readFile(), collection))
      .filter((r) => !r.deleted && String((r.data || {})[field] || "").trim().toLowerCase() === wanted)
      .map((r) => r.data);
  },
  async put(collection, key, record) {
    return this.apply(collection, { [key]: record });
  },
  async remove(collection, key) {
    return this.apply(collection, {}, [key]);
  },
  async createIfAbsent(collection, key, record) {
    const data = readFile();
    const rows = fileRows(data, collection);
    if (rows[key] && !rows[key].deleted) return false;
    rows[key] = { data: record, deleted: false, updatedAt: stamp() };
    writeFile(data);
    return true;
  },
  async apply(collection, upserts = {}, removes = [], images = []) {
    const data = readFile();
    const rows = fileRows(data, collection);
    images.forEach((img) => { data.images[img.id] = data.images[img.id] || { type: img.type, data: img.data }; });
    Object.entries(upserts).forEach(([key, record]) => { rows[key] = { data: record, deleted: false, updatedAt: stamp() }; });
    removes.forEach((key) => { if (rows[key] && !rows[key].deleted) rows[key] = { data: {}, deleted: true, updatedAt: stamp() }; });
    writeFile(data);
  },
  async changesSince(collections, since) {
    const data = readFile();
    const cursor = new Date(Date.now() - CURSOR_OVERLAP_MS).toISOString();
    const rows = [];
    collections.forEach((collection) => {
      Object.entries(data.records[collection] || {}).forEach(([key, r]) => {
        if (since ? r.updatedAt > since : !r.deleted) rows.push({ collection, key, data: r.data, deleted: r.deleted });
      });
    });
    return { cursor, rows };
  },
  async insertMissing(collection, records = {}) {
    const data = readFile();
    const rows = fileRows(data, collection);
    const added = [];
    Object.entries(records).forEach(([key, record]) => {
      if (rows[key]) return;
      rows[key] = { data: record, deleted: false, updatedAt: stamp() };
      added.push(key);
    });
    if (added.length) writeFile(data);
    return added;
  },
  async count(collection) {
    return Object.values(fileRows(readFile(), collection)).filter((r) => !r.deleted).length;
  },
  async getImage(id) {
    return readFile().images[id] || null;
  }
};

const backend = USE_FILE_DB ? fileBackend : sqlBackend;

module.exports = {
  list: (c) => backend.list(c),
  get: (c, k) => backend.get(c, k),
  findByField: (c, f, v) => backend.findByField(c, f, v),
  put: (c, k, r) => backend.put(c, k, r),
  remove: (c, k) => backend.remove(c, k),
  createIfAbsent: (c, k, r) => backend.createIfAbsent(c, k, r),
  apply: (c, u, r, i) => backend.apply(c, u, r, i),
  changesSince: (cs, s) => backend.changesSince(cs, s),
  insertMissing: (c, r) => backend.insertMissing(c, r),
  count: (c) => backend.count(c),
  putImage: (img) => backend.apply("_images", {}, [], [img]),
  getImage: (id) => backend.getImage(id),
  DbError,
  BACKEND,
  USE_FILE_DB
};
