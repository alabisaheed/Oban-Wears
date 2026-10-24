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

  // Keeps the button label and adds a spinner while a form is sending.
  function busy(button, on) {
    button.disabled = on;
    const spin = button.querySelector(".lp-spin");
    if (on && !spin) button.insertAdjacentHTML("beforeend", '<span class="lp-spin" aria-hidden="true"></span>');
    if (!on && spin) spin.remove();
  }

  // Meta Pixel conversion events. The redirect waits briefly so the event is sent.
  function track(event, params, eventID, custom) {
    try {
      if (typeof window.fbq === "function") window.fbq(custom ? "trackCustom" : "track", event, params, eventID ? { eventID } : undefined);
    } catch (e) {}
  }
  const go = (url) => setTimeout(() => { window.location.href = url; }, 400);

  // ---- Reveal sections as they scroll into view ---------------------------
  const reveals = document.querySelectorAll(".lp-reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // Smooth scroll for the in-page "#order" buttons.
  document.querySelectorAll('a[href="#order"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = $("#order");
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---- /obpk: order form ------------------------------------------------
  const orderForm = $("#landingOrderForm");
  if (orderForm) {
    // Clicking an option card selects that kaftan and goes to the form.
    document.querySelectorAll("[data-pick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const radio = orderForm.querySelector(`input[name="kaftan"][value="${btn.dataset.pick}"]`);
        if (radio) radio.checked = true;
        $("#order").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // Sticky deal bar: shown after the hero button, hidden while the form is on screen.
    const sticky = $("#lpSticky");
    const hero = $("#heroCta");
    const order = $("#order");
    if (sticky && hero && order && "IntersectionObserver" in window) {
      let pastHero = false;
      let atForm = false;
      const update = () => {
        const on = pastHero && !atForm;
        sticky.classList.toggle("is-on", on);
        sticky.setAttribute("aria-hidden", on ? "false" : "true");
        sticky.querySelector("a").tabIndex = on ? 0 : -1;
      };
      new IntersectionObserver(([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      }).observe(hero);
      new IntersectionObserver(([entry]) => {
        atForm = entry.isIntersecting;
        update();
      }, { threshold: 0.05 }).observe(order);
    }

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

      busy(button, true);
      try {
        const result = await post(data);
        save({ ref: result.ref, kaftan, name: data.name, email: data.email, whatsapp: data.whatsapp });
        track("Lead", { content_name: "Grand Opening Deal", content_category: kaftan, value: 95000, currency: "NGN" }, result.ref);
        go(`obku${result.ref ? `?ref=${encodeURIComponent(result.ref)}` : ""}`);
      } catch (err) {
        showError(error, err.message);
        busy(button, false);
      }
    });
  }

  // ---- /obku: upgrade offer --------------------------------------------
  const upgradeForm = $("#upgradeForm");
  if (upgradeForm) {
    const state = load();
    const ref = new URLSearchParams(location.search).get("ref") || state.ref || "";
    if (ref) save({ ref });
    if (state.email) upgradeForm.elements.email.value = state.email;

    const openForm = () => {
      upgradeForm.hidden = false;
      upgradeForm.classList.add("is-in");
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
      busy(button, true);
      try {
        const result = await post({ type: "upgrade", email, ref, website: upgradeForm.elements.website.value });
        save({ ref: result.ref || ref, email, upgraded: true });
        track("Upgrade", { content_name: "Klassy Man Bundle upgrade", value: 230000, currency: "NGN" }, result.ref ? `${result.ref}-upgrade` : "", true);
        go("obtu?upgraded=1");
      } catch (err) {
        showError(error, err.message);
        busy(button, false);
      }
    });
  }

  // ---- /obtu: thank you --------------------------------------------------
  if ($("#thanksWhatsApp")) {
    const state = load();
    const upgraded = new URLSearchParams(location.search).get("upgraded") === "1" || state.upgraded === true;
    const message = [
      "Hello Oban Wears, I just placed the Grand Opening Deal order",
      state.ref ? ` (ref ${state.ref})` : "",
      state.kaftan ? ` for the ${state.kaftan} kaftan` : "",
      upgraded ? " and asked to upgrade to the Klassy Man Bundle" : "",
      "."
    ].join("");
    $("#thanksWhatsApp").href = `https://wa.me/2348168003732?text=${encodeURIComponent(message)}`;
  }
})();
