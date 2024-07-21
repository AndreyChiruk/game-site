if (window.innerWidth >= 1000) {
  document.addEventListener("DOMContentLoaded", function() {
    function executeActions() {
        document.querySelector(".first-page").classList.add("ss-item", "ss-loop", "first-page", "ss-move-up", "ss-move-next");
        document.querySelector(".second-page").classList.add("ss-item", "ss-loop", "second-page", "ss-move-up", "ss-move-prev");
        document.querySelector(".third-page").classList.add("ss-item", "ss-loop", "third-page", "ss-move-up", "active");
    }

    function addInfoClickListener() {
        document.getElementById("info").addEventListener("click", function() {
            if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
                executeActions();
            } else {
                window.location.href = "index.html?execute=true";
            }
        });
    }

    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("execute") === "true") {
            executeActions();
        }
        addInfoClickListener();
    } else {
        addInfoClickListener();
    }
});





} else {
  //не выполнять
}
$(document).ready(function() {
    var resizeTimeout;

    $(window).resize(function() {
        // Если таймер уже существует, отменяем его
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }

        // Устанавливаем новый таймер для перезагрузки страницы через 500 миллисекунд после последнего изменения размера окна
        resizeTimeout = setTimeout(function() {
            location.reload();
        }, 100);
    });
});

