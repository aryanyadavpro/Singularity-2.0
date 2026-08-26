/**
 * ==========================================================================
 * SINGULARITY 2.0 — MAIN APPLICATION ENTRY POINT
 * Initializes Subtle Hero 3D Perspective Tilt and Interactive Effects
 * ==========================================================================
 */

import { HeroEffects } from './components/hero-effects.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Subtle Hero 3D Perspective Tilt & Floating Effects
  const heroEffects = new HeroEffects();

  // Initial console badge
  console.log(
    '%c SINGULARITY 2.0 %c Mumbai Retro Hackathon ',
    'background: #F4B400; color: #1A1A1A; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'background: #E8542B; color: #FFFFFF; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
  );
});
