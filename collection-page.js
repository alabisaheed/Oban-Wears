const body=document.body,collection=body.dataset.collection,title=body.dataset.title,intro=body.dataset.intro;
document.querySelector("#collectionApp").innerHTML=`
<header class="site-header"><button class="icon-button menu-button" id="menuButton" aria-label="Open menu"><span></span><span></span></button><a class="brand-link header-brand" href="/"><img src="assets/oban-wordmark-gold.png" alt="Oban Wears"></a><nav class="desktop-nav"><a href="index.html">Home</a><a href="about.html">About</a><div class="nav-dropdown"><a class="active-page" href="shop.html">Shop</a><div class="dropdown-menu"><a href="kaftans.html">Kaftans</a><a href="agbada.html">Agbada</a><a href="suits.html">Suits</a><a href="father-son.html">Father &amp; Son</a></div></div><a href="blog.html">Blog</a><a href="contact.html">Contact</a><a href="faq.html">FAQ</a><div class="nav-dropdown"><a href="profile.html">My Profile</a><div class="dropdown-menu"><a href="profile.html">My Profile</a><a href="tracker.html">Track Order</a></div></div></nav><div class="header-actions"><button class="text-button search-toggle" id="searchToggle">Search</button><button class="text-button" id="cartButton" aria-label="Cart"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span class="cart-count" id="cartCount">0</span></button></div></header>
<nav class="mobile-nav" id="mobileNav"><a href="index.html">Home</a><a href="shop.html">Shop all</a><a href="about.html">About</a><a href="blog.html">Blog</a><a href="kaftans.html">Kaftans</a><a href="agbada.html">Agbada</a><a href="suits.html">Suits</a><a href="father-son.html">Father &amp; Son</a><a href="contact.html">Contact</a><a href="faq.html">FAQ</a><a href="tracker.html">Track Order</a><a href="profile.html">My Profile</a></nav>
<div class="search-panel" id="searchPanel"><label for="siteSearch">What are you looking for?</label><div class="search-line"><input id="siteSearch" type="search" placeholder="Search the collection..."><button class="icon-button" id="closeSearch">&times;</button></div></div>
<main><section class="page-hero collection-${collection.toLowerCase().replace(/[^a-z]+/g,"-")}"><p class="eyebrow">Oban collections</p><h1>${title}</h1><p>${intro}</p></section><section class="shop-section collection-shop" id="shop"><div class="catalogue-toolbar"><div class="filters"><a class="filter" href="shop.html">All</a><a class="filter ${collection==="Kaftan"?"active":""}" href="kaftans.html">Kaftans</a><a class="filter ${collection==="Agbada"?"active":""}" href="agbada.html">Agbada</a><a class="filter ${collection==="Suit"?"active":""}" href="suits.html">Suits</a><a class="filter ${collection==="Father & Son"?"active":""}" href="father-son.html">Father &amp; Son</a></div><label class="sort-label">Sort <select id="sortProducts"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="new">Newest</option></select></label></div><div class="product-grid" id="productGrid"></div><p class="empty-state" id="emptyState">No pieces match your search.</p></section></main>
<footer>
  <a class="brand-link footer-brand" href="/"><img src="assets/oban-logo-gold.png" alt="Oban Wears"></a>
  <div>
    <p>Shop</p>
    <a href="kaftans.html">Kaftans</a>
    <a href="agbada.html">Agbada</a>
    <a href="suits.html">Suits</a>
    <a href="father-son.html">Father &amp; Son</a>
  </div>
  <div>
    <p>Help</p>
    <a href="about.html">About us</a>
    <a href="blog.html">Blog</a>
    <a href="faq.html">FAQ</a>
    <a href="contact.html">Contact</a>
    <a href="tracker.html">Track Order</a>
  </div>
  <div>
    <p>Contact</p>
    <span>Opposite Technoil,<br>Olowola Bus Stop, Igando,<br>Lagos State</span>
    <a href="tel:+2348168003732">+234 816 800 3732</a>
    <a href="mailto:obanwears@gmail.com">obanwears@gmail.com</a>
  </div>
  <div>
    <p>Follow</p>
    <a href="https://web.facebook.com/obanwears/" target="_blank" rel="noopener">Facebook</a>
    <a href="https://www.instagram.com/obanwears/" target="_blank" rel="noopener">Instagram</a>
    <a href="https://x.com/ObanWears" target="_blank" rel="noopener">X</a>
  </div>
  <small>&copy; 2026 Oban Wears. Lagos, Nigeria.</small>
</footer>
<div class="overlay" id="overlay"></div><aside class="cart-drawer" id="cartDrawer" aria-hidden="true"><div class="drawer-header"><h2>Your cart</h2><button class="icon-button" id="closeCart">&times;</button></div><div class="cart-items" id="cartItems"></div><div class="cart-empty" id="cartEmpty"><p>Your cart is waiting.</p><a href="shop.html">Explore the collection</a></div><div class="cart-summary" id="cartSummary"><div><span>Subtotal</span><strong id="cartTotal">&#8358;0</strong></div><p>Delivery calculated at checkout.</p><button id="checkoutButton">Proceed to checkout</button></div></aside><dialog class="product-dialog" id="productDialog"><button class="dialog-close icon-button" id="closeDialog">&times;</button><div id="dialogContent"></div></dialog><div class="toast" id="toast"></div>`;
function loadScript(src, callback) {
  const s = document.createElement("script");
  s.src = src;
  s.onload = callback;
  document.body.appendChild(s);
}
loadScript("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js", () => {
  loadScript("https://www.gstatic.com/firebasejs/10.8.0/firebase-database-compat.js", () => {
    loadScript("firebase-config.js", () => {
      loadScript("script.js");
    });
  });
});

