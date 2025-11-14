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
          btn.addEventListener("click", () => {
            if (btn.classList.contains("_active")) {
              hide(content);
              btn.classList.remove("_active");
              item.classList.remove("_open");
              handleCloseChildren(item);
            } else {
              const itemScope = btn.closest("ul").querySelector(".menu-item-has-children._open");
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
function closeHasChildrenMenu() {
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
    };
    var handlerBurgerOpen = handlerBurgerOpen2;
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
  }
}
function handlerBurgerClose() {
  const burger2 = document.querySelector("#burger");
  const burgerOverlay = document.querySelector("#burger-overlay");
  burger2.classList.remove("_open");
  burgerOverlay.classList.remove("_active");
  document.body.classList.remove("body-hidden");
  closeHasChildrenMenu();
}
function headerToggle() {
  const header = document.querySelector(".header");
  document.querySelector(".header__line");
  if (header) {
    let handleClose2 = function() {
      btn.classList.remove("_close");
      header.classList.remove("_open");
      document.body.classList.remove("body-hidden");
      closeHasChildrenMenu();
    }, handleOpen2 = function() {
      btn.classList.add("_close");
      header.classList.add("_open");
      document.body.classList.add("body-hidden");
    }, updateHeightHeader2 = function() {
      if (window.matchMedia("(min-width: 992px)").matches) {
        header.style.height = `${window.visualViewport.height}px`;
      } else {
        header.style.height = "auto";
      }
    };
    var handleClose = handleClose2, handleOpen = handleOpen2, updateHeightHeader = updateHeightHeader2;
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
    window.visualViewport.addEventListener("resize", updateHeightHeader2);
    window.visualViewport.addEventListener("scroll", updateHeightHeader2);
    updateHeightHeader2();
  }
}
function sliders() {
  const newsSlider = document.querySelector(".s-news__slider");
  if (newsSlider) {
    new Swiper(newsSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      loop: true,
      loopedSlides: 3,
      centeredSlides: true,
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
        }
      }
    });
  }
  const gallerySlider = document.querySelector(".s-gallery__slider");
  if (gallerySlider) {
    new Swiper(gallerySlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: 1,
      loop: true,
      loopedSlides: 4,
      loopAdditionalSlides: 2,
      initialSlide: 1,
      pagination: {
        el: ".s-gallery .slider-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".s-gallery .slider-btn._next",
        prevEl: ".s-gallery .slider-btn._prev"
      },
      breakpoints: {
        992: {
          spaceBetween: 30,
          slidesPerView: 2
        },
        576: {
          spaceBetween: 15,
          slidesPerView: 2
        }
      },
      on: {
        transitionStart: () => {
          gallerySlider.querySelector(".swiper-wrapper").style.willChange = "transform";
        },
        transitionEnd: () => {
          gallerySlider.querySelector(".swiper-wrapper").style.willChange = "";
        }
      }
    });
  }
  const clergySlider = document.querySelector(".s-clergy__slider");
  if (clergySlider) {
    new Swiper(clergySlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      centeredSlides: true,
      initialSlide: 1,
      loop: true,
      loopedSlides: 2,
      pagination: {
        el: ".s-clergy .slider-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".s-clergy .slider-btn._next",
        prevEl: ".s-clergy .slider-btn._prev"
      },
      breakpoints: {
        992: {
          spaceBetween: 25,
          slidesPerView: 3,
          centeredSlides: false,
          initialSlide: 0
        },
        768: {
          spaceBetween: 15,
          slidesPerView: "auto",
          centeredSlides: true,
          initialSlide: 1
        }
      },
      on: {
        resize: function() {
          const isLaptop = window.matchMedia("(max-width: 991px)").matches;
          if (isLaptop && this.activeIndex !== 1) {
            setTimeout(() => {
              this.slideTo(1, 300);
            }, 50);
          }
        }
      }
    });
  }
  const usefulSlider = document.querySelector(".s-useful__slider");
  if (usefulSlider) {
    new Swiper(usefulSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      loop: true,
      loopedSlides: 4,
      centeredSlides: true,
      pagination: {
        el: ".s-useful .slider-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".s-useful .slider-btn._next",
        prevEl: ".s-useful .slider-btn._prev"
      },
      breakpoints: {
        992: {
          spaceBetween: 25,
          slidesPerView: 3,
          centeredSlides: false
        }
      }
    });
  }
  const dioceseSlider = document.querySelector(".s-diocese__slider");
  if (dioceseSlider) {
    new Swiper(dioceseSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      pagination: {
        el: ".s-diocese .slider-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".s-diocese .slider-btn._next",
        prevEl: ".s-diocese .slider-btn._prev"
      },
      breakpoints: {
        1200: {
          spaceBetween: 25,
          slidesPerView: 3,
          centeredSlides: false
        },
        992: {
          spaceBetween: 25,
          slidesPerView: 2,
          centeredSlides: false
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
function positionSliderButtons() {
  const sliderButtonsNews = document.querySelectorAll(".s-news .slider-btn");
  if (sliderButtonsNews.length) {
    handelePosition(".s-news .card-new__img", sliderButtonsNews);
    window.addEventListener(
      "resize",
      () => handelePosition(".s-news .card-new__img", sliderButtonsNews)
    );
  }
  const sliderButtonsClergy = document.querySelectorAll(
    ".s-clergy .slider-btn"
  );
  if (sliderButtonsClergy.length) {
    handelePosition(".s-clergy .card-team__gallery", sliderButtonsClergy);
    window.addEventListener(
      "resize",
      () => handelePosition(".s-clergy .card-team__gallery", sliderButtonsClergy)
    );
  }
  const sliderButtonsUseful = document.querySelectorAll(
    ".s-useful .slider-btn"
  );
  if (sliderButtonsUseful.length) {
    handelePosition(".s-useful .card-useful__gallery", sliderButtonsUseful);
    window.addEventListener("resize", () => {
      handelePosition(".s-useful .card-useful__gallery", sliderButtonsUseful);
    });
  }
  function handelePosition(targetSelector, arr) {
    setTimeout(() => {
      const target = document.querySelector(`${targetSelector}`);
      arr.forEach((btn) => {
        const offsetTop = target.clientHeight / 2;
        btn.style.top = `${offsetTop}px`;
      });
    }, 10);
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
      const track = player2.querySelector(".player-timeline-track");
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
          stylesChange(progress);
          input.value = progress;
        }
        const currentTimeFormatted = formatTime2(currentTime);
        const durationFormatted = finalDuration !== null ? formatTime2(finalDuration) : formatTime2(duration);
        time.innerHTML = `${currentTimeFormatted} / ${durationFormatted}`;
      });
      audio.addEventListener("ended", (e) => {
        btn.classList.remove("_active");
        btn.classList.add("_refresh");
        stylesChange(0);
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
        stylesChange(e.target.value);
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
      function stylesChange(progress) {
        circle.style.left = `${progress}%`;
        track.style.width = `${progress}%`;
      }
      function handlePlay() {
        audio.play().catch((error) => {
          console.error("Ошибка воспроизведения:", error);
        });
        btn.classList.add("_active");
        btn.classList.remove("_refresh");
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
class Scrollable {
  constructor(selector, options) {
    let defaultOptions = {
      wheelScrolling: true
    };
    this.container = document.querySelector(selector);
    this.options = Object.assign(defaultOptions, options);
    if (!this.container) {
      return;
    }
    this.childrensSize = Array.from(this.container.children).reduce((sum, item) => sum + item.offsetWidth, 0);
    this.container.classList.add("_scrollable");
    if (this.container.clientWidth < this.childrensSize) {
      this.container.style = "cursor: grab";
    }
    this.isDragging = false;
    this.startX = null;
    this.scrollLeft = null;
    this.events();
  }
  events() {
    if (this.container) {
      this.container.addEventListener("mousedown", (e) => {
        this.isDragging = true;
        this.container.style.cursor = "grabbing";
        this.startX = e.pageX - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
      });
      this.container.addEventListener("mouseup", (e) => {
        this.isDragging = false;
        this.container.style = "cursor: grab";
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
        this.container.style = "cursor: grab";
      });
      if (this.options.wheelScrolling) {
        this.container.addEventListener("mousewheel", (e) => {
          e.preventDefault();
          this.container.scrollLeft += e.deltaY;
        });
      }
    }
  }
}
function scrollables() {
  new Scrollable(".s-history__line-wrapper");
}
function map() {
  const maps = document.querySelectorAll(".map");
  if (maps.length) {
    maps.forEach((map2) => {
      const center = JSON.parse(map2.dataset.center);
      const zoom = Number(map2.dataset.zoom);
      const iconHref = map2.dataset.icon;
      let objectMark = {};
      if (iconHref) {
        objectMark = {
          iconLayout: "default#image",
          iconImageHref: iconHref,
          iconImageSize: [50, 50],
          iconImageOffset: [-25, -35]
        };
      }
      function init() {
        const htmlMap = new ymaps.Map(map2, {
          center,
          zoom
        });
        const placemark = new ymaps.Placemark(center, {}, objectMark);
        htmlMap.geoObjects.add(placemark);
        htmlMap.controls.remove("geolocationControl");
        htmlMap.controls.remove("searchControl");
        htmlMap.controls.remove("trafficControl");
        htmlMap.controls.remove("typeSelector");
        htmlMap.controls.remove("fullscreenControl");
        htmlMap.controls.remove("rulerControl");
        htmlMap.behaviors.disable(["scrollZoom"]);
      }
      ymaps.ready(init);
    });
  }
}
function galleryClickedSlide() {
  const slides = document.querySelectorAll(".s-gallery__slide");
  if (slides.length) {
    const buttons = document.querySelector("#gallery-buttons").querySelectorAll("a");
    slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        buttons[index].click();
      });
    });
  }
}
function ctxNone() {
  const buttons = document.querySelectorAll("a");
  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    });
  }
}
function redirect() {
  const buttons = document.querySelectorAll("[data-to]");
  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const to = btn.dataset.to;
        window.location.href = to;
      });
    });
  }
}
function formValid() {
  const formQuestion = document.querySelector("#form-question");
  if (formQuestion) {
    const inputName = formQuestion.querySelector("#form-question-name");
    const inputEmail = formQuestion.querySelector("#form-question-email");
    const inputText = formQuestion.querySelector("#form-question-text");
    const validate = new window.JustValidate("#form-question", {
      tooltip: false
    });
    validate.addField(inputName, [
      {
        rule: "required"
      }
    ]).addField(inputEmail, [
      {
        rule: "required"
      },
      {
        rule: "email"
      }
    ]).addField(inputText, [
      {
        rule: "required"
      }
    ]).onSuccess((e) => {
      e.target.reset();
      console.log("Форма отправлена");
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  spoller();
  hasChildrenLists();
  headerToggle();
  burger();
  sliders();
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
    thumbs: false
  });
});
