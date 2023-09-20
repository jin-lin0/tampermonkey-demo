// ==UserScript==
// @name        Text
// @namespace   https://github.com/jin-lin0/tampermonkey-demo
// @match       *://*/*
// @grant       none
// @version     0.3
// @author      -
// @description 2023/9/20 21:55:23
// @license MIT
// ==/UserScript==

(function () {
  "use strict";
  console.log("tamper test");
  const greetingMessage =
    "欢迎！打开该页面的时间：" + new Date().toLocaleTimeString();
  const greetingElement = document.createElement("div");
  greetingElement.textContent = greetingMessage;
  greetingElement.style.position = "fixed";
  greetingElement.style.top = "0";
  greetingElement.style.left = "0";
  greetingElement.style.backgroundColor = "lightblue";
  greetingElement.style.color = "black";
  greetingElement.style.padding = "5px";
  document.body.appendChild(greetingElement);
})();
