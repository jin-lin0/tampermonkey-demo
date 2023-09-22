// ==UserScript==
// @name        知乎、掘金外链直转
// @namespace   https://github.com/jin-lin0/tampermonkey-demo
// @version     0.5
// @description 2023/9/20 21:55:23
// @author      logyes
// @license     MIT

// @run-at       document-start

// @match       *://link.zhihu.com/*
// @match       *://link.juejin.cn/*
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
        height: 100vh;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading{
        width: 100px;
        height: 100px;
        background: conic-gradient(#2b6ee0, #bf6ee7,#2b6ee0);
        -webkit-mask: radial-gradient( closest-side circle, royalblue 99%, transparent 100%) center top/25% 25% no-repeat,
        radial-gradient( closest-side circle, transparent 50%, red 51% 99%, transparent 100%),
        conic-gradient(transparent 10%, royalblue 90%);
        -webkit-mask-composite: source-over, source-in;
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
