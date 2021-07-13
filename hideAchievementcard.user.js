// ==UserScript==
// @name         Hide Achievementcard
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @run-at       document-end
// @description  Hide user achievement card on profile!
// @author       KeineAhnung
// @match        https://rettungssimulator.online/profile
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

window.onload = async function () {
  const card = document.querySelector(".card-collapse");
  card.style.display = "none";
};
