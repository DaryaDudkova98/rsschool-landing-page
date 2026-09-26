import { initTheme } from './theme.js';
import { initGallery } from './gallery.js';
import { initBurger } from './burger.js';
import { initCarousel } from './carousel.js';

export function initApp() {
    initTheme();
    initGallery();
    initBurger();
    initCarousel();
}

initApp();