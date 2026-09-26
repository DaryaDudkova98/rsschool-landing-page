import { PRICES_DATA } from './prices-data.js';

export function initModalPrices() {
    const detailsBtns = document.querySelectorAll('.prices-grid-btn');
    const modal = document.querySelector('#prices-modal');
    if (!detailsBtns.length || !modal) return;

    const modalTitle  = modal.querySelector('.modal-title');
    const modalImage  = modal.querySelector('.modal-image');
    const modalGroups = modal.querySelector('.modal-groups');
    const modalList   = modal.querySelector('.modal-list');
    const closeEls    = modal.querySelectorAll('[data-close]');

    let currentData = null;
    let selected = {};

    function openModal(btn) {
        const card = btn.closest('.prices-grid-content');
        const key  = card.dataset.service;
        const data = PRICES_DATA[key];
        if (!data) return;

        currentData = data;

        modalTitle.textContent = card.querySelector('.prices-grid-subtitle').textContent;
        const img = card.querySelector('img');
        if (img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
        }

        selected = {};
        data.groups.forEach(group => {
            selected[group.name] = group.default;
        });

        renderGroups();
        renderItems();

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function renderGroups() {
        modalGroups.innerHTML = '';

        currentData.groups.forEach(group => {
            const wrap = document.createElement('div');
            wrap.className = 'modal-group';

            const options = document.createElement('div');
            options.className = 'modal-options';

            Object.entries(group.options).forEach(([optKey, opt]) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'modal-option';
                btn.textContent = opt.label;
                btn.dataset.group = group.name;
                btn.dataset.option = optKey;

                if (selected[group.name] === optKey) {
                    btn.classList.add('is-active');
                }

                btn.addEventListener('click', () => {
                    selected[group.name] = optKey;
                    options.querySelectorAll('.modal-option').forEach(b => {
                        b.classList.toggle('is-active', b.dataset.option === optKey);
                    });
                    renderItems();
                });

                options.appendChild(btn);
            });

            wrap.appendChild(options);
            modalGroups.appendChild(wrap);
        });
    }

    function renderItems() {
    modalList.innerHTML = '';

    currentData.groups.forEach(group => {
        const optKey = selected[group.name];
        const opt = group.options[optKey];
        if (!opt) return;

        opt.items.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            modalList.appendChild(li);
        });

        if (opt.links?.length) {
            const linksWrap = document.createElement('div');
            linksWrap.className = 'modal-links';

            opt.links.forEach(link => {
                const a = document.createElement('a');
                a.className = 'modal-link';
                a.href = link.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = link.label;
                linksWrap.appendChild(a);
            });

            modalList.appendChild(linksWrap);
        }
    });
}

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(btn));
    });

    closeEls.forEach(el => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}