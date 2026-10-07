// ==========================================================================
// OBAN WEARS DASHBOARD: SIGN-IN AND SERVER SYNC
// ==========================================================================
// Loaded before admin.js. admin.js keeps reading and writing working copies
// of the data in localStorage as before. Every write to a synced key is
// compared with the last known server state and only the records that
// changed are sent to /api/admin, so a save never overwrites orders placed on
// the website or changes made on another device. Changes made elsewhere are
// pulled every few seconds.
(function () {
  "use strict";

  const TOKEN_KEY = "oban-admin-token";
  const USER_KEY = "oban-admin-user";
  const ACTIVITY_KEY = "oban-admin-activity";
  const RECOVERY_FLAG = "oban-recovery-done-v2";
  const SIGNOUT_REASON_KEY = "oban-signout-reason";
  const PULL_MS = 5000;
  const HIDDEN_PULL_MS = 60000;
  const IDLE_MINUTES = 30;
  const RESEND_SECONDS = 45;
  // Left behind by older builds: plain "logged in" flags and staff passwords.
  const LEGACY_KEYS = ["oban-staff-members", "oban-staff-passwords", "oban-admin-logged-in", "oban-admin-email", "oban-admin-role"];

  const upperKey = (v) => (v === undefined || v === null || v === "" ? "" : String(v).trim().toUpperCase());
  const SYNCED_KEYS = {
    "oban-orders": { collection: "orders", shape: "array", keyOf: (o) => o && upperKey(o.ref) },
    "oban-products": { collection: "products", shape: "array", keyOf: (p) => p && upperKey(p.code) },
    "oban-blog-articles": { collection: "articles", shape: "array", keyOf: (a) => a && (a.id || a.filename), ordered: true },
    "oban-subscribers": { collection: "subscribers", shape: "object", normalizeKey: (k) => String(k).trim().toLowerCase() },
    "oban-client-profiles": { collection: "profiles", shape: "object", normalizeKey: (k) => String(k).trim().toLowerCase() },
    "oban-enquiries": { collection: "enquiries", shape: "array", keyOf: (e) => e && e.ref },
    "oban-comments": { collection: "comments", shape: "array", keyOf: (c) => c && c.id },
    "oban-vendors": { collection: "vendors", shape: "array", keyOf: (v) => v && (v.id || v.name), roles: ["admin", "manager"] },
    "oban-purchase-orders": { collection: "purchaseOrders", shape: "array", keyOf: (x) => x && x.id, roles: ["admin", "manager"] },
    "oban-bills": { collection: "bills", shape: "array", keyOf: (x) => x && x.id, roles: ["admin", "manager"] },
    "oban-payments": { collection: "payments", shape: "array", keyOf: (x) => x && x.id, roles: ["admin", "manager"] }
  };
  // Added by the server; not part of what staff edit.
  const META_FIELDS = new Set(["updatedAt", "updatedBy", "importedAt", "recoveredFrom"]);

  const RENDERERS = {
    "oban-orders": ["renderDashboard", "renderCustomers"],
    "oban-products": ["renderInventory"],
    "oban-blog-articles": ["renderBlogFeed"],
    "oban-subscribers": ["renderSubscribers"],
    "oban-client-profiles": ["renderCustomers"],
    "oban-enquiries": ["renderEnquiries"],
    "oban-comments": ["renderBlogComments"],
    "oban-vendors": ["renderPurchases"],
    "oban-purchase-orders": ["renderPurchases"],
    "oban-bills": ["renderPurchases"],
    "oban-payments": ["renderPurchases"]
  };
  const ALL_RENDERERS = ["renderDashboard", "renderCustomers", "renderInventory", "renderBlogFeed", "renderPurchases", "renderSubscribers", "renderStaff", "renderEnquiries", "renderBlogComments"];

  const ls = window.localStorage;
  const nativeGetItem = Storage.prototype.getItem;
  const nativeSetItem = Storage.prototype.setItem;
  const nativeRemoveItem = Storage.prototype.removeItem;
  const getRaw = (key) => nativeGetItem.call(ls, key);
  const setRaw = (key, value) => nativeSetItem.call(ls, key, value);
  const removeRaw = (key) => nativeRemoveItem.call(ls, key);

  // What this browser held when the page opened. Used once to send the server
  // any records it lost (insert-only, so nothing is ever overwritten).
  const snapshot = {};
  Object.keys(SYNCED_KEYS).forEach((key) => { snapshot[key] = getRaw(key); });

  const serverState = {}; // localStorage key -> Map(record key -> canonical JSON)
  const dirtyKeys = new Set();
  let syncReady = false;
  let applyingRemote = false;
  let flushing = false;
  let pulling = false;
  let flushTimer = null;
  let syncCursor = null;
  let lastPullAt = 0;

  // ------------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------------
  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  window.escapeHtml = escapeHtml;

  function token() {
    return getRaw(TOKEN_KEY) || "";
  }

  function currentUser() {
    try { return JSON.parse(getRaw(USER_KEY) || "null") || {}; } catch (e) { return {}; }
  }

  function role() {
    return currentUser().role || "";
  }
  window.obanStaffRole = role;
  window.obanStaffUser = currentUser;

  function tokenPayload(t) {
    try {
      const b = t.split(".")[0].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(escape(atob(b))));
    } catch (e) {
      return null;
    }
  }

  function canSync(lsKey) {
    const roles = SYNCED_KEYS[lsKey].roles;
    return !roles || roles.includes(role());
  }

  async function api(method, path, body) {
    const res = await fetch(path, {
      method,
      cache: "no-store",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: body ? JSON.stringify(body) : undefined
    });
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (res.status === 401) {
      sessionExpired();
      const err = new Error("Your session has expired. Please sign in again.");
      err.status = 401;
      throw err;
    }
    if (!res.ok) {
      const err = new Error((data && data.error) || `Request failed (${res.status})`);
      err.status = res.status;
      throw err;
    }
    return data;
  }
  window.obanAdminApi = api;

  // Sign-in requests: a 401 here means a wrong password or code, not an expired session.
  async function authPost(body) {
    const res = await fetch("/api/auth", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", ...(token() ? { Authorization: `Bearer ${token()}` } : {}) },
      body: JSON.stringify(body)
    });
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (!res.ok) {
      const err = new Error((data && data.error) || "Something went wrong. Please try again.");
      err.status = res.status;
      throw err;
    }
    return data;
  }

  // JSON with sorted keys and without empty values or server bookkeeping, so
  // the same record always compares equal wherever it came from.
  function canonical(value, top = false) {
    if (Array.isArray(value)) {
      const items = value.map((v) => canonical(v)).filter((v) => v !== undefined);
      return items.length ? items : undefined;
    }
    if (value && typeof value === "object") {
      const out = {};
      Object.keys(value).sort().forEach((k) => {
        if (top && META_FIELDS.has(k)) return;
        const v = canonical(value[k]);
        if (v !== undefined) out[k] = v;
      });
      return Object.keys(out).length ? out : undefined;
    }
    if (value === null || value === undefined || value === "") return undefined;
    return value;
  }

  function canonicalJson(record) {
    return JSON.stringify(canonical(record, true) || {});
  }

  function parseRecords(lsKey, raw) {
    const spec = SYNCED_KEYS[lsKey];
    const map = new Map();
    let data;
    try {
      data = JSON.parse(raw || (spec.shape === "array" ? "[]" : "{}"));
    } catch (e) {
      return map;
    }
    if (spec.shape === "array") {
      (Array.isArray(data) ? data : []).forEach((record, idx) => {
        if (!record || typeof record !== "object") return;
        const key = spec.keyOf(record);
        if (!key) return;
        map.set(String(key), spec.ordered ? { ...record, sortIndex: idx } : record);
      });
    } else if (data && typeof data === "object") {
      Object.entries(data).forEach(([key, record]) => {
        if (record && typeof record === "object") map.set(spec.normalizeKey ? spec.normalizeKey(key) : key, record);
      });
    }
    return map;
  }

  function localRecords(lsKey) {
    return parseRecords(lsKey, getRaw(lsKey));
  }

  function recordTime(record) {
    return Date.parse(record.createdAt || "") || Date.parse(record.date || "") || Date.parse(record.timestamp || "") || Number(record.timestamp) || 0;
  }

  function writeLocal(lsKey, records) {
    const spec = SYNCED_KEYS[lsKey];
    let value = records;
    if (spec.shape === "array") {
      let list = Object.values(records);
      if (lsKey === "oban-products") list = typeof window.sortCatalog === "function" ? window.sortCatalog(list) : list;
      else if (spec.ordered) list.sort((a, b) => (a.sortIndex ?? 9999) - (b.sortIndex ?? 9999));
      else if (lsKey === "oban-orders") list.sort((a, b) => recordTime(b) - recordTime(a)); // newest first, as the table shows them
      else list.sort((a, b) => recordTime(a) - recordTime(b));
      value = list;
    }
    applyingRemote = true;
    try {
      setRaw(lsKey, JSON.stringify(value));
    } catch (e) {
      console.warn(`Could not cache ${lsKey} in this browser:`, e);
    } finally {
      applyingRemote = false;
    }
  }

  function knownRecords(lsKey) {
    const records = {};
    (serverState[lsKey] || new Map()).forEach((json, key) => { records[key] = JSON.parse(json); });
    return records;
  }

  function render(names) {
    names.forEach((fn) => {
      try { if (typeof window[fn] === "function") window[fn](); } catch (e) { console.warn(`${fn}:`, e); }
    });
  }

  // ------------------------------------------------------------------------
  // Status display
  // ------------------------------------------------------------------------
  function setSyncStatus(text, isError = false) {
    let el = document.querySelector("#syncStatus");
    if (!el) {
      const host = document.querySelector(".admin-header-actions");
      if (!host) return;
      el = document.createElement("span");
      el.id = "syncStatus";
      el.setAttribute("role", "status");
      host.prepend(el);
    }
    el.textContent = text;
    el.title = text;
    el.classList.toggle("is-error", isError);
    el.classList.toggle("is-busy", !isError && /saving|loading/i.test(text));

    const dot = document.querySelector("#firebaseStatusDot");
    const label = document.querySelector("#firebaseStatusText");
    if (dot) dot.style.background = isError ? "#4a3324" : "#5a6048";
    if (label) label.textContent = isError ? "Not connected" : "Connected to Oban Wears server";
    const pulled = document.querySelector("#syncLastPulled");
    if (pulled && lastPullAt) pulled.textContent = `Last checked for changes: ${new Date(lastPullAt).toLocaleTimeString()}`;
    const who = document.querySelector("#syncSignedInAs");
    const user = currentUser();
    if (who && user.email) who.textContent = `Signed in as ${user.name || user.email} (${user.email}, ${user.role})`;
  }

  // ------------------------------------------------------------------------
  // Saving: every write to a synced key is picked up here
  // ------------------------------------------------------------------------
  function markDirty(lsKey) {
    if (!syncReady || !token()) return;
    dirtyKeys.add(lsKey);
    setSyncStatus("Saving…");
    clearTimeout(flushTimer);
    flushTimer = setTimeout(flushChanges, 300);
  }

  Storage.prototype.setItem = function (key, value) {
    nativeSetItem.call(this, key, value);
    if (this === ls && SYNCED_KEYS[key] && !applyingRemote) markDirty(key);
  };
  Storage.prototype.removeItem = function (key) {
    nativeRemoveItem.call(this, key);
    if (this === ls && SYNCED_KEYS[key] && !applyingRemote) markDirty(key);
  };

  async function flushChanges() {
    if (flushing) {
      clearTimeout(flushTimer);
      flushTimer = setTimeout(flushChanges, 300);
      return;
    }
    flushing = true;
    let retry = false;
    let problem = "";
    for (const lsKey of [...dirtyKeys]) {
      dirtyKeys.delete(lsKey);
      const spec = SYNCED_KEYS[lsKey];
      const known = serverState[lsKey] || new Map();
      if (!canSync(lsKey)) {
        writeLocal(lsKey, knownRecords(lsKey));
        continue;
      }
      const local = localRecords(lsKey);
      const upsert = {};
      const remove = [];
      local.forEach((record, key) => {
        if (known.get(key) !== canonicalJson(record)) upsert[key] = record;
      });
      known.forEach((json, key) => {
        if (!local.has(key)) remove.push(key);
      });
      if (!Object.keys(upsert).length && !remove.length) continue;

      // Guard against a cleared or broken browser copy deleting many records.
      if (remove.length > 3 && remove.length > known.size * 0.25 &&
          !confirm(`This would permanently delete ${remove.length} ${spec.collection} records from the server. Continue?`)) {
        const restored = knownRecords(lsKey);
        local.forEach((record, key) => { if (!known.has(key)) restored[key] = record; });
        writeLocal(lsKey, restored);
        render(RENDERERS[lsKey] || []);
        remove.length = 0;
        if (!Object.keys(upsert).length) continue;
      }

      try {
        const upsertKeys = Object.keys(upsert);
        const BATCH = 200;
        const next = new Map(serverState[lsKey] || known);
        for (let i = 0; i < Math.max(upsertKeys.length, remove.length); i += BATCH) {
          const part = Object.fromEntries(upsertKeys.slice(i, i + BATCH).map((k) => [k, upsert[k]]));
          const removePart = remove.slice(i, i + BATCH);
          const result = await api("POST", "/api/admin", { c: spec.collection, upsert: part, remove: removePart });
          Object.entries(result.saved || {}).forEach(([key, record]) => next.set(key, canonicalJson(record)));
          removePart.forEach((key) => next.delete(key));
          serverState[lsKey] = new Map(next);
        }
        serverState[lsKey] = next;
      } catch (err) {
        console.warn(`Could not save ${spec.collection}:`, err);
        if (err.status === 401) break;
        if (err.status === 403 || err.status === 400 || err.status === 413) {
          // Not retryable: put back what the server has and say why.
          writeLocal(lsKey, knownRecords(lsKey));
          render(RENDERERS[lsKey] || []);
          problem = err.message;
          alert(`That change was not saved: ${err.message}`);
        } else {
          dirtyKeys.add(lsKey);
          retry = true;
          problem = err.message;
        }
      }
    }
    flushing = false;
    if (retry) {
      setSyncStatus(`Not saved yet: ${problem}. Retrying…`, true);
      clearTimeout(flushTimer);
      flushTimer = setTimeout(flushChanges, 4000);
    } else if (problem) {
      setSyncStatus(`Last change not saved: ${problem}`, true);
    } else {
      setSyncStatus("All changes saved");
      setTimeout(pullFromServer, 700);
    }
  }

  // ------------------------------------------------------------------------
  // Loading: full snapshot first, then only what changed since the cursor
  // ------------------------------------------------------------------------
  async function pullFromServer(force = false) {
    if (!token() || pulling || flushing || dirtyKeys.size) return;
    if (!force && syncReady && document.visibilityState === "hidden" && Date.now() - lastPullAt < HIDDEN_PULL_MS) return;
    const keys = Object.keys(SYNCED_KEYS).filter(canSync);
    const since = syncReady && syncCursor ? `&since=${encodeURIComponent(syncCursor)}` : "";
    pulling = true;
    let data;
    try {
      data = await api("GET", `/api/admin?c=${keys.map((k) => SYNCED_KEYS[k].collection).join(",")}${since}`);
    } catch (err) {
      pulling = false;
      if (err.status !== 401) {
        console.warn("Dashboard sync:", err);
        setSyncStatus(syncReady ? "Offline: showing last loaded data" : `Could not load data: ${err.message}`, true);
      }
      return;
    }
    pulling = false;
    // Local edits arrived while loading: skip; the cursor is unchanged, so
    // these server changes are fetched again next time.
    if (flushing || dirtyKeys.size) return;

    if (data.user && data.user.role && data.user.role !== role()) {
      setRaw(USER_KEY, JSON.stringify({ ...currentUser(), ...data.user }));
      applyRoleUI();
    }

    const toRender = new Set();
    keys.forEach((lsKey) => {
      const change = (data.changes || {})[SYNCED_KEYS[lsKey].collection] || { upsert: {}, removed: [] };
      const known = data.full ? new Map() : new Map(serverState[lsKey] || []);
      let changed = Boolean(data.full);
      Object.entries(change.upsert || {}).forEach(([key, record]) => {
        const json = canonicalJson(record);
        if (known.get(key) !== json) {
          known.set(key, json);
          changed = true;
        }
      });
      (change.removed || []).forEach((key) => {
        if (known.delete(key)) changed = true;
      });
      serverState[lsKey] = known;
      if (changed) {
        writeLocal(lsKey, knownRecords(lsKey));
        (RENDERERS[lsKey] || []).forEach((fn) => toRender.add(fn));
      }
    });
    syncCursor = data.cursor;
    lastPullAt = Date.now();

    const firstLoad = !syncReady;
    syncReady = true;
    if (firstLoad) {
      render(ALL_RENDERERS);
      recoverLostRecords();
    } else {
      render([...toRender]);
    }
    setSyncStatus("All changes saved");
  }
  window.obanPullNow = () => pullFromServer(true);

  // Records this browser had before the server became the source of truth.
  async function recoverLostRecords() {
    if (getRaw(RECOVERY_FLAG)) return;
    let added = 0;
    try {
      for (const [lsKey, spec] of Object.entries(SYNCED_KEYS)) {
        if (spec.collection === "products" || !snapshot[lsKey] || !canSync(lsKey)) continue;
        const known = serverState[lsKey] || new Map();
        const missing = {};
        parseRecords(lsKey, snapshot[lsKey]).forEach((record, key) => {
          if (!known.has(key)) missing[key] = record;
        });
        if (!Object.keys(missing).length) continue;
        const result = await api("POST", "/api/admin", { c: "recover", records: { [spec.collection]: missing } });
        added += Object.values(result.recovered || {}).reduce((a, b) => a + b, 0);
      }
      setRaw(RECOVERY_FLAG, new Date().toISOString());
    } catch (err) {
      console.warn("Recovery of locally held records failed; will retry next sign-in:", err);
      return;
    }
    Object.keys(snapshot).forEach((k) => { snapshot[k] = null; });
    if (added) {
      syncCursor = null;
      syncReady = false;
      await pullFromServer(true);
      alert(`${added} record${added === 1 ? " that was" : "s that were"} missing from the server ${added === 1 ? "was" : "were"} found in this browser and restored.`);
    }
  }

  function startSync() {
    if (syncReady || pulling) return;
    setSyncStatus("Loading…");
    pullFromServer(true);
  }

  setInterval(() => pullFromServer(), PULL_MS);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") pullFromServer(true);
  });
  window.addEventListener("online", () => {
    if (dirtyKeys.size) flushChanges();
    pullFromServer(true);
  });
  window.addEventListener("beforeunload", (e) => {
    if (dirtyKeys.size || flushing) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // Another dashboard tab changed a synced key: that tab saves it; here we
  // just fetch the result. A cleared key is restored from the server.
  window.addEventListener("storage", (e) => {
    if (e.key === TOKEN_KEY && !e.newValue && syncReady) {
      clearSession();
      checkSession();
      return;
    }
    if (!SYNCED_KEYS[e.key] || !syncReady) return;
    if (e.newValue !== null) {
      setTimeout(pullFromServer, 1200);
      return;
    }
    writeLocal(e.key, knownRecords(e.key));
    pullFromServer(true);
  });

  // ------------------------------------------------------------------------
  // Images: uploaded once, stored on the server, referenced by URL
  // ------------------------------------------------------------------------
  window.obanUploadImage = async function (dataUrl) {
    try {
      const result = await api("POST", "/api/admin", { c: "image", data: dataUrl });
      return result.url;
    } catch (err) {
      console.warn("Image upload failed, keeping it inline until the next save:", err);
      return dataUrl; // the server stores it when the garment is saved
    }
  };

  // ------------------------------------------------------------------------
  // Session
  // ------------------------------------------------------------------------
  function applyRoleUI() {
    const r = role();
    const show = (id, visible) => {
      const el = document.getElementById(id);
      if (el) el.style.display = visible ? "" : "none";
    };
    show("tabBtnStaff", r === "admin");
    show("tabBtnPurchases", r === "admin" || r === "manager");
    document.body.dataset.staffRole = r;
  }

  function clearSession() {
    syncReady = false;
    syncCursor = null;
    lastPullAt = 0;
    dirtyKeys.clear();
    clearTimeout(flushTimer);
    Object.keys(serverState).forEach((key) => delete serverState[key]);
    [TOKEN_KEY, USER_KEY, ...LEGACY_KEYS].forEach(removeRaw);
    // Keep the old browser copy until it has been checked for lost records.
    if (getRaw(RECOVERY_FLAG)) Object.keys(SYNCED_KEYS).forEach(removeRaw);
    try { sessionStorage.removeItem("oban-admin-password"); } catch (e) {}
  }

  function sessionExpired() {
    if (!token()) return;
    clearSession();
    try { sessionStorage.setItem(SIGNOUT_REASON_KEY, "Your session has ended. Please sign in again."); } catch (e) {}
    checkSession();
  }

  function startSession(newToken, user) {
    setRaw(TOKEN_KEY, newToken);
    setRaw(USER_KEY, JSON.stringify(user));
    setRaw(ACTIVITY_KEY, String(Date.now()));
    LEGACY_KEYS.forEach(removeRaw);
    window.scrollTo(0, 0);
    checkSession();
  }

  async function signOut(reason) {
    if (dirtyKeys.size) {
      clearTimeout(flushTimer);
      try { await flushChanges(); } catch (e) {}
    }
    clearSession();
    if (reason) {
      try { sessionStorage.setItem(SIGNOUT_REASON_KEY, reason); } catch (e) {}
    }
    window.location.reload();
  }
  window.handleLogout = () => signOut("");

  function checkSession() {
    const auth = document.querySelector("#adminAuth");
    const dash = document.querySelector("#adminDashboard");
    const t = token();
    const payload = t && tokenPayload(t);
    const signedIn = Boolean(payload && payload.kind === "staff" && payload.exp > Date.now());
    if (t && !signedIn) clearSession();

    document.body.classList.toggle("obl-signed-out", !signedIn);
    if (auth) auth.style.display = signedIn ? "none" : "";
    if (dash) dash.style.display = signedIn ? "" : "none";

    if (signedIn) {
      applyRoleUI();
      startSync();
    } else {
      showStep("credentials");
    }
    document.dispatchEvent(new CustomEvent("oban:session", { detail: { signedIn } }));
  }
  window.checkSession = checkSession;

  // Sign out after a period without activity (shared across tabs).
  function noteActivity() {
    if (!token()) return;
    const last = Number(getRaw(ACTIVITY_KEY)) || 0;
    if (Date.now() - last > 15000) setRaw(ACTIVITY_KEY, String(Date.now()));
  }
  ["click", "keydown", "scroll", "touchstart", "mousemove"].forEach((evt) => {
    window.addEventListener(evt, noteActivity, { passive: true });
  });
  function checkIdle() {
    if (!token()) return;
    const last = Number(getRaw(ACTIVITY_KEY)) || 0;
    if (last && Date.now() - last > IDLE_MINUTES * 60000) {
      signOut(`You were signed out after ${IDLE_MINUTES} minutes without activity.`);
    }
  }
  setInterval(checkIdle, 30000);

  // ------------------------------------------------------------------------
  // Sign-in screen
  // ------------------------------------------------------------------------
  let challenge = null;
  let resendTimer = null;

  const $ = (sel, root = document) => root.querySelector(sel);

  function formMessage(form, type, text) {
    const el = form && $(type === "error" ? ".obl-error" : ".obl-note", form);
    if (!el) return;
    el.textContent = text || "";
    el.hidden = !text;
  }

  function clearMessages() {
    document.querySelectorAll("#adminAuth .obl-error, #adminAuth .obl-note").forEach((el) => {
      el.textContent = "";
      el.hidden = true;
    });
  }

  function setBusy(form, busy, label) {
    const btn = form && $("button[type=submit]", form);
    if (!btn) return;
    if (!btn.dataset.label) btn.dataset.label = btn.textContent;
    btn.disabled = busy;
    btn.innerHTML = busy ? `<span class="obl-spinner"></span>${escapeHtml(label)}` : escapeHtml(btn.dataset.label);
  }

  function showStep(step) {
    const forms = { credentials: "#oblCredentials", register: "#oblRegister", code: "#oblCode" };
    Object.entries(forms).forEach(([name, sel]) => {
      const el = $(sel);
      if (el) el.hidden = name !== step;
    });
    if (step === "credentials") {
      challenge = null;
      clearInterval(resendTimer);
      let reason = "";
      try {
        reason = sessionStorage.getItem(SIGNOUT_REASON_KEY) || "";
        sessionStorage.removeItem(SIGNOUT_REASON_KEY);
      } catch (e) {}
      if (reason) formMessage($("#oblCredentials"), "note", reason);
      setTimeout(() => { const el = $("#emailInput"); if (el && !el.value) el.focus({ preventScroll: true }); }, 50);
    }
    if (step === "code") {
      codeInputs().forEach((input) => { input.value = ""; });
      updateCodeButton();
      setTimeout(() => codeInputs()[0] && codeInputs()[0].focus({ preventScroll: true }), 50);
    }
  }

  function startResendCountdown() {
    const btn = $("#oblResend");
    if (!btn) return;
    let left = RESEND_SECONDS;
    clearInterval(resendTimer);
    const tick = () => {
      btn.disabled = left > 0;
      btn.textContent = left > 0 ? `Resend code in ${left}s` : "Resend code";
      if (left-- <= 0) clearInterval(resendTimer);
    };
    tick();
    resendTimer = setInterval(tick, 1000);
  }

  function afterPassword(result, form) {
    if (result.token) {
      startSession(result.token, result.user);
      return;
    }
    challenge = result.challenge;
    const dest = $("#oblDestination");
    if (dest) dest.textContent = result.destination || "your email";
    clearMessages();
    showStep("code");
    startResendCountdown();
    if (form) form.reset();
  }

  // Six single-digit boxes: auto-advance, backspace to the previous box, paste a whole code.
  function codeInputs() {
    return Array.from(document.querySelectorAll("#oblCodeBoxes input"));
  }

  function codeValue() {
    return codeInputs().map((i) => i.value).join("");
  }

  function updateCodeButton() {
    const btn = $("#oblCode button[type=submit]");
    if (btn && !btn.querySelector(".obl-spinner")) btn.disabled = codeValue().length !== 6;
  }

  function fillCode(digits, from = 0) {
    const inputs = codeInputs();
    digits.split("").forEach((d, i) => { if (inputs[from + i]) inputs[from + i].value = d; });
    const next = Math.min(from + digits.length, inputs.length - 1);
    inputs[next].focus({ preventScroll: true });
    updateCodeButton();
    if (codeValue().length === 6) submitCode();
  }

  function bindCodeBoxes() {
    codeInputs().forEach((input, index, inputs) => {
      input.addEventListener("input", () => {
        const raw = input.value.replace(/\D/g, "");
        if (raw.length > 1) {
          input.value = "";
          fillCode(raw.slice(0, 6 - index), index);
          return;
        }
        input.value = raw;
        if (raw && index < inputs.length - 1) inputs[index + 1].focus({ preventScroll: true });
        updateCodeButton();
        if (codeValue().length === 6) submitCode();
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
          inputs[index - 1].value = "";
          inputs[index - 1].focus({ preventScroll: true });
          updateCodeButton();
          e.preventDefault();
        } else if (e.key === "ArrowLeft" && index > 0) {
          inputs[index - 1].focus({ preventScroll: true });
        } else if (e.key === "ArrowRight" && index < inputs.length - 1) {
          inputs[index + 1].focus({ preventScroll: true });
        }
      });
      input.addEventListener("paste", (e) => {
        const pasted = ((e.clipboardData && e.clipboardData.getData("text")) || "").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        e.preventDefault();
        codeInputs().forEach((i) => { i.value = ""; });
        fillCode(pasted, 0);
      });
    });
  }

  let verifying = false;
  async function submitCode() {
    const form = $("#oblCode");
    const code = codeValue();
    if (verifying || code.length !== 6 || !challenge) return;
    verifying = true;
    formMessage(form, "error", "");
    formMessage(form, "note", "");
    setBusy(form, true, "Verifying…");
    try {
      const result = await authPost({ action: "verify", challenge, code });
      clearInterval(resendTimer);
      startSession(result.token, result.user);
    } catch (err) {
      if (err.status === 410) {
        showStep("credentials");
        formMessage($("#oblCredentials"), "error", err.message);
      } else {
        formMessage(form, "error", err.message);
        codeInputs().forEach((i) => { i.value = ""; });
        codeInputs()[0].focus({ preventScroll: true });
      }
    } finally {
      verifying = false;
      setBusy(form, false);
      updateCodeButton();
    }
  }

  function bindSignIn() {
    const credentials = $("#oblCredentials");
    const register = $("#oblRegister");
    const codeForm = $("#oblCode");
    if (!credentials) return;

    credentials.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearMessages();
      const email = $("#emailInput").value.trim().toLowerCase();
      const password = $("#passwordInput").value;
      if (!email || !password) {
        formMessage(credentials, "error", "Please enter your email and password.");
        return;
      }
      setBusy(credentials, true, "Checking…");
      try {
        afterPassword(await authPost({ action: "login", email, password }), credentials);
      } catch (err) {
        formMessage(credentials, "error", err.message);
      } finally {
        setBusy(credentials, false);
      }
    });

    register.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearMessages();
      const name = $("#regNameInput").value.trim();
      const email = $("#regEmailInput").value.trim().toLowerCase();
      const password = $("#regPasswordInput").value;
      if (!name || !email || password.length < 8) {
        formMessage(register, "error", "Please enter your name, email and a password of at least 8 characters.");
        return;
      }
      setBusy(register, true, "Setting up…");
      try {
        afterPassword(await authPost({ action: "register", name, email, password }), register);
      } catch (err) {
        formMessage(register, "error", err.message);
      } finally {
        setBusy(register, false);
      }
    });

    codeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitCode();
    });
    bindCodeBoxes();

    $("#oblResend").addEventListener("click", async () => {
      formMessage(codeForm, "error", "");
      try {
        const res = await authPost({ action: "resend", challenge });
        formMessage(codeForm, "note", `A new code was sent to ${res.destination}.`);
        codeInputs().forEach((i) => { i.value = ""; });
        updateCodeButton();
        startResendCountdown();
      } catch (err) {
        if (err.status === 410) {
          showStep("credentials");
          formMessage(credentials, "error", err.message);
        } else {
          formMessage(codeForm, "error", err.message);
        }
      }
    });

    document.querySelectorAll("[data-obl-back]").forEach((btn) => {
      btn.addEventListener("click", () => {
        clearMessages();
        showStep("credentials");
      });
    });
    $("#oblShowRegister").addEventListener("click", () => {
      clearMessages();
      showStep("register");
      setTimeout(() => $("#regNameInput").focus({ preventScroll: true }), 50);
    });
    $("#forgotPasswordLink").addEventListener("click", () => {
      clearMessages();
      formMessage(credentials, "note", "Forgotten your password? Ask an admin to remove your access and add your email again under Staff, then choose \"Set up your account\". Owners change their password in the Vercel settings (ADMIN_PASSWORD).");
    });
    $("#oblTogglePassword").addEventListener("click", () => {
      const input = $("#passwordInput");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      $("#oblTogglePassword").setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  }

  // ------------------------------------------------------------------------
  // Staff tab (accounts live on the server)
  // ------------------------------------------------------------------------
  window.renderStaff = async function renderStaff() {
    const body = document.querySelector("#staffTableBody");
    if (!body || role() !== "admin" || !token()) return;
    let staff;
    try {
      staff = (await api("GET", "/api/admin?c=staff")).staff || {};
    } catch (err) {
      body.innerHTML = `<tr><td colspan="4" class="empty">Could not load staff: ${escapeHtml(err.message)}</td></tr>`;
      return;
    }
    const me = currentUser().email;
    const rows = Object.values(staff).sort((a, b) => String(a.email).localeCompare(String(b.email)));
    const icon = (n) => `<svg class="ic"><use href="#i-${n}"/></svg>`;
    const roleSelect = (s) => `
      <select class="sel-sm staff-role-select" data-email="${escapeHtml(s.email)}" aria-label="Role for ${escapeHtml(s.email)}" style="min-width:120px">
        ${["admin", "manager", "editor"].map((r) => `<option value="${r}" ${s.role === r ? "selected" : ""}>${r[0].toUpperCase() + r.slice(1)}</option>`).join("")}
      </select>`;
    const statusClass = { owner: "badge-gold", active: "badge-ok", invited: "st-1" };
    const statusText = { owner: "Owner", active: "Active", invited: "Invited" };
    body.innerHTML = rows.length ? rows.map((s) => {
      const editable = s.status !== "owner" && s.email !== me;
      let action = '<span class="muted">Set in hosting</span>';
      if (s.status === "invited") action = `<div class="acts"><button type="button" class="act act-text staff-action-btn" data-action="resendInvite" data-email="${escapeHtml(s.email)}">${icon("mail")}Resend</button><button type="button" class="act act-text staff-action-btn" data-action="revokeInvite" data-email="${escapeHtml(s.email)}">${icon("close")}Cancel</button></div>`;
      else if (s.status === "active" && s.email !== me) action = `<button type="button" class="act act-text act-danger staff-action-btn" data-action="removeStaff" data-email="${escapeHtml(s.email)}">${icon("trash")}Revoke access</button>`;
      else if (s.email === me) action = '<span class="muted">You</span>';
      const initial = escapeHtml(String(s.name || s.email || "?").trim().charAt(0).toUpperCase());
      return `
        <tr>
          <td><div class="art-cell"><span class="adm-avatar">${initial}</span><div><span class="cell-main">${escapeHtml(s.name || s.email)}</span><span class="cell-sub">${escapeHtml(s.email)}</span></div></div></td>
          <td>${editable ? roleSelect(s) : `<span class="badge badge-plain" style="text-transform:capitalize">${escapeHtml(s.role)}</span>`}</td>
          <td><span class="badge ${statusClass[s.status] || ""}">${escapeHtml(statusText[s.status] || s.status)}</span>${s.status === "invited" ? '<span class="cell-sub">Waiting for them to set up</span>' : ""}</td>
          <td>${action}</td>
        </tr>`;
    }).join("") : `<tr><td colspan="4" class="empty">No staff yet.</td></tr>`;

    body.querySelectorAll(".staff-action-btn").forEach((btn) => {
      btn.onclick = async () => {
        const action = btn.dataset.action;
        if (action !== "resendInvite") {
          const question = action === "removeStaff" ? `Revoke dashboard access for ${btn.dataset.email}?` : `Cancel the invitation for ${btn.dataset.email}?`;
          if (!confirm(question)) return;
        }
        btn.disabled = true;
        try {
          const r = await api("POST", "/api/admin", { c: "staff", action, email: btn.dataset.email });
          if (action === "resendInvite") {
            alert(r.emailed ? `Invitation sent again to ${btn.dataset.email}.` : `The invitation email could not be sent. Please check that ${btn.dataset.email} is correct, or try again shortly.`);
          }
          window.renderStaff();
        } catch (err) {
          alert(err.message);
        }
      };
    });
    body.querySelectorAll(".staff-role-select").forEach((select) => {
      select.onchange = async () => {
        try {
          await api("POST", "/api/admin", { c: "staff", action: "setRole", email: select.dataset.email, role: select.value });
        } catch (err) {
          alert(err.message);
        }
        window.renderStaff();
      };
    });
  };

  function bindAccountForms() {
    const invite = document.querySelector("#inviteStaffForm");
    if (invite) {
      invite.addEventListener("submit", async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const email = document.querySelector("#inviteEmail").value.trim().toLowerCase();
        const r = document.querySelector("#inviteRole").value;
        try {
          const result = await api("POST", "/api/admin", { c: "staff", action: "invite", email, role: r });
          invite.reset();
          window.renderStaff();
          alert(result.emailed
            ? `Invitation emailed to ${email}. They open the link, choose "Set up your account" and pick a password.`
            : `${email} was added, but the invitation email could not be sent. Use Resend on their row, or tell them to open obanwears.com/admin and choose "Set up your account".`);
        } catch (err) {
          alert(err.message);
        }
      }, true);
    }

    const change = document.querySelector("#changePasswordForm");
    if (change) {
      change.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msg = document.querySelector("#changePasswordMessage");
        try {
          await authPost({ action: "changePassword", current: document.querySelector("#currentPasswordInput").value, password: document.querySelector("#newPasswordInput").value });
          change.reset();
          msg.style.color = "#5a6048";
          msg.textContent = "Password updated.";
        } catch (err) {
          msg.style.color = "#4a3324";
          msg.textContent = err.message;
        }
      });
    }

    const reload = document.querySelector("#btnSyncLocalToCloud");
    if (reload) {
      reload.addEventListener("click", async () => {
        if (dirtyKeys.size) await flushChanges();
        syncCursor = null;
        syncReady = false;
        await pullFromServer(true);
      });
    }

    const logout = document.querySelector("#logoutBtn");
    if (logout) logout.onclick = (e) => { e.preventDefault(); signOut(""); };
  }

  function init() {
    LEGACY_KEYS.forEach(removeRaw);
    try { sessionStorage.removeItem("oban-admin-password"); } catch (e) {}
    bindSignIn();
    bindAccountForms();
    checkIdle();
    checkSession();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
