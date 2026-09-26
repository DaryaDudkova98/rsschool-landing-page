import { initTheme } from './theme.js';
import { initGallery } from './gallery.js';
import { initBurger } from './burger.js';
import { initCarousel } from './carousel.js';
import { initModalPrices } from './modal-prices.js';

export function initApp() {
    initTheme();
    initGallery();
    initBurger();
    initCarousel();
    initModalPrices();
}

initApp();