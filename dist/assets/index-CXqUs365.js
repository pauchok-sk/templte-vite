(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function burger() {
  const burgerOpen = document.querySelector("#burger-open");
  const burgerClose = document.querySelector("#burger-close");
  const burger2 = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");
  if (burger2) {
    let handlerBurgerOpen2 = function() {
      burger2.classList.add("_open");
      burgerOverlay.classList.add("_active");
      document.body.classList.add("body-hidden");
    }, updateHeightBurger2 = function() {
      burger2.style.maxHeight = `${window.visualViewport.height}px`;
    };
    var handlerBurgerOpen = handlerBurgerOpen2, updateHeightBurger = updateHeightBurger2;
    burger2.addEventListener("click", (e) => e.stopPropagation());
    burgerOverlay.addEventListener("click", handlerBurgerClose);
    burgerOpen.addEventListener("click", (e) => {
      e.stopPropagation();
      handlerBurgerOpen2();
    });
    burgerClose.addEventListener("click", (e) => {
      e.stopPropagation();
      handlerBurgerClose();
    });
    window.visualViewport.addEventListener("resize", updateHeightBurger2);
    window.visualViewport.addEventListener("scroll", updateHeightBurger2);
    updateHeightBurger2();
  }
}
function handlerBurgerClose() {
  const burger2 = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");
  burger2.classList.remove("_open");
  burgerOverlay.classList.remove("_active");
  document.body.classList.remove("body-hidden");
}
function headerScroll() {
  const header = document.querySelector(".header");
  if (header && window.matchMedia("(max-width: 991px)").matches) {
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > header.clientHeight && scrollTop > lastScrollTop) {
        header.classList.add("_hide");
      } else {
        header.classList.remove("_hide");
      }
      lastScrollTop = scrollTop;
    });
  }
}
function headerToggle() {
  const header = document.querySelector(".header");
  if (header) {
    let handleClose2 = function() {
      btn.classList.remove("_close");
      header.classList.remove("_open");
    }, handleOpen2 = function() {
      btn.classList.add("_close");
      header.classList.add("_open");
    };
    var handleClose = handleClose2, handleOpen = handleOpen2;
    const btn = document.querySelector("#header-toggle-btn");
    header.addEventListener("click", (e) => e.stopPropagation());
    document.body.addEventListener("click", () => {
      if (header.classList.contains("_open")) {
        handleClose2();
      }
    });
    btn.addEventListener("click", () => {
      if (btn.classList.contains("_close")) {
        handleClose2();
      } else {
        handleOpen2();
      }
    });
  }
}
function sliders() {
  const newsSlider = document.querySelector(".s-news__slider");
  if (newsSlider) {
    new Swiper(newsSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: 1.1,
      loop: true,
      loopedSlides: 3,
      centeredSlides: true,
      autplay: {
        delay: 3500
      },
      pagination: {
        el: ".s-news .slider-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".s-news .slider-btn._next",
        prevEl: ".s-news .slider-btn._prev"
      },
      breakpoints: {
        992: {
          spaceBetween: 25,
          slidesPerView: 3
        },
        768: {
          spaceBetween: 15,
          slidesPerView: 3
        },
        480: {
          spaceBetween: 15,
          slidesPerView: 2
        }
      }
    });
  }
}
function spoller() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    let initSpollers2 = function(spollersArray2, matchMedia = false) {
      spollersArray2.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody2(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction2);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody2(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction2);
        }
      });
    }, initSpollerBody2 = function(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter(
          (item) => item.closest("[data-spollers]") === spollersBlock
        );
        spollerTitles.forEach((spollerTitle) => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }, setSpollerAction2 = function(e) {
      const el = e.target;
      if (el.closest("[data-spoller]")) {
        const spollerTitle = el.closest("[data-spoller]");
        const spollersBlock = spollerTitle.closest("[data-spollers]");
        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
            hideSpollersBody2(spollersBlock);
          }
          spollerTitle.classList.toggle("_spoller-active");
          _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
        }
        e.preventDefault();
      }
    }, hideSpollersBody2 = function(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        spollerActiveTitle.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    };
    var initSpollers = initSpollers2, initSpollerBody = initSpollerBody2, setSpollerAction = setSpollerAction2, hideSpollersBody = hideSpollersBody2;
    const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    });
    if (spollersRegular.length) {
      initSpollers2(spollersRegular);
    }
    let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        mdQueriesItem.matchMedia.addEventListener("change", function() {
          initSpollers2(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initSpollers2(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", function(e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose) => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");
            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          });
        }
      });
    }
  }
  function dataMediaQueries(array, dataSetValue) {
    const media = Array.from(array).filter(function(item, index, self) {
      if (item.dataset[dataSetValue]) {
        return item.dataset[dataSetValue].split(",")[0];
      }
    });
    if (media.length) {
      const breakpointsArray = [];
      media.forEach((item) => {
        const params = item.dataset[dataSetValue];
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });
      let mdQueries = breakpointsArray.map(function(item) {
        return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];
      if (mdQueries.length) {
        mdQueries.forEach((breakpoint) => {
          const paramsArray = breakpoint.split(",");
          const mediaBreakpoint = paramsArray[1];
          const mediaType = paramsArray[2];
          const matchMedia = window.matchMedia(paramsArray[0]);
          const itemsArray = breakpointsArray.filter(function(item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
              return true;
            }
          });
          mdQueriesArray.push({
            itemsArray,
            matchMedia
          });
        });
        return mdQueriesArray;
      }
    }
  }
  let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = !showmore ? true : false;
        !showmore ? target.style.removeProperty("height") : null;
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        !showmore ? target.style.removeProperty("overflow") : null;
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
        document.dispatchEvent(
          new CustomEvent("slideUpDone", {
            detail: {
              target
            }
          })
        );
      }, duration);
    }
  };
  let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty("height") : null;
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
        document.dispatchEvent(
          new CustomEvent("slideDownDone", {
            detail: {
              target
            }
          })
        );
      }, duration);
    }
  };
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };
  function uniqArray(array) {
    return array.filter(function(item, index, self) {
      return self.indexOf(item) === index;
    });
  }
}
function hide(target, duration = 300, showmore = 0) {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(
        new CustomEvent("slideUpDone", {
          detail: {
            target
          }
        })
      );
    }, duration);
  }
}
function show(target, duration = 300, showmore = 0) {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(
        new CustomEvent("slideDownDone", {
          detail: {
            target
          }
        })
      );
    }, duration);
  }
}
function hasChildrenLists() {
  const lists = document.querySelectorAll(".has-children-list");
  if (lists.length) {
    lists.forEach((list) => {
      const items = list.querySelectorAll(".menu-item-has-children");
      if (items.length) {
        items.forEach((item) => {
          const content = item.querySelector(".content");
          const btn = item.querySelector(".btn");
          hide(content);
          btn.addEventListener("click", () => {
            if (btn.classList.contains("_active")) {
              hide(content);
              btn.classList.remove("_active");
            } else {
              show(content);
              btn.classList.add("_active");
            }
          });
        });
      }
    });
  }
}
function positionSliderButtonsNews() {
  const sliderButtons = document.querySelectorAll(".s-news .slider-btn");
  if (sliderButtons.length) {
    let handelePosition2 = function() {
      const img = document.querySelector(".s-news .card-new__img");
      sliderButtons.forEach((btn) => {
        const offsetTop = img.clientHeight / 2 - btn.clientHeight / 2;
        btn.style.top = `${offsetTop}px`;
      });
    };
    var handelePosition = handelePosition2;
    handelePosition2();
    window.addEventListener("resize", handelePosition2);
  }
}
function player() {
  const players = document.querySelectorAll(".player");
  if (players.length) {
    let formatTime2 = function(seconds) {
      if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
        return "00:00";
      }
      seconds = Math.floor(seconds);
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    var formatTime = formatTime2;
    players.forEach((player2) => {
      const btn = player2.querySelector(".player-btn");
      const audio = player2.querySelector(".player-audio");
      const circle = player2.querySelector(".player-timeline-circle");
      const input = player2.querySelector(".player-timeline-input");
      const time = player2.querySelector(".player-time");
      let isDragInput = false;
      let finalDuration = null;
      audio.addEventListener("loadedmetadata", () => {
        finalDuration = Math.floor(audio.duration);
        updateTimeDisplay();
      });
      function updateTimeDisplay() {
        const currentTime = formatTime2(audio.currentTime);
        const duration = finalDuration !== null ? formatTime2(finalDuration) : "00:00";
        time.innerHTML = `${currentTime} / ${duration}`;
      }
      audio.addEventListener("timeupdate", (e) => {
        const currentTime = Math.floor(e.target.currentTime);
        const duration = finalDuration !== null ? finalDuration : Math.floor(e.target.duration);
        const progress = duration > 0 ? currentTime / duration * 100 : 0;
        if (!isDragInput) {
          circle.style.left = `${progress}%`;
          input.value = progress;
        }
        const currentTimeFormatted = formatTime2(currentTime);
        const durationFormatted = finalDuration !== null ? formatTime2(finalDuration) : formatTime2(duration);
        time.innerHTML = `${currentTimeFormatted} / ${durationFormatted}`;
      });
      audio.addEventListener("ended", (e) => {
        btn.classList.remove("_active");
        if (finalDuration !== null) {
          time.innerHTML = `${formatTime2(finalDuration)} / ${formatTime2(
            finalDuration
          )}`;
        }
      });
      input.addEventListener("change", (e) => {
        isDragInput = false;
        const duration = finalDuration !== null ? finalDuration : audio.duration;
        if (duration > 0 && isFinite(duration)) {
          const value = +e.target.value;
          const audioCurrentTime = duration * (value / 100);
          if (isFinite(audioCurrentTime) && audioCurrentTime >= 0) {
            audio.currentTime = Math.min(audioCurrentTime, duration);
          }
        }
      });
      input.addEventListener("input", (e) => {
        isDragInput = true;
        circle.style.left = `${e.target.value}%`;
        const duration = finalDuration !== null ? finalDuration : audio.duration;
        if (duration > 0) {
          const value = +e.target.value;
          const audioCurrentTime = duration * (value / 100);
          const currentTime = formatTime2(audioCurrentTime);
          const durationFormatted = formatTime2(duration);
          time.innerHTML = `${currentTime} / ${durationFormatted}`;
        }
      });
      btn.addEventListener("click", () => {
        if (audio.paused) {
          handlePlay();
        } else {
          handlePause();
        }
      });
      function handlePlay() {
        audio.play().catch((error) => {
          console.error("Ошибка воспроизведения:", error);
        });
        btn.classList.add("_active");
      }
      function handlePause() {
        audio.pause();
        btn.classList.remove("_active");
      }
      if (audio.readyState > 0) {
        finalDuration = Math.floor(audio.duration);
        updateTimeDisplay();
      }
    });
  }
}
function dropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");
  if (dropdowns.length) {
    document.body.addEventListener("click", () => {
      const openDropdown = document.querySelector(".dropdown._open");
      if (openDropdown) {
        openDropdown.classList.remove("_open");
      }
    });
    dropdowns.forEach((dropdown2) => {
      dropdown2.addEventListener("click", (e) => e.stopPropagation());
      const btn = dropdown2.querySelector(".dropdown-btn");
      btn.addEventListener("click", (e) => {
        dropdown2.classList.toggle("_open");
      });
    });
  }
}
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
});
