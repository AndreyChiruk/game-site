if (window.innerWidth >= 1000) {
  let scrollCouner = 0;
  let scrollCouner1 = 0;

  function scrollSlide(args) {
    //args.container, args.item, args.animType, args.duration, args.delay, args.uncutMove
    const scrollContainerEle = document.querySelector(args.container);
    const scrollItems = Array.from(document.querySelectorAll(`${args.container} ${args.item}`));

    let allowAnimation = true;
    let allowAnimationTimeout;

    // NOTE:
    // INNER FUNCTIONS DECLARATION
    function addAnimationClasses() {
      scrollItems.forEach((item) => {
        item.classList.add(args.animType);
      });
    }

    function addLoppAnimClasses() {
      let activeItem = scrollItems.find((item) => item.classList.contains("active"));

      let nextItem = scrollItems[scrollItems.indexOf(activeItem) + 1];
      let prevItem = scrollItems[scrollItems.indexOf(activeItem) - 1];

      if (!nextItem) {
        nextItem = scrollItems[0];
      }

      if (!prevItem) {
        prevItem = scrollItems[scrollItems.length - 1];
      }

      console.log("%c Remove Classes", "background-color: red;");
      scrollItems.forEach((item) => {
        item.classList.remove("ss-move-prev");
        item.classList.remove("ss-move-next");
      });

      nextItem.classList.add("ss-move-next");
      prevItem.classList.add("ss-move-prev");
      
      scrollCouner++;
      if (scrollCouner > 1) {
        function fade() {
          document.querySelector(".show-wrapper").classList.add("animate__animated", "animate__fadeIn", "animate__slower");
          scrollCouner = 1;
        }
        setTimeout(fade, 100);
      }

      scrollCouner1++;
      if (scrollCouner1 > 2) {
        function fade1() {
          document.querySelector(".about-chorse-wrapper").classList.add("animate__animated", "animate__fadeIn", "animate__slower");
          scrollCouner1 = 1;
        }
        setTimeout(fade1, 100);
      }
    }

    function addAnimationDuration() {
      scrollItems.forEach((item) => {
        item.style.transitionDuration = `${args.duration}s`;
        addAnimationDelay(item);
      });
    }

    function addAnimationDelay(item) {
      item.style.transitionDelay = `${args.delay}s`;
    }

    function stopScrollAnim() {
      if (allowAnimation) {
        allowAnimation = false;
      }
      allowAnimationTimeout = setTimeout(() => {
        allowAnimation = true;

        scrollItems.forEach((item) => {
          item.classList.remove("ss-moving");
        });
      }, (args.duration + args.delay) * 1000);
    }

    function changeScrollSlide(moveDown) {
      let activeItem = scrollItems.find((item) => item.classList.contains("active"));
      let nextItem;

      if (moveDown) {
        nextItem = scrollItems[scrollItems.indexOf(activeItem) + 1];
      } else {
        nextItem = scrollItems[scrollItems.indexOf(activeItem) - 1];
      }

      if (nextItem) {
        activeItem.classList.add("ss-moving");
        nextItem.classList.add("ss-moving");
        activeItem.classList.remove("active");
        nextItem.classList.add("active");
        nextItem.classList.add("active");

        if (args.uncutMove) {
          addLoppAnimClasses();
        }
      } else {
        activeItem.classList.add("ss-moving");
        activeItem.classList.remove("active");

        if (moveDown) {
          scrollItems[0].classList.add("ss-moving");
          scrollItems[0].classList.add("active");

          if (args.uncutMove) {
            addLoppAnimClasses();
          }
        } else {
          scrollItems[scrollItems.length - 1].classList.add("ss-moving");
          scrollItems[scrollItems.length - 1].classList.add("active");

          if (args.uncutMove) {
            addLoppAnimClasses();
          }
        }
      }
    }

    // NOTE:
    // INNER FUNCTION CALLS
    addAnimationClasses();
    if (args.uncutMove) {
      addLoppAnimClasses();
    }
    addAnimationDuration();

    return (function () {
      let eventType;
      let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      let isIe = /MSIE|Trident/.test(window.navigator.userAgent);
      if (isFirefox) {
        eventType = "DOMMouseScroll";
      } else if (isIe) {
        eventType = "mousewheel";
      } else {
        eventType = "wheel";
      }
      scrollContainerEle.addEventListener(eventType, function (event) {
        let scrollTop = scrollContainerEle.scrollTop,
          scrollHeight = scrollContainerEle.scrollHeight,
          height = scrollContainerEle.clientHeight;

        let delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0);
        // console.log(`scrollTop ${screenTop}  height ${height} scrollHeight ${scrollHeight}`)
        if ((delta > 0 && scrollTop - delta <= 0) || (delta < 0 && scrollTop + height >= scrollHeight - 1)) {
          if (delta > 0) {
            if (allowAnimation) {
              stopScrollAnim();
              changeScrollSlide(false);
            }
          } else {
            if (allowAnimation) {
              stopScrollAnim();
              changeScrollSlide(true);
            }
          }
          event.preventDefault();
        } else {
          if (delta < 0) {
            if (allowAnimation) {
              stopScrollAnim();
              changeScrollSlide(true);
            }
          }
          event.preventDefault();
        }
      });
    })();
  }

  // INITIALIZATION
  scrollSlide({
    container: ".ss-container",
    item: ".ss-item",
    animType: "ss-move-up",
    duration: 1,
    delay: 0,
    uncutMove: true,
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Function to execute the desired actions
    function executeActions() {
        document.querySelector(".first-page").classList.add("ss-item", "ss-loop", "first-page", "ss-move-up", "ss-move-next");
        document.querySelector(".second-page").classList.add("ss-item", "ss-loop", "second-page", "ss-move-up", "ss-move-prev");
        document.querySelector(".third-page").classList.add("ss-item", "ss-loop", "third-page", "ss-move-up", "active");
    }

    // Function to add the event listener to the "info" button
    function addInfoClickListener() {
        document.getElementById("info").addEventListener("click", function() {
            // Check if the current page is index.html
            if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
                executeActions();
            } else {
                // Redirect to index.html with a query parameter
                window.location.href = "index.html?execute=true";
            }
        });
    }

    // Check if the current page is index.html
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        // If there's a query parameter indicating the action should be executed
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("execute") === "true") {
            executeActions();
        }
        
        // Add event listener for the "info" button
        addInfoClickListener();
    } else {
        // Add event listener for the "info" button on non-index.html pages
        addInfoClickListener();
    }
});




} else {
  //не выполнять
}

