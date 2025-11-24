import { closeHasChildrenMenu } from "./hasChildrenLists";

export default function burger() {
  const burgerOpen = document.querySelector("#burger-open");
  const burgerClose = document.querySelector("#burger-close");
  const burger = document.querySelector("#burger");
  // const burgerOverlay = document.querySelector("#burger-overlay");
  const burgerBody = document.querySelector("#burger-body");

  if (burger) {
    window.addEventListener("resize", () => {
      if (
        window.matchMedia("(min-width: 992px)").matches &&
        burger.classList.contains("_open")
      ) {
        handlerBurgerClose();
      }
    });

    screen.orientation.addEventListener("change", function () {
      handlerBurgerClose();
    });

    burgerBody.addEventListener("click", (e) => e.stopPropagation());

    burger.addEventListener("click", handlerBurgerClose);

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
      // burgerOverlay.classList.add("_active");
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

  burger.classList.remove("_open");
  document.body.classList.remove("body-hidden");

  closeHasChildrenMenu();
}
