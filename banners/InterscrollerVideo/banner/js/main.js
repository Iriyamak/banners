/*
 justpremium_format_template v1.5.1 2022-07-20 
 */

"use strict";
var Premium = Premium || {};

Premium.creative = {
  init: function () {
    Premium.product.initOrientationMessage();
    /* START OF CUSTOM JS */

    /* Premium.utils.blockScroll --------------------------------------------------- */
    Premium.utils.blockScroll = new (function () {
      var yOffset;
      var blockScrollHandler = function (e) {
        window.top.scrollTo(0, yOffset);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      };
      var block = (this.block = function (block) {
        yOffset = window.top.pageYOffset;
        try {
          if (block) {
            window.top.addEventListener("scroll", blockScrollHandler, {
              passive: false,
            });
            window.addEventListener("scroll", blockScrollHandler, {
              passive: false,
            });
            window.top.addEventListener("wheel", blockScrollHandler, {
              passive: false,
            });
            window.addEventListener("wheel", blockScrollHandler, {
              passive: false,
            });
          } else {
            window.top.removeEventListener("scroll", blockScrollHandler, {
              passive: false,
            });
            window.removeEventListener("scroll", blockScrollHandler, {
              passive: false,
            });
            window.top.removeEventListener("wheel", blockScrollHandler, {
              passive: false,
            });
            window.removeEventListener("wheel", blockScrollHandler, {
              passive: false,
            });
          }
        } catch (e) {}
      });
      window.addEventListener("unload", function () {
        block(false);
      });
    })();
    /* Premium.utils.blockScroll END ----------------------------------------------- */

    Premium.creative.createVideoPlayerAppended = function (video) {
      if (document.body.id === "body_expanded") {
        if (video.readyState > 2) {
          document.body.style.opacity = 1;
        } else {
          video.addEventListener("playing", function () {
            document.body.style.opacity = 1;
          });
        }
      }
      Premium.video.pauseWhenOutOfView();
    };

    if (document.body.id === "body_expanded") {
      // Expanded panel --------------------------------------------------------
      Premium.utils.blockScroll.block(true);
    } else {
      // Main panel ------------------------------------------------------------
      var entranceAnimation = Premium.template.getEntranceAnimations();
      console.log(Premium.template);
      var buttonExpandableEl = document.querySelector(".jpt-button-expandable");
      var buttonSmallPrintEl = document.querySelector(".jpt-button-legals");
      var smallPrintEl = document.querySelector(".jpt-legals");
      var carouselEl = document.querySelector("[jp-carousel]");
      var sectionCountdownEl = document.querySelector(".jpt-section-countdown");
      var hasPlayedAnimation;
      var isSmallPrintOpen = false;

      gsap.set(".jpt-kv-image", { xPercent: -50, yPercent: -50 });

      if (buttonExpandableEl) {
        buttonExpandableEl.addEventListener("click", function () {
          Premium.expand.expand(
            "expanded.html",
            "width:100%;height:100%;background:black"
          );
          Premium.utils.blockScroll.block(true);
        });
        Premium.expand.callOnClosed(function () {
          Premium.utils.blockScroll.block(false);
        }, "myid");
      }

      if (buttonSmallPrintEl) {
        buttonSmallPrintEl.addEventListener("click", function () {
          toggleOpenSmallPrint();
        });

        function toggleOpenSmallPrint() {
          isSmallPrintOpen = !isSmallPrintOpen;
          if (isSmallPrintOpen) {
            gsap.set(buttonSmallPrintEl.querySelector("IMG"), {
              rotation: 180,
            });
            smallPrintEl.classList.add("hidden");
          } else {
            gsap.set(buttonSmallPrintEl.querySelector("IMG"), { rotation: 0 });
            smallPrintEl.classList.remove("hidden");
          }
          resizeHandler();
        }
      }

      if (carouselEl) {
        var carousel = JPCarousel.getObject("[jp-carousel]");
        var carouselLabels = [
          "Label 1",
          "Label 2",
          "Label Three",
          "Label Four",
        ];
        JPCarousel.callOnReady(
          document.querySelector("[jp-carousel]"),
          function () {
            var carousel = JPCarousel.getObject("[jp-carousel]");
            Premium.template.fixjpUrls(carousel);
            carousel.setCallOnShowItem(function (index) {
              gsap
                .timeline()
                .to(".jp-carousel ~ .jpt-p", 0.2, { opacity: 0 })
                .add(function () {
                  document.querySelector(".jp-carousel ~ .jpt-p").innerText =
                    carouselLabels[index];
                })
                .to(".jp-carousel ~ .jpt-p", 0.4, { opacity: 1 });
            });
          }
        );
      }

      if (sectionCountdownEl) {
        var endDate = new Date("June 30 2022 09:00:00");
        Premium.template.setCountdownLanguage("en");
        endDate.setMinutes(-endDate.getTimezoneOffset());
        var jpCountdown = new JPCountdown(".jpt-countdown", endDate);
        jpCountdown.on("update", function (timeInfo, totalSecondsLeft) {
          timeInfo = Premium.template.convertCountdownTime(totalSecondsLeft);
          if (timeInfo.wholeDays > 0) {
            sectionCountdownEl
              .querySelector(".jpt-countdown")
              .classList.add("narrow");
          } else {
            sectionCountdownEl
              .querySelector(".jpt-countdown")
              .classList.remove("narrow");
          }
          sectionCountdownEl.querySelector(
            ".jpt-countdown-days-container"
          ).style.display = timeInfo.wholeDays > 0 ? "flex" : "none";
          sectionCountdownEl.querySelector(".jp-countdown-days").innerHTML =
            timeInfo.wholeDays;
          sectionCountdownEl.querySelector(".jp-countdown-hours").innerHTML =
            timeInfo.wholeHours;
        });
        jpCountdown.start();
      }

      var bgVideo = document.querySelector(".jpt-bg video");
      if (bgVideo) {
        Premium.template.bgVideoLoop(bgVideo);
      }

      function resizeHandler() {
        if (buttonSmallPrintEl) {
          if (isSmallPrintOpen) {
            requestAnimationFrame(function () {
              gsap.to(smallPrintEl, 0.3, { height: smallPrintEl.scrollHeight });
            });
          } else {
            gsap.to(smallPrintEl, 0.3, { height: "35%" });
          }
        }
        Premium.template.constrainCta(
          document.querySelector(".jpt-cta"),
          0.9,
          0.49
        );
        Premium.template.constrainLogo(
          document.querySelector(".jpt-logo"),
          0.9,
          2.75,
          undefined,
          true
        );
      }

      function scrollHandler() {
        if (
          !hasPlayedAnimation &&
          Premium.jpxApi.getPercentageVisibility() > 80
        ) {
          hasPlayedAnimation = true;
          entranceAnimation.play();

          // start our animatiom
          document.querySelector(".jpt-bg").insertAdjacentHTML(
            "afterbegin",
            `
          <video class="back-video" playsInline autoPlay muted loop>
      <source
        src="./assets/pexels-rodnae-productions-8489214.mp4"
        type="video/mp4"
        
      />
    </video>`
          );
          document
            .querySelectorAll(".text-wrapper p:last-of-type ")
            .forEach((el) => el.classList.add("active"));

          animationText(".word-by-letter");
          animationText(".word-by-letter1");
          opacityText(".text-wrapper p:first-of-type.word-by-letter");
          opacityText(".text-wrapper p:first-of-type.word-by-letter1");
          animationText2();

          // end our animation
          if (carousel) carousel.autoShowTimer(3000);
          if (Premium.template.initButtonEffects) {
            Premium.template.initButtonEffects();
          }
          resizeHandler();
        }
      }

      window.addEventListener("resize", resizeHandler);
      window.addEventListener("load", scrollHandler);
      Premium.product.scopeWindow.addEventListener("scroll", scrollHandler);

      /* END OF CUSTOM JS */
    }
  },
};

function animationText(text) {
  gsap.registerPlugin(SplitText);
  var tl = gsap.timeline(),
    mySplitText = new SplitText(text, { type: "words,chars" }),
    chars = mySplitText.chars; //an array of all the divs that wrap each character
  TweenMax.to(chars, 1, {
    scale: 1.3,
    ease: Power0.easeNone,
    delay: 0.8,
    stagger: 0.1,
  });

  TweenMax.to(chars, 1, {
    scale: 1,
    ease: Power0.easeNone,
    delay: 1.0,
    stagger: 0.1,
  });
}

function animationText2() {
  gsap.registerPlugin(SplitText);
  var tl = gsap.timeline(),
    mySplitText = new SplitText(".text-2", { type: "words,chars" }),
    chars = mySplitText.chars; //an array of all the divs that wrap each character
  TweenMax.to(chars, 0.3, {
    scale: 1.1,
    ease: Power0.easeNone,
    delay: 4,
    stagger: 0.03,
    transformOrigin: "center center",
  });
  TweenMax.to(chars, 0.3, {
    scale: 1,
    ease: Power0.easeNone,
    delay: 5,
    stagger: 0.03,
    transformOrigin: "center center",
  });
}

function opacityText(div) {
  gsap.registerPlugin(SplitText);
  var tl = gsap.timeline(),
    mySplitText = new SplitText(div, { type: "words,chars" }),
    chars = mySplitText.chars; //an array of all the divs that wrap each character
  TweenMax.to(chars, 3, {
    opacity: 0,
    ease: Power0.easeNone,
    delay: 1.2,
    stagger: 0.01,
  });
}
