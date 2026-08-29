/* ============================================================
   HERO-FRAME-SCROLL.JS — Lucid Canvas Image Sequence Scrubber
   ============================================================
   Features:
   1. Sub-Frame Crossfade Blending: Blends adjacent frames
      smoothly (indexA + indexB * fraction) for zero-stepping,
      infinite continuous motion between frames.
   2. Lenis 1.4s Inertial Physics for silky smooth mouse wheel
      and trackpad momentum.
   3. Preloaded 96 frames from home_mp4_frames.
   4. Persistent glowing Devanagari title & milestone CTAs.
   ============================================================ */

(function () {
  'use strict';

  const scrollTrack = document.getElementById('home');
  const canvas = document.getElementById('heroCanvas');
  const titleLayer = document.getElementById('heroTitleLayer');
  const scrollCue = document.getElementById('heroScrollCue');
  const bottomBar = document.getElementById('heroBottomBar');

  if (!scrollTrack || !canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  const TOTAL_FRAMES = 96;
  const images = new Array(TOTAL_FRAMES);
  let loadedCount = 0;
  let lastDrawnProgress = -1;

  // ── Initialize Lenis with Lucid Smooth Inertia ────────────────
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.7,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      infinite: false
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // ── Preload Image Sequence (home_mp4_frames) ──────────────────
  function getFramePath(index) {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `assets/images/home_mp4_frames/home_mp4_frames/frame_${frameNumber}.jpg`;
  }

  function preloadImages() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = function () {
        loadedCount++;
        // Render first frame immediately once loaded
        if (i === 0 && lastDrawnProgress === -1) {
          renderFrame(0);
        }
      };
      images[i] = img;
    }
  }

  // ── Responsive Canvas Sizing & Lucid Sub-Frame Blending ───────
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    if (lastDrawnProgress >= 0) {
      renderFrame(lastDrawnProgress);
    }
  }

  function getCoverBounds(img) {
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;
    let renderW, renderH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderW = cw;
      renderH = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - renderH) / 2;
    } else {
      renderH = ch;
      renderW = ch * imgRatio;
      offsetX = (cw - renderW) / 2;
      offsetY = 0;
    }

    return { offsetX, offsetY, renderW, renderH };
  }

  // Lucid Sub-Frame Crossfade: blends adjacent frames seamlessly
  function renderFrame(fractionalIndex) {
    const clamped = Math.min(Math.max(fractionalIndex, 0), TOTAL_FRAMES - 1);
    const indexA = Math.floor(clamped);
    const indexB = Math.min(indexA + 1, TOTAL_FRAMES - 1);
    const blendFactor = clamped - indexA; // sub-frame fraction (0.0 to 1.0)

    const imgA = images[indexA];
    const imgB = images[indexB];

    if (!imgA || !imgA.complete) return;

    const boundsA = getCoverBounds(imgA);

    // 1. Draw base frame A
    ctx.globalAlpha = 1.0;
    ctx.drawImage(imgA, boundsA.offsetX, boundsA.offsetY, boundsA.renderW, boundsA.renderH);

    // 2. Crossfade frame B with sub-frame opacity for continuous lucid motion
    if (blendFactor > 0.02 && imgB && imgB.complete && indexA !== indexB) {
      const boundsB = getCoverBounds(imgB);
      ctx.globalAlpha = blendFactor;
      ctx.drawImage(imgB, boundsB.offsetX, boundsB.offsetY, boundsB.renderW, boundsB.renderH);
      ctx.globalAlpha = 1.0;
    }

    lastDrawnProgress = fractionalIndex;
  }

  // ── Scroll Progress Calculation ───────────────────────────────
  let targetProgress = 0;
  let currentProgress = 0;
  let rafId = null;

  function calculateProgress() {
    const rect = scrollTrack.getBoundingClientRect();
    const trackHeight = rect.height;
    const windowHeight = window.innerHeight;
    const maxScroll = trackHeight - windowHeight;

    if (maxScroll <= 0) return 0;

    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
    return progress;
  }

  function updateScroll() {
    targetProgress = calculateProgress();
    if (!rafId) {
      rafId = requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', function () {
    resizeCanvas();
    updateScroll();
  }, { passive: true });

  if (lenis) {
    lenis.on('scroll', updateScroll);
  }

  function render() {
    // Silky lerp damping for smooth fluid motion
    currentProgress += (targetProgress - currentProgress) * 0.12;

    // Map progress to sub-frame index (0.0 to 95.0)
    const fractionalFrame = currentProgress * (TOTAL_FRAMES - 1);
    renderFrame(fractionalFrame);

    // ── Persistent Title & Overlays Management ────────────────

    // Persistent Title: remains anchored in sky throughout scroll
    if (titleLayer) {
      const subtleScale = 1 - (currentProgress * 0.05);
      const subtleTranslateY = -(currentProgress * 20);
      titleLayer.style.transform = `translateY(${subtleTranslateY.toFixed(1)}px) scale(${subtleScale.toFixed(3)})`;
      titleLayer.style.opacity = '1';
    }

    // Scroll Cue: fades out cleanly as user begins scrolling (0% to 15%)
    if (scrollCue) {
      if (currentProgress < 0.18) {
        const cueOpacity = Math.max(1 - (currentProgress / 0.12), 0);
        scrollCue.style.opacity = cueOpacity.toFixed(3);
        scrollCue.style.display = cueOpacity <= 0.01 ? 'none' : 'block';
      } else {
        scrollCue.style.opacity = '0';
        scrollCue.style.display = 'none';
      }
    }

    // Bottom Bar: softly fades out as you start driving
    if (bottomBar) {
      const barOpacity = Math.max(1 - (currentProgress / 0.15), 0);
      bottomBar.style.opacity = barOpacity.toFixed(3);
    }

    if (Math.abs(targetProgress - currentProgress) > 0.0003) {
      rafId = requestAnimationFrame(render);
    } else {
      rafId = null;
    }
  }

  // ── Start Engine ──────────────────────────────────────────────
  resizeCanvas();
  preloadImages();
  updateScroll();
})();
