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
  // Release editions according to the publication's Amsterdam calendar.
  const today = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());

  const articles = [
    { week: 0, publishDate: '2026-01-04', date: 'Jan 4, 2026', title: "Welcome to SundAI Motivation. Here's Why This Series Exists.", time: '6 min', img: './assets/headers/opening-welcome.jpg', slug: 'opening-welcome' },
    { week: 1, publishDate: '2026-01-11', date: 'Jan 11, 2026', title: 'AI Is Moving at the Speed of Light.', time: '7 min', img: './assets/headers/week01-speed-of-ai.jpg', slug: 'week01-speed-of-ai' },
    { week: 2, publishDate: '2026-01-18', date: 'Jan 18, 2026', title: "Everyone Says They're 'Doing AI.' Almost Nobody Is Doing It Well.", time: '8 min', img: './assets/headers/week02-ambition-execution-gap.jpg', slug: 'week02-ambition-execution-gap' },
    { week: 3, publishDate: '2026-01-25', date: 'Jan 25, 2026', title: 'Your Employees Are Already Using AI.', time: '7 min', img: './assets/headers/week03-shadow-ai.jpg', slug: 'week03-shadow-ai' },
    { week: 4, publishDate: '2026-02-01', date: 'Feb 1, 2026', title: 'Why 74% of CEOs Are Terrified of AI', time: '8 min', img: './assets/headers/week04-ceo-fear.jpg', slug: 'week04-ceo-fear' },
    { week: 5, publishDate: '2026-02-08', date: 'Feb 8, 2026', title: 'The Companies Getting AI Right, and the Ones Getting Left Behind', time: '9 min', img: './assets/headers/week05-winners-losers.jpg', slug: 'week05-winners-losers' },
    { week: 6, publishDate: '2026-02-15', date: 'Feb 15, 2026', title: "The Biggest Threat to Your AI Strategy Isn't Technology.", time: '7 min', img: './assets/headers/week06-team-resistance.jpg', slug: 'week06-team-resistance' },
    { week: 7, publishDate: '2026-02-22', date: 'Feb 22, 2026', title: 'Your First Week of Taking AI Seriously', time: '8 min', img: './assets/headers/week07-first-steps.jpg', slug: 'week07-first-steps' },
    { week: 8, publishDate: '2026-03-01', date: 'Mar 1, 2026', title: "You Don't Need a Huge Budget to Start.", time: '7 min', img: './assets/headers/week08-smart-starting-point.jpg', slug: 'week08-smart-starting-point' },
    { week: 9, publishDate: '2026-03-08', date: 'Mar 8, 2026', title: 'How to Prove AI ROI to Your Board', time: '8 min', img: './assets/headers/week09-proving-roi.jpg', slug: 'week09-proving-roi' },
    { week: 10, publishDate: '2026-03-15', date: 'Mar 15, 2026', title: "AI Won't Replace Leaders.", time: '7 min', img: './assets/headers/week10-human-plus-ai.jpg', slug: 'week10-human-plus-ai' },
    { week: 11, publishDate: '2026-03-22', date: 'Mar 22, 2026', title: 'How to Bring Your Whole Company Along', time: '8 min', img: './assets/headers/week11-culture-transformation.jpg', slug: 'week11-culture-transformation' },
    { week: 12, publishDate: '2026-03-29', date: 'Mar 29, 2026', title: "It's Not Too Late. In Fact, the Timing Has Never Been Better.", time: '7 min', img: './assets/headers/week12-perfect-timing.jpg', slug: 'week12-perfect-timing' },
    { week: 13, publishDate: '2026-04-11', date: 'Apr 12, 2026', title: "AI Agents Are Now Hiring Humans. Yes, You Read That Right.", time: '8 min', img: './assets/headers/week13-agents-hiring-humans.jpg', slug: 'week13-agents-hiring-humans' },
    { week: 14, publishDate: '2026-04-17', date: 'Apr 19, 2026', title: "Figma Lost 7%. Here's Why Design Systems Just Became Your Most Valuable Asset.", time: '7 min', img: './assets/headers/week14-design-systems.jpg', slug: 'week14-design-systems' },
    { week: 16, publishDate: '2026-05-02', date: 'May 3, 2026', title: "The CEO at the Tiny Desk: Why Every Executive Needs to Become an AI Practitioner.", time: '8 min', img: './assets/headers/week16-ceo-tiny-desk.jpg', slug: 'week16-ceo-tiny-desk' },
    { week: 17, publishDate: '2026-05-30', date: 'May 31, 2026', title: "Stop Thinking So Hard (You're Doing It Backwards)", time: '6 min', img: './assets/headers/week17-effort-control.jpg', slug: 'week17-effort-control' },
    { week: 18, publishDate: '2026-06-14', date: 'Jun 14, 2026', title: "The Brief Is the Bottleneck: Claude Fable 5 Just Made Your Weakest Skill Visible", time: '8 min', img: './assets/headers/week18-fable-brief-bottleneck.jpg', slug: 'week18-fable-brief-bottleneck' },
    { week: 19, publishDate: '2026-06-27', date: 'Jun 28, 2026', title: "Your AI Team Has More Members Than You Think: Why Every Person Is Now a Manager of Agents.", time: '8 min', img: './assets/headers/week18-manager-of-agents.jpg', slug: 'week18-manager-of-agents' },
    { week: 20, publishDate: '2026-07-05', date: 'Jul 5, 2026', title: "Your Agents Only Answer What You Ask: Why the Next Competitive Edge Is a Map of Your Ignorance", time: '9 min', img: './assets/headers/week20-the-map-of-your-ignorance.jpg', slug: 'week20-the-map-of-your-ignorance' },
    {"week": 21, "publishDate": "2026-07-12", "date": "Jul 12, 2026 edition", "title": "Your AI Agent Needs a Job Description", "time": "5 min", "img": "./assets/headers/week21-ai-agent-job-description-decision-boundaries-founders-owl.jpg", "alt": "A confident founder and the black-and-gold owl turn a brass key together to open a glass permission gate.", "slug": "week21-ai-agent-job-description-decision-boundaries"},
    {"week": 22, "publishDate": "2026-07-19", "date": "Jul 19, 2026 edition", "title": "The Most Expensive Word in AI Is “Done”", "time": "5 min", "img": "./assets/headers/week22-ai-agent-definition-of-done-founders-owl.jpg", "alt": "An expressive founder reacts to an empty presentation case as the black-and-gold owl lifts its lid beneath a cyan checkmark.", "slug": "week22-ai-agent-definition-of-done"},
    {"week": 23, "publishDate": "2026-07-26", "date": "Jul 26, 2026 edition", "title": "Your AI Is Remembering the Wrong Things", "time": "5 min", "img": "./assets/headers/week23-ai-memory-source-owner-expiry-founders-owl.jpg", "alt": "A founder holds a fresh cyan memory tile while the black-and-gold owl presents a cracked amber tile from an archive drawer.", "slug": "week23-ai-memory-source-owner-expiry"},
    {"week": 24, "publishDate": "2026-08-02", "date": "Aug 2, 2026 edition", "title": "Your Fastest Agent Is Waiting for Approval", "time": "5 min", "img": "./assets/headers/week24-ai-approval-bottleneck-founders-owl.jpg", "alt": "A CEO reaches for an approval gate's release lever while the black-and-gold owl waits with raised wings and a document bundle.", "slug": "week24-ai-approval-bottleneck"},
    {"week": 25, "publishDate": "2026-08-09", "date": "Aug 9, 2026 edition", "title": "The Handoff Is Where AI Work Breaks", "time": "5 min", "img": "./assets/headers/week25-ai-agent-handoffs-preserve-context-founders-owl.jpg", "alt": "Two founders pass a cyan glass cube between them as the black-and-gold owl hovers beneath the handoff.", "slug": "week25-ai-agent-handoffs-preserve-context"},
    {"week": 26, "publishDate": "2026-08-16", "date": "Aug 16, 2026 edition", "title": "Build an AI Fire Drill Before You Need One", "time": "5 min", "img": "./assets/headers/week26-ai-workflow-stop-recover-resume-founders-owl.jpg", "alt": "A CEO presses a red emergency-stop button as the black-and-gold owl raises its wings beside a guarded machine.", "slug": "week26-ai-workflow-stop-recover-resume"},
    {"week": 27, "publishDate": "2026-08-23", "date": "Aug 23, 2026 edition", "title": "Give Your Brand a Test Suite", "time": "5 min", "img": "./assets/headers/week27-brand-test-suite-ai-content-founders-owl.jpg", "alt": "A founder and the black-and-gold owl inspect a flawed white cup through a brass magnifying lens beside two matching cups.", "slug": "week27-brand-test-suite-ai-content"},
    {"week": 28, "publishDate": "2026-08-30", "date": "Aug 30, 2026 edition", "title": "Your AI Pilot Needs an Exit Date", "time": "5 min", "img": "./assets/headers/week28-ai-pilot-expand-repair-stop-founders-owl.jpg", "alt": "A delighted founder prepares to launch a silver paper airplane through an open glass door as the black-and-gold owl flies alongside.", "slug": "week28-ai-pilot-expand-repair-stop"},
    {"week": 29, "publishDate": "2026-09-06", "date": "Sep 6, 2026 edition", "title": "Your AI Saved Three Hours. Now What?", "time": "5 min", "img": "./assets/headers/week29-ai-productivity-trap-owl.jpg", "alt": "A black-and-gold geometric owl with glowing cyan eyes lifts an hourglass above a snapping steel trap as golden sand swirls through the air.", "slug": "week29-ai-productivity-turning-time-into-value"},
  ];

  const articlesGrid = document.querySelector('.articles-grid');
  if (articlesGrid) {
    // Show articles: hide future articles (publishDate > today)
    const visibleArticles = articles.filter(article => {
      return article.publishDate <= today;
    }).reverse();

    visibleArticles.forEach((article, index) => {
        const card = document.createElement('a');
        card.href = './articles/' + article.slug + '.html';
        card.className = 'article-card fade-in';
        card.style.animationDelay = `${index * 50}ms`;
        card.innerHTML = `
          <img src="${article.img}" alt="${article.alt || article.title}" class="article-card-image" loading="lazy" width="400" height="225">
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
