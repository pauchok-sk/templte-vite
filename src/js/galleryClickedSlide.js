export default function galleryClickedSlide() {
  const slides = document.querySelectorAll(".s-gallery__slide");

  if (slides.length) {
    const buttons = document
      .querySelector("#gallery-buttons")
      .querySelectorAll("a");
    slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        // buttons[index].click();
        const id = slide.dataset.gallery;
        const btn = Array.from(buttons).find(btn => btn.dataset.gallery === id);

        console.log(btn)

        if (btn) {
          btn.click();
        }
      });
    });
  }
}
