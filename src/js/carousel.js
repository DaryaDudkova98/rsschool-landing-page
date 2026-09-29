export function initCarousel() {
    const track = document.querySelector('.references-track');
    const btnPrev = document.querySelector('.references-btn--prev');
    const btnNext = document.querySelector('.references-btn--next');

    if (!track || !btnPrev || !btnNext) return;

    const allItems = Array.from(track.children);

    let index = 0;
    let isAnimating = false;

    function getVisibleCount() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
    }

    function shuffle(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    let realItems = [];

    function renderItems() {
        const visible = getVisibleCount();

        const fixedPart = allItems.slice(0, visible);
        const shuffledPart = shuffle(allItems.slice(visible));
        realItems = [...fixedPart, ...shuffledPart];

        track.innerHTML = '';

        const clonesBefore = realItems.slice(-visible).map(el => el.cloneNode(true));
        const clonesAfter  = realItems.slice(0, visible).map(el => el.cloneNode(true));

        clonesBefore.forEach(el => track.appendChild(el));
        realItems.forEach(el => track.appendChild(el));
        clonesAfter.forEach(el => track.appendChild(el));

        index = visible;
        applyTransform(false);
    }

    function getStep() {
        const items = track.children;
        if (items.length < 2) return 0;

        const firstRect = items[0].getBoundingClientRect();
        const secondRect = items[1].getBoundingClientRect();

        return secondRect.left - firstRect.left;
    }

    function applyTransform(animate = true) {
        if (animate) {
            track.style.transition = 'transform 0.4s ease';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(${-index * getStep()}px)`;
    }

    function update(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const visible = getVisibleCount();
        const realCount = realItems.length;

        index += direction * visible;
        applyTransform(true);

        const onTransitionEnd = () => {
            track.removeEventListener('transitionend', onTransitionEnd);

            if (index >= realCount + visible) {
                index -= realCount;
                applyTransform(false);
            }
            else if (index < visible) {
                index += realCount;
                applyTransform(false);
            }

            isAnimating = false;
        };

        track.addEventListener('transitionend', onTransitionEnd);
    }

    btnPrev.addEventListener('click', () => update(-1));
    btnNext.addEventListener('click', () => update(1));

    function getBreakpoint() {
        const width = window.innerWidth;
        if (width <= 480) return 'xs';
        if (width <= 768) return 'sm';
        if (width <= 1024) return 'md';
        return 'lg';
    }

    let lastBreakpoint = getBreakpoint();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const currentBreakpoint = getBreakpoint();

            if (currentBreakpoint !== lastBreakpoint) {
                lastBreakpoint = currentBreakpoint;
                index = 0;
                renderItems();
            }

            update();
        }, 150);
    });

    renderItems();
}