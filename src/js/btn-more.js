export function initBtnMore() {
    console.log('=== initBtnMore ===');

    const grid = document.querySelector('#gallery-grid');
    const btnMore = document.querySelector('.gallery__more');

    console.log('grid:', grid);
    console.log('btnMore:', btnMore);
    console.log('items:', grid?.querySelectorAll('.gallery__item').length);

    if (!grid || !btnMore) {
        console.log('Early return');
        return;
    }

    const STEP = 8;
    let visibleCount = STEP;

    function update() {
        const items = grid.querySelectorAll('.gallery__item');
        const total = items.length;

        console.log('update — total:', total, 'visibleCount:', visibleCount);

        items.forEach((item, i) => {
            item.classList.toggle('is-hidden', i >= visibleCount);
        });

        const hideBtn = visibleCount >= total;
        console.log('hide button?', hideBtn);

        btnMore.classList.toggle('is-hidden', hideBtn);
    }

    btnMore.addEventListener('click', () => {
        console.log('=== click ===');
        visibleCount += STEP;
        update();
    });

    document.addEventListener('gallery:rendered', () => {
        console.log('=== gallery:rendered ===');
        visibleCount = STEP;
        update();
    });

    document.addEventListener('gallery:filter', () => {
        visibleCount = STEP;
        update();
    });

    update();
}