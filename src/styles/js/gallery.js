const DATA_URL = 'public/data/gallery.json';

let allPhotos = [];

async function loadGallery() {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error(`Failed to load ${DATA_URL}: ${res.status}`);
  const data = await res.json();
  return data.categories;
}

function flattenPhotos(categories) {
  return categories.flatMap((cat) =>
    (cat.subcategories ?? []).flatMap((sub) =>
      sub.photos.map((photo) => ({
        ...photo,
        category: cat.id,
        subcategory: sub.id,
        subcategoryTitle: sub.title,
      }))
    )
  );
}

function renderCards(photos, container) {
  container.innerHTML = photos
    .map(
      (photo) => `
        <li class="gallery__item" data-category="${photo.category}">
          <figure class="gallery__card">
            <img
              class="gallery__img"
              src="${photo.src}"
              alt="${photo.alt}"
              loading="lazy"
            >
            <figcaption class="gallery__caption">
              ${photo.subcategoryTitle}
            </figcaption>
          </figure>
        </li>
      `
    )
    .join('');
}

function setupFilters(container) {
  const buttons = document.querySelectorAll('.gallery__btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');

      const category = btn.dataset.category;
      const filtered =
        category === 'all'
          ? allPhotos
          : allPhotos.filter((p) => p.category === category);

      renderCards(filtered, container);
    });
  });
}

export async function initGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const categories = await loadGallery();
  allPhotos = flattenPhotos(categories);

  renderCards(allPhotos, container);
  setupFilters(container);
}