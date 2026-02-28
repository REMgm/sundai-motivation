/* ============================================
   APP.JS, Remco Vroom
   ============================================ */

(function () {
  'use strict';

  // ====== THEME TOGGLE ======
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = 'dark'; // Dark mode default, always
  root.setAttribute('data-theme', theme);

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateToggleIcon();
    });
  }

  updateToggleIcon();

  // ====== MOBILE MENU ======
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    } else {
      mobileMenu.classList.add('open');
      overlay.classList.add('active');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  overlay.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      toggleMobileMenu();
    }
  });

  // Close mobile menu on link click
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // ====== ARTICLES DATA & RENDERING ======
  // Each article has a publishDate (YYYY-MM-DD). Articles only appear on or after that date.
  const now = new Date();

  const articles = [
    { week: 0, publishDate: '2026-02-28', date: 'Feb 29, 2026', title: "Welcome to SundAI Motivation. Here's Why This Series Exists.", time: '6 min', img: './assets/headers/opening-welcome.jpg', slug: 'opening-welcome' },
    { week: 1, publishDate: '2026-03-08', date: 'Mar 8, 2026', title: 'AI Is Moving at the Speed of Light.', time: '7 min', img: './assets/headers/week01-speed-of-ai.jpg', slug: 'week01-speed-of-ai' },
    { week: 2, publishDate: '2026-03-15', date: 'Mar 15, 2026', title: "Everyone Says They're 'Doing AI.' Almost Nobody Is Doing It Well.", time: '8 min', img: './assets/headers/week02-ambition-execution-gap.jpg', slug: 'week02-ambition-execution-gap' },
    { week: 3, publishDate: '2026-03-22', date: 'Mar 22, 2026', title: 'Your Employees Are Already Using AI.', time: '7 min', img: './assets/headers/week03-shadow-ai.jpg', slug: 'week03-shadow-ai' },
    { week: 4, publishDate: '2026-03-29', date: 'Mar 29, 2026', title: 'Why 74% of CEOs Are Terrified of AI', time: '8 min', img: './assets/headers/week04-ceo-fear.jpg', slug: 'week04-ceo-fear' },
    { week: 5, publishDate: '2026-04-05', date: 'Apr 5, 2026', title: 'The Companies Getting AI Right, and the Ones Getting Left Behind', time: '9 min', img: './assets/headers/week05-winners-losers.jpg', slug: 'week05-winners-losers' },
    { week: 6, publishDate: '2026-04-12', date: 'Apr 12, 2026', title: "The Biggest Threat to Your AI Strategy Isn't Technology.", time: '7 min', img: './assets/headers/week06-team-resistance.jpg', slug: 'week06-team-resistance' },
    { week: 7, publishDate: '2026-04-19', date: 'Apr 19, 2026', title: 'Your First Week of Taking AI Seriously', time: '8 min', img: './assets/headers/week07-first-steps.jpg', slug: 'week07-first-steps' },
    { week: 8, publishDate: '2026-04-26', date: 'Apr 26, 2026', title: "You Don't Need a Huge Budget to Start.", time: '7 min', img: './assets/headers/week08-smart-starting-point.jpg', slug: 'week08-smart-starting-point' },
    { week: 9, publishDate: '2026-05-03', date: 'May 3, 2026', title: 'How to Prove AI ROI to Your Board', time: '8 min', img: './assets/headers/week09-proving-roi.jpg', slug: 'week09-proving-roi' },
    { week: 10, publishDate: '2026-05-10', date: 'May 10, 2026', title: "AI Won't Replace Leaders.", time: '7 min', img: './assets/headers/week10-human-plus-ai.jpg', slug: 'week10-human-plus-ai' },
    { week: 11, publishDate: '2026-05-17', date: 'May 17, 2026', title: 'How to Bring Your Whole Company Along', time: '8 min', img: './assets/headers/week11-culture-transformation.jpg', slug: 'week11-culture-transformation' },
    { week: 12, publishDate: '2026-05-24', date: 'May 24, 2026', title: "It's Not Too Late. In Fact, the Timing Has Never Been Better.", time: '7 min', img: './assets/headers/week12-perfect-timing.jpg', slug: 'week12-perfect-timing' },
  ];

  const articlesGrid = document.querySelector('.articles-grid');
  if (articlesGrid) {
    // Filter articles: only show those whose publishDate <= today
    const visibleArticles = articles.filter(article => {
      const pubDate = new Date(article.publishDate + 'T00:00:00');
      return now >= pubDate;
    });

    if (visibleArticles.length === 0) {
      // Show a "coming soon" message if no articles are published yet
      articlesGrid.innerHTML = '<p style="color: var(--color-text-muted); font-family: var(--font-body); text-align: center; grid-column: 1 / -1; padding: var(--space-12) 0;">The first article drops soon. Stay tuned.</p>';
    } else {
      visibleArticles.forEach((article, index) => {
        const card = document.createElement('a');
        card.href = './articles/' + article.slug + '.html';
        card.className = 'article-card fade-in';
        card.style.animationDelay = `${index * 50}ms`;
        card.innerHTML = `
          <img src="${article.img}" alt="${article.title}" class="article-card-image" loading="lazy" width="400" height="225">
          <div class="article-card-body">
            <h3 class="article-card-title">${article.title}</h3>
            <div class="article-card-meta">
              <span>${article.date}</span>
              <span>&middot;</span>
              <span>${article.time} read</span>
            </div>
          </div>
        `;
        articlesGrid.appendChild(card);
      });
    }
  }

  // ====== COUNT-UP ANIMATION ======
  function animateCountUp(el, target, duration) {
    const start = 0;
    const startTime = performance.now();
    const ease = (t) => {
      // cubic-bezier(0.16, 1, 0.3, 1) approximation
      return 1 - Math.pow(1 - t, 3);
    };

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = ease(progress);
      const currentValue = Math.round(start + (target - start) * easedProgress);
      el.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Intersection Observer for stats
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const numberEl = stat.querySelector('.landscape-number');
          if (numberEl && !stat.classList.contains('counted')) {
            stat.classList.add('counted');
            animateCountUp(numberEl, target, 1200);
          }
          statObserver.unobserve(stat);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.landscape-stat').forEach((stat) => {
    statObserver.observe(stat);
  });

  // ====== NAV SCROLL EFFECT ======
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      nav.style.background = 'rgba(10,10,15,0.85)';
      nav.style.backdropFilter = 'blur(24px)';
      nav.style.webkitBackdropFilter = 'blur(24px)';
    } else {
      nav.style.background = '';
      nav.style.backdropFilter = '';
      nav.style.webkitBackdropFilter = '';
    }
    lastScroll = scrollY;
  }

  // Update nav bg for light mode too
  function updateNavBg() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      if (root.getAttribute('data-theme') === 'light') {
        nav.style.background = 'rgba(248,249,250,0.85)';
      } else {
        nav.style.background = 'rgba(10,10,15,0.85)';
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Re-check nav on theme change
  const originalToggleClick = toggle ? toggle.onclick : null;
  if (toggle) {
    const originalListeners = toggle.cloneNode(true);
    toggle.addEventListener('click', () => {
      requestAnimationFrame(updateNavBg);
    });
  }

  // ====== SMOOTH SCROLL for anchor links ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ====== ACTIVE NAV HIGHLIGHT ======
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach(section => sectionObserver.observe(section));

})();
