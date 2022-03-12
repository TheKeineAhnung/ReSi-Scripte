// ==UserScript==
// @name         Auto Building Collapse
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  Auto collapse buildings
// @author       KeineAhnung
// @run-at       document-end
// @include      https://rettungssimulator.online/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/autoCollapseBuildings.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/autoCollapseBuildings.user.js
// @grant        none
// ==/UserScript==

async function autoCollapseBuildings() {
  let collapseBuildingTypes;
  if (localStorage.getItem("autoCollapseBuildingsBuildingTypes")) {
    collapseBuildingTypes = JSON.parse(
      localStorage.getItem("autoCollapseBuildingsBuildingTypes")
    );
  } else {
    localStorage.setItem(
      "autoCollapseBuildingsBuildingTypes",
      JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );
    collapseBuildingTypes = JSON.parse(
      localStorage.getItem("autoCollapseBuildingsBuildingTypes")
    );
  }
  var cards = document
    .getElementById("departments")
    .getElementsByClassName("card");
  for (var actualFilter in collapseBuildingTypes) {
    var round = 0;
    const filter = 'buildingtype="' + collapseBuildingTypes[actualFilter];
    while (round <= cards.length - 1) {
      if (cards[round].outerHTML.includes(filter)) {
        var actualBuilding = document
          .getElementById("departments")
          .getElementsByClassName("card");
        actualBuilding[round].classList.add("collapsed");
      }
      round++;
    }
  }
}

window.addEventListener("load", () => {
  autoCollapseBuildings();
});
