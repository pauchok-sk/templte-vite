export default function galleryClickedSlide() {
  const slides = document.querySelectorAll(".s-gallery__slide");

  if (slides.length) {
    const buttons = document
      .querySelector("#gallery-buttons")
      .querySelectorAll("a");
    slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        buttons[index].click();
      });
    });
  }
}
