// ==UserScript==
// @name         No Call Info complete length
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Complete length for the info badge if no call is open
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/completeLengthNoCallInfo.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/completeLengthNoCallInfo.user.js
// @grant        none
// ==/UserScript==

$("#infoNoCurrentCalls").on("DOMSubtreeModified", function () {
  completeLengthNoCallInfo();
});

async function completeLengthNoCallInfo() {
  var infoBadge = document.getElementById("infoNoCurrentCalls");
  infoBadge.style.width = "100%";
}
