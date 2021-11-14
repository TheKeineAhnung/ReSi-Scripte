// ==UserScript==
// @name         Custom Mission Icons
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @run-at       document-end
// @description  customize your mission Icons
// @author       KeineAhnung
// @include      https://rettungssimulator.online
// @include      https://rettungssimulator.online/*
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/customMissionIcons.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/customMissionIcons.user.js
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

//1 = keine Fahrzeuge alamiert/fehlende Fahrzeuge
//2 = Auf anfahrt
//3 = wird bearbeitet

const config = `[
    {
      "name": "fire",
      "1": "",
      "2": "",
      "3": ""
    }
  ]
  `;
const config_parse = JSON.parse(config);

function replaceIcons(icon = "fire") {
  for (var i in config_parse) {
    var oneMap = document.querySelectorAll(
      `img[src='images/marker/missions/${config_parse[i]["name"]}_1.png']`
    );
    var twoMap = document.querySelectorAll(
      `img[src='images/marker/missions/${config_parse[i]["name"]}_2.png']`
    );
    var threeMap = document.querySelectorAll(
      `img[src='images/marker/missions/${config_parse[i]["name"]}_3.png']`
    );
    for (var e in oneMap) {
      if (
        oneMap[e].src ===
        `https://rettungssimulator.online/images/marker/missions/${icon}_1.png`
      ) {
        oneMap[e].src = `${config_parse[i]["1"]}`;
      }
    }
    for (e in twoMap) {
      if (
        twoMap[e].src ===
        `https://rettungssimulator.online/images/marker/missions/${icon}_2.png`
      ) {
        twoMap[e].src = `${config_parse[i]["2"]}`;
      }
    }
    for (e in threeMap) {
      if (
        threeMap[e].src ===
        `https://rettungssimulator.online/images/marker/missions/${icon}_3.png`
      ) {
        threeMap[e].src = `${config_parse[i]["3"]}`;
      }
    }
  }
}

socket.on("missionStatus", (missionStatusObject) => {
  replaceIcons(missionStatusObject.icon);
});

socket.on("newMission", (missionObject) => {
  replaceIcons(missionObject.icon);
});

window.addEventListener("load", function () {
  replaceIcons();
});
