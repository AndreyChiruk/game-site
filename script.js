document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 1130) {
    const images = document.querySelectorAll('.game-gallery__images');
    let currentIndex = 0;
    let startX, endX;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    function handleSwipe() {
      if (startX > endX) {
        currentIndex = (currentIndex + 1) % images.length;
      } else if (startX < endX) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      showImage(currentIndex);
    }

    document.getElementById('game-gallery').addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
    });

    document.getElementById('game-gallery').addEventListener('touchend', (event) => {
      endX = event.changedTouches[0].clientX;
      handleSwipe();
    });

    showImage(currentIndex);
  }
});

if (window.innerWidth >= 1000) {
  let scrollCounter = 0;
  let scrollCounter1 = 0;

  function scrollSlide(args) {
    // args.container, args.item, args.animType, args.duration, args.delay, args.uncutMove
    const scrollContainerEle = document.querySelector(args.container);
    const scrollItems = Array.from(document.querySelectorAll(`${args.container} ${args.item}`));
    const secondPageMain = document.querySelector('.second-page__main');

    let allowAnimation = true;
    let allowAnimationTimeout;

    // NOTE:
    // INNER FUNCTIONS DECLARATION
    function addAnimationClasses() {
      scrollItems.forEach((item) => {
        item.classList.add(args.animType);
      });
    }

    function addLoopAnimClasses() {
      let activeItem = scrollItems.find((item) => item.classList.contains("active"));

      let nextItem = scrollItems[scrollItems.indexOf(activeItem) + 1] || scrollItems[0];
      let prevItem = scrollItems[scrollItems.indexOf(activeItem) - 1] || scrollItems[scrollItems.length - 1];

      scrollItems.forEach((item) => {
        item.classList.remove("ss-move-prev");
        item.classList.remove("ss-move-next");
      });

      nextItem.classList.add("ss-move-next");
      prevItem.classList.add("ss-move-prev");
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
        nextItem = scrollItems[scrollItems.indexOf(activeItem) + 1] || scrollItems[0];
      } else {
        nextItem = scrollItems[scrollItems.indexOf(activeItem) - 1] || scrollItems[scrollItems.length - 1];
      }

      activeItem.classList.remove("active");
      nextItem.classList.add("active");

      if (args.uncutMove) {
        addLoopAnimClasses();
      }
    }

    // Check if secondPageMain exists and if it has overflow
    function hasOverflow(element) {
      return element.scrollHeight > element.clientHeight;
    }

    // NOTE:
    // INNER FUNCTION CALLS
    addAnimationClasses();
    if (args.uncutMove) {
      addLoopAnimClasses();
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

        // Check if secondPageMain exists and has overflow
        if (secondPageMain && hasOverflow(secondPageMain)) {
          // Let the default scroll behavior happen inside secondPageMain
          return;
        }

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


