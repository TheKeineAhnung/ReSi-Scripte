// ==UserScript==
// @name         ReSi Count Buildings
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Count the buildings
// @author       KeineAhnung
// @include      https://rettungssimulator.online/profile/
// @include      https://rettungssimulator.online/profile
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userBuildings.user.js
// ==/UserScript==

window.onload = async function() {
    let style = document.createElement("style");
    style.innerText = '.card-headline.card-headline-info{background-color:#2196f3;color:#fff}.card .card-body.card-body-info{background-color:#282C35;color:#fff}.card';
    document.head.appendChild(style);
    var firestation = 0;
    var firebrigadeschool = 0;
    var ambulancestation = 0;
    var hospital = 0;
    var policestationLP = 0;
    var policestationBP = 0;
    var policeschool = 0;
    var round = 0;
    var differentBuildingTypes = 8

    await $.ajax({
        url: "/api/userBuildings/",
        dataType: "json",
        type: "GET",

        success: function(r) {
            for (allBuildings in r) {
                if (r[round].buildingType == 1) {
                    firestation++;
                } else if (r[round].buildingType == 2) {
                    firebrigadeschool++;
                } else if (r[round].buildingType == 3) {
                    ambulancestation++;
                } else if (r[round].buildingType == 4) {
                    hospital++;
                } else if (r[round].buildingType == 5) {
                    policestationLP++;
                } else if (r[round].buildingType == 6) {
                    policestationBP++;
                } else if (r[round].buildingType == 7) {
                    policeschool++;
                }
                round++;
            }
        }
    })
    var completeBuildings = round;
    round = 0
    var parentDiv = document.getElementsByClassName("detail-subtitle");
    var parentDivHeight = window.getComputedStyle(parentDiv[0]);
    parentDivHeight = parentDivHeight.getPropertyValue("height");
    parentDivHeight = parentDivHeight.replace("px", "");
    let newDiv = document.createElement("div");
    newDiv.classList.add('card', 'buildingCounter');
    newDiv.innerHTML = 'TEST';
    newDiv.style.float = "right";
    newDiv.innerHTML = '<div class="card-headline card-headline-info">Gebäude</div><div class="card-body card-body-info"><div class="alert alert-info"></div><table id="tableBuildings"></table></div>';
    parentDivHeight = Number(parentDivHeight)
    var finalHeight = Number(parentDivHeight - 25);
    var marginTop = String("-" + finalHeight + "px");
    newDiv.style.marginTop = marginTop;
    parentDiv[0].appendChild(newDiv);
    var table = document.querySelector('#tableBuildings');
    var tbody = document.createElement('tbody')
    while (differentBuildingTypes != round) {
        var tr = document.createElement("tr");
        var number = document.createElement('td');
        var type = document.createElement('td');
        if (round == 0) {
            number.innerText = firestation;
            if (firestation == 1) {
                type.innerText = "Feuerwache";
            } else {
                type.innerText = "Feuerwachen";
            }
        } else if (round == 1) {
            number.innerText = firebrigadeschool;
            if (firebrigadeschool == 1) {
                type.innerText = "Feuerwehrschule";
            } else {
                type.innerText = "Feuerwehrschule";
            }
        } else if (round == 2) {
            number.innerText = ambulancestation;
            if (ambulancestation == 1) {
                type.innerText = "Rettungswache";
            } else {
                type.innerText = "Rettungswachen";
            }
        } else if (round == 3) {
            number.innerText = hospital;
            if (hospital == 1) {
                type.innerText = "Krankenhaus";
            } else {
                type.innerText = "Krankenhäuser";
            }
        } else if (round == 4) {
            number.innerText = policestationLP;
            if (policestationLP == 1) {
                type.innerText = "Landespolizeiwache";
            } else {
                type.innerText = "Landespolizeiwachen";
            }
        } else if (round == 5) {
            number.innerText = policestationBP;
            if (policestationBP == 1) {
                type.innerText = "Bundespolizeiwache";
            } else {
                type.innerText = "Bundespolizeiwachen";
            }
        } else if (round == 6) {
            number.innerText = policeschool;
            if (policeschool == 1) {
                type.innerText = "Polizeischule";
            } else {
                type.innerText = "Polizeischule";
            }
        } else {
            number.innerText = completeBuildings;
            type.innerText = "Gebäude insgesamt"
        }
        tr.appendChild(number);
        tr.appendChild(type);
        tbody.appendChild(tr)
        round++;
    }

    table.appendChild(tbody);
}