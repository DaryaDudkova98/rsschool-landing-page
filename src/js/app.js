import { initTheme } from './theme.js';
import { initGallery } from './gallery.js';
import { initBurger } from './burger.js';

export function initApp() {
    initTheme();
    initGallery();
    initBurger();
}

initApp();