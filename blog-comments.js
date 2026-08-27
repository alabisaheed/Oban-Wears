/**
 * Oban Wears - Premium Blog Comments & Excerpt Sidebar System
 * Fully Responsive, Client-Side Persistence, Honey-pot / Captcha Bot Security, and Author/Admin Replies
 */

(function() {
  // Inject Styles
  const style = document.createElement("style");
  style.textContent = `
    /* Dynamic Article Layout Grid */
    .article-layout-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 60px;
      max-width: 1100px;
      margin: 60px auto;
      padding: 0 24px;
    }
    @media (max-width: 900px) {
      .article-layout-grid {
        grid-template-columns: 1fr;
        gap: 50px;
      }
    }

    /* Sidebar Styles */
    .article-sidebar {
      border-left: 1px solid rgba(21, 21, 18, 0.15);
      padding-left: 30px;
      height: fit-content;
      position: sticky;
      top: 110px;
    }
    @media (max-width: 900px) {
      .article-sidebar {
        border-left: none;
        border-top: 1px solid rgba(21, 21, 18, 0.15);
        padding-left: 0;
        padding-top: 40px;
        position: static;
      }
    }
    .article-sidebar h3 {
      font-family: "Manrope", sans-serif;
      font-size: 16px;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 24px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink);
    }
    .sidebar-post-card {
      display: flex;
      gap: 16px;
      margin-bottom: 28px;
      text-decoration: none;
      color: inherit;
    }
    .sidebar-post-card:hover h4 {
      color: var(--gold);
    }
    .sidebar-post-thumb {
      width: 76px;
      height: 76px;
      border-radius: 2px;
      overflow: hidden;
      flex-shrink: 0;
      background: var(--cream);
    }
    .sidebar-post-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s var(--ease);
    }
    .sidebar-post-card:hover .sidebar-post-thumb img {
      transform: scale(1.05);
    }
    .sidebar-post-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .sidebar-post-info span {
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #8c867c;
      margin-bottom: 6px;
    }
    .sidebar-post-info h4 {
      font-family: "Manrope", sans-serif;
      font-size: 13px;
      font-weight: 500;
      line-height: 1.45;
      margin: 0 0 4px;
      transition: color 0.3s;
    }
    .sidebar-post-info p {
      font-size: 11px;
      color: #736e66;
      margin: 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Comments Section Styles */
    .comments-container {
      margin-top: 60px;
      border-top: 1px solid rgba(21, 21, 18, 0.15);
      padding-top: 48px;
    }
    .comments-container h3 {
      font-family: "Manrope", sans-serif;
      font-size: 20px;
      font-weight: 500;
      margin-top: 0;
      margin-bottom: 30px;
      letter-spacing: -0.01em;
    }
    .comment-list {
      display: flex;
      flex-direction: column;
      gap: 28px;
      margin-bottom: 48px;
    }
    .comment-card {
      background: rgba(244, 240, 232, 0.4);
      border: 1px solid rgba(21, 21, 18, 0.12);
      border-radius: 2px;
      padding: 24px;
      position: relative;
    }
    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 12px;
    }
    .comment-author {
      font-weight: 600;
      color: var(--ink);
    }
    .comment-date {
      color: #8c867c;
      font-size: 11px;
    }
    .comment-body {
      font-size: 14px;
      line-height: 1.65;
      color: #4d4841;
      margin: 0 0 16px;
    }
    .comment-actions {
      display: flex;
      gap: 16px;
    }
    .comment-reply-btn {
      background: transparent;
      border: none;
      color: var(--gold);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: color 0.25s;
    }
    .comment-reply-btn:hover {
      color: var(--ink);
      text-decoration: underline;
    }

    /* Admin Reply Badge & Card */
    .admin-reply-card {
      margin-top: 20px;
      padding-left: 20px;
      border-left: 2px solid var(--gold);
    }
    .admin-badge {
      background: var(--gold);
      color: var(--ink);
      font-size: 8px;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 2px;
      text-transform: uppercase;
      margin-left: 8px;
      letter-spacing: 0.08em;
      display: inline-block;
      vertical-align: middle;
    }

    /* Comment Form Styles */
    .comment-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px 24px;
      background: rgba(244, 240, 232, 0.2);
      border: 1px solid rgba(21, 21, 18, 0.08);
      padding: 28px;
      border-radius: 2px;
    }
    .comment-form .full-width {
      grid-column: 1 / -1;
    }
    .comment-form label {
      display: block;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--ink);
    }
    .comment-form input, .comment-form textarea {
      width: 100%;
      border: 0;
      border-bottom: 1px solid rgba(21, 21, 18, 0.18);
      background: transparent;
      padding: 10px 0;
      outline: 0;
      font-family: inherit;
      font-size: 13px;
      color: var(--ink);
    }
    .comment-form input:focus, .comment-form textarea:focus {
      border-bottom-color: var(--gold);
    }
    .comment-form textarea {
      resize: vertical;
      height: 80px;
    }
    
    /* Anti-Spam Security CSS */
    .honeypot-field {
      position: absolute !important;
      left: -9999px !important;
      top: -9999px !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .captcha-row {
      display: flex;
      align-items: center;
      gap: 15px;
      grid-column: 1 / -1;
    }
    .captcha-question {
      font-size: 13px;
      font-weight: 600;
      background: rgba(211, 171, 105, 0.15);
      padding: 8px 14px;
      border-radius: 2px;
      color: var(--ink);
      border: 1px solid rgba(211, 171, 105, 0.25);
    }
    .captcha-input {
      width: 90px !important;
      text-align: center;
    }
    .comment-submit-btn {
      background: var(--ink);
      color: var(--paper);
      border: none;
      padding: 14px 28px;
      font-family: "Manrope", sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      width: fit-content;
      transition: all 0.3s;
      border-radius: 2px;
    }
    .comment-submit-btn:hover {
      background: var(--gold);
      color: var(--ink);
    }
  `;
  document.head.appendChild(style);

  // Article database for dynamic sidebar list
  const allArticles = [
    {
      id: "agbada-elegance",
      title: "The Timeless Elegance of Agbada",
      category: "Heritage & Culture",
      image: "assets/products/Agbada/OB-AG01/01.jpg",
      excerpt: "Reimagining the majestic aura and cultural heritage of Agbada for the modern gentleman."
    },
    {
      id: "why-kaftan",
      title: "Why Every Man Needs a Kaftan",
      category: "Heritage & Culture",
      image: "assets/products/kaftans/OB-KF01/01.webp",
      excerpt: "Discover the ultimate blend of tradition, comfort, and versatility in men's fashion."
    },
    {
      id: "choosing-right-outfit",
      title: "Choosing the Right Outfit",
      category: "Style Guides",
      image: "assets/products/campaign/campaign_new5.png",
      excerpt: "In a world of fast first impressions, your clothing speaks before you do. Build your brand."
    },
    {
      id: "modern-groom-agbada",
      title: "The Modern Groom: Wedding Agbada",
      category: "Style Guides",
      image: "assets/products/Agbada/OB-AG07/01_nobg.png",
      excerpt: "A comprehensive style guide for the contemporary groom seeking clean, geometric embroidery."
    },
    {
      id: "fabric-selection-kaftans",
      title: "Fabric Selection: Linen & Cashmere",
      category: "Fabrics & Craft",
      image: "assets/products/kaftans/OB-KF01/02.webp",
      excerpt: "How to select the perfect fabric for your kaftan based on climate, drape, and occasion."
    },
    {
      id: "contemporary-menswear-global",
      title: "The Rise of Contemporary Menswear",
      category: "Heritage & Culture",
      image: "assets/products/campaign/campaign_new7_nobg.png",
      excerpt: "How a new generation of designers is taking traditional wear to runways in Paris and New York."
    },
    {
      id: "father-son-matching",
      title: "Father & Son Matching Outfits",
      category: "Family",
      image: "assets/products/Agbada/OB-AG03/01.jpg",
      excerpt: "Celebrate family bonds and pass down cultural legacy with coordinated bespoke menswear."
    },
    {
      id: "art-of-bespoke-tailoring",
      title: "The Art of Bespoke Tailoring",
      category: "Fabrics & Craft",
      image: "assets/products/Agbada/OB-AG15/01_nobg.png",
      excerpt: "What to expect during your first canvas fitting, measurements, and custom draft details."
    },
    {
      id: "corporate-kaftans-executive",
      title: "Corporate Kaftans: Office Wear",
      category: "Style Guides",
      image: "assets/products/kaftans/OB-KF01/01.webp",
      excerpt: "Redefine the boardroom. How structured shoulders and clean lines replace corporate suits."
    },
    {
      id: "caring-velvet-brocade",
      title: "Caring for Velvet & Brocade",
      category: "Garment Care",
      image: "assets/products/Agbada/OB-AG02/01.jpg",
      excerpt: "Maintain the rich luster, texture, and storage life of royalty velvet and brocade garments."
    },
    {
      id: "accessorizing-traditional-wear",
      title: "Accessorizing Traditional Wear",
      category: "Style Guides",
      image: "assets/products/campaign/campaign_new5_nobg.png",
      excerpt: "Master the art of selecting hand woven Fila caps, leather loafers, and classic watches."
    },
    {
      id: "suits-vs-kaftans",
      title: "Suits vs Kaftans: When to Wear What",
      category: "Style Guides",
      image: "assets/products/suits/OB-ST01/01.jpg",
      excerpt: "Deciding between structured Western authority and traditional prestige for executive roles."
    }
  ];

  // Identify current article
  const currentPath = window.location.pathname;
  const currentArticle = allArticles.find(a => currentPath.includes(a.id)) || allArticles[0];

  // Generate random math challenge (Anti-Spam Security)
  let num1 = Math.floor(Math.random() * 8) + 2;
  let num2 = Math.floor(Math.random() * 8) + 2;
  let correctAnswer = num1 + num2;

  // Initialize DOM Restructuring
  document.addEventListener("DOMContentLoaded", function() {
    const articleBody = document.querySelector(".article-content");
    if (!articleBody) return;

    // 1. Create Grid Layout Elements
    const gridContainer = document.createElement("div");
    gridContainer.className = "article-layout-grid";

    const mainContent = document.createElement("div");
    mainContent.className = "article-main-content";

    const sidebar = document.createElement("aside");
    sidebar.className = "article-sidebar";

    // 2. Restructure parent nodes
    articleBody.parentNode.insertBefore(gridContainer, articleBody);
    gridContainer.appendChild(mainContent);
    gridContainer.appendChild(sidebar);

    // 3. Move article contents into mainContent
    // Preserve back-link at the very end
    const backLink = articleBody.querySelector(".back-link");
    mainContent.appendChild(articleBody);

    // 4. Build Sidebar (excerpts to read other blogs)
    let sidebarHtml = `<h3>Read Other Stories</h3>`;
    const otherArticles = allArticles.filter(a => a.id !== currentArticle.id);
    // Shuffle and pick 3 articles
    const shuffled = otherArticles.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    shuffled.forEach(post => {
      sidebarHtml += `
        <a href="${post.id}.html" class="sidebar-post-card">
          <div class="sidebar-post-thumb">
            <img src="${post.image}" alt="${post.title}">
          </div>
          <div class="sidebar-post-info">
            <span>${post.category}</span>
            <h4>${post.title}</h4>
            <p>${post.excerpt}</p>
          </div>
        </a>
      `;
    });
    sidebar.innerHTML = sidebarHtml;

    // 5. Append Comment Section Container
    const commentsDiv = document.createElement("div");
    commentsDiv.id = "comments-section";
    commentsDiv.className = "comments-container";
    articleBody.appendChild(commentsDiv);

    // Render comments list and drop comment form
    renderComments();
  });

  // Render comments list & form helper
  function renderComments() {
    const commentsContainer = document.getElementById("comments-section");
    if (!commentsContainer) return;

    const storageKey = `oban-comments-${currentArticle.id}`;
    const comments = JSON.parse(localStorage.getItem(storageKey) || "[]");

    let commentsListHtml = "";
    if (comments.length === 0) {
      commentsListHtml = `<p style="color:#8c867c; font-style:italic; font-size:13px; margin-bottom: 30px;">No comments yet. Be the first to share your thoughts.</p>`;
    } else {
      comments.forEach(comment => {
        let repliesHtml = "";
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach(reply => {
            repliesHtml += `
              <div class="admin-reply-card">
                <div class="comment-header">
                  <span class="comment-author">${reply.name} <span class="admin-badge">Author</span></span>
                  <span class="comment-date">${reply.date}</span>
                </div>
                <p class="comment-body">${reply.text}</p>
              </div>
            `;
          });
        }

        commentsListHtml += `
          <div class="comment-card" data-id="${comment.id}">
            <div class="comment-header">
              <span class="comment-author">${escapeHTML(comment.name)}</span>
              <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-body">${escapeHTML(comment.text)}</p>
            <div class="comment-actions">
              <button class="comment-reply-btn" onclick="replyComment('${comment.id}')">Reply as Admin</button>
            </div>
            ${repliesHtml}
          </div>
        `;
      });
    }

    // Drop Comment Form Markup (with multi-layered spam security)
    commentsContainer.innerHTML = `
      <h3>Thoughts & Comments (${comments.length})</h3>
      <div class="comment-list">
        ${commentsListHtml}
      </div>

      <div style="margin-top: 40px;">
        <h3 style="margin-bottom:20px;">Leave a Comment</h3>
        <form id="commentForm" class="comment-form" onsubmit="submitComment(event)">
          <!-- Honeypot Bot Trap Field (Display hidden from users, filled by bots) -->
          <div class="honeypot-field">
            <label for="comment_website_field">Leave this empty</label>
            <input type="text" id="comment_website_field" name="website" tabindex="-1" autocomplete="off">
          </div>

          <div>
            <label for="commentName">Name</label>
            <input type="text" id="commentName" placeholder="Your name" required>
          </div>
          <div>
            <label for="commentEmail">Email</label>
            <input type="email" id="commentEmail" placeholder="Your email address" required>
          </div>
          <div class="full-width">
            <label for="commentText">Comment</label>
            <textarea id="commentText" placeholder="Write your thoughts..." required></textarea>
          </div>
          
          <!-- Mathematical Challenge-Response Security -->
          <div class="captcha-row">
            <div class="captcha-question">Security Check: What is ${num1} + ${num2}?</div>
            <input type="number" id="captchaAnswer" class="captcha-input" placeholder="Answer" required>
          </div>

          <div class="full-width">
            <button type="submit" class="comment-submit-btn">Post Comment</button>
          </div>
        </form>
      </div>
    `;
  }

  // Handle Comment Submission (Anti-Spam Security filters)
  window.submitComment = function(event) {
    event.preventDefault();

    // 1. Honeypot check: If filled, block as spam bot silently
    const hpValue = document.getElementById("comment_website_field").value;
    if (hpValue) {
      console.warn("Spam bot detected via honeypot trap.");
      alert("Comment submitted successfully!"); // Fake success response to confuse bot
      document.getElementById("commentForm").reset();
      return;
    }

    // 2. Math Captcha validation
    const userAnswer = parseInt(document.getElementById("captchaAnswer").value);
    if (userAnswer !== correctAnswer) {
      alert("Verification failed. Please solve the math check correctly.");
      return;
    }

    // 3. Rate limiting check (min 15 seconds spacing)
    const lastSubKey = "oban-last-comment-time";
    const lastTime = parseInt(localStorage.getItem(lastSubKey) || "0");
    const now = Date.now();
    if (now - lastTime < 15000) {
      alert("Please wait a few seconds before posting another comment.");
      return;
    }

    // 4. Keyword spam filter & URL checks
    const name = document.getElementById("commentName").value.trim();
    const email = document.getElementById("commentEmail").value.trim();
    const text = document.getElementById("commentText").value.trim();

    const spamKeywords = ["crypto", "bitcoin", "solana", "forex", "viagra", "levitra", "casino", "poker", "free cash", "earn money"];
    const lowercaseText = text.toLowerCase();
    const hasSpamWord = spamKeywords.some(keyword => lowercaseText.includes(keyword));
    
    // Count link patterns: bots inject lots of URLs
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urlCount = (text.match(urlPattern) || []).length;

    if (hasSpamWord || urlCount > 1) {
      alert("Your comment has been blocked because it triggered our spam security system.");
      return;
    }

    // Safe to save!
    const storageKey = `oban-comments-${currentArticle.id}`;
    const comments = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const newComment = {
      id: "c-" + Date.now(),
      name: name,
      email: email,
      text: text,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      replies: []
    };

    comments.push(newComment);
    localStorage.setItem(storageKey, JSON.stringify(comments));
    localStorage.setItem(lastSubKey, now.toString());

    // Regenerate captcha variables for next use
    num1 = Math.floor(Math.random() * 8) + 2;
    num2 = Math.floor(Math.random() * 8) + 2;
    correctAnswer = num1 + num2;

    renderComments();
    alert("Comment posted successfully!");
  };

  // Reply as Admin/Author helper
  window.replyComment = function(commentId) {
    // Requires enter of standard PIN or password (ObanAdmin2026 / manager PIN)
    const pin = prompt("Enter Admin Password/PIN to reply as Oban Wears:");
    if (!pin) return;

    if (pin !== "ObanAdmin2026" && pin !== "ObanManager2026!") {
      alert("Unauthorized access. Invalid Admin PIN.");
      return;
    }

    const replyText = prompt("Type your reply to this comment:");
    if (!replyText || !replyText.trim()) return;

    const storageKey = `oban-comments-${currentArticle.id}`;
    const comments = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      if (!comment.replies) comment.replies = [];
      comment.replies.push({
        name: "Oban Wears",
        text: replyText.trim(),
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        isAdmin: true
      });

      localStorage.setItem(storageKey, JSON.stringify(comments));
      renderComments();
      alert("Admin reply posted successfully!");
    }
  };

  // HTML escaping function to prevent XSS
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
