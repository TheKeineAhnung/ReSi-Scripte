// ==UserScript==
// @name         Hide free text
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Hide the free text input
// @author       KeineAhnung
// @match        https://rettungssimulator.online/missionNew/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

var container = document.querySelectorAll("div.input-container");
container[container.length - 1].style.display = "none";