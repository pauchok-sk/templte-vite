export default function sliders() {
  const newsSlider = document.querySelector(".s-news__slider");

  if (newsSlider) {
    const swiper = new Swiper(newsSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      loop: true,
      loopedSlides: 3,
      centeredSlides: true,
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
      on: {
        transitionStart: () => {
          gallerySlider.querySelector(".swiper-wrapper").style.willChange = "transform";
        },
        transitionEnd: () => {
          gallerySlider.querySelector(".swiper-wrapper").style.willChange = "";
        },
      },
    });
  }

  const clergySlider = document.querySelector(".s-clergy__slider");

  if (clergySlider) {
    const swiper = new Swiper(clergySlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      // loop: true,
      // loopedSlides: 3,
      centeredSlides: true,
      initialSlide: 1,
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
          centeredSlides: false,
          initialSlide: 0,
        },
        768: {
          spaceBetween: 15,
          slidesPerView: "auto",
          centeredSlides: true,
          initialSlide: 1,
        },
      },
    });
  }

  const usefulSlider = document.querySelector(".s-useful__slider");

  if (usefulSlider) {
    const swiper = new Swiper(usefulSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      loop: true,
      loopedSlides: 4,
      centeredSlides: true,
      pagination: {
        el: ".s-useful .slider-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".s-useful .slider-btn._next",
        prevEl: ".s-useful .slider-btn._prev",
      },
      breakpoints: {
        992: {
          spaceBetween: 25,
          slidesPerView: 3,
          centeredSlides: false,
        },
      },
    });
  }

  const dioceseSlider = document.querySelector(".s-diocese__slider");

  if (dioceseSlider) {
    const swiper = new Swiper(dioceseSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      pagination: {
        el: ".s-diocese .slider-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".s-diocese .slider-btn._next",
        prevEl: ".s-diocese .slider-btn._prev",
      },
      breakpoints: {
        1200: {
          spaceBetween: 25,
          slidesPerView: 3,
          centeredSlides: false,
        },
        992: {
          spaceBetween: 25,
          slidesPerView: 2,
          centeredSlides: false,
        },
      },
    });
  }
}
