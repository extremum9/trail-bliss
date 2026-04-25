const SELECTORS = {
  ROOT: '.js-accordion',
  BUTTON: '.js-accordion-button'
};

const STATE_CLASSES = {
  OPEN: 'open',
  CLOSE: 'close',
  SLIDING: 'sliding'
};

const STATE_ATTRIBUTES = {
  ARIA_EXPANDED: 'aria-expanded'
};

const initAccordion = (root) => {
  root.addEventListener('click', (event) => {
    const button = event.target.closest(SELECTORS.BUTTON);
    if (!button) {
      return;
    }

    // close all

    const targetPanel = root.querySelector(button.dataset.target);
    if (targetPanel.classList.contains(STATE_CLASSES.OPEN)) {
      button.classList.remove(STATE_CLASSES.OPEN);
      button.setAttribute(STATE_ATTRIBUTES.ARIA_EXPANDED, 'false');

      targetPanel.style.height = `${targetPanel.offsetHeight}px`;

      targetPanel.offsetHeight;

      targetPanel.classList.remove(STATE_CLASSES.OPEN);
      targetPanel.classList.add(STATE_CLASSES.SLIDING);

      targetPanel.style.height = '';

      targetPanel.addEventListener(
        'transitionend',
        (event) => {
          if (event.target !== targetPanel) {
            return;
          }
          targetPanel.classList.remove(STATE_CLASSES.SLIDING);
          targetPanel.classList.add(STATE_CLASSES.CLOSE);
        },
        { once: true }
      );
    } else {
      button.classList.add(STATE_CLASSES.OPEN);
      button.setAttribute(STATE_ATTRIBUTES.ARIA_EXPANDED, 'true');

      targetPanel.classList.remove(STATE_CLASSES.CLOSE);

      const height = targetPanel.offsetHeight;

      targetPanel.classList.add(STATE_CLASSES.SLIDING);

      targetPanel.offsetHeight;

      targetPanel.style.height = `${height}px`;

      targetPanel.addEventListener(
        'transitionend',
        (event) => {
          if (event.target !== targetPanel) {
            return;
          }
          targetPanel.classList.remove(STATE_CLASSES.SLIDING);
          targetPanel.classList.add(STATE_CLASSES.OPEN);

          targetPanel.style.height = '';
        },
        { once: true }
      );
    }
  });
};

export { SELECTORS, initAccordion };
