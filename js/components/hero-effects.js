/**
 * ==========================================================================
 * SINGULARITY 2.0 — HERO EFFECTS & SUBTLE MICRO-INTERACTIONS
 * Gentle, subtle perspective mouse hover tilt (non-aggressive)
 * ==========================================================================
 */

export class HeroEffects {
  constructor() {
    this.heroSection = document.querySelector('.hero-section');
    this.titleWrapper = document.querySelector('.hero-title-wrapper');
    this.init();
  }

  init() {
    if (!this.heroSection || !this.titleWrapper) return;

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    this.setupSubtleTiltEffect();
  }

  setupSubtleTiltEffect() {
    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = this.heroSection.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Normalized offset from center (-1 to 1)
          const mouseX = (e.clientX - centerX) / (rect.width / 2);
          const mouseY = (e.clientY - centerY) / (rect.height / 2);

          // Extremely subtle tilt values for smooth, gentle hover feel
          const maxTiltX = 1.8; // deg
          const maxTiltY = 2.2; // deg

          const tiltX = -mouseY * maxTiltX;
          const tiltY = mouseX * maxTiltY;

          this.titleWrapper.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.008, 1.008, 1.008)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      this.titleWrapper.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    this.heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
    this.heroSection.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  }
}
