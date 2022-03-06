// ==UserScript==
// @name         Hide achievementcard
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @run-at       document-end
// @description  Hide user achievement card on profile!
// @author       KeineAhnung
// @match        https://rettungssimulator.online/profile
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideAchievementCard.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideAchievementCard.user.js
// @grant        none
// ==/UserScript==

async function hideAchievementCard() {
  const card = document.querySelector(".card-collapse");
  card.style.display = "none";
}

window.addEventListener("load", hideAchievementCard);
