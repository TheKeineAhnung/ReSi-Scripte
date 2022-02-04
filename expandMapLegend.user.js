// ==UserScript==
// @name         Expand map legend
// @namespace    http://tampermonkey.net/
// @version      1.0.0
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
    '<svg class="svg-inline--fa fa-angle-up fa-w-10 card-collapse-toggle pointer right" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>';
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

window.addEventListener("load", addArrows);
