// ==UserScript==
// @name         Custom building icons
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @run-at       document-end
// @description  Customize your building Icons
// @author       KeineAhnung
// @include      https://rettungssimulator.online
// @include      https://rettungssimulator.online/*
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/customBuildingIcons.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/customBuildingIcons.user.js
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

sessionStorage.setItem("Feuerwache", "null");
sessionStorage.setItem("Feuerwehrschule", "null");
sessionStorage.setItem("Rettungswache", "null");
sessionStorage.setItem("Krankenhaus", "null");
sessionStorage.setItem("Landespolizeiwache", "null");
sessionStorage.setItem("Bundespolizeiwache", "null");
sessionStorage.setItem("Polizeischule", "null");
sessionStorage.setItem("Leitstelle", "null");
sessionStorage.setItem("Rettungsdienstschule", "null");

if (sessionStorage.getItem("buildingIconsBuildingData") == null) {
  $.getJSON("/api/buildings").done((data) =>
    sessionStorage.setItem(
      "buildingIconsBuildingData",
      JSON.stringify({ value: data })
    )
  );
}

function customBuildingIcons() {
  var images = document.getElementsByTagName("img");
  var buildingData = JSON.parse(
    sessionStorage.getItem("buildingIconsBuildingData")
  );
  for (var i in images) {
    var actualImage = images[i];
    var src = actualImage.src;
    for (var e in buildingData) {
      for (var j in buildingData[e]) {
        if (
          src ==
            `https://rettungssimulator.online/images/marker/departments/${buildingData[e][j].markerName}.png` &&
          sessionStorage.getItem(buildingData[e][j].buildingName) != "null"
        ) {
          actualImage.src = sessionStorage.getItem(
            buildingData[e][j].buildingName
          );
          actualImage.style.width = "auto";
          actualImage.style.height = "auto";
        }
      }
    }
  }
}

window.addEventListener("load", customBuildingIcons);
