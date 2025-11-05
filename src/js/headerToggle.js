export default function headerToggle() {
  const header = document.querySelector(".header");

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
    }

    function handleOpen() {
      btn.classList.add("_close");
      header.classList.add("_open");
    }
  }
}
