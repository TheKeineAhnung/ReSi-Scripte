// ==UserScript==
// @name         Hide Building Icons
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @run-at       document-end
// @description  Hides the building Icons on the map
// @author       KeineAhnung
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideBuildingIcons.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideBuildingIcons.user.js
// ==/UserScript==

window.onload = async function main() {
    var iconsToRemove = ["https://rettungssimulator.online/images/marker/departments/hospital.png", "https://rettungssimulator.online/images/marker/departments/emsDepartment.png", "https://rettungssimulator.online/images/marker/departments/controlCenter.png", "https://rettungssimulator.online/images/marker/departments/fireDepartment.png", "https://rettungssimulator.online/images/marker/departments/fireSchool.png", "https://rettungssimulator.online/images/marker/departments/policeDepartment.png", "https://rettungssimulator.online/images/marker/departments/policeSchool.png"]
    var imagesArea = document.getElementsByClassName('leaflet-marker-pane');
    var images = document.getElementsByTagName('img');
    for (var i in images) {
        var actualImage = images[i];
        for (var actualIcon in iconsToRemove) {
            if (actualImage == undefined) {
                break;
            }
            if (actualImage.src == iconsToRemove[actualIcon]) {
                actualImage.src = 'https://raw.githubusercontent.com/TheKeineAhnung/ReSi-Scripte/main/img/transparentPixel.png';
                break;
            }
        }
        i++;
    }
}