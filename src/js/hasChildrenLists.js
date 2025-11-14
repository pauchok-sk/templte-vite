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

              // закрываем дочерние спойлеры при закрытии родительского
              handleCloseChildren(item);
            } else {
              const itemScope = btn
                .closest("ul")
                .querySelector(".menu-item-has-children._open");
              if (itemScope) {
                const scopeBtn = itemScope.querySelector(".btn");
                const scopeContent = itemScope.querySelector(".content");
                itemScope.classList.remove("_open");
                scopeBtn.classList.remove("_active");
                hide(scopeContent);

                handleCloseChildren(itemScope);
              }

              show(content);
              btn.classList.add("_active");
              item.classList.add("_open");
            }
          });

          function handleCloseChildren(parent) {
            const childrenItemsOpen = parent.querySelectorAll(
              ".menu-item-has-children._open"
            );
            if (childrenItemsOpen.length) {
              console.log(childrenItemsOpen);
              childrenItemsOpen.forEach((children) => {
                const contentChildren = children.querySelector(".content");
                const btnChildren = children.querySelector(".btn");

                hide(contentChildren);
                btnChildren.classList.remove("_active");
                children.classList.remove("_open");
              });
            }
          }
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
