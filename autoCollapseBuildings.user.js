// ==UserScript==
// @name         Auto Building Collapse
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto collapse buildings
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online
// @grant        none
// ==/UserScript==

window.onload = async function main() {
    var collapseBuildingTypes = [1, 2, 3, 4, 5, 6, 7, 8];
    var allBuildings = document.getElementById('departments').getElementsByClassName('panel-body');
    var cards = document.getElementById('departments').getElementsByClassName('card');
    for (actualFilter in collapseBuildingTypes) {
      var round = 0;
      var filter = 'buildingtype="' + collapseBuildingTypes[actualFilter];
      while (round <= cards.length - 1) {
        if (cards[round].outerHTML.includes(filter)) {
          var actualBuilding = document.getElementById('departments').getElementsByClassName('card');
          actualBuilding[round].classList.add('collapsed')
        }
        round++;
      }
    }
};
