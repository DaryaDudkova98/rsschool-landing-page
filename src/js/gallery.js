const DATA_URL = 'public/data/gallery.json';

let allSubcategories = [];
let activeCategory = 'all';
const itemMap = new WeakMap();

export function getItemData(el) {
    return itemMap.get(el) ?? null;
}

async function loadGallery() {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Failed to load ${DATA_URL}: ${res.status}`);
    const data = await res.json();
    return data.categories;
}

function flattenSubcategories(categories) {
    return categories
        .flatMap((cat) =>
            (cat.subcategories ?? []).map((sub) => ({
                category: cat.id,
                id: sub.id,
                title: sub.title,
                description: sub.description,
                location: sub.location,
                mainPhoto: sub.photos?.[0] ?? null,
                photos: sub.photos ?? [],
                photosCount: sub.photos?.length ?? 0,
            }))
        )
        .filter((item) => item.mainPhoto);
}

function renderCards(items, container) {
    const template = document.getElementById('gallery-card-template');
    if (!template) return;

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
        const node = template.content.firstElementChild.cloneNode(true);
        const img = node.querySelector('.gallery__img');
        const title = node.querySelector('.gallery__title');
        const meta = node.querySelector('.gallery__meta');

        img.src = item.mainPhoto.src;
        img.alt = item.mainPhoto.alt;
        title.textContent = item.title;
        meta.textContent = `${item.photosCount} photos`;

        node.dataset.category = item.category;

        itemMap.set(node, item);

        fragment.appendChild(node);
    });

    container.replaceChildren(fragment);
}

function getFiltered() {
    return activeCategory === 'all'
        ? allSubcategories
        : allSubcategories.filter((s) => s.category === activeCategory);
}

function renderVisible(container) {
    const filtered = getFiltered();
    renderCards(filtered, container);

    document.dispatchEvent(new CustomEvent('gallery:rendered'));
}

function setupFilters(container) {
    const buttons = document.querySelectorAll('.gallery__btn');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
            btn.setAttribute('aria-pressed', 'true');

            activeCategory = btn.dataset.category;
            renderVisible(container);
        });
    });
}

export async function initGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;

    const categories = await loadGallery();
    allSubcategories = flattenSubcategories(categories);

    renderVisible(container);
    setupFilters(container);
}