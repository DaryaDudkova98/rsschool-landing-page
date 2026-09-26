export function initCarousel() {
    const track = document.querySelector('.references-track');
    const btnPrev = document.querySelector('.references-btn--prev');
    const btnNext = document.querySelector('.references-btn--next');

    if (!track || !btnPrev || !btnNext) return;

    const allItems = Array.from(track.children);

    let index = 0;

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

    function renderItems() {
        const visible = getVisibleCount();

        const fixedPart = allItems.slice(0, visible);
        const shuffledPart = shuffle(allItems.slice(visible));

        track.innerHTML = '';
        [...fixedPart, ...shuffledPart].forEach(item => track.appendChild(item));
    }

    function getMaxIndex() {
        const items = track.children;
        return Math.max(0, items.length - getVisibleCount());
    }

    function getStep() {
        const items = track.children;
        if (items.length < 2) return 0;

        const firstRect = items[0].getBoundingClientRect();
        const secondRect = items[1].getBoundingClientRect();

        return secondRect.left - firstRect.left;
    }

    function update() {
        const maxIndex = getMaxIndex();
        index = Math.min(Math.max(index, 0), maxIndex);

        track.style.transform = `translateX(${-index * getStep()}px)`;

        btnPrev.disabled = index === 0;
        btnNext.disabled = index === maxIndex;
    }

    btnPrev.addEventListener('click', () => {
        index -= getVisibleCount();
        update();
    });

    btnNext.addEventListener('click', () => {
        index += getVisibleCount();
        update();
    });

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
    update();
}