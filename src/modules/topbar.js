import { toEm } from './utilities.js';

const initTopbar = () => {
  const selectors = {
    toggleButton: '.js-nav-toggle-button'
  };

  const stateClasses = {
    preventScroll: 'prevent-scroll',
    menuOpen: 'menu-open'
  };

  const body = document.body;
  const toggleButton = document.querySelector(selectors.toggleButton);
  const tabletMediaQuery = window.matchMedia(`(max-width: ${toEm(991.98)})`);

  const toggleMenu = () => {
    body.classList.toggle(stateClasses.preventScroll);
    body.classList.contains(stateClasses.menuOpen)
      ? toggleButton.setAttribute('aria-expanded', 'false')
      : toggleButton.setAttribute('aria-expanded', 'true');
    body.classList.toggle(stateClasses.menuOpen);
  };

  const resetMenu = (mediaQuery) => {
    if (!mediaQuery.matches) {
      body.classList.remove(stateClasses.preventScroll);
      body.classList.remove(stateClasses.menuOpen);
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  };

  toggleButton.addEventListener('click', toggleMenu);
  tabletMediaQuery.addEventListener('change', resetMenu);
  resetMenu(tabletMediaQuery);
};

export default initTopbar;
