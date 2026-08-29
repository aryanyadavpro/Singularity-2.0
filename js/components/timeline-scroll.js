/* ============================================================
   TIMELINE-SCROLL.JS — GSAP & Lenis Timeline Scroll Animations
   ============================================================
   Features:
   1. Syncs Lenis Smooth Scroll with GSAP ScrollTrigger.
   2. Scrubs the Mumbai panoramic illustration from the right edge
      as the timeline section enters from the bottom, landing into
      place when the section locks at top: 0.
   3. Subtle paper-cut stop-motion micro-jitter during active scroll.
   4. Staggered rise-up reveal animation for the 6 timeline table rows
      as the user scrolls into the timeline card.
   5. Robust responsive matchMedia handling for desktop and mobile.
   ============================================================ */

(function () {
  'use strict';

  function initTimelineScroll() {
    const timelineSection = document.getElementById('timeline');
    const mumbaiWrapper = document.querySelector('.timeline-mumbai-wrapper');
   const mumbaiImg = document.querySelector('.timeline-mumbai-img');
    const timelineRows = document.querySelectorAll('.timeline-row');

    if (!timelineSection || !mumbaiWrapper) return;

    // ── Ensure GSAP & ScrollTrigger are available ────────────────
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[Singularity] GSAP or ScrollTrigger not detected. Falling back to CSS motion.');
      if (mumbaiWrapper) {
        mumbaiWrapper.style.transform = 'translateX(0)';
      }
      if (timelineRows.length > 0) {
        timelineRows.forEach((row) => {
          row.style.opacity = '1';
          row.style.transform = 'none';
        });
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
      if (mumbaiImg) {
        mumbaiImg.classList.add('is-scrolling');
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (mumbaiImg) {
          mumbaiImg.classList.remove('is-scrolling');
        }
      }, 150);
    }

    window.addEventListener('scroll', onScrollActivity, { passive: true });
    if (window.lenis) {
      window.lenis.on('scroll', onScrollActivity);
    }

    // ── Responsive GSAP ScrollTrigger Scrub for Mumbai Skyline ───
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 769px)',
        isMobile: '(max-width: 768px)'
      },
      (context) => {
        const { isDesktop } = context.conditions;

        const startX = isDesktop ? '70vw' : '80vw';
        const endX = '0vw';

        // 1. Mumbai illustration slide-in scrub
        gsap.fromTo(
          mumbaiWrapper,
          {
            x: startX
          },
          {
            x: endX,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: timelineSection,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
              invalidateOnRefresh: true
            }
          }
        );

        // 2. Staggered Table Rows Rise-Up Animation
        if (timelineRows && timelineRows.length > 0) {
          gsap.fromTo(
            timelineRows,
            {
              y: 40,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.07,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: timelineSection,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true
              }
            }
          );
        }
      }
    );
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimelineScroll);
  } else {
    initTimelineScroll();
  }
})();
