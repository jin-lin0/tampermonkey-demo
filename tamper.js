// ==UserScript==
// @name        知乎外链直转
// @namespace   https://github.com/jin-lin0/tampermonkey-demo
// @version     0.4
// @description 2023/9/20 21:55:23
// @author      logyes
// @license MIT

// @run-at       document-start

// @match       *://link.zhihu.com/*
// @grant       none

// ==/UserScript==

(function () {
  "use strict";
  const targetUrl = document.URL.split("target=")[1];
  let decodeTargetUrl = decodeURIComponent(targetUrl);
  document.body.innerHTML = "Loading...";
  window.location.href = decodeTargetUrl;

  let styleElement = document.createElement("style");
  styleElement.innerHTML = `
    body{
        display: flex;
        justify-content: center;
        font-size: 40px;
        color: darkblue;
    }
  `;
  document.head.appendChild(styleElement);
})();
