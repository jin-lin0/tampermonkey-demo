// ==UserScript==
// @name         Youtube视频广告去除
// @namespace    https://github.com/jin-lin0/tampermonkey-demo
// @version      0.2
// @description  2023/10/26
// @author       logyes
// @license      MPL-2.0

// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  GM_addStyle("#player-ads{display:none !important}");
  GM_addStyle(
    "ytd-rich-item-renderer:has(ytd-ad-slot-renderer){display:none !important}"
  );

  let observer = null;

  const hasQueryParamV = () => {
    return /[\?&]v=/.test(location.href);
  };

  const skipAd = () => {
    let video = document.querySelector(`.ad-showing video`);
    let skipButton = document.querySelector(`.ytp-ad-skip-button`);
    if (skipButton) {
      skipButton.click();
    }
    if (video) {
      video.currentTime = video.duration;
    }

    return;
  };

  const startObserve = () => {
    const target = document.querySelector(`.video-ads.ytp-ad-module`);
    if (!target) {
      observer = null;
      return;
    }
    observer = new MutationObserver(skipAd);
    observer.observe(target, {
      childList: true,
      subtree: true,
    });
    return observer;
  };

  setInterval(() => {
    if (hasQueryParamV()) {
      if (!observer) {
        startObserve();
      }
    } else {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }
  }, 200);
})();
