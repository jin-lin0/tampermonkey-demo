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
  window.location.href = decodeTargetUrl;

  let loadingElement = document.createElement("div");
  loadingElement.classList.add("loading");

  document.body.innerHTML = "";
  document.body.appendChild(loadingElement);

  let styleElement = document.createElement("style");
  styleElement.innerHTML = `
    body{
        display: flex;
        justify-content: center;
    }

    .loading{
        width: 100px;
        height: 100px;
        background: 
        radial-gradient( closest-side circle, royalblue 99%, transparent 100%) center top/25% 25% no-repeat,
        conic-gradient(transparent 10%, royalblue 90%);
        -webkit-mask: radial-gradient( closest-side circle, transparent 50%, red 51% 99%, transparent 100%);
        animation: rotate 1s linear infinite;
    }

    @keyframes rotate{
        to{
            transform: rotate(360deg);
        }
    }
  `;
  document.head.appendChild(styleElement);
})();
