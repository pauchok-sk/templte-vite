import "./style.scss";
import burger from "./js/burger.js";
import headerScroll from "./js/headerScroll.js";
import headerToggle from "./js/headerToggle.js";
import sliders from "./js/sliders.js";
import spoller from "./js/spoller.js";
import hasChildrenLists from "./js/hasChildrenLists.js";
import positionSliderButtons from "./js/positionSliderButtons.js";
import player from "./js/player.js";
import dropdown from "./js/dropdown.js";
import scrollables from "./js/scrollables.js";
import map from "./js/map.js";
import galleryClickedSlide from "./js/galleryClickedSlide.js";
import ctxNone from "./js/ctxNone.js";
import redirect from "./js/redirect.js";
import formValid from "./js/formValid.js";

document.addEventListener("DOMContentLoaded", () => {
  spoller();
  hasChildrenLists();
  headerToggle();
  burger();
  sliders();
  // headerScroll();
  positionSliderButtons();
  player();
  dropdown();
  scrollables();
  map();
  galleryClickedSlide();
  ctxNone();
  redirect();
  formValid();

  Fancybox.bind("[data-fancybox]", {
    thumbs: false,
  });

  alert("JavaScript работает!");
});
