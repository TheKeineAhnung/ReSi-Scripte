// ==UserScript==
// @name         ChatMessageAlert
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  Alert when new Message is in the Chat
// @author       KeineAhnung
// @run-at       document-end
// @include      https://rettungssimulator.online/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/chatMessageAlert.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/chatMessageAlert.user.js
// ==/UserScript==

async function chatMessageAlert() {
  $.ajax({
    url: "/api/user",
    dataType: "json",
    type: "GET",
    success: function (r) {
      sessionStorage.setItem("userName", r.userName);
    },
  });
  var audio = new Audio("");
  socket.on("associationMessage", (messageObject) => {
    if (messageObject.userName != sessionStorage.getItem("userName")) {
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
