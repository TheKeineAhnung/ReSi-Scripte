// ==UserScript==
// @name         Custom building icons
// @namespace    http://tampermonkey.net/
// @version      2.1.1
// @run-at       document-end
// @description  Customize your building icons
// @author       KeineAhnung
// @include      https://rettungssimulator.online
// @include      https://rettungssimulator.online/*
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/customBuildingIcons.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/customBuildingIcons.user.js
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

let config = new Object();

if (sessionStorage.getItem("buildingIconsBuildingData") == null) {
  $.getJSON("/api/buildings").done((data) =>
    sessionStorage.setItem(
      "buildingIconsBuildingData",
      JSON.stringify({ value: data })
    )
  );
}

config.Feuerwache = "null";
config.Feuerwehrschule = "null";
config.Rettungswache = "null";
config.Krankenhaus = "null";
config.Landespolizeiwache = "null";
config.Bundespolizeiwache = "null";
config.Polizeischule = "null";
config.Leitstelle = "null";
config.Rettungsdienstschule = "null";
config.Notarztstandort = "null";

function getConfig(config) {
  if (localStorage.getItem("customBuildingIconsConfig")) {
    if (
      JSON.parse(localStorage.getItem("customBuildingIconsConfig")) !== config
    ) {
      for (let e in config) {
        if (config[e] != "null") {
          localStorage.setItem(
            "customBuildingIconsConfig",
            JSON.stringify(config)
          );
          return config;
        }
      }
      return JSON.parse(localStorage.getItem("customBuildingIconsConfig"));
    }
  } else {
    localStorage.setItem("customBuildingIconsConfig", JSON.stringify(config));
    return config;
  }
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
          config[buildingData[e][j].buildingName] != "null"
        ) {
          actualImage.src = config[buildingData[e][j].buildingName];
          actualImage.style.width = "auto";
          actualImage.style.height = "auto";
        }
      }
    }
  }
}

window.addEventListener("load", () => {
  config = getConfig(config);
  customBuildingIcons();
});
