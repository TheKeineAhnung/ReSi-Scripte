// ==UserScript==
// @name         ChatMessageAlert
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Alert when new Message is in the Chat
// @author       KeineAhnung
// @run-at       document-end
// @include      https://rettungssimulator.online/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/chatMessageAlert.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/chatMessageAlert.user.js
// ==/UserScript==

window.onload = async function main() {
    $.ajax({
        url: "/api/user",
        dataType: "json",
        type : "GET",
        success : function(r) {
            sessionStorage.setItem("userName", r.userName)
        }
    });
    var audio = new Audio('');
    socket.on("associationMessage", (messageObject) =>{   
    console.log(messageObject.userName)
    if (messageObject.userName != sessionStorage.getItem("userName")) {
        audio.play();
    }
});
}