const menuButton = document.querySelector("#menuButton");
const mobileNav = document.querySelector("#mobileNav");
if (menuButton && mobileNav) {
  menuButton.onclick = () => mobileNav.classList.toggle("open");
}

// Simulated Order Database
const orderDatabase = {
  "OB9021A": {
    ref: "OB9021A",
    name: "Adeleke",
    piece: "Oban Kaftan 01",
    total: "\u20A6230,000",
    currentStage: 5, // Stitching
    date: "June 18 2026"
  },
  "OB4180B": {
    ref: "OB4180B",
    name: "Babatunde",
    piece: "Oban Agbada 07",
    total: "\u20A6270,000",
    currentStage: 7, // Quality Check
    date: "June 15 2026"
  },
  "OB7734C": {
    ref: "OB7734C",
    name: "Chidi",
    piece: "Oban Suit 03",
    total: "\u20A6430,000",
    currentStage: 8, // Dispatched
    date: "June 10 2026"
  },
  "OB1056P": {
    ref: "OB1056P",
    name: "Emeka",
    piece: "Oban Kaftan 04",
    total: "\u20A6195,000",
    currentStage: 1, // Waiting for Payment
    date: "June 20 2026"
  }
};

const trackerForm = document.querySelector("#trackerForm");
const orderInput = document.querySelector("#orderInput");
const trackerResults = document.querySelector("#trackerResults");

const detailsRef = document.querySelector("#detailsRef");
const detailsName = document.querySelector("#detailsName");
const detailsPiece = document.querySelector("#detailsPiece");
const detailsTotal = document.querySelector("#detailsTotal");
const resultSubtitle = document.querySelector("#resultSubtitle");

function performTrack(code) {
  if (!code) return;
  const cleanCode = code.trim().toUpperCase();
  
  // Try reading from local database first
  const localDb = JSON.parse(localStorage.getItem("oban-orders")) || [];
  let order = localDb.find(x => x.ref.toUpperCase() === cleanCode);
  
  // Fall back to static mock database
  if (!order) {
    order = orderDatabase[cleanCode];
  }
  
  if (!trackerResults) return;
  
  // Show results section
  trackerResults.style.display = "block";
  // Force reflow
  trackerResults.offsetHeight;
  trackerResults.classList.add("show");
  
  const detailsBox = document.querySelector(".tracker-details");
  const timelineBox = document.querySelector("#trackerTimeline");
  
  if (order) {
    // Format price if it is a numeric value
    let formattedTotal = order.total;
    if (typeof order.total === "number") {
      formattedTotal = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
      }).format(order.total);
    }
    
    // Fill in order details
    resultSubtitle.textContent = `Order active | Placed on ${order.date}`;
    detailsRef.textContent = order.ref;
    detailsName.textContent = order.name;
    const fabricBadge = order.fabricSource === "client" ? ` <span style="font-size:9px;background:#b03a2e;color:white;padding:2px 4px;border-radius:2px;font-weight:bold;margin-left:6px;display:inline-block;vertical-align:middle;text-transform:uppercase;">Client's Fabric</span>` : "";
    detailsPiece.innerHTML = `${order.piece}${fabricBadge}`;
    detailsTotal.innerHTML = `<strong>${formattedTotal}</strong>`;
    
    // Show sections if hidden
    if (detailsBox) detailsBox.style.display = "block";
    if (timelineBox) timelineBox.style.display = "block";
    
    // Update timeline stages
    for (let i = 1; i <= 8; i++) {
      const stageEl = document.querySelector(`#stage${i}`);
      if (!stageEl) continue;
      
      stageEl.classList.remove("completed", "active");
      
      if (i < order.currentStage) {
        stageEl.classList.add("completed");
      } else if (i === order.currentStage) {
        if (order.currentStage === 8) {
          // If stage 8 is reached, it is completed and dispatched
          stageEl.classList.add("completed");
        } else {
          stageEl.classList.add("active");
        }
      }
    }
  } else {
    // Show error state
    resultSubtitle.textContent = "Reference code not found";
    if (detailsBox) detailsBox.style.display = "none";
    if (timelineBox) timelineBox.style.display = "none";
  }
}

if (trackerForm && orderInput) {
  trackerForm.onsubmit = (e) => {
    e.preventDefault();
    performTrack(orderInput.value);
  };
}

// Bind demo code click buttons
document.querySelectorAll(".demo-code-btn").forEach((btn) => {
  btn.onclick = () => {
    if (orderInput) {
      orderInput.value = btn.textContent;
      performTrack(btn.textContent);
    }
  };
});

// Promotional Popup
function initPromoPopup() {
  const popup = document.createElement("div");
  popup.className = "promopopup";
  popup.innerHTML = `
    <button class="promoclose" aria-label="Close promotion">&times;</button>
    <h3>Welcome to Oban Wears!</h3>
    <div class="promooffer">Get 10% off your first order</div>
    <p>Elevate your style with timeless craftsmanship. Whether it is the commanding silhouette of a grand Agbada or the sharp, modern lines of a tailored Kaftan, our pieces are designed to make you the best dressed man in any room.</p>
  `;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 1000);

  const closeBtn = popup.querySelector(".promoclose");
  const closePopup = () => {
    popup.classList.remove("show");
    window.removeEventListener("scroll", handleScroll);
  };
  
  closeBtn.onclick = closePopup;

  let initialScrollY = window.scrollY;
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - initialScrollY) > 80) {
      closePopup();
    }
  };

  setTimeout(() => {
    window.addEventListener("scroll", handleScroll);
  }, 1000);
}

// Floating Navigation (Scroll up/down)
function initScrollNav() {
  const btn = document.createElement("button");
  btn.className = "scrollnav";
  btn.setAttribute("aria-label", "Scroll page");
  btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`;
  document.body.appendChild(btn);

  const updateArrow = () => {
    const halfHeight = document.documentElement.scrollHeight / 2;
    if (window.scrollY > halfHeight) {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7-7"/></svg>`;
      btn.dataset.dir = "up";
    } else {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`;
      btn.dataset.dir = "down";
    }
  };

  btn.onclick = () => {
    if (btn.dataset.dir === "up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  window.addEventListener("scroll", updateArrow);
  updateArrow();
}

// Floating WhatsApp Icon
function initWhatsAppFloat() {
  const link = document.createElement("a");
  link.className = "whatsappfloat";
  link.href = "https://wa.me/2348168003732";
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", "Chat on WhatsApp");
  link.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.768 2.589-5.768 5.77 0 1.214.374 2.348 1.02 3.285l-.665 2.434 2.493-.654c.895.549 1.947.871 3.07.871 3.184 0 5.767-2.589 5.767-5.77 0-3.182-2.583-5.77-5.767-5.77zm3.39 8.161c-.144.405-.838.752-1.155.77-.318.016-.607-.074-1.862-.593-1.603-.665-2.616-2.302-2.695-2.408-.078-.106-.63-.84-.63-1.602 0-.762.399-1.135.543-1.285.145-.15.318-.188.423-.188.106 0 .213.003.304.007.096.004.225-.036.353.272.13.315.446 1.085.485 1.163.039.078.065.17.013.275-.052.106-.078.17-.156.26-.077.09-.16.2-.232.278-.078.09-.16.188-.069.344.09.156.402.666.862 1.077.593.53 1.093.693 1.249.77.156.078.247.065.339-.039.09-.104.399-.465.505-.623.106-.159.213-.133.359-.078.146.055.926.437 1.085.516.159.079.266.118.305.185.039.066.039.385-.105.79zM12 0C5.373 0 0 5.373 0 12c0 2.103.543 4.137 1.572 5.93L0 24l6.29-1.65A11.916 11.916 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.922 0-3.8-.507-5.44-1.46l-.39-.23-3.71.97.99-3.62-.25-.4A9.923 9.923 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>`;
  document.body.appendChild(link);
}

// Automatically scrolling Ticker Announcement Bar
function initAnnouncementBar() {
  try {
    const bar = document.querySelector(".announcement");
    if (!bar) return;

    const announcements = [
      "Complimentary delivery in Nigeria on orders over \u20A6300,000",
      "Get 10% off your first order | Welcome to Oban Wears",
      "Exquisite craftsmanship tailored for the modern gentleman",
      "Global shipping available on all premium collections"
    ];

    let index = 0;
    bar.style.overflow = "hidden";
    bar.style.position = "relative";

    const slide = document.createElement("div");
    slide.textContent = announcements[0];
    slide.style.width = "100%";
    slide.style.height = "100%";
    slide.style.display = "grid";
    slide.style.placeItems = "center";
    slide.style.whiteSpace = "nowrap";
    slide.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    slide.style.transform = "translateX(0)";
    slide.style.opacity = "1";

    bar.innerHTML = "";
    bar.appendChild(slide);

    setInterval(() => {
      const nextIndex = (index + 1) % announcements.length;
      
      // 1. Slide out current
      if (index % 2 === 0) {
        // Even index exits to the right (evades to right)
        slide.style.transform = "translateX(100%)";
      } else {
        // Odd index exits to the left (ended to left)
        slide.style.transform = "translateX(-100%)";
      }
      slide.style.opacity = "0";

      setTimeout(() => {
        // 2. Prepare next slide position before showing
        if (nextIndex % 2 === 0) {
          // Next is even: enters from the left
          slide.style.transform = "translateX(-100%)";
        } else {
          // Next is odd: enters from the right
          slide.style.transform = "translateX(100%)";
        }
        slide.textContent = announcements[nextIndex];
        
        // Force a reflow
        slide.offsetWidth;

        // 3. Slide in to center
        slide.style.transform = "translateX(0)";
        slide.style.opacity = "1";
        
        index = nextIndex;
      }, 500);

    }, 4000);

  } catch (error) {
    console.log("Announcement bar initialization failed:", error);
  }
}

function initGlobals() {
  initAnnouncementBar();
  initScrollNav();
  initWhatsAppFloat();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobals);
} else {
  initGlobals();
}

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
