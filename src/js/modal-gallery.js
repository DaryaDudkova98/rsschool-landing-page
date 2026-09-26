import { getItemData } from './gallery.js';

export function initModalGallery() {
    const modal = document.querySelector('#gallery-modal');
    const grid = document.querySelector('#gallery-grid');
    if (!modal || !grid) return;

    const modalTitle   = modal.querySelector('.modal-title');
    const modalImage   = modal.querySelector('.modal-image');
    const modalDesc    = modal.querySelector('.modal-description');
    const modalLoc     = modal.querySelector('.modal-location');
    const modalCount   = modal.querySelector('.modal-count');
    const modalGallery = modal.querySelector('.modal-gallery');
    const closeEls     = modal.querySelectorAll('[data-close]');

    const lightbox = document.querySelector('#gallery-lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('[data-lightbox-close]');
    const lightboxPrev = lightbox.querySelector('[data-lightbox-prev]');
    const lightboxNext = lightbox.querySelector('[data-lightbox-next]');

    let currentPhotos = [];
    let currentIndex = 0;

    function openModal(item) {
        modalTitle.textContent = item.title ?? '';
        modalImage.src = item.mainPhoto?.src ?? '';
        modalImage.alt = item.mainPhoto?.alt ?? '';
        modalDesc.textContent = item.description ?? '';
        modalLoc.textContent = item.location ?? '';
        modalCount.textContent = item.photos?.length ?? 0;

        currentPhotos = item.photos ?? [];

        modalGallery.innerHTML = '';
        currentPhotos.forEach((photo, i) => {
            const li = document.createElement('li');
            li.className = 'modal-gallery__item';

            const img = document.createElement('img');
            img.className = 'modal-gallery__img';
            img.src = photo.src;
            img.alt = photo.alt ?? '';
            img.loading = 'lazy';
            img.dataset.index = String(i);

            li.appendChild(img);
            modalGallery.appendChild(li);
        });

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    function openLightbox(index) {
        if (!currentPhotos.length) return;

        currentIndex = (index + currentPhotos.length) % currentPhotos.length;
        const photo = currentPhotos[currentIndex];

        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt ?? '';
        lightboxCaption.textContent = photo.alt ?? '';

        lightbox.classList.toggle('is-single', currentPhotos.length <= 1);

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
    }

    function showPrev() {
        openLightbox(currentIndex - 1);
    }

    function showNext() {
        openLightbox(currentIndex + 1);
    }

    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.gallery__card');
        if (!card) return;

        const itemEl = card.closest('.gallery__item');
        const item = getItemData(itemEl);
        if (!item) return;

        openModal(item);
    });

    modalImage.addEventListener('click', () => {
        openLightbox(0);
    });

    modalGallery.addEventListener('click', (e) => {
        const thumb = e.target.closest('.modal-gallery__img');
        if (!thumb) return;

        const index = Number(thumb.dataset.index) || 0;
        openLightbox(index);
    });

    closeEls.forEach(el => el.addEventListener('click', closeModal));

    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('is-open')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
            return;
        }

        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}