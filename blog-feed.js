// Adds articles written in the dashboard to the journal page. Articles that
// already have their own page (the original posts) are not repeated.
(function () {
  const grid = document.querySelector(".blog-grid");
  if (!grid) return;
  const existing = new Set(Array.from(grid.querySelectorAll("a.read-more-link")).map((a) => (a.getAttribute("href") || "").replace(/^\//, "")));

  function el(tag, attrs, text) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => node.setAttribute(k, v));
    if (text !== undefined) node.textContent = text;
    return node;
  }

  fetch("/api/articles")
    .then((res) => (res.ok ? res.json() : []))
    .then((list) => {
      const fresh = (Array.isArray(list) ? list : []).filter((a) => a && a.id && !(a.filename && existing.has(a.filename)));
      if (!fresh.length) return;
      const first = grid.querySelector(".blog-card");
      fresh.forEach((a) => {
        const href = `article?id=${encodeURIComponent(a.id)}`;
        const card = el("article", { class: "blog-card", "data-categories": "dashboard" });
        const head = el("div", { class: "card-image-block article-header-design", style: "aspect-ratio:1.35; overflow:hidden; position:relative;" });
        if (a.image) head.appendChild(el("img", { src: a.image, alt: "", loading: "lazy", style: "position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.85);" }));
        head.appendChild(el("span", { class: "card-number", style: "position:relative; z-index:2;" }, "New"));
        head.appendChild(el("div", { class: "article-header-title" }, a.title));
        card.appendChild(head);
        card.appendChild(el("p", { class: "eyebrow" }, a.category || "Journal"));
        card.appendChild(el("h3", {}, a.title));
        if (a.excerpt) card.appendChild(el("p", {}, a.excerpt));
        card.appendChild(el("a", { href, class: "read-more-link" }, "Read story →"));
        grid.insertBefore(card, first);
      });
    })
    .catch(() => {});
})();
