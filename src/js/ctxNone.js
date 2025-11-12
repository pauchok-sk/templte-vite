export default function ctxNone() {
  const buttons = document.querySelectorAll("a");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    });
  }
}
