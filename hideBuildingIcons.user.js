// ==UserScript==
// @name         Hide building icons
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @run-at       document-end
// @description  Hides the building icons on the map
// @author       KeineAhnung
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideBuildingIcons.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideBuildingIcons.user.js
// ==/UserScript==

async function hideBuildingIcons() {
  var iconsToRemove = [
    "https://rettungssimulator.online/images/marker/departments/hospital.png",
    "https://rettungssimulator.online/images/marker/departments/emsDepartment.png",
    "https://rettungssimulator.online/images/marker/departments/controlCenter.png",
    "https://rettungssimulator.online/images/marker/departments/fireDepartment.png",
    "https://rettungssimulator.online/images/marker/departments/fireSchool.png",
    "https://rettungssimulator.online/images/marker/departments/policeDepartment.png",
    "https://rettungssimulator.online/images/marker/departments/policeSchool.png",
  ];
  var images = document.querySelectorAll("img.leaflet-marker-icon");
  for (var i in images) {
    var actualImage = images[i];
    for (var actualIcon in iconsToRemove) {
      if (actualImage == undefined) {
        break;
      }
      if (actualImage.src == iconsToRemove[actualIcon]) {
        actualImage.style.display = "none";
        break;
      }
    }
    i++;
  }
}

window.addEventListener("load", hideBuildingIcons);
