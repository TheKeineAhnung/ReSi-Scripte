// ==UserScript==
// @name         Expand cards on association pages
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Add arrows to expand & fold cards on association pages
// @author       KeineAhnung
// @match        https://rettungssimulator.online/association/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/expandAssociationCards.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/expandAssociationCards.user.js
// @grant        none
// ==/UserScript==

function addArrows() {
  let headlines = document.querySelectorAll("div.card-headline");
  let arrow =
    '<i class="fas fa-angle-up card-collapse-toggle pointer right"></i>';
  headlines.forEach((e) => {
    if (!e.parentElement.classList.contains("card-collapse")) {
      e.parentElement.classList.add("card-collapse");
      e.innerHTML += arrow;
    }
  });
}

window.addEventListener("load", () => {
  addArrows();
});
