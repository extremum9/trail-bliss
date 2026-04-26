import { reflow } from './utilities';

const SELECTORS = {
  ROOT: '.js-accordion',
  BUTTON: '.js-accordion-button'
};

const STATE_CLASSES = {
  OPEN: 'open',
  CLOSE: 'close',
  SLIDING: 'sliding'
};

const sliding = (panel) => panel.classList.contains(STATE_CLASSES.SLIDING);

const initAccordion = (root) => {
  const open = ({ button, panel }) => {
    if (sliding(panel)) {
      return;
    }

    button.classList.add(STATE_CLASSES.OPEN);
    button.setAttribute('aria-expanded', 'true');

    panel.classList.remove(STATE_CLASSES.CLOSE);

    const height = panel.offsetHeight;

    panel.classList.add(STATE_CLASSES.SLIDING);

    reflow(panel);

    panel.style.height = `${height}px`;

    panel.addEventListener(
      'transitionend',
      (event) => {
        if (event.target !== panel) {
          return;
        }
        panel.classList.remove(STATE_CLASSES.SLIDING);
        panel.classList.add(STATE_CLASSES.OPEN);

        panel.style.height = '';
      },
      { once: true }
    );
  };

  const close = ({ button, panel }) => {
    if (sliding(panel)) {
      return;
    }

    button.classList.remove(STATE_CLASSES.OPEN);
    button.setAttribute('aria-expanded', 'false');

    panel.style.height = `${panel.offsetHeight}px`;

    reflow(panel);

    panel.classList.remove(STATE_CLASSES.OPEN);
    panel.classList.add(STATE_CLASSES.SLIDING);

    panel.style.height = '';

    panel.addEventListener(
      'transitionend',
      (event) => {
        if (event.target !== panel) {
          return;
        }
        panel.classList.remove(STATE_CLASSES.SLIDING);
        panel.classList.add(STATE_CLASSES.CLOSE);
      },
      { once: true }
    );
  };

  const closeActive = () => {
    root
      .querySelectorAll(`${SELECTORS.BUTTON}.${STATE_CLASSES.OPEN}`)
      .forEach((button) => {
        const panel = root.querySelector(button.dataset.target);
        close({ button, panel });
      });
  };

  root.addEventListener('click', (event) => {
    const button = event.target.closest(SELECTORS.BUTTON);
    if (!button) {
      return;
    }

    const panel = root.querySelector(button.dataset.target);
    if (panel.classList.contains(STATE_CLASSES.OPEN)) {
      close({ button, panel });
    } else {
      closeActive();
      open({ button, panel });
    }
  });
};

export { SELECTORS, initAccordion };
