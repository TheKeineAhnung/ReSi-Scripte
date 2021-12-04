// ==UserScript==
// @name         designOptimizations
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @run-at       document-end
// @description  Optimize the design of the forum
// @author       KeineAhnung
// @match        https://forum.rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=forum.rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/main/forum/designOptimizations.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/main/forum/designOptimizations.user.js
// @grant        none
// ==/UserScript==

function removeBlueLineOfCategoryHeaders() {
  let style = document.createElement("style");
  style.innerText = `li.wbbCategory header{color: #a11116 !important;}`;
  document.head.appendChild(style);
}

function pageHeaderBackgroundImage(
  imageUrl = "https://forum.rettungssimulator.online/cms/index.php?media/3-image-5-jpg"
) {
  let pageHeader = document.querySelector("#pageHeaderFacade");
  pageHeader.style.backgroundImage = `url(${imageUrl})`;
}

window.addEventListener("load", function () {
  removeBlueLineOfCategoryHeaders();
  pageHeaderBackgroundImage();
});
