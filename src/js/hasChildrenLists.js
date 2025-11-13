import { hide, show } from "./helpFunctions.js";

export default function hasChildrenLists() {
  const lists = document.querySelectorAll(".has-children-list");

  if (lists.length) {
    lists.forEach((list) => {
      const items = list.querySelectorAll(".menu-item-has-children");

      if (items.length) {
        items.forEach((item) => {
          const content = item.querySelector(".content");
          const btn = item.querySelector(".btn");

          // hide(content);

          btn.addEventListener("click", () => {
            if (btn.classList.contains("_active")) {
              hide(content);
              btn.classList.remove("_active");
              item.classList.remove("_open");

              const childrenItemsOpen = item.querySelectorAll(
                ".menu-item-has-children._open"
              );
              if (childrenItemsOpen) {
                childrenItemsOpen.forEach((children) => {
                  const contentChildren = children.querySelector(".content");
                  const btn = children.querySelector(".btn");

                  hide(contentChildren);
                  btn.classList.remove("_active");
                  children.classList.remove("_open");
                });
              }
            } else {
              const openMenu = btn
                .closest("ul")
                .querySelector(".menu-item-has-children._open");

              if (openMenu) {
                const openMenuBtn = openMenu.querySelector(".btn");
                const openMenuContent = openMenu.querySelector(".content");
                openMenu.classList.remove("_open");
                openMenuBtn.classList.remove("_active");
                hide(openMenuContent);
              }

              show(content);
              btn.classList.add("_active");
              item.classList.add("_open");
            }
          });
        });
      }
    });
  }
}

export function closeHasChildrenMenu() {
  const menus = document.querySelectorAll(".menu-item-has-children._open");

  if (menus.length) {
    menus.forEach((menu) => {
      const content = menu.querySelector(".content");
      const btn = menu.querySelector(".btn");

      hide(content);
      menu.classList.remove("_open");
      btn.classList.remove("_active");
    });
  }
}
