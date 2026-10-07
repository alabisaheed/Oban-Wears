// Public blog articles written in the dashboard.
//   GET               list (no full text), newest first
//   GET ?id=<id>      one article with its full text
const db = require("./_lib/db");
const { handler, send, query, str } = require("./_lib/http");

function publicFields(a, withContent) {
  const out = {
    id: a.id,
    title: a.title,
    category: a.category || "",
    excerpt: a.excerpt || "",
    author: a.author || "",
    date: a.date || "",
    image: a.image || "",
    filename: a.filename || ""
  };
  if (withContent) out.content = a.content || "";
  return out;
}

module.exports = handler({
  GET: async (req, res) => {
    const id = str(query(req).id, 200);
    const cache = { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300" };
    if (id) {
      const article = await db.get("articles", id);
      if (!article || !article.title) return send(res, 404, { error: "Article not found" });
      return send(res, 200, publicFields(article, true), cache);
    }
    const list = Object.values(await db.list("articles"))
      .filter((a) => a && a.title && a.id)
      .sort((a, b) => (a.sortIndex ?? 9999) - (b.sortIndex ?? 9999))
      .map((a) => publicFields(a, false));
    send(res, 200, list, cache);
  }
});
