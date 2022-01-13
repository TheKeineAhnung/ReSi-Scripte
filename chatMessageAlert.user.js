// ==UserScript==
// @name         ChatMessageAlertGongBeta
// @namespace    http://tampermonkey.net/
// @version      1.1.3
// @description  Alert when new Message is in the Chat
// @author       KeineAhnung
// @run-at       document-end
// @include      https://beta.rettungssimulator.online/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/chatMessageAlert.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/chatMessageAlert.user.js
// ==/UserScript==

if (
  !localStorage.aUser ||
  JSON.parse(localStorage.aUser).lastUpdate <
    new Date().getTime() - 5 * 1000 * 60
)
  $.getJSON("/api/user").done((data) =>
    localStorage.setItem(
      "aUser",
      JSON.stringify({ lastUpdate: new Date().getTime(), value: data })
    )
  );

function chatMessageAlert() {
  const username = JSON.parse(localStorage.aUser).value.userName;
  var audio = new Audio("https://voca.ro/1jPC1Pp2JEkr");
  socket.on("associationMessage", (messageObject) => {
    if (messageObject.userName != username) {
      audio.play();
      var icons = document.querySelectorAll("link[rel~='icon']");
      var iconFirst = "images/favicons/favicon-32x32.png?v=WGLwy6Y942";
      icons[0].href =
        "https://wiki.rettungssimulator.online/resources/assets/ReSi-Wiki-Logo.png";
      setTimeout(function () {
        icons[0].href = iconFirst;
      }, 1000);
    }
  });
}

window.addEventListener("load", chatMessageAlert);
