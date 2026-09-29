export function initBurger() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');

    if (!burger || !menu || !overlay) return;

    function openMenu() {
        burger.setAttribute('aria-expanded', 'true');
        menu.classList.add('is-open');
        overlay.classList.add('is-open');
        document.body.classList.add('is-menu-open');
    }

    function closeMenu() {
        burger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        overlay.classList.remove('is-open');
        document.body.classList.remove('is-menu-open');
    }

    function isOpen() {
        return burger.getAttribute('aria-expanded') === 'true';
    }

    burger.addEventListener('click', () => {
        isOpen() ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    menu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (!isOpen()) return;

        if (e.key === 'Escape' || e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            closeMenu();

            burger.focus();
        }
    });
}