import { throttle, toEm } from './utilities.js';

const initTopbar = () => {
  const selectors = {
    root: '.js-topbar',
    toggleButton: '.js-nav-toggle-button'
  };

  const stateClasses = {
    preventScroll: 'prevent-scroll',
    menuOpen: 'menu-open'
  };

  const body = document.body;
  const root = document.querySelector(selectors.root);
  const toggleButton = document.querySelector(selectors.toggleButton);
  const tabletMediaQuery = window.matchMedia(`(max-width: ${toEm(991.98)})`);

  const updateHeight = () =>
    root.style.setProperty('--topbar-height', `${root.offsetHeight}px`);
  const resizeObserver = new ResizeObserver(updateHeight);

  resizeObserver.observe(root);
  updateHeight();

  const toggleMenu = () => {
    body.classList.toggle(stateClasses.preventScroll);
    root.classList.contains(stateClasses.menuOpen)
      ? toggleButton.setAttribute('aria-expanded', 'false')
      : toggleButton.setAttribute('aria-expanded', 'true');
    root.classList.toggle(stateClasses.menuOpen);
  };

  const resetMenu = (mediaQuery) => {
    if (!mediaQuery.matches) {
      body.classList.remove(stateClasses.preventScroll);
      root.classList.remove(stateClasses.menuOpen);
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  };

  const scrollThreshold = 30;
  const toggleScrollClass = () => {
    window.scrollY > scrollThreshold
      ? root.classList.add('scroll')
      : root.classList.remove('scroll');
  };

  toggleButton.addEventListener('click', toggleMenu);
  tabletMediaQuery.addEventListener('change', resetMenu);
  window.addEventListener('scroll', throttle(toggleScrollClass));
  resetMenu(tabletMediaQuery);
  toggleScrollClass();
};

export default initTopbar;
