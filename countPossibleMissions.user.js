// ==UserScript==
// @name         Possible mission Count
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Count possible missions in missionoverview
// @author       KeineAhnung
// @match        https://rettungssimulator.online/missionOverview
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/countPossibleMissions.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/countPossibleMissions.user.js
// @grant        none
// ==/UserScript==

let newContainer = document.createElement("div");
let parentContainer = document.querySelector(
  "div.detail-header div.detail-subtitle"
);
parentContainer.style.display = "flex";
parentContainer.style.justifyContent = "space-between";
parentContainer.style.alignItems = "end";
newContainer.style.fontWeight = 500;
newContainer.innerHTML = `<b>${countAvailableMissions()}</b> von <b>${countAllMissions()}</b>  Einsätzen verfügbar`;
newContainer.classList.add("status", "s1");
parentContainer.appendChild(newContainer);

function countAvailableMissions() {
  return document.querySelectorAll("td span.status.s2").length;
}

function countAllMissions() {
  return document.querySelectorAll("td span.status").length;
}
