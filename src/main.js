import "./style.scss";
import burger from "./js/burger.js";
import headerScroll from "./js/headerScroll.js";
import headerToggle from "./js/headerToggle.js";
import sliders from "./js/sliders.js";
import spoller from "./js/spoller.js";
import hasChildrenLists from "./js/hasChildrenLists.js";
import positionSliderButtonsNews from "./js/positionSliderButtonsNews.js";
import player from "./js/player.js";
import dropdown from "./js/dropdown.js";


document.addEventListener("DOMContentLoaded", () => {
  spoller();
  hasChildrenLists();
  headerToggle();
  burger();
  sliders();
  headerScroll();
  positionSliderButtonsNews();
  player();
  dropdown();
})