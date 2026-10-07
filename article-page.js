// Shows a blog article written in the Oban Wears dashboard: /article?id=...
(function () {
  const id = new URLSearchParams(location.search).get("id") || "";
  const $ = (sel) => document.querySelector(sel);

  function paragraphs(text) {
    // Blank lines start a new paragraph; single line breaks are kept.
    return String(text || "")
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block) => {
        const p = document.createElement("p");
        block.split("\n").forEach((line, i) => {
          if (i) p.appendChild(document.createElement("br"));
          p.appendChild(document.createTextNode(line));
        });
        return p;
      });
  }

  function notFound() {
    $("#articleTitle").textContent = "Article not found";
    $("#articleMeta").textContent = "";
    const body = $("#articleBody");
    body.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = "This article may have been moved or removed. You can find our latest stories in the journal.";
    body.appendChild(p);
  }

  if (!id) return notFound();
  fetch(`/api/articles?id=${encodeURIComponent(id)}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((a) => {
      document.title = `${a.title} | Oban Wears`;
      $("#articleCategory").textContent = a.category || "Journal";
      $("#articleTitle").textContent = a.title;
      $("#articleMeta").textContent = [a.author && `By ${a.author}`, a.date].filter(Boolean).join(" · ");
      if (a.image) {
        $("#articleImage").src = a.image;
        $("#articleImage").alt = a.title;
        $("#articleImageWrap").hidden = false;
      }
      const body = $("#articleBody");
      body.innerHTML = "";
      paragraphs(a.content || a.excerpt).forEach((p) => body.appendChild(p));
      const meta = document.querySelector('meta[name="description"]');
      if (meta && a.excerpt) meta.setAttribute("content", a.excerpt);
    })
    .catch(notFound);
})();
