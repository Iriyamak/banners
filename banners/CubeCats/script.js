//////////////////////
// LEMONPI CALLBACK //
//////////////////////

// Set values from LemonPI Manage-r


// Debug:
// video = $('.videoSecond').append('<video muted style="width:450px;" src="./video.mp4"></video>').find('video')[0];

window.swiper = new Swiper(".swiper", {
  autoplay: {
    stopOnLastSlide: true,
    delay: 6000,
  },
  grabCursor: true,

  effect: "cube",
  // loop: false,
  stopOnLastSlide: true,
  speed: 600, // 800,
  shortSwipes: true,
  edgeSwipeThreshold: 0.01,

  longSwipes: false,
  longSwipesMs: 50,
  longSwipesRatio: 0.01,

  loopPreventsSlide: true,
  edgeSwipeDetection: true,
  nested: true,
  observer: true,

  preventInteractionOnTransition: true,

  touchMoveStopPropagation: true,
  touchReleaseOnEdges: true,
  touchStartForcePreventDefault: true,

  resistanceRatio: 0.01,
  resizeObserver: false,

  navigation: {
    nextEl: "#navigation-next",
    prevEl: "#navigation-prev",
  },

  cubeEffect: {
    slideShadows: false, // true,
    // shadowScale: 0.34,
    // shadowOffset: 20,
    shadow: false, // true,
  },

  on: {
    slideChange: function (event) {
      event.touches.diff > 0 &&
        setTimeout(function () {
          if (nextClick)
            return setTimeout(function () {
              nextClick = false;
            });

          var duplicate = document.querySelector(
            ".swiper-slide-prev.swiper-slide-duplicate-next"
          );
          duplicate &&
            duplicate.classList.remove("swiper-slide-duplicate-next");
          duplicate && duplicate.classList.remove("swiper-slide-prev");
        });
    },

    touchStart: function (swiper, event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      var left = event.currentTarget.offsetLeft;
      start = event.clientX || event.touches[0].clientX;

      var lStart = threshold + 5;
      var rStart = threshold - 5;

      var l = start - left > lStart;
      var r = start - left < window.swiper.width - rStart;

      window.swiper.allowTouchMove = l && r;
    },

    touchMove: function (swiper, event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (!window.swiper.allowTouchMove) return;
      var clientX = event.clientX || event.touches[0].clientX;

      if (Math.abs(clientX - start) > threshold) {
        var direction = -Math.sign(clientX - start);

        if (!swiper.activeIndex && direction < 0) return;
        if (swiper.activeIndex === 3 && direction > 0) return;

        setTimeout(function () {
          start = clientX;
          window.swiper.allowTouchMove = false;
          window.swiper.slideTo(swiper.activeIndex + direction, 600);
        });
      }
    },

    touchEnd: function (swiper, event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.swiper.enabled = true;
      window.swiper.allowTouchMove = false;
    },
  },
});

document
  .getElementById("navigation-prev")
  .addEventListener("click", function () {
    setTimeout(function () {
      var duplicate = document.querySelector(
        ".swiper-slide-prev.swiper-slide-duplicate-next"
      );
      duplicate && duplicate.classList.remove("swiper-slide-duplicate-next");
      duplicate && duplicate.classList.remove("swiper-slide-prev");
    });
  });

document
  .getElementById("navigation-next")
  .addEventListener("click", function () {
    nextClick = true;
  });
