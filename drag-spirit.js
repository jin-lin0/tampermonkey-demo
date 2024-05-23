// ==UserScript==
// @name         drag spirit
// @namespace    https://github.com/jin-lin0/tampermonkey-demo
// @version      0.1
// @description  2023//
// @author       logyes
// @license      MPL-2.0

// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var floatingBox = function (options) {
    var element = document.createElement("p");
    element.innerHTML = "";
    var defaults = {
      content: "Hello World",
      width: "200px",
      height: "200px",
      backgroundColor: "skyblue",
      color: "#fff",
      background: "#333",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      zIndex: 9999,
      position: {
        top: "50px",
        left: "50px",
      },
      draggable: true,
      prohibitDragUrl: [],
      showFloatUrl: ["bbs.tampermonkey.net.cn"],
      hideFloat: false,
      element: element,
    };
    var settings = Object.assign({}, defaults, options);

    if (settings.hideFloat) {
      return false;
    }

    var box = document.createElement("div");
    box.style.position = "fixed";
    box.style.top = settings.position.top;
    box.style.left = settings.position.left;
    box.style.width = settings.width;
    box.style.height = settings.height;
    box.style.color = settings.color;
    box.style.zIndex = settings.zIndex;
    box.style.background = settings.background;
    box.style.padding = settings.padding;
    box.style.borderRadius = settings.borderRadius;
    box.style.boxShadow = settings.boxShadow;
    box.style.backgroundColor = settings.position.backgroundColor;
    box.innerHTML = settings.content;

    if (settings.element) {
      box.appendChild(settings.element);
    }

    document.body.appendChild(box);
    settings.prohibitDragUrl.map((item, index) => {
      if (window.location.href.indexOf(item) > -1) {
        settings.draggable = false;
      }
    });

    if (settings.draggable) {
      var isDragging = false;
      var startOffset = { x: 0, y: 0 };

      box.addEventListener("mousedown", function (e) {
        isDragging = true;
        startOffset.x = e.clientX - box.offsetLeft;
        startOffset.y = e.clientY - box.offsetTop;
        box.style.cursor = "move";
      });

      document.addEventListener("mousemove", function (e) {
        if (isDragging) {
          box.style.top = e.clientY - startOffset.y + "px";
          box.style.left = e.clientX - startOffset.x + "px";
        }
      });

      document.addEventListener("mouseup", function (e) {
        isDragging = false;
        box.style.cursor = "default";
      });
    }
    // settings.showFloatUrl.map((item, index) => {
    //   if (window.location.href.indexOf(item) > -1) {
    //     box.style.display = "block";
    //   } else {
    //     box.style.display = "none";
    //   }
    // });

    return box;
  };

  floatingBox();
})();
