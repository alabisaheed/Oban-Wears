const menuButton = document.querySelector("#menuButton");
const mobileNav = document.querySelector("#mobileNav");
if (menuButton && mobileNav) {
  menuButton.onclick = () => mobileNav.classList.toggle("open");
}

const stageLabels = {
  1: "Waiting for Payment",
  2: "Payment Acknowledged",
  3: "Fabric Sourced",
  4: "Cutting",
  5: "Stitching",
  6: "Embroidery",
  7: "Quality Check",
  8: "Dispatched"
};

const formatNaira = (n) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(n);
};

const profileAuth = document.querySelector("#profileAuth");
const profileDashboard = document.querySelector("#profileDashboard");
const profileLoginForm = document.querySelector("#profileLoginForm");
const loginEmail = document.querySelector("#loginEmail");

const checkSession = () => {
  const email = localStorage.getItem("oban-client-logged-in-email");
  if (email) {
    if (profileAuth) profileAuth.style.display = "none";
    if (profileDashboard) profileDashboard.style.display = "block";
    loadProfile(email);
  } else {
    if (profileAuth) profileAuth.style.display = "block";
    if (profileDashboard) profileDashboard.style.display = "none";
  }
};

if (profileLoginForm) {
  profileLoginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = loginEmail.value.trim().toLowerCase();
    const pinInput = document.querySelector("#loginPin");
    const pin = pinInput ? pinInput.value.trim() : "";
    
    if (!email || !pin) return;
    if (pin.length !== 4 || isNaN(pin)) {
      alert("PIN must be a 4-digit number.");
      return;
    }
    
    const submitLogin = () => {
      const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
      let p = profiles[email];
      
      if (p) {
        if (p.pin && p.pin !== pin) {
          alert("Incorrect Access PIN. Please check your credentials and try again.");
          return;
        }
        if (!p.pin) {
          p.pin = pin;
          profiles[email] = p;
          localStorage.setItem("oban-client-profiles", JSON.stringify(profiles));
        }
      } else {
        p = {
          email: email,
          pin: pin,
          name: "",
          whatsapp: ""
        };
        profiles[email] = p;
        localStorage.setItem("oban-client-profiles", JSON.stringify(profiles));
      }
      
      localStorage.setItem("oban-client-logged-in-email", email);
      checkSession();
    };
    
    submitLogin();
  };
}

const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("oban-client-logged-in-email");
    window.location.reload();
  };
}

const tabAccount = document.querySelector("#tabAccount");
const tabOrders = document.querySelector("#tabOrders");

document.querySelectorAll(".profile-tab").forEach((tabBtn) => {
  tabBtn.onclick = () => {
    document.querySelectorAll(".profile-tab").forEach(b => b.classList.remove("active"));
    tabBtn.classList.add("active");
    
    const targetTab = tabBtn.dataset.tab;
    if (tabAccount) tabAccount.style.display = targetTab === "account" ? "block" : "none";
    if (tabOrders) tabOrders.style.display = targetTab === "orders" ? "block" : "none";
  };
});

function loadProfile(email) {
  const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
  let p = profiles[email];
  
  if (!p) {
    p = {
      email: email,
      name: "",
      whatsapp: ""
    };
    profiles[email] = p;
    localStorage.setItem("oban-client-profiles", JSON.stringify(profiles));
  }
  
  document.querySelector("#profileEmailDisplay").value = p.email;
  document.querySelector("#profileName").value = p.name || "";
  document.querySelector("#profileWhatsApp").value = p.whatsapp || "";
  
  renderPurchaseHistory(email);
}

const accountForm = document.querySelector("#accountForm");
if (accountForm) {
  accountForm.onsubmit = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("oban-client-logged-in-email");
    const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
    const p = profiles[email];
    if (p) {
      p.name = document.querySelector("#profileName").value.trim();
      p.whatsapp = document.querySelector("#profileWhatsApp").value.trim();
      profiles[email] = p;
      localStorage.setItem("oban-client-profiles", JSON.stringify(profiles));
      alert("Profile updated successfully");
    }
  };
}

function renderPurchaseHistory(email) {
  const purchaseHistoryBody = document.querySelector("#purchaseHistoryBody");
  if (!purchaseHistoryBody) return;
  
  const allOrders = JSON.parse(localStorage.getItem("oban-orders")) || [];
  const clientOrders = allOrders.filter(o => o.email && o.email.trim().toLowerCase() === email);
  
  if (!clientOrders.length) {
    purchaseHistoryBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;padding:24px;color:#8c867c;">No orders found</td>
      </tr>
    `;
    return;
  }
  
  purchaseHistoryBody.innerHTML = clientOrders.map((o) => {
    const statusText = stageLabels[o.currentStage] || "Unknown";
    const isUnpaid = o.currentStage === 1;
    const pct = typeof o.paymentPercentage === "number" ? o.paymentPercentage : 100;
    const paymentLabel = pct < 100 ? `<div style="font-size:11px;color:#d35400;font-weight:bold;margin-top:2px;">Installment (${pct}%)</div>` : `<div style="font-size:11px;color:#27ae60;font-weight:bold;margin-top:2px;">Full Payment</div>`;
    
    const fabricBadge = o.fabricSource === "client" ? ` <span style="font-size:9px;background:#b03a2e;color:white;padding:2px 4px;border-radius:2px;font-weight:bold;margin-left:6px;display:inline-block;vertical-align:middle;text-transform:uppercase;">Client Fabric</span>` : "";
    
    return `
      <tr style="border-bottom:1px solid var(--line);">
        <td style="padding:16px;"><strong>${o.ref}</strong></td>
        <td style="padding:16px;">${o.piece}${fabricBadge}</td>
        <td style="padding:16px;">${o.date}</td>
        <td style="padding:16px;"><strong>${formatNaira(o.total)}</strong></td>
        <td style="padding:16px;">
          <div>${statusText}</div>
          ${paymentLabel}
        </td>
        <td style="padding:16px;">
          <div style="display:flex;gap:6px;">
            <button class="print-invoice-btn" data-ref="${o.ref}" style="background:transparent;border:1px solid var(--line);color:var(--text);padding:6px 10px;font-size:10px;font-weight:bold;cursor:pointer;border-radius:2px;font-family:'Manrope';text-transform:uppercase;">Invoice</button>
            <button class="print-receipt-btn" data-ref="${o.ref}" ${isUnpaid ? 'disabled title="Receipt available after payment is confirmed" style="background:transparent;border:1px solid var(--line);color:var(--muted);padding:6px 10px;font-size:10px;font-weight:bold;cursor:not-allowed;border-radius:2px;font-family:\'Manrope\';text-transform:uppercase;opacity:0.5;"' : 'style="background:transparent;border:1px solid var(--line);color:var(--text);padding:6px 10px;font-size:10px;font-weight:bold;cursor:pointer;border-radius:2px;font-family:\'Manrope\';text-transform:uppercase;"'}>Receipt</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
  
  // Bind print invoice button events
  purchaseHistoryBody.querySelectorAll(".print-invoice-btn").forEach((btn) => {
    btn.onclick = () => {
      const ref = btn.dataset.ref;
      const order = allOrders.find(x => x.ref === ref);
      if (order && window.generateDocumentPrint) {
        window.generateDocumentPrint(order, "invoice");
      }
    };
  });

  // Bind print receipt button events
  purchaseHistoryBody.querySelectorAll(".print-receipt-btn").forEach((btn) => {
    btn.onclick = () => {
      const ref = btn.dataset.ref;
      const order = allOrders.find(x => x.ref === ref);
      if (order && window.generateDocumentPrint) {
        window.generateDocumentPrint(order, "receipt");
      }
    };
  });
}

checkSession();

// Mobile menu collapsible sub-menus
(function() {
  function initCollapsibleMobileNav() {
    const mobileNav = document.querySelector("#mobileNav");
    if (!mobileNav) return;

    const normalizePath = (path) => path.replace(/\.html$/, "").replace(/^\//, "").split("/").pop() || "index";
    const currentClean = normalizePath(window.location.pathname);

    const menuData = [
      { type: "link", label: "Home", href: "/" },
      { type: "link", label: "About", href: "about" },
      {
        type: "submenu",
        label: "Shop",
        items: [
          { label: "Shop All", href: "shop" },
          { label: "Kaftans", href: "kaftans" },
          { label: "Agbada", href: "agbada" },
          { label: "Suits", href: "suits" },
          { label: "Father & Son", href: "father-son" }
        ]
      },
      { type: "link", label: "Blog", href: "blog" },
      { type: "link", label: "Contact", href: "contact" },
      { type: "link", label: "FAQ", href: "faq" },
      {
        type: "submenu",
        label: "My Profile",
        items: [
          { label: "My Profile", href: "profile" },
          { label: "Track Order", href: "tracker" }
        ]
      }
    ];

    let html = "";
    menuData.forEach((item, index) => {
      if (item.type === "link") {
        const isActive = normalizePath(item.href) === currentClean ? 'class="active-page"' : '';
        html += `<a href="${item.href}" ${isActive}>${item.label}</a>`;
      } else if (item.type === "submenu") {
        const hasActiveChild = item.items.some(child => normalizePath(child.href) === currentClean);
        const activeClass = hasActiveChild ? "active-page" : "";
        
        let submenuHtml = "";
        item.items.forEach(child => {
          const isChildActive = normalizePath(child.href) === currentClean ? 'class="active-page"' : '';
          submenuHtml += `<a href="${child.href}" ${isChildActive} style="padding-left: 20px; font-size: 11px; opacity: 0.85; display: block; margin: 5px 0;">${child.label}</a>`;
        });

        html += `
          <div class="mobile-nav-group" style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
            <button class="mobile-nav-trigger ${activeClass}" data-group-index="${index}" style="background: transparent; border: none; text-align: left; padding: 0; font-size: 12px; font-weight: 500; cursor: pointer; color: inherit; display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <span>${item.label}</span>
              <span class="trigger-icon" style="transition: transform 0.25s; font-size: 12px; font-weight: bold; margin-left: 5px;">${hasActiveChild ? "-" : "+"}</span>
            </button>
            <div class="mobile-nav-submenu" style="display: ${hasActiveChild ? "flex" : "none"}; flex-direction: column; gap: 8px; margin-top: 5px; border-left: 1px solid var(--line); padding-left: 10px; width: 100%;">
              ${submenuHtml}
            </div>
          </div>
        `;
      }
    });

    mobileNav.innerHTML = html;

    // Bind triggers
    mobileNav.querySelectorAll(".mobile-nav-trigger").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const group = btn.closest(".mobile-nav-group");
        const submenu = group.querySelector(".mobile-nav-submenu");
        const icon = btn.querySelector(".trigger-icon");
        const isVisible = submenu.style.display === "flex";
        
        submenu.style.display = isVisible ? "none" : "flex";
        icon.textContent = isVisible ? "+" : "-";
      };
    });

    // Close menu on sub-link click
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        const menuButton = document.querySelector("#menuButton");
        mobileNav.classList.remove("open");
        if (menuButton) menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCollapsibleMobileNav);
  } else {
    initCollapsibleMobileNav();
  }
})();
