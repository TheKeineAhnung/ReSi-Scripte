// ==UserScript==
// @name         Hide free text
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Hide the free text input
// @author       KeineAhnung
// @match        https://rettungssimulator.online/missionNew/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideFreeText.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideFreeText.user.js
// @grant        none
// ==/UserScript==

var container = document.querySelectorAll("div.input-container");
container[container.length - 1].style.display = "none";
