// ==UserScript==
// @name         掘金剪贴板版权信息去除
// @namespace    https://github.com/jin-lin0/tampermonkey-demo
// @version      0.1
// @description  2023/9/22 14:34:30
// @author       logyes
// @license      MPL-2.0

// @match        *://juejin.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  document.addEventListener("copy", function (e) {
    e.preventDefault();
    let selectObj = window.getSelection();
    if (typeof selectObj === "undefined") return false;
    let clipboardData = e.clipboardData || window.clipboardData;
    clipboardData.setData("text/plain", selectObj.toString());
  });
})();
