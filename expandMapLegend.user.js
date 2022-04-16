// ==UserScript==
// @name         Expand map legend
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Add arrows to expand & fold cards on maplegend
// @author       KeineAhnung
// @match        https://rettungssimulator.online/mapLegend
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/expandMapLegend.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/expandMapLegend.user.js
// @grant        none
// ==/UserScript==

function addArrows() {
  let headlines = document.querySelectorAll("div.card-headline");
  let arrow =
    '<i class="fas fa-angle-up card-collapse-toggle pointer right"></i>';
  headlines.forEach((e) => {
    if (
      !e.classList.contains("bg-organisation-4") ||
      e.textContent.includes("Leitstelle")
    ) {
      e.parentElement.classList.add("collapsed");
    }
    e.innerHTML += arrow;
  });
}

window.addEventListener("load", () => {
  addArrows();
});
