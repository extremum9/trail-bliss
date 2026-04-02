import Swiper from 'swiper';
import { Navigation, A11y } from 'swiper/modules';

import initTopbar from './modules/topbar';

initTopbar();

new Swiper('.js-events-slider', {
  modules: [Navigation, A11y],
  slidesPerView: 1.98,
  spaceBetween: 20,
  navigation: {
    nextEl: '.js-events-slider-button-next',
    prevEl: '.js-events-slider-button-previous'
  }
});
