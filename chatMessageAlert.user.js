// ==UserScript==
// @name         ChatMessageAlertGong
// @namespace    http://tampermonkey.net/
// @version      1.1.6
// @description  Alert when a new message is in the chat (outdated)
// @author       KeineAhnung
// @run-at       document-end
// @include      https://rettungssimulator.online/
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
  var audio;
  if (localStorage.getItem("chatMessageAlertAudio")) {
    audio = new Audio(localStorage.getItem("chatMessageAlertAudio"));
  } else {
    localStorage.setItem("chatMessageAlertAudio", "");
    audio = new Audio(localStorage.getItem("chatMessageAlertAudio"));
  }
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

window.addEventListener("load", () => {
  chatMessageAlert();
});
