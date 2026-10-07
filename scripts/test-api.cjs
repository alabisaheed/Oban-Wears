// API regression tests. Never touches a real database or sends email.
//
//   node scripts/test-api.cjs              local file storage
//   node scripts/test-api.cjs --postgres   in-memory Postgres (same SQL as production)
//   npm test                               both
const fs = require("fs");
const os = require("os");
const path = require("path");
const http = require("http");

const usePostgres = process.argv.includes("--postgres");
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "oban-test-"));
Object.assign(process.env, {
  DATABASE_URL: "",
  POSTGRES_URL: "",
  VERCEL: "",
  OBAN_TEST_PGLITE: usePostgres ? "1" : "",
  OBAN_DEV_DB_FILE: path.join(tmpDir, "db.json"),
  OBAN_TEST_MAIL: "1",
  SESSION_SECRET: "test-session-secret",
  ADMIN_EMAILS: "owner@oban.test",
  ADMIN_PASSWORD: "owner-test-password",
  ADMIN_NAME: "Test Owner",
  LOGIN_OTP: ""
});

const ROOT = path.join(__dirname, "..");
let failures = 0;
function check(label, condition, detail) {
  if (condition) console.log(`  ok    ${label}`);
  else {
    failures++;
    console.log(`  FAIL  ${label}${detail !== undefined ? ` -> ${JSON.stringify(detail).slice(0, 300)}` : ""}`);
  }
}

// Stand-in for the old Firebase database.
const LEGACY = {
  "oban-products": [
    { code: "OB-KF01", name: "OB-KF01", category: "Kaftans", price: 160000, discount: 0, images: ["assets/a.jpg"] },
    { code: "OB-KF02", name: "OB-KF02", category: "Kaftans", price: 175000, discount: 10, position: 1 },
    { code: "OB-AG01", name: "OB-AG01", category: "Agbada", price: 300000, discount: 0 }
  ],
  "oban-orders": [{ ref: "OB8394M", name: "Samson", email: "sam@example.com", piece: "OB-SP05 (Size M, Quantity 1)", total: 50000, currentStage: 1, date: "September 25 2026" }],
  blog: { a: { id: "art-001", title: "Agbada", content: "..." } }
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const legacy = /^\/legacy\/(.+)\.json$/.exec(url.pathname);
  if (legacy) {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(LEGACY[legacy[1]] ?? null));
  }
  req.query = Object.fromEntries(url.searchParams);
  const name = /^\/api\/([a-z-]+)/.exec(url.pathname)[1];
  require(path.join(ROOT, "api", `${name}.js`))(req, res);
});

server.listen(0, async () => {
  const base = `http://localhost:${server.address().port}`;
  process.env.OBAN_LEGACY_FIREBASE_URL = `${base}/legacy`;
  const mail = require(path.join(ROOT, "api", "_lib", "mail.js"));
  const lastCode = () => /(\d{6})/.exec(mail.outbox[mail.outbox.length - 1].subject)[1];
  const call = async (p, { method = "GET", body, token } = {}) => {
    const res = await fetch(base + p, {
      method,
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body && JSON.stringify(body)
    });
    let json = null;
    try { json = await res.json(); } catch (e) {}
    return { status: res.status, body: json };
  };
  const signIn = async (email, password) => {
    const step1 = await call("/api/auth", { method: "POST", body: { action: "login", email, password } });
    if (!step1.body || !step1.body.challenge) return { step1 };
    const step2 = await call("/api/auth", { method: "POST", body: { action: "verify", challenge: step1.body.challenge, code: lastCode() } });
    return { step1, step2, token: step2.body && step2.body.token };
  };
  console.log(`API tests (${usePostgres ? "Postgres" : "file storage"})`);

  try {
    // ---- Public catalogue: imported from the old database on first use
    const catalog = (await call("/api/products")).body;
    check("catalogue imported from old database", Array.isArray(catalog) && catalog.length === 3, catalog);
    check("catalogue ordered by category then position", catalog.map((p) => p.code).join() === "OB-KF02,OB-KF01,OB-AG01", catalog.map((p) => p.code));

    // ---- Staff sign-in with emailed code
    check("old hardcoded password rejected", (await call("/api/auth", { method: "POST", body: { action: "login", email: "admin@obanwears.com", password: "ObanAdmin2026" } })).status === 401);
    const login = await call("/api/auth", { method: "POST", body: { action: "login", email: "owner@oban.test", password: "owner-test-password" } });
    check("password step asks for a code", login.status === 200 && login.body.otpRequired && !login.body.token, login.body);
    check("code emailed to the staff address", mail.outbox.length === 1 && mail.outbox[0].to === "owner@oban.test" && /^\d{6} is your Oban Wears sign-in code$/.test(mail.outbox[0].subject));
    check("destination is masked", login.body.destination === "ow***@oban.test", login.body.destination);
    const wrong = await call("/api/auth", { method: "POST", body: { action: "verify", challenge: login.body.challenge, code: lastCode() === "000000" ? "111111" : "000000" } });
    check("wrong code rejected with attempts left", wrong.status === 401 && /4 attempts left/.test(wrong.body.error), wrong.body);
    check("resend too soon refused", (await call("/api/auth", { method: "POST", body: { action: "resend", challenge: login.body.challenge } })).status === 429);
    const verified = await call("/api/auth", { method: "POST", body: { action: "verify", challenge: login.body.challenge, code: lastCode() } });
    check("right code signs in", verified.status === 200 && verified.body.user.role === "admin" && verified.body.token, verified.body);
    check("code works only once", (await call("/api/auth", { method: "POST", body: { action: "verify", challenge: login.body.challenge, code: lastCode() } })).status === 410);
    const admin = verified.body.token;
    check("dashboard data needs a token", (await call("/api/admin?c=orders")).status === 401);
    check("a password alone is not a token", (await call("/api/admin?c=orders", { token: login.body.challenge })).status === 401);

    // ---- Full load includes imported orders and products
    const full = await call("/api/admin?c=orders,products,articles", { token: admin });
    check("full load returns imported data", full.status === 200 && full.body.full && full.body.changes.orders.upsert.OB8394M && Object.keys(full.body.changes.products.upsert).length === 3 && full.body.changes.articles.upsert["art-001"], full.body);
    const cursor = full.body.cursor;

    // ---- Website checkout: server prices, never overwrites
    const order1 = await call("/api/orders", { method: "POST", body: {
      customer: { name: "Ada Obi", email: "ada@example.com", whatsapp: "+234 801 234 5678" },
      items: [{ code: "OB-KF02", size: "L", qty: 2, price: 1 }, { code: "NOPE", qty: 1 }],
      total: 5
    } });
    check("checkout creates order with server price", order1.status === 201 && order1.body.total === 2 * 157500 && /^OB\d{4}[A-Z]$/.test(order1.body.ref), order1.body);
    const order2 = await call("/api/orders", { method: "POST", body: { customer: { name: "Bola", email: "bola@example.com", whatsapp: "08012345678" }, items: [{ code: "OB-AG01", qty: 1 }] } });
    check("second checkout succeeds", order2.status === 201, order2.body);
    check("empty cart rejected", (await call("/api/orders", { method: "POST", body: { customer: { name: "X", email: "x@example.com", whatsapp: "08012345678" }, items: [] } })).status === 400);
    check("missing email rejected", (await call("/api/orders", { method: "POST", body: { customer: { name: "X", whatsapp: "08012345678" }, items: [{ code: "OB-AG01" }] } })).status === 400);

    const delta = await call(`/api/admin?c=orders,products&since=${encodeURIComponent(cursor)}`, { token: admin });
    const deltaOrders = Object.keys(delta.body.changes.orders.upsert);
    check("incremental load has both new orders", deltaOrders.includes(order1.body.ref) && deltaOrders.includes(order2.body.ref), deltaOrders);

    // ---- Dashboard edits one order: others untouched
    const stage = await call("/api/admin", { method: "POST", token: admin, body: { c: "orders", upsert: { OB8394M: { ...full.body.changes.orders.upsert.OB8394M, currentStage: 3 } } } });
    check("dashboard saves one order", stage.status === 200 && stage.body.saved.OB8394M.currentStage === 3, stage.body);
    const afterEdit = await call("/api/admin?c=orders", { token: admin });
    check("other orders survive the save", Object.keys(afterEdit.body.changes.orders.upsert).length === 3, Object.keys(afterEdit.body.changes.orders.upsert));

    // ---- Garment arrangement is saved per product and read back in order
    await call("/api/admin", { method: "POST", token: admin, body: { c: "products", upsert: {
      "OB-KF01": { ...full.body.changes.products.upsert["OB-KF01"], position: 1 },
      "OB-KF02": { ...full.body.changes.products.upsert["OB-KF02"], position: 2 }
    } } });
    check("new arrangement shows on the website", (await call("/api/products")).body.map((p) => p.code).join() === "OB-KF01,OB-KF02,OB-AG01");

    // ---- New product with an uploaded image; delete leaves a tombstone
    const img = "data:image/png;base64," + fs.readFileSync(path.join(ROOT, "assets", "oban-favicon.png")).toString("base64");
    const add = await call("/api/admin", { method: "POST", token: admin, body: { c: "products", upsert: { "OB-SP01": { code: "OB-SP01", name: "Suit 1", category: "Suits & Pants", price: 90000, images: [img] } } } });
    check("new product saved", add.status === 200, add.body);
    const withNew = (await call("/api/products")).body;
    const sp = withNew.find((p) => p.code === "OB-SP01");
    check("embedded image moved to /api/image", sp && /^\/api\/image\?id=[a-f0-9]{32}$/.test(sp.images[0]), sp);
    const served = await fetch(base + sp.images[0]);
    check("image is served", served.status === 200 && served.headers.get("content-type") === "image/png");
    const upload = await call("/api/admin", { method: "POST", token: admin, body: { c: "image", data: img } });
    check("direct image upload returns a URL", upload.status === 200 && upload.body.url === sp.images[0], upload.body);

    const c2 = (await call("/api/admin?c=products", { token: admin })).body.cursor;
    await call("/api/admin", { method: "POST", token: admin, body: { c: "products", remove: ["OB-SP01"] } });
    const removed = await call(`/api/admin?c=products&since=${encodeURIComponent(c2)}`, { token: admin });
    check("deletion reaches other dashboards", removed.body.changes.products.removed.includes("OB-SP01"), removed.body.changes.products);
    check("deleted product stays off the website", !(await call("/api/products")).body.some((p) => p.code === "OB-SP01"));

    // ---- Recovery of orders held only in a dashboard browser
    await call("/api/admin", { method: "POST", token: admin, body: { c: "orders", remove: [order2.body.ref] } });
    const rec = await call("/api/admin", { method: "POST", token: admin, body: { c: "recover", records: {
      orders: {
        OB1111A: { ref: "OB1111A", name: "Lost order", total: 1000, currentStage: 2, date: "August 1 2026" },
        OB8394M: { ref: "OB8394M", name: "Stale copy", currentStage: 1 },
        [order2.body.ref]: { ref: order2.body.ref, name: "Deleted on purpose" }
      },
      products: { "OB-OLD": { code: "OB-OLD" } }
    } } });
    check("recover adds only the lost order", rec.status === 200 && rec.body.recovered.orders === 1 && rec.body.recovered.products === undefined, rec.body);
    const afterRec = (await call("/api/admin?c=orders", { token: admin })).body.changes.orders.upsert;
    check("recover never overwrites", afterRec.OB8394M.currentStage === 3 && afterRec.OB8394M.name === "Samson");
    check("recover never revives deletions", !afterRec[order2.body.ref]);

    // ---- Staff: invite, register (with code), roles
    check("invite needs admin token", (await call("/api/admin", { method: "POST", body: { c: "staff", action: "invite", email: "tailor@oban.test", role: "editor" } })).status === 401);
    const invite = await call("/api/admin", { method: "POST", token: admin, body: { c: "staff", action: "invite", email: "tailor@oban.test", role: "editor" } });
    check("admin invites staff", invite.status === 200 && invite.body.staff["tailor@oban.test"].status === "invited", invite.body);
    check("uninvited email cannot register", (await call("/api/auth", { method: "POST", body: { action: "register", name: "X", email: "x@oban.test", password: "longpassword" } })).status === 403);
    const reg = await call("/api/auth", { method: "POST", body: { action: "register", name: "Tailor", email: "tailor@oban.test", password: "tailor-password" } });
    check("invited staff registers and gets a code", reg.status === 200 && reg.body.otpRequired, reg.body);
    const tailor = (await call("/api/auth", { method: "POST", body: { action: "verify", challenge: reg.body.challenge, code: lastCode() } })).body.token;
    check("staff signs in after the code", Boolean(tailor));
    check("editor reads orders", (await call("/api/admin?c=orders", { token: tailor })).status === 200);
    check("editor cannot delete orders", (await call("/api/admin", { method: "POST", token: tailor, body: { c: "orders", remove: ["OB1111A"] } })).status === 403);
    check("editor cannot list staff", (await call("/api/admin?c=staff", { token: tailor })).status === 403);
    check("editor cannot see purchases", !("vendors" in (await call("/api/admin?c=vendors", { token: tailor })).body.changes));
    const second = await signIn("tailor@oban.test", "tailor-password");
    check("staff signs in again with password and code", second.token && second.step2.body.user.role === "editor", second.step2 && second.step2.body);
    const changed = await call("/api/auth", { method: "POST", token: tailor, body: { action: "changePassword", current: "tailor-password", password: "new-tailor-password" } });
    check("staff changes password", changed.status === 200, changed.body);
    check("old password stops working", (await call("/api/auth", { method: "POST", body: { action: "login", email: "tailor@oban.test", password: "tailor-password" } })).status === 401);

    // ---- Lockout after repeated wrong passwords
    for (let i = 0; i < 5; i++) await call("/api/auth", { method: "POST", body: { action: "login", email: "owner@oban.test", password: "nope" } });
    check("lockout after 5 failures", (await call("/api/auth", { method: "POST", body: { action: "login", email: "owner@oban.test", password: "nope" } })).status === 429);

    // ---- Tracker, newsletter, profile
    const track = await call(`/api/track?ref=${order1.body.ref.toLowerCase()}`);
    check("tracker finds order by reference", track.body.found && track.body.firstName === "Ada" && track.body.currentStage === 1, track.body);
    check("tracker hides contact details", !JSON.stringify(track.body).includes("ada@example.com") && !JSON.stringify(track.body).includes("5678"));
    check("tracker unknown reference", (await call("/api/track?ref=OB0000Z")).body.found === false);
    check("newsletter sign-up", (await call("/api/subscribers", { method: "POST", body: { email: "Fan@Example.com" } })).status === 201);
    check("newsletter rejects bad email", (await call("/api/subscribers", { method: "POST", body: { email: "nope" } })).status === 400);
    const subs = (await call("/api/admin?c=subscribers", { token: admin })).body.changes.subscribers.upsert;
    check("subscriber visible in dashboard", Boolean(subs["fan@example.com"]), subs);

    const prof = await call("/api/profile", { method: "POST", body: { action: "login", email: "ada@example.com", pin: "4321" } });
    check("customer profile sign-in", prof.status === 200 && prof.body.token, prof.body);
    const history = await call("/api/profile", { token: prof.body.token });
    check("profile shows own orders only", history.body.orders.length === 1 && history.body.orders[0].ref === order1.body.ref, history.body);
    check("wrong PIN rejected", (await call("/api/profile", { method: "POST", body: { action: "login", email: "ada@example.com", pin: "1111" } })).status === 401);
    const profiles = (await call("/api/admin?c=profiles", { token: admin })).body.changes.profiles.upsert;
    check("PIN hash never reaches the dashboard", profiles["ada@example.com"] && !profiles["ada@example.com"].pinHash);

    // ---- Blog articles written in the dashboard are public
    await call("/api/admin", { method: "POST", token: admin, body: { c: "articles", upsert: { "art-9": { id: "art-9", title: "Care guide", content: "Line one", excerpt: "Short", sortIndex: 0 } } } });
    const articles = (await call("/api/articles")).body;
    check("articles listed without full text", Array.isArray(articles) && articles.some((x) => x.id === "art-9" && x.content === undefined), articles);
    const one = await call("/api/articles?id=art-9");
    check("single article has its text", one.status === 200 && one.body.content === "Line one", one.body);
    check("unknown article is 404", (await call("/api/articles?id=nope")).status === 404);

    // ---- Codes can be switched off in an emergency
    process.env.LOGIN_OTP = "off";
    const direct = await call("/api/auth", { method: "POST", body: { action: "login", email: "tailor@oban.test", password: "new-tailor-password" } });
    check("LOGIN_OTP=off signs in without a code", direct.status === 200 && direct.body.token && !direct.body.otpRequired, direct.body);
    process.env.LOGIN_OTP = "";
  } catch (err) {
    failures++;
    console.error(err);
  }

  server.close();
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
  process.exit(failures ? 1 : 0);
});
