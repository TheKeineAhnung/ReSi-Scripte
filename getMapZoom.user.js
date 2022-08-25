// ==UserScript==
// @name         Get map zoom
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @run-at       document-end
// @description  customize your mission Icons
// @author       KeineAhnung
// @include      https://rettungssimulator.online/*
// @grant        none
// ==/UserScript==

const parentContainer = document.querySelector("div.leaflet-control-zoom");
const currentZoomLevel = mymap.getZoom();
const infoElement = document.createElement("a");
infoElement.href = "#";
infoElement.id = "currentMapZoomLevel";
infoElement.style.cursor = "default";
infoElement.style.fontWeight = "700";
infoElement.dataset.tooltip = "Zoomlevel der Karte";
infoElement.textContent = currentZoomLevel;

parentContainer.insertAdjacentElement("beforeend", infoElement);

const updateZoomLevel = function () {
  const currentZoomLevel = mymap.getZoom();
  document.querySelector("#currentMapZoomLevel").textContent = currentZoomLevel;
};

mymap.on("zoom", updateZoomLevel);
