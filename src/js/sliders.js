export default function sliders() {
  const newsSlider = document.querySelector(".s-news__slider");

  if (newsSlider) {
    const swiper = new Swiper(newsSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      autplay: {
        delay: 3500
      },
      pagination: {
        el: ".s-news .slider-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".s-news .slider-btn._next",
        prevEl: ".s-news .slider-btn._prev",
      },
      breakpoints: {
        992: {
          spaceBetween: 25,
          slidesPerView: 3,
          centeredSlides: false
        },
      },
    });
  }
}
