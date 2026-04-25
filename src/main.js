import Swiper from 'swiper';
import { Navigation, A11y } from 'swiper/modules';

import initTopbar from './modules/topbar';
import {
  SELECTORS as ACCORDION_SELECTORS,
  initAccordion
} from './modules/accordion';

initTopbar();

new Swiper('.js-events-slider', {
  modules: [Navigation, A11y],
  spaceBetween: 20,
  navigation: {
    nextEl: '.js-events-slider-button-next',
    prevEl: '.js-events-slider-button-previous'
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    480: {
      slidesPerView: 1.2
    },
    576: {
      slidesPerView: 1.5
    },
    768: {
      slidesPerView: 1.98
    }
  }
});

new Swiper('.js-testimonials-slider', {
  modules: [Navigation, A11y],
  spaceBetween: 24,
  navigation: {
    nextEl: '.js-testimonials-slider-button-next',
    prevEl: '.js-testimonials-slider-button-previous'
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    992: {
      slidesPerView: 2
    }
  }
});

const accordions = document.querySelectorAll(ACCORDION_SELECTORS.ROOT);
accordions.forEach((accordion) => initAccordion(accordion));
