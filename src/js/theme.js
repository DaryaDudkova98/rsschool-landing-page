const KEY = 'theme';
const root = document.documentElement;

const get = () => {
  const v = localStorage.getItem(KEY);
  return v === 'light' || v === 'dark' ? v : null;
};

const system = () =>
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const apply = (v) => root.setAttribute('data-theme', v);

export function initTheme() {
  apply(get() ?? system());

  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem(KEY, next);
  });
}