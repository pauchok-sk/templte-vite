export default class Scrollable {
  constructor(selector, options) {
    let defaultOptions = {
      wheelScrolling: true,
    };
    this.container = document.querySelector(selector);
    this.options = Object.assign(defaultOptions, options);

    if (!this.container) {
      return;
    }

    this.childrensSize = 0;
    this.isScroll = false;

    this.container.classList.add("_scrollable");

    this.resize();

    window.addEventListener("resize", () => this.resize());

    this.isDragging = false;
    this.startX = null;
    this.scrollLeft = null;

    this.events();
  }

  events() {
    if (this.container) {
      this.container.addEventListener("mousedown", (e) => {
        this.isDragging = true;
        if (this.isScroll) {
          this.container.style.cursor = "grabbing";
        }

        this.startX = e.pageX - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
      });

      this.container.addEventListener("mouseup", (e) => {
        this.isDragging = false;
        if (this.isScroll) {
          this.container.style = "cursor: grab";
        }
      });

      this.container.addEventListener("mousemove", (e) => {
        if (!this.isDragging) return;

        const x = e.pageX - this.container.offsetLeft;
        const walkX = (x - this.startX) * 1;
        this.container.scrollLeft = this.scrollLeft - walkX;
      });

      this.container.addEventListener("mouseleave", (e) => {
        if (this.isDragging) {
          this.isDragging = false;
        }
      });

      if (this.options.wheelScrolling) {
        this.container.addEventListener("mousewheel", (e) => {
          if (this.isScroll) {
            e.preventDefault();
            this.container.scrollLeft += e.deltaY;
          }
        });
      }
    }
  }
  resize() {
    this.childrensSize = Array.from(this.container.children).reduce(
      (sum, item) => sum + item.offsetWidth,
      0
    );

    if (this.container.clientWidth < this.childrensSize) {
      this.container.style = "cursor: grab";
      this.isScroll = true;
    } else {
      this.container.style = "cursor: auto";
      this.isScroll = false;
    }
  }
}
