import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/keyboard';


document.addEventListener('DOMContentLoaded', function () {
  const options: SwiperOptions = {
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
    parallax: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    // breakpoints: {
    //   768: {
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //     spaceBetween: 20,
    //   },
    //   1024: {
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //     spaceBetween: 30,
    //   },
    //   1440: {
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //     spaceBetween: 30,
    //   }
    // },
  };

  const swiper = new Swiper('.swiper', options);
  swiper.init();
});
