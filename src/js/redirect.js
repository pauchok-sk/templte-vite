export default function redirect() {
  const buttons = document.querySelectorAll("[data-to]");

  if (buttons.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const to = btn.dataset.to;
        window.location.href = to;
      })
    })
  }
}