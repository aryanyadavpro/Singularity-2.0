/* ============================================================
   SPONSOR-SCROLL.JS — Refined GSAP & Lenis Train Scroll Animation
   ============================================================
   Features:
   1. Syncs Lenis Smooth Scroll with GSAP ScrollTrigger.
   2. Scrubs the train illustration smoothly from the right edge as
      the section enters from the bottom, landing into place when
      the section locks at top: 0 with its rear anchored naturally.
   3. Applies subtle paper-cut stop-motion micro-jitter during scroll.
   4. Handles responsive breakpoints for mobile and desktop screens.
   ============================================================ */

(function () {
  'use strict';

  function initSponsorScroll() {
    const sponsorSection = document.getElementById('why-sponsor');
    const trainWrapper = document.querySelector('.sponsor-train-wrapper');
    const trainImg = document.querySelector('.sponsor-train-img');

    if (!sponsorSection || !trainWrapper) return;

    // ── Ensure GSAP & ScrollTrigger are available ────────────────
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[Singularity] GSAP or ScrollTrigger not detected. Falling back to CSS motion.');
      if (trainWrapper) {
        trainWrapper.style.transform = 'translateX(0)';
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ── Sync with Lenis if active ────────────────────────────────
    if (window.lenis) {
      window.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        window.lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // ── Detect Active Scrolling for Subtle Paper-Cut Jitter ───────
    let scrollTimeout = null;
    function onScrollActivity() {
      if (trainImg) {
        trainImg.classList.add('is-scrolling');
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (trainImg) {
          trainImg.classList.remove('is-scrolling');
        }
      }, 150);
    }

    window.addEventListener('scroll', onScrollActivity, { passive: true });
    if (window.lenis) {
      window.lenis.on('scroll', onScrollActivity);
    }

    // ── Create Responsive GSAP ScrollTrigger Scrub ────────────────
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 769px)',
        isMobile: '(max-width: 768px)'
      },
      (context) => {
        const { isDesktop } = context.conditions;

        // When section comes from bottom: train is tucked offscreen; when locked at top: 0, train is settled
        const startX = isDesktop ? '75vw' : '85vw';
        const endX = '0vw';

        gsap.fromTo(
          trainWrapper,
          {
            x: startX
          },
          {
            x: endX,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: sponsorSection,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
              invalidateOnRefresh: true
            }
          }
        );
      }
    );
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSponsorScroll);
  } else {
    initSponsorScroll();
  }
})();
