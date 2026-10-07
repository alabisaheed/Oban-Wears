// ==========================================================================
// OBAN WEARS DASHBOARD: LAYOUT, OVERVIEW AND INSTALL PROMPT
// ==========================================================================
// Loaded after admin.js. Handles section switching, the phone drawer, the
// overview and inventory summaries, toasts, and "install as app" on phones.
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (v) => (window.escapeHtml ? window.escapeHtml(v) : String(v ?? ""));
  const icon = (n) => `<svg class="ic"><use href="#i-${n}"/></svg>`;
  const naira = (n) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(Number(n) || 0);
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch (e) { return fallback; }
  };
  const call = (fn) => { try { if (typeof window[fn] === "function") window[fn](); } catch (e) { console.warn(fn, e); } };

  const STAGES = { 1: "Waiting for payment", 2: "Payment acknowledged", 3: "Fabric sourced", 4: "Cutting", 5: "Stitching", 6: "Embroidery", 7: "Quality check", 8: "Dispatched", 9: "Cancelled" };
  const COLLECTIONS = ["Kaftans", "Agbada", "Father & Son", "Suits & Pants"];

  // ------------------------------------------------------------------------
  // Toasts (also used for the dashboard's information messages)
  // ------------------------------------------------------------------------
  function toast(message, kind = "info") {
    const stack = $("#admToasts");
    if (!stack || !message) return;
    const el = document.createElement("div");
    el.className = `adm-toast${kind === "warn" ? " is-warn" : ""}`;
    el.innerHTML = `${icon(kind === "warn" ? "clock" : "check")}<span></span>`;
    el.querySelector("span").textContent = String(message);
    stack.appendChild(el);
    setTimeout(() => {
      el.style.transition = "opacity .25s";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 260);
    }, Math.min(9000, 3200 + String(message).length * 35));
  }
  window.obanToast = toast;

  // Short confirmations become toasts; anything that needs reading or a
  // decision (errors, warnings, long text) stays a normal alert.
  const nativeAlert = window.alert.bind(window);
  window.alert = (message) => {
    const text = String(message ?? "");
    const looksLikeProblem = /error|fail|could not|cannot|invalid|not saved|must|please|too large|exists|not found|not allowed/i.test(text);
    if (!looksLikeProblem && text.length < 260 && document.body && !document.body.classList.contains("obl-signed-out")) toast(text);
    else nativeAlert(text);
  };

  // ------------------------------------------------------------------------
  // Sections
  // ------------------------------------------------------------------------
  const TITLES = {
    overview: "Dashboard", orders: "Orders", customers: "Customers", inventory: "Inventory",
    purchases: "Purchases", blog: "Blog", subscribers: "Subscribers", staff: "Staff", database: "Settings"
  };
  const RENDER_ON_OPEN = {
    overview: ["renderDashboard"], orders: ["renderDashboard"], customers: ["renderCustomers"], inventory: ["renderInventory"],
    purchases: ["renderPurchases"], blog: ["renderBlogFeed"], subscribers: ["renderSubscribers"], staff: ["renderStaff"]
  };
  const panelId = (name) => "tab" + name.charAt(0).toUpperCase() + name.slice(1);

  function showTab(name, { push = true } = {}) {
    if (!TITLES[name]) name = "overview";
    const btn = $(`.admin-tab[data-tab="${name}"]`);
    if (btn && btn.style.display === "none") name = "overview"; // role cannot see it
    $$(".admin-tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    Object.keys(TITLES).forEach((t) => {
      const panel = document.getElementById(panelId(t));
      if (panel) panel.hidden = t !== name;
    });
    const title = $("#admPageTitle");
    if (title) title.textContent = TITLES[name];
    document.title = `${TITLES[name]} | Oban Wears Dashboard`;
    (RENDER_ON_OPEN[name] || []).forEach(call);
    if (name === "overview") renderOverview();
    closeDrawer();
    if (push && location.hash !== `#${name}`) history.replaceState(null, "", `#${name}`);
    try { sessionStorage.setItem("oban-admin-tab", name); } catch (e) {}
    const content = $(".adm-content");
    if (content) window.scrollTo({ top: 0 });
  }
  window.obanShowTab = showTab;

  $$(".admin-tab").forEach((btn) => {
    btn.onclick = () => showTab(btn.dataset.tab);
  });
  $$("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.goto));
  });
  window.addEventListener("hashchange", () => showTab(location.hash.slice(1), { push: false }));

  // Purchases pills
  const SUBTABS = { vendors: "subtabVendors", po: "subtabPO", receives: "subtabReceives", bills: "subtabBills", payments: "subtabPayments" };
  const SUBTAB_RENDER = { vendors: "renderVendors", po: "renderPurchaseOrdersList", receives: "renderPurchaseReceivesList", bills: "renderBillsList", payments: "renderPaymentsList" };
  $$(".purchases-nav-item").forEach((btn) => {
    btn.onclick = () => {
      const sub = btn.dataset.subtab;
      $$(".purchases-nav-item").forEach((b) => b.classList.toggle("active", b === btn));
      Object.entries(SUBTABS).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el) el.hidden = key !== sub;
      });
      call(SUBTAB_RENDER[sub]);
    };
  });

  // ------------------------------------------------------------------------
  // Drawer (phones and tablets)
  // ------------------------------------------------------------------------
  const side = $("#admSide");
  const scrim = $("#admScrim");
  function openDrawer() {
    if (!side) return;
    side.classList.add("open");
    if (scrim) scrim.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!side) return;
    side.classList.remove("open");
    if (scrim) scrim.hidden = true;
    document.body.style.overflow = "";
  }
  $("#admMenuBtn")?.addEventListener("click", openDrawer);
  $("#admSideClose")?.addEventListener("click", closeDrawer);
  scrim?.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  // ------------------------------------------------------------------------
  // Dialogs
  // ------------------------------------------------------------------------
  $$("[data-close-dialog]").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest("dialog")?.close());
  });
  $$("dialog.dlg").forEach((dlg) => {
    // Click on the dimmed backdrop closes the dialog.
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  });
  $("#btnOpenWalkIn")?.addEventListener("click", () => $("#walkInDialog")?.showModal());
  $("#offlineOrderForm")?.addEventListener("submit", () => {
    setTimeout(() => { if ($("#offlineOrderForm")?.checkValidity()) $("#walkInDialog")?.close(); }, 0);
  });

  // ------------------------------------------------------------------------
  // Signed-in user
  // ------------------------------------------------------------------------
  function renderUser() {
    const user = window.obanStaffUser ? window.obanStaffUser() : {};
    const name = user.name || user.email || "Staff";
    if ($("#admUserName")) $("#admUserName").textContent = name;
    if ($("#admUserRole")) $("#admUserRole").textContent = user.role || "";
    if ($("#admAvatar")) $("#admAvatar").textContent = String(name).trim().charAt(0).toUpperCase() || "O";
  }

  // ------------------------------------------------------------------------
  // Overview
  // ------------------------------------------------------------------------
  function bar(value, max, tone) {
    const pct = max > 0 ? Math.max(value ? 3 : 0, Math.round((value / max) * 100)) : 0;
    return `<div class="bar ${tone || ""}"><i style="width:${pct}%"></i></div>`;
  }

  function renderOverview() {
    const orders = read("oban-orders", []);
    const products = read("oban-products", []);
    const period = $("#dateFilter")?.value || "all";
    const inPeriod = typeof window.isDateInRange === "function"
      ? orders.filter((o) => window.isDateInRange(o.createdAt || o.date, period))
      : orders;

    // Pipeline
    const counts = {};
    inPeriod.forEach((o) => { const s = Number(o.currentStage) || 1; counts[s] = (counts[s] || 0) + 1; });
    const maxStage = Math.max(1, ...Object.values(counts));
    const tone = (s) => (s === 1 ? "b-gold" : s === 8 ? "b-olive" : s === 9 ? "b-ink" : "");
    const pipeline = $("#ovPipeline");
    if (pipeline) {
      pipeline.innerHTML = Object.keys(STAGES).map((s) => `
        <div class="pipe-row">
          <button type="button" data-stage="${s}" title="Show these orders">${STAGES[s]}</button>
          ${bar(counts[s] || 0, maxStage, tone(Number(s)))}
          <span class="n">${counts[s] || 0}</span>
        </div>`).join("");
      $$("button[data-stage]", pipeline).forEach((b) => {
        b.onclick = () => {
          const f = $("#orderStageFilter");
          if (f) f.value = b.dataset.stage;
          showTab("orders");
        };
      });
    }

    const awaiting = inPeriod.filter((o) => Number(o.currentStage) === 1);
    if ($("#ovAwaiting")) $("#ovAwaiting").textContent = `${awaiting.length} awaiting payment`;
    const live = inPeriod.filter((o) => Number(o.currentStage) !== 9);
    const dispatched = inPeriod.filter((o) => Number(o.currentStage) === 8).length;
    if ($("#ovDispatchRate")) $("#ovDispatchRate").textContent = live.length ? `${Math.round((dispatched / live.length) * 100)}% of active orders` : "No orders yet";

    // Stock by collection
    const byCat = {};
    products.forEach((p) => { byCat[p.category] = (byCat[p.category] || 0) + 1; });
    const maxCat = Math.max(1, ...Object.values(byCat));
    const cats = $("#ovCategories");
    if (cats) {
      const names = [...COLLECTIONS, ...Object.keys(byCat).filter((c) => !COLLECTIONS.includes(c))];
      cats.innerHTML = names.map((c) => `
        <div class="cat-row"><span>${esc(c || "Uncategorised")}</span>${bar(byCat[c] || 0, maxCat, "b-gold")}<span class="n">${byCat[c] || 0}</span></div>`).join("");
    }
    const featured = products.filter((p) => p.featured).length;
    const discounted = products.filter((p) => Number(p.discount) > 0).length;
    const noPhoto = products.filter((p) => !(p.images && p.images.length)).length;
    if ($("#ovStockStats")) {
      $("#ovStockStats").innerHTML = `
        <div><strong>${products.length}</strong><span>Garments</span></div>
        <div><strong>${featured}</strong><span>Featured</span></div>
        <div><strong>${discounted}</strong><span>On discount</span></div>`;
    }

    // Recent orders
    const recent = [...orders].sort((a, b) => (Date.parse(b.createdAt || b.date) || 0) - (Date.parse(a.createdAt || a.date) || 0)).slice(0, 6);
    if ($("#ovRecent")) {
      $("#ovRecent").innerHTML = recent.length ? recent.map((o) => {
        const s = Number(o.currentStage) || 1;
        return `<tr><td><span class="ref">${esc(o.ref)}</span></td><td>${esc(o.name)}</td><td class="nowrap">${esc(o.date)}</td><td class="num"><strong>${naira(o.total)}</strong></td><td><span class="badge st-${s}">${STAGES[s] || ""}</span></td></tr>`;
      }).join("") : `<tr><td colspan="5" class="empty">No orders yet.</td></tr>`;
    }

    // At a glance
    const customers = new Set([
      ...orders.map((o) => String(o.email || "").trim().toLowerCase()).filter(Boolean),
      ...Object.keys(read("oban-client-profiles", {}))
    ]).size;
    const subscribers = Object.keys(read("oban-subscribers", {})).length;
    const articles = read("oban-blog-articles", []).length;
    const owed = awaiting.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const glance = [
      ["money", naira(owed), "awaiting payment"],
      ["customers", customers, `customer${customers === 1 ? "" : "s"}`],
      ["mail", subscribers, `newsletter subscriber${subscribers === 1 ? "" : "s"}`],
      ["blog", articles, `blog article${articles === 1 ? "" : "s"}`],
      ["image", noPhoto, `garment${noPhoto === 1 ? "" : "s"} without photos`]
    ];
    if ($("#ovGlance")) {
      $("#ovGlance").innerHTML = glance.map(([i, v, label]) => `<li><span class="g-icon">${icon(i)}</span><span class="g-text"><strong>${esc(v)}</strong> ${esc(label)}</span></li>`).join("");
    }

    // Sidebar badges
    const navOrders = $("#navCountOrders");
    if (navOrders) navOrders.textContent = orders.filter((o) => Number(o.currentStage) === 1).length || "";
    const navInv = $("#navCountInventory");
    if (navInv) navInv.textContent = products.length || "";
  }
  window.renderOverview = renderOverview;

  // Inventory summary strip (called by renderInventory)
  window.renderInventoryStats = function (products) {
    const strip = $("#invStats");
    if (!strip) return;
    const active = $("#inventoryCategoryFilter")?.value || "";
    const count = (c) => products.filter((p) => p.category === c).length;
    const cells = [
      ["", "All garments", products.length],
      ...COLLECTIONS.map((c) => [c, c, count(c)]),
      [null, "Featured", products.filter((p) => p.featured).length]
    ];
    strip.innerHTML = cells.map(([filter, label, n]) => `
      <div class="stat ${filter !== null && filter === active ? "is-active" : ""}" ${filter !== null ? `data-filter="${esc(filter)}" role="button" tabindex="0"` : ""}>
        <span>${esc(label)}</span><strong>${n}</strong>
      </div>`).join("");
    $$(".stat[data-filter]", strip).forEach((el) => {
      const apply = () => {
        const f = $("#inventoryCategoryFilter");
        if (f) f.value = el.dataset.filter;
        call("renderInventory");
      };
      el.onclick = apply;
      el.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); apply(); } };
    });
  };

  // Keep the overview in step with every orders / garments refresh.
  ["renderDashboard", "renderInventory", "renderCustomers", "renderSubscribers", "renderBlogFeed"].forEach((fn) => {
    const original = window[fn];
    if (typeof original !== "function") return;
    window[fn] = function () {
      const result = original.apply(this, arguments);
      try { renderOverview(); } catch (e) { console.warn("overview", e); }
      return result;
    };
  });
  $("#dateFilter")?.addEventListener("change", renderOverview);

  // Inventory export
  $("#exportInventoryBtn")?.addEventListener("click", () => {
    const products = read("oban-products", []);
    const rows = [["Code", "Name", "Collection", "Price", "Discount %", "Featured", "Photos", "Description"]];
    (window.sortCatalog ? window.sortCatalog(products) : products).forEach((p) => {
      rows.push([p.code, p.name, p.category, p.price, p.discount || 0, p.featured ? "Yes" : "No", (p.images || []).length, p.desc || p.description || ""]);
    });
    if (typeof window.downloadCsv === "function") window.downloadCsv(`oban_inventory_${new Date().toISOString().slice(0, 10)}.csv`, rows);
  });

  // ------------------------------------------------------------------------
  // Table cell labels for the phone card layout
  // ------------------------------------------------------------------------
  function labelTables() {
    $$(".tbl").forEach((table) => {
      const heads = $$("thead th", table).map((th) => th.textContent.trim());
      $$("tbody tr", table).forEach((tr) => {
        Array.from(tr.children).forEach((td, i) => {
          if (td.classList.contains("empty")) return;
          if (heads[i] !== undefined && td.dataset.label === undefined) td.dataset.label = heads[i];
          if (td.querySelector(".row-controls, select, .acts .act-text + .act-text")) td.classList.add("cell-block");
        });
      });
    });
  }
  let labelTimer = null;
  const content = $(".adm-content");
  if (content && "MutationObserver" in window) {
    new MutationObserver(() => {
      clearTimeout(labelTimer);
      labelTimer = setTimeout(labelTables, 30);
    }).observe(content, { childList: true, subtree: true });
  }
  labelTables();

  // ------------------------------------------------------------------------
  // Install as an app (phones only)
  // ------------------------------------------------------------------------
  const DISMISS_KEY = "oban-install-dismissed";
  const DISMISS_DAYS = 7;
  const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const isPhone = () => window.matchMedia("(max-width: 820px)").matches && window.matchMedia("(pointer: coarse)").matches;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isIOSSafari = () => isIOS() && /safari/i.test(navigator.userAgent) && !/crios|fxios|edgios|opios/i.test(navigator.userAgent);
  let deferredPrompt = null;

  function recentlyDismissed() {
    try {
      const at = Number(localStorage.getItem(DISMISS_KEY)) || 0;
      return Date.now() - at < DISMISS_DAYS * 86400000;
    } catch (e) {
      return false;
    }
  }

  function showInstallSheet(force = false) {
    const sheet = $("#installSheet");
    if (!sheet || isStandalone() || !isPhone()) return;
    if (!force && recentlyDismissed()) return;
    const accept = $("#installAccept");
    const body = $("#installBody");
    if (deferredPrompt) {
      body.textContent = "Open orders and stock from your home screen, like an app.";
      accept.hidden = false;
    } else if (isIOSSafari()) {
      body.innerHTML = `Tap ${icon("share")} <strong>Share</strong>, then <strong>Add to Home Screen</strong>.`;
      accept.hidden = true;
    } else if (isIOS()) {
      body.textContent = "Open this page in Safari, then tap Share and Add to Home Screen.";
      accept.hidden = true;
    } else {
      return; // browser cannot install; nothing useful to show
    }
    sheet.hidden = false;
  }

  function hideInstallSheet(remember) {
    const sheet = $("#installSheet");
    if (sheet) sheet.hidden = true;
    if (remember) {
      try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) {}
    }
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const card = $("#installCard");
    if (card && isPhone()) card.hidden = false;
    setTimeout(() => showInstallSheet(), 1500);
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideInstallSheet(true);
    toast("Oban Dashboard is installed. Open it from your home screen.");
  });

  async function runInstall() {
    if (!deferredPrompt) {
      showInstallSheet(true);
      return;
    }
    const prompt = deferredPrompt;
    deferredPrompt = null;
    prompt.prompt();
    const choice = await prompt.userChoice.catch(() => null);
    hideInstallSheet(!choice || choice.outcome !== "accepted");
  }

  $("#installAccept")?.addEventListener("click", runInstall);
  $("#installDismiss")?.addEventListener("click", () => hideInstallSheet(true));
  $("#btnInstallFromSettings")?.addEventListener("click", runInstall);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/admin-sw.js", { scope: "/" }).catch((err) => console.warn("Service worker:", err));
    });
  }

  // iPhones never fire beforeinstallprompt: show the Share instructions instead.
  if (isIOS() && !isStandalone()) {
    const card = $("#installCard");
    if (card && isPhone()) card.hidden = false;
    setTimeout(() => showInstallSheet(), 2000);
  }

  // ------------------------------------------------------------------------
  // Start
  // ------------------------------------------------------------------------
  // admin-sync.js announces every sign-in / sign-out.
  document.addEventListener("oban:session", (e) => {
    if (e.detail && e.detail.signedIn) renderUser();
  });

  function start() {
    renderUser();
    let initial = location.hash.slice(1);
    if (!TITLES[initial]) {
      try { initial = sessionStorage.getItem("oban-admin-tab") || "overview"; } catch (e) { initial = "overview"; }
    }
    showTab(initial, { push: false });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
