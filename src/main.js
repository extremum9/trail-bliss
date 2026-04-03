import Swiper from 'swiper';
import { Navigation, A11y } from 'swiper/modules';

import initTopbar from './modules/topbar';

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
