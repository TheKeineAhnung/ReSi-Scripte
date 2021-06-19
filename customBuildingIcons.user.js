// ==UserScript==
// @name         Custom Building Icons
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @run-at       document-end
// @description  customize your building Icons
// @author       KeineAhnung
// @include      https://rettungssimulator.online
// @include      https://rettungssimulator.online/*
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/customBuildingIcons.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/customBuildingIcons.user.js
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

sessionStorage.setItem('Feuerwache', 'null');
sessionStorage.setItem('Feuerwehrschule', 'null');
sessionStorage.setItem('Rettungswache', 'null');
sessionStorage.setItem('Krankenhaus', 'null');
sessionStorage.setItem('Polizeiwache', 'null');
sessionStorage.setItem('Polizeischule', 'null');
sessionStorage.setItem('Leitstelle', 'null');

window.onload = async function main() {
    var images = document.getElementsByTagName('img');
    for (var i in images) {
        var actualImage = images[i];
        if (actualImage.src == 'https://rettungssimulator.online/images/marker/departments/fireDepartment.png' && sessionStorage.getItem('Feuerwache') != 'null') {
            actualImage.src = sessionStorage.getItem('Feuerwache');
        } else if (actualImage.src == 'https://rettungssimulator.online/images/marker/departments/fireSchool.png' && sessionStorage.getItem('Feuerwehrschule') != 'null') {
            actualImage.src = sessionStorage.getItem('Feuerwehrschule');
        } else if (actualImage.src == 'https://rettungssimulator.online/images/marker/departments/emsDepartment.png' && sessionStorage.getItem('Rettungswache') != 'null') {
            actualImage.src = sessionStorage.getItem('Rettungswache');
        } else if (actualImage.src == 'https://rettungssimulator.online/images/marker/departments/hospital.png' && sessionStorage.getItem('Krankenhaus') != 'null') {
            actualImage.src = sessionStorage.getItem('Krankenhaus');
        } else if (actualImage.src == 'https://rettungssimulator.online/images/marker/departments/policeDepartment.png' && sessionStorage.getItem('Polizeiwache') != 'null') {
            actualImage.src = sessionStorage.getItem('Polizeiwache');
        } else if (actualImage.src == 'https://rettungssimulator.online/images/marker/departments/policeSchool.png' && sessionStorage.getItem('Polizeischule') != 'null') {
            actualImage.src = sessionStorage.getItem('Polizeischule');
        } else if (actualImage.src == 'https://rettungssimulator.online/images/marker/departments/controlCenter.png' && sessionStorage.getItem('Leitstelle') != 'null') {
            actualImage.src = sessionStorage.getItem('Leitstelle');
        }
    }
}