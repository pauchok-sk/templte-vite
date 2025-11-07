export default function sliders() {
  const newsSlider = document.querySelector(".s-news__slider");

  if (newsSlider) {
    const swiper = new Swiper(newsSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: 1.1,
      loop: true,
      loopedSlides: 3,
      centeredSlides: true,
      autplay: {
        delay: 3500,
      },
      pagination: {
        el: ".s-news .slider-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".s-news .slider-btn._next",
        prevEl: ".s-news .slider-btn._prev",
      },
      breakpoints: {
        992: {
          spaceBetween: 25,
          slidesPerView: 3,
        },
        768: {
          spaceBetween: 15,
          slidesPerView: 3,
        },
        480: {
          spaceBetween: 15,
          slidesPerView: 2,
        },
      },
    });
  }

  const gallerySlider = document.querySelector(".s-gallery__slider");

  if (gallerySlider) {
    const swiper = new Swiper(gallerySlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: 1,
      loop: true,
      loopedSlides: 4,
      loopAdditionalSlides: 2,
      autoplay: {
        delay: 3400,
      },
      initialSlide: 1,
      pagination: {
        el: ".s-gallery .slider-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".s-gallery .slider-btn._next",
        prevEl: ".s-gallery .slider-btn._prev",
      },
      breakpoints: {
        992: {
          spaceBetween: 30,
          slidesPerView: 2,
        },
        480: {
          spaceBetween: 15,
          slidesPerView: 2,
        },
      },
    });
  }

  const clergySlider = document.querySelector(".s-clergy__slider");

  if (clergySlider) {
    const swiper = new Swiper(clergySlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: 1,
      // autoplay: {
      //   delay: 3000,
      // },
      pagination: {
        el: ".s-clergy .slider-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".s-clergy .slider-btn._next",
        prevEl: ".s-clergy .slider-btn._prev",
      },
      breakpoints: {
        992: {
          spaceBetween: 25,
          slidesPerView: 3,
        },
        480: {
          spaceBetween: 15,
          slidesPerView: 2,
        },
      },
    });
  }
}
