/**
 * ==========================================================================
 * AGENTATION VISUAL FEEDBACK TOOLBAR INITIALIZER
 * Mounts the Agentation component for in-browser visual annotations
 * ==========================================================================
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';

function initAgentation() {
  try {
    let container = document.getElementById('agentation-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'agentation-root';
      document.body.appendChild(container);
    }

    const root = createRoot(container);
    root.render(React.createElement(Agentation));
    console.log('[Agentation] Visual feedback toolbar initialized successfully.');
  } catch (error) {
    console.error('[Agentation] Failed to initialize Agentation:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAgentation);
} else {
  initAgentation();
}
