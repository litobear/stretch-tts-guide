// Main entry point for ZenStretch application
import { initUI } from './modules/ui.js';

// Setup app on page load
document.addEventListener('DOMContentLoaded', () => {
  try {
    initUI();
  } catch (error) {
    console.error('Initialization error during ZenStretch startup:', error);
  }
});
