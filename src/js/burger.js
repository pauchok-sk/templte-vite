export default function burger() {
  const burgerOpen = document.querySelector("#burger-open");
  const burgerClose = document.querySelector("#burger-close");
  const burger = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");

  if (burger) {
    burger.addEventListener("click", (e) => e.stopPropagation());

    burgerOverlay.addEventListener("click", handlerBurgerClose);

    burgerOpen.addEventListener("click", (e) => {
      e.stopPropagation();
      handlerBurgerOpen();
    });
    burgerClose.addEventListener("click", (e) => {
      e.stopPropagation();
      handlerBurgerClose();
    });

    function handlerBurgerOpen() {
      burger.classList.add("_open");
      burgerOverlay.classList.add("_active");
      document.body.classList.add("body-hidden");
    }

    function updateHeightBurger() {
      burger.style.maxHeight = `${window.visualViewport.height}px`;
    }

    window.visualViewport.addEventListener("resize", updateHeightBurger);
    window.visualViewport.addEventListener("scroll", updateHeightBurger);

    updateHeightBurger();
  }
}

export function handlerBurgerClose() {
  const burger = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");

  burger.classList.remove("_open");
  burgerOverlay.classList.remove("_active");
  document.body.classList.remove("body-hidden");
}
