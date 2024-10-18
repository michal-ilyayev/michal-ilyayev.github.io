import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/keyboard';


const defaultOptions: SwiperOptions = {
  modules: [Navigation, Pagination, Autoplay, Keyboard],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  keyboard: {
    enabled: true,
  },
  speed: 800,
  slidesPerGroup: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1100: {
      slidesPerView: 2,
    },
    1560: {
      slidesPerView: 3,
    }
  },
};


document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.swiper').forEach((element) => {
    const elementOptions = element.getAttribute('data-options');
    const options = (elementOptions && JSON.parse(elementOptions) as SwiperOptions) || {};
    const swiper = new Swiper(element as HTMLElement, { ...defaultOptions, ...options });
    swiper.init();
  });
});
