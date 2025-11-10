export default function positionSliderButtons() {
  const sliderButtonsNews = document.querySelectorAll(".s-news .slider-btn");

  if (sliderButtonsNews.length) {
    handelePosition(".s-news .card-new__img", sliderButtonsNews);

    window.addEventListener("resize", () =>
      handelePosition(".s-news .card-new__img", sliderButtonsNews)
    );
  }

  const sliderButtonsClergy = document.querySelectorAll(
    ".s-clergy .slider-btn"
  );

  if (sliderButtonsClergy.length) {
    handelePosition(".s-clergy .card-team__gallery", sliderButtonsClergy);

    window.addEventListener("resize", () =>
      handelePosition(".s-clergy .card-team__gallery", sliderButtonsClergy)
    );
  }

  const sliderButtonsUseful = document.querySelectorAll(
    ".s-useful .slider-btn"
  );

  if (sliderButtonsUseful.length) {
    handelePosition(".s-useful .card-useful__gallery", sliderButtonsUseful);

    window.addEventListener("resize", () =>
      handelePosition(".s-useful .card-useful__gallery", sliderButtonsUseful)
    );
  }

  function handelePosition(targetSelector, arr) {
    const target = document.querySelector(`${targetSelector}`);
    arr.forEach((btn) => {
      const offsetTop = target.clientHeight / 2;
      btn.style.top = `${offsetTop}px`;
    });
  }
}
