export default function headerScroll() {
  const header = document.querySelector(".header");

  if (header && window.matchMedia("(max-width: 991px)").matches) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > header.clientHeight && scrollTop > lastScrollTop) {
        header.classList.add("_hide");
      } else {
        header.classList.remove("_hide");
      }

      lastScrollTop = scrollTop;
    });
  }
}
