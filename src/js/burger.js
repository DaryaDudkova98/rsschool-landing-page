export function initBurger() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');

    if (!burger || !menu || !overlay) return;

    burger.addEventListener('click', () => {
        const isOpen = burger.getAttribute('aria-expanded') === 'true';
        const next = !isOpen;

        burger.setAttribute('aria-expanded', String(next));
        menu.classList.toggle('is-open', next);
        overlay.classList.toggle('is-open', next);
    });

    overlay.addEventListener('click', () => {
        burger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        overlay.classList.remove('is-open');
    });
}