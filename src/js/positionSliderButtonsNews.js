export default function positionSliderButtonsNews() {
  const sliderButtons = document.querySelectorAll(".s-news .slider-btn");

  if (sliderButtons.length) {

    handelePosition();

    window.addEventListener("resize", handelePosition)

    function handelePosition() {
      const img = document.querySelector(".s-news .card-new__img");

      sliderButtons.forEach(btn => {
        const offsetTop = (img.clientHeight / 2) - (btn.clientHeight / 2);
        btn.style.top = `${offsetTop}px`;
      })
    }
  }
}