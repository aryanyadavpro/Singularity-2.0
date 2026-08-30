/* ============================================================
   NAVBAR.JS — Fluid Navigation, Scrollspy & Smooth Anchor Routing
   ============================================================
   Features:
   1. Infallible true document offset calculation for sticky stacked cards.
   2. Smooth Lenis-synchronized section scrolling in both directions.
   3. Real-time ScrollSpy with active pill highlighting.
   4. Logo click scrolls seamlessly to the top of the page (0, 0).
   5. Clean mobile behavior (Logo + Apply button only).
   ============================================================ */

(function () {
  'use strict';

  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const brand = document.querySelector('.navbar__brand');
    const navLinks = document.querySelectorAll('.navbar__link');

    /**
     * Compute the invariant cumulative document scroll position
     * for any section in the document flow.
     * In a sticky curtain-stacked architecture, the point where any section
     * reaches top:0 is the sum of heights of all preceding sections.
     */
    function getSectionScrollY(targetElement) {
      if (!targetElement || targetElement.id === 'home') {
        return 0;
      }

      const allSections = Array.from(document.querySelectorAll('section[id]'));
      let targetY = 0;

      for (let i = 0; i < allSections.length; i++) {
        const sec = allSections[i];
        if (sec === targetElement || sec.id === targetElement.id) {
          break;
        }
        targetY += sec.offsetHeight;
      }

      return targetY;
    }

    // ── Smooth Scroll Helper (Lenis-aware with exact coordinate) ──
    function smoothScrollTo(targetY) {
      if (window.lenis) {
        window.lenis.scrollTo(targetY, {
          offset: 0,
          duration: 1.2,
          easing: function (t) {
            return Math.min(1, 1.001 - Math.pow(2, -10 * t));
          }
        });
      } else {
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }
    }

    // ── Logo Click: Scroll to Top ───────────────────────────────
    if (brand) {
      brand.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScrollTo(0);
        navLinks.forEach((l) => l.classList.remove('active'));
      });
    }

    // ── Nav Link Clicks ─────────────────────────────────────────
    navLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();

            // Highlight immediately for crisp responsiveness
            navLinks.forEach((l) => l.classList.remove('active'));
            this.classList.add('active');

            const targetY = getSectionScrollY(target);
            smoothScrollTo(targetY);
          }
        }
      });
    });

    // ── Action Links (e.g. Sponsor Us button, Hero CTA buttons) ───
    const actionLinks = document.querySelectorAll('a[href^="#"]');
    actionLinks.forEach((link) => {
      // Avoid re-attaching to navbar links or brand
      if (link.classList.contains('navbar__link') || link.classList.contains('navbar__brand')) {
        return;
      }

      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#TODO-APPLY-LINK' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const targetY = getSectionScrollY(target);
            smoothScrollTo(targetY);
          }
        }
      });
    });

    // ── ScrollSpy & Navbar Scrolled State ───────────────────────
    function updateNavbar() {
      const scrollY = window.scrollY || window.pageYOffset;

      // Scrolled backdrop effect
      if (navbar) {
        if (scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Check which section is currently active
      const allSections = Array.from(document.querySelectorAll('section[id]'));
      let cumulativeY = 0;
      let currentActiveId = null;

      for (let i = 0; i < allSections.length; i++) {
        const sec = allSections[i];
        const secHeight = sec.offsetHeight;
        const startY = cumulativeY;
        const endY = cumulativeY + secHeight;

        // If viewport is inside this section's scroll range
        if (scrollY >= startY - window.innerHeight * 0.35 && scrollY < endY - window.innerHeight * 0.35) {
          currentActiveId = '#' + sec.id;
          break;
        }

        cumulativeY += secHeight;
      }

      // Update active classes
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentActiveId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    if (window.lenis) {
      window.lenis.on('scroll', updateNavbar);
    }
    updateNavbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
})();
