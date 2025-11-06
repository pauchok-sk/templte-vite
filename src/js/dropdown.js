export default function dropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");

  if (dropdowns.length) {

    document.body.addEventListener("click", () => {
      const openDropdown = document.querySelector(".dropdown._open");

      if (openDropdown) {
        openDropdown.classList.remove("_open");
      }
    })

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", (e) => e.stopPropagation());

      const btn = dropdown.querySelector(".dropdown-btn");

      btn.addEventListener("click", (e) => {
        // e.stopPropagation()
        dropdown.classList.toggle("_open");
      });
    });
  }
}
