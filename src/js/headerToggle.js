import { closeHasChildrenMenu } from "./hasChildrenLists";

export default function headerToggle() {
  const header = document.querySelector(".header");
  const headerLine = document.querySelector(".header__line");

  if (header) {
    const btn = document.querySelector("#header-toggle-btn");

    header.addEventListener("click", (e) => e.stopPropagation());

    document.body.addEventListener("click", () => {
      if (header.classList.contains("_open")) {
        handleClose();
      }
    });

    btn.addEventListener("click", () => {
      if (btn.classList.contains("_close")) {
        handleClose();
      } else {
        handleOpen();
      }
    });

    function handleClose() {
      btn.classList.remove("_close");
      header.classList.remove("_open");
      document.body.classList.remove("body-hidden");
      closeHasChildrenMenu();
    }

    function handleOpen() {
      btn.classList.add("_close");
      header.classList.add("_open");
      document.body.classList.add("body-hidden");
    }

    function updateHeightHeader() {
      if (window.matchMedia("(min-width: 992px)").matches) {
        header.style.height = `${window.visualViewport.height}px`;
      } else {
        header.style.height = "auto";
      }
    }

    window.visualViewport.addEventListener("resize", updateHeightHeader);
    window.visualViewport.addEventListener("scroll", updateHeightHeader);

    updateHeightHeader();
  }
}
