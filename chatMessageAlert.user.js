// ==UserScript==
// @name         ChatMessageAlert
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Alert when new Message is in the Chat
// @author       KeineAhnung
// @run-at       document-end
// @include      https://rettungssimulator.online/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/chatMessageAlert.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/chatMessageAlert.user.js
// ==/UserScript==

window.onload = async function main() {
    var messagesSinceReload = 0
    var allMessages = document.querySelectorAll(".message");
    var targetDiv = document.querySelector('.messages');
    const config = { childList: true, subtree: true };
    var audio = new Audio('');

    const observer = new MutationObserver(function(mutations) {
        var newestMessage;
        var allMessages = document.querySelectorAll(".message");
        for (var i of allMessages) {
            var newestMessageClass = i.classList;
        }
        if (newestMessageClass == "message" && messagesSinceReload != 0) {
            audio.play();
        } else {}
        messagesSinceReload++;
    })
    observer.observe(targetDiv, config);
}