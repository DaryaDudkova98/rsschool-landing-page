const DATA_URL = 'public/data/gallery.json';

const PAGE_SIZE = 8;

let allSubcategories = [];
let activeCategory = 'all';
let visibleCount = PAGE_SIZE;

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
        title: sub.title,
        mainPhoto: sub.photos?.[0] ?? null,
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
  const visible = filtered.slice(0, visibleCount);
  renderCards(visible, container);
}

function setupFilters(container) {
  const buttons = document.querySelectorAll('.gallery__btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');

      activeCategory = btn.dataset.category;
      visibleCount = PAGE_SIZE;
      renderVisible(container);
    });
  });
}

export async function initGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const categories = await loadGallery();
  allSubcategories = flattenSubcategories(categories);
  visibleCount = PAGE_SIZE;

  renderVisible(container);
  setupFilters(container);
}