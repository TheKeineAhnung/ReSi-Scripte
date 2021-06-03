// ==UserScript==
// @name         ReSi Count Vehicles
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Count the Vehicles
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online/profile
// @match        https://rettungssimulator.online/profile/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userVehicles.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userVehicles.user.js
// ==/UserScript==

window.onload = async function vehicleStats() {
    //check localStorage
    if (!localStorage.vehicleCategories ||
        JSON.parse(localStorage.vehicleCategories).lastUpdate <
        new Date().getTime() - 6000000000
    ) {
        await $.getJSON('/api/vehicleCategories').done((data) =>
            localStorage.setItem(
                'vehicleCategories',
                JSON.stringify({ lastUpdate: new Date().getTime(), value: data })
            )
        );
    }
    const vehicleCategories = JSON.parse(localStorage.vehicleCategories).value;
    saveVehicleCategories();
    //vehicle Variables
    var hlf = 0;
    var lf = 0;
    var tlf = 0;
    var elw1 = 0;
    var kdow = 0;
    var dlk = 0;
    var tmf = 0;
    var rw = 0;
    var mtw = 0;
    var gw_tier = 0;
    var gw_g = 0;
    var sw = 0;
    var gw_mess = 0;
    var rtw = 0;
    var lpol = 0;
    var bpol = 0;
    var dlk_tmf = 0;
    var allVehicleTypes = 15;

    //get User Vehicles
    $.ajax({
        url: '/api/userVehicles',
        dataType: 'json',
        type: 'GET',
        success: function(r) {
            for (actualVehicle in r) {
                assignVehicleCategories(r, actualVehicle);
            }
            showCard();
        },
    });

    async function assignVehicleCategories(r, actualVehicle) {
        var assignVehicle = localStorage.getItem(r[actualVehicle].vehicleID);
        if (assignVehicle == 'hlf') {
            hlf++;
        } else if (assignVehicle == 'lf') {
            lf++;
        } else if (assignVehicle == 'tlf') {
            tlf++;
        } else if (assignVehicle == 'elw1') {
            elw1++;
        } else if (assignVehicle == 'kdow') {
            kdow++;
        } else if (assignVehicle == 'dlk') {
            dlk++;
        } else if (assignVehicle == 'tmf') {
            tmf++;
        } else if (assignVehicle == 'rw') {
            rw++;
        } else if (assignVehicle == 'mtw') {
            mtw++;
        } else if (assignVehicle == 'gw_tier') {
            gw_tier++;
        } else if (assignVehicle == 'gw_g') {
            gw_g++;
        } else if (assignVehicle == 'sw') {
            sw++;
        } else if (assignVehicle == 'gw_mess') {
            gw_mess++;
        } else if (assignVehicle == 'rtw') {
            rtw++;
        } else if (assignVehicle == 'lpol') {
            lpol++;
        } else if (assignVehicle == 'bpol') {
            bpol++;
        }
        dlk_tmf = dlk + tmf;
    }

    async function showCard(totalVehicleList) {
        let style = document.createElement('style');
        style.innerHTML = '.card-headline.card-headline-danger{background-color:#DB1111;color:#fff}.card';
        document.head.appendChild(style);
        var parentDiv = document.getElementsByClassName('card-collapse');
        parentDiv0 = parentDiv[0].parentNode;
        parentDiv1 = parentDiv[1];
        var parentDivStyle = window.getComputedStyle(parentDiv1);
        let showVehicleDiv = document.createElement('div');
        showVehicleDiv.classList.add('card', 'card-collapse', 'collapsed');
        showVehicleDiv.innerHTML = '<div class="card-headline card-headline-danger">Fahrzeuge <svg class="svg-inline--fa fa-angle-up fa-w-10 card-collapse-toggle pointer right" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg></div><div class="card-body"><div class="element-container"><table class="striped table-divider" id="theadVehicles"><thead><tr><th style="text-align: center;">Typ</th><th style="text-align: center;">Anzahl</th></tr></thead></table></div></div>';
        parentDiv0.insertBefore(showVehicleDiv, parentDiv1);
        var thead = document.querySelector('#theadVehicles');
        var tbody = document.createElement('tbody');
        tbody.style.width = '100%';
        var round = 0;
        var totalVehicleList = [lf, hlf, tlf, elw1, kdow, dlk_tmf, rw, mtw, gw_tier, gw_g, sw, gw_mess, rtw, lpol, bpol, ];
        var exampleIdList = [1, 7, 9, 31, 32, 33, 39, 34, 45, 44, 46, 50, 43, 52, 53];
        var totalVehicleListLength = totalVehicleList.length - 1;
        while (allVehicleTypes > round) {
            var tr = document.createElement('tr');
            var type = document.createElement('td');
            type.style.textAlign = 'center';
            type.style.width = '50%';
            var count = document.createElement('td');
            count.style.textAlign = 'center';
            count.style.width = '50%';
            var vehicleType = localStorage.getItem(exampleIdList[round]);
            type.innerText = vehicleType.toLocaleUpperCase();
            count.innerText = totalVehicleList[round];
            tr.appendChild(type);
            tr.appendChild(count);
            tbody.appendChild(tr);
            round++;
        }
        thead.appendChild(tbody);
    }

    async function saveVehicleCategories() {
        //check localStorage
        if (localStorage.getItem('lastStorageUpdate') === null || localStorage.getItem('lastStorageUpdate') === undefined || localStorage.getItem('lastStorageUpdate') === undefined) {
            var lastUpdateVehicle = new Date().getTime();
            localStorage.setItem('lastStorageUpdate', lastUpdateVehicle);
        }
        if (localStorage.getItem('1') === null || localStorage.getItem('1') === undefined || localStorage.getItem('lastStorageUpdate') < localStorage.getItem('lastStorageUpdate') - 86400000) {
            //create Variables for vehicleIds
            var lastUpdateVehicle = new Date().getTime();
            localStorage.setItem('lastStorageUpdate', lastUpdateVehicle);
            var lf = [vehicleCategories.lf];
            var hlf = [vehicleCategories.hlf];
            var tlf = [vehicleCategories.tlf];
            var elw1 = [vehicleCategories.elw1];
            var kdow = [vehicleCategories.kdow];
            var dlk = [vehicleCategories.dlk];
            var tmf = [vehicleCategories.tmf];
            var dlk_tmf = [vehicleCategories.dlk_tmf];
            var rw = [vehicleCategories.rw];
            var mtw = [vehicleCategories.mtw];
            var gw_tier = [vehicleCategories.gw_tier];
            var gw_g = [vehicleCategories.gw_g];
            var sw = [vehicleCategories.sw];
            var gw_mess = [vehicleCategories.gw_mess];
            var rtw = [vehicleCategories.rtw];
            var lpol = [vehicleCategories.lpol];
            var bpol = [vehicleCategories.bpol];
            var all = [];
            all.push(lf, hlf, tlf, elw1, kdow, dlk, tmf, dlk_tmf, rw, mtw, gw_tier, gw_g, sw, gw_mess, rtw, lpol, bpol);
            //set localStorage
            for (vehicleType in all) {
                for (specificVehicleType in all[vehicleType]) {
                    var round = 0;
                    for (vehicleIdNumber in all[vehicleType][specificVehicleType].ids) {
                        localStorage.setItem(all[vehicleType][specificVehicleType].ids[round], all[vehicleType][specificVehicleType].shortName);
                        round++;
                        if (vehicleIdNumber < 0) {
                            break;
                        }
                    }
                    if (specificVehicleType < 0) {
                        break;
                    }
                }
                if (vehicleType < 0) {
                    break;
                }
            }
        }
    }
};