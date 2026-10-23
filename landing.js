// Grand Opening Deal: /obpk (order) -> /obku (upgrade offer) -> /obtu (thank you).
// The order reference from /obpk is kept for this visit so the upgrade on /obku
// is attached to the same order in the dashboard.
(function () {
  const KEY = "oban-grand-opening";
  const $ = (sel) => document.querySelector(sel);
  const save = (data) => { try { sessionStorage.setItem(KEY, JSON.stringify({ ...load(), ...data })); } catch (e) {} };
  function load() {
    try { return JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch (e) { return {}; }
  }

  async function post(body) {
    const res = await fetch("/api/landing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
    return data;
  }

  function showError(el, message) {
    if (!el) return;
    el.textContent = message || "";
    el.hidden = !message;
    if (message) el.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  // ---- /obpk: order form ------------------------------------------------
  const orderForm = $("#landingOrderForm");
  if (orderForm) {
    // "Choose ..." buttons on the option cards preselect that kaftan.
    document.querySelectorAll("[data-pick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const radio = orderForm.querySelector(`input[name="kaftan"][value="${btn.dataset.pick}"]`);
        if (radio) radio.checked = true;
      });
    });

    orderForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const error = $("#landingOrderError");
      const button = orderForm.querySelector("button[type=submit]");
      const field = (name) => (orderForm.elements[name] && orderForm.elements[name].value || "").trim();
      const kaftan = (orderForm.querySelector('input[name="kaftan"]:checked') || {}).value || "";
      const data = { type: "order", name: field("name"), whatsapp: field("whatsapp"), email: field("email"), address: field("address"), kaftan, website: field("website") };

      if (!data.name) return showError(error, "Please enter your full name.");
      if (data.whatsapp.replace(/\D/g, "").length < 7) return showError(error, "Please enter your WhatsApp number.");
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return showError(error, "Please check your email address.");
      if (!data.address) return showError(error, "Please enter your delivery address.");
      if (!kaftan) return showError(error, "Please choose your kaftan.");
      showError(error, "");

      button.disabled = true;
      const label = button.textContent;
      button.textContent = "Placing your order…";
      try {
        const result = await post(data);
        save({ ref: result.ref, kaftan, name: data.name, email: data.email, whatsapp: data.whatsapp });
        window.location.href = `obku${result.ref ? `?ref=${encodeURIComponent(result.ref)}` : ""}`;
      } catch (err) {
        showError(error, err.message);
        button.disabled = false;
        button.textContent = label;
      }
    });
  }

  // ---- /obku: upgrade offer --------------------------------------------
  const upgradeForm = $("#upgradeForm");
  if (upgradeForm) {
    const state = load();
    const ref = new URLSearchParams(location.search).get("ref") || state.ref || "";
    if (ref) save({ ref });
    if (state.name && $("#upsellBanner")) {
      $("#upsellBanner").textContent = `Congratulations ${state.name.split(" ")[0]}, your ${state.kaftan || "kaftan"} order is in (ref ${ref}).`;
    }
    if (state.email) upgradeForm.elements.email.value = state.email;

    const openForm = () => {
      upgradeForm.hidden = false;
      upgradeForm.scrollIntoView({ block: "center", behavior: "smooth" });
      setTimeout(() => upgradeForm.elements.email.focus({ preventScroll: true }), 400);
    };
    $("#upgradeYes")?.addEventListener("click", openForm);
    document.querySelectorAll("[data-upgrade-scroll]").forEach((b) => b.addEventListener("click", openForm));
    document.querySelectorAll('a[href="obtu"]').forEach((a) => a.addEventListener("click", () => save({ upgraded: false })));

    upgradeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const error = $("#upgradeError");
      const button = upgradeForm.querySelector("button[type=submit]");
      const email = upgradeForm.elements.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError(error, "Please enter a valid email address.");
      showError(error, "");
      button.disabled = true;
      const label = button.textContent;
      button.textContent = "Upgrading your order…";
      try {
        const result = await post({ type: "upgrade", email, ref, website: upgradeForm.elements.website.value });
        save({ ref: result.ref || ref, email, upgraded: true });
        window.location.href = "obtu?upgraded=1";
      } catch (err) {
        showError(error, err.message);
        button.disabled = false;
        button.textContent = label;
      }
    });
  }

  // ---- /obtu: thank you --------------------------------------------------
  if ($("#thanksWhatsApp")) {
    const state = load();
    const upgraded = new URLSearchParams(location.search).get("upgraded") === "1" || state.upgraded === true;
    if (upgraded && $("#thanksEyebrow")) $("#thanksEyebrow").textContent = "Klassy Man Bundle upgrade received";
    if (state.ref) {
      $("#thanksRef").hidden = false;
      $("#thanksRefValue").textContent = state.ref;
    }
    const message = [
      "Hello Oban Wears, I just placed the Grand Opening Deal order",
      state.ref ? ` (ref ${state.ref})` : "",
      state.kaftan ? ` for the ${state.kaftan} kaftan` : "",
      upgraded ? " and asked to upgrade to the Klassy Man Bundle" : "",
      "."
    ].join("");
    $("#thanksWhatsApp").href = `https://wa.me/2348168003732?text=${encodeURIComponent(message)}`;

    $("#shareBtn")?.addEventListener("click", async () => {
      const url = $("#shareLink").value;
      const text = "Oban Wears Grand Opening Deal: premium kaftan + free cap + free corporate shirt for N95,000.";
      if (navigator.share) {
        try { await navigator.share({ title: "Oban Wears Grand Opening Deal", text, url }); return; } catch (e) { /* cancelled */ }
      }
      try { await navigator.clipboard.writeText(url); $("#shareBtn").lastChild.textContent = "Link copied"; } catch (e) { $("#shareLink").select(); }
    });
  }
})();
