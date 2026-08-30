/* ============================================================
   DOT-GRID.JS — Exact MHacks.org Timeline Interactive Dot Grid
   Replicated 1:1 from MHacks.org timeline section canvas engine
   ============================================================
   Features:
   1. 30px dot-grid step with 15px half-cell offset.
   2. Base dot radius: 1.1px with subtle ambient opacity (0.14).
   3. Fluid lerped mouse tracking with spring inertia (0.18 factor).
   4. Smoothstep hermite falloff: s = t * t * (3 - 2 * t) * power.
   5. Dynamic radial expansion from 1.1px up to 3.6px within 180px proximity.
   6. Dynamic luminance glow from rgba(239,233,212, 0.14) to rgba(239,233,212, 0.75).
   7. Auto-sleep when idle or out of viewport for zero idle CPU usage.
   ============================================================ */

(function () {
  'use strict';

  function initMHacksDotGrid() {
    const timelineSection = document.getElementById('timeline');
    let canvas = document.getElementById('timelineDotGridCanvas');

    if (!timelineSection) return;

    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'timelineDotGridCanvas';
      canvas.className = 'timeline-dot-grid-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      timelineSection.insertBefore(canvas, timelineSection.firstChild);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dpr = 1;
    let width = 0;
    let height = 0;

    let targetX = -9999;
    let targetY = -9999;
    let currentX = -9999;
    let currentY = -9999;

    let power = 0;       // Current animated hover power (0 to 1)
    let targetPower = 0; // Target hover power (1 when mouse is over, 0 on leave)

    let isRunning = false;
    let isIntersecting = true;
    let rafId = 0;

    // ── Exact MHacks Dot Drawing Function ───────────────────────
    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const STEP = 30;
      const HALF_STEP = 15;
      const PROXIMITY_RADIUS = 180;
      const PROXIMITY_SQ = PROXIMITY_RADIUS * PROXIMITY_RADIUS; // 32400

      for (let y = HALF_STEP; y < height; y += STEP) {
        for (let x = HALF_STEP; x < width; x += STEP) {
          let dx = x - currentX;
          let dy = y - currentY;
          let distSq = dx * dx + dy * dy;
          let smoothFactor = 0;

          if (distSq < PROXIMITY_SQ && power > 0.001) {
            let normDist = 1 - Math.sqrt(distSq) / PROXIMITY_RADIUS;
            // Exact Smoothstep Hermite polynomial: t * t * (3 - 2 * t)
            smoothFactor = normDist * normDist * (3 - 2 * normDist) * power;
          }

          let dotRadius = 1.1 + 2.5 * smoothFactor;
          let alpha = 0.14 + 0.61 * smoothFactor;

          ctx.fillStyle = `rgba(239, 233, 212, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function isVisible() {
      return isIntersecting && !document.hidden && canvas.offsetParent !== null;
    }

    // ── Animation Loop with Fluid Lerp Tracking ─────────────────
    function loop() {
      if (!isVisible()) {
        isRunning = false;
        return;
      }

      // Smooth inertia lerp for mouse coordinates
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      // Smooth fade-in/fade-out for hover intensity
      power += (targetPower - power) * 0.12;

      draw();

      // Auto-sleep check when settled back to rest
      if (
        targetPower === 0 &&
        power < 0.005 &&
        Math.abs(targetX - currentX) < 0.5 &&
        Math.abs(targetY - currentY) < 0.5
      ) {
        power = 0;
        draw();
        isRunning = false;
        return;
      }

      rafId = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (!isRunning && !prefersReducedMotion) {
        isRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    }

    // ── Responsive Resize Handler ───────────────────────────────
    function resize() {
      const rect = timelineSection.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      if (width === 0 || height === 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      draw();
    }

    // ── Mouse Event Handlers ────────────────────────────────────
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (targetPower === 0) {
        currentX = targetX;
        currentY = targetY;
      }

      targetPower = 1;
      startLoop();
    }

    function onMouseLeave() {
      targetPower = 0;
      startLoop();
    }

    // ── Intersection Observer for Zero-CPU Idle ─────────────────
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        if (canvas.width === 0 || canvas.height === 0) {
          resize();
        }
        startLoop();
      } else {
        cancelAnimationFrame(rafId);
        isRunning = false;
      }
    });

    function onVisibilityChange() {
      if (!document.hidden && isVisible()) {
        startLoop();
      }
    }

    // ── Initialize & Attach Listeners ───────────────────────────
    resize();
    observer.observe(timelineSection);

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (!prefersReducedMotion) {
      timelineSection.addEventListener('mousemove', onMouseMove, { passive: true });
      timelineSection.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMHacksDotGrid);
  } else {
    initMHacksDotGrid();
  }
})();
