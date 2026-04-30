import { throttle, toEm } from './utilities.js';

const SELECTORS = {
  ROOT: '.js-topbar',
  TOGGLE_BUTTON: '.js-nav-toggle-button'
};

const STATE_CLASSES = {
  PREVENT_SCROLL: 'prevent-scroll',
  MENU_OPEN: 'menu-open',
  SCROLL: 'scroll'
};

const SCROLL_THRESHOLD = 30;

const initTopbar = () => {
  const body = document.body;
  const root = document.querySelector(SELECTORS.ROOT);
  const toggleButton = document.querySelector(SELECTORS.TOGGLE_BUTTON);
  const tabletMediaQuery = window.matchMedia(`(width < ${toEm(992)})`);

  const toggleMenu = () => {
    body.classList.toggle(STATE_CLASSES.PREVENT_SCROLL);
    const opened = root.classList.toggle(STATE_CLASSES.MENU_OPEN);
    toggleButton.setAttribute('aria-expanded', `${opened}`);
  };

  const resetMenu = (mediaQuery) => {
    if (!mediaQuery.matches) {
      body.classList.remove(STATE_CLASSES.PREVENT_SCROLL);
      root.classList.remove(STATE_CLASSES.MENU_OPEN);
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  };

  const updateHeight = () =>
    root.style.setProperty('--topbar-height', `${root.offsetHeight}px`);

  const toggleScrollClass = () =>
    root.classList.toggle(
      STATE_CLASSES.SCROLL,
      window.scrollY > SCROLL_THRESHOLD
    );

  const resizeObserver = new ResizeObserver(updateHeight);
  resizeObserver.observe(root);

  resetMenu(tabletMediaQuery);
  updateHeight();
  toggleScrollClass();

  toggleButton.addEventListener('click', toggleMenu);
  tabletMediaQuery.addEventListener('change', resetMenu);
  window.addEventListener('scroll', throttle(toggleScrollClass));
};

export default initTopbar;
