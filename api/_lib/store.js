// Helpers shared by the /api functions on top of db.js.
const crypto = require("crypto");

// Moves embedded base64 images (data: URIs) out of a record and replaces them
// with /api/image URLs, so product and article data stays small. The images
// found are appended to `images` for db.apply() to store.
function extractImages(value, images) {
  if (typeof value === "string") {
    const match = /^data:(image\/[a-z0-9.+-]+);base64,([a-z0-9+/=\s]+)$/i.exec(value);
    if (!match) return value;
    const data = match[2].replace(/\s+/g, "");
    const id = crypto.createHash("sha256").update(data).digest("hex").slice(0, 32);
    if (!images.some((img) => img.id === id)) images.push({ id, type: match[1].toLowerCase(), data });
    return `/api/image?id=${id}`;
  }
  if (Array.isArray(value)) return value.map((item) => extractImages(item, images));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, extractImages(v, images)]));
  }
  return value;
}

function sortByIndex(map) {
  return Object.values(map).sort((a, b) => (a.sortIndex ?? 9999) - (b.sortIndex ?? 9999));
}

module.exports = { extractImages, sortByIndex };
