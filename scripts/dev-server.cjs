// Local development server: serves the static site with clean URLs (like
// Vercel) and runs the /api functions. Without DATABASE_URL it stores data
// in .data/dev-db.json, so nothing touches the live database.
//
//   node scripts/dev-server.cjs            (port 3100, or PORT)
//   ADMIN_EMAILS=you@x.com ADMIN_PASSWORD=... node scripts/dev-server.cjs
const http = require("http");
const fs = require("fs");
const path = require("path");
require("./load-env.cjs");

const ROOT = path.join(__dirname, "..");
const PORT = Number(process.env.PORT) || 3100;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".ico": "image/x-icon", ".webp": "image/webp"
};

function resolveStatic(urlPath) {
  const clean = decodeURIComponent(urlPath).replace(/\/+$/, "") || "/index";
  if (clean === "/dashboard" || clean === "/admin") return path.join(ROOT, "admin.html");
  const candidates = [clean, clean + ".html", path.join(clean, "index.html")];
  for (const c of candidates) {
    const full = path.join(ROOT, c);
    if (!full.startsWith(ROOT)) return null;
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  }
  return null;
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const apiMatch = /^\/api\/([a-z-]+)\/?$/.exec(url.pathname);
  if (apiMatch) {
    const file = path.join(ROOT, "api", apiMatch[1] + ".js");
    if (!fs.existsSync(file)) {
      res.statusCode = 404;
      return res.end("Not found");
    }
    req.query = Object.fromEntries(url.searchParams.entries());
    delete require.cache[require.resolve(file)];
    return require(file)(req, res);
  }
  const file = resolveStatic(url.pathname);
  if (!file) {
    res.statusCode = 404;
    return res.end("Not found");
  }
  res.setHeader("Content-Type", TYPES[path.extname(file).toLowerCase()] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`Oban Wears dev server on http://localhost:${PORT}`);
});
