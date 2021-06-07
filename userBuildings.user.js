// ==UserScript==
// @name         ReSi Count Buildings
// @namespace    http://tampermonkey.net/
// @version      1.3.0
// @description  Count the buildings
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online/profile
// @match        https://rettungssimulator.online/profile/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userBuildings.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userBuildings.user.js
// ==/UserScript==

window.onload = async function buildingStats() {
    let style = document.createElement("style");
    style.innerText = ".card-headline.card-headline-danger{background-color:#DB1111;color:#fff}.card";
    document.head.appendChild(style);
    var firestation = 0;
    var firebrigadeschool = 0;
    var ambulancestation = 0;
    var hospital = 0;
    var policestationLP = 0;
    var policestationBP = 0;
    var policeschool = 0;
    var controlRoom = 0;
    var round = 0;
    var allBuildingTypes = 8;

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
                } else if (r[round].buildingType == 8) {
                    controlRoom++;
                }
                round++;
            }
        }
    })

    var parentDiv = document.getElementsByClassName("card-collapse");
    parentDiv0 = parentDiv[0].parentNode;
    parentDiv1 = parentDiv[1];
    let showBuildingDiv = document.createElement("div");
    showBuildingDiv.classList.add("card", "card-collapse", "collapsed");
    showBuildingDiv.innerHTML = '<div class="card-headline card-headline-danger">Gebäude <svg class="svg-inline--fa fa-angle-up fa-w-10 card-collapse-toggle pointer right" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg></div><div class="card-body"><div class="element-container"><table class="striped table-divider" id="theadBuildings"><thead><tr><th style="text-align: center;">Typ</th><th style="text-align: center;">Anzahl</th></tr></thead></table></div></div>';
    parentDiv0.insertBefore(showBuildingDiv, parentDiv1);
    var thead = document.querySelector("#theadBuildings");
    var tbody = document.createElement("tbody");
    tbody.style.width = "100%";
    var round = 0;
    var totalBuildingList = ["Leitstellen", "Feuerwachen", "Feuerwehrschulen", "Rettungswachen", "Krankenhäuser", "Landespolizeiwachen", "Bundespolizeiwachen", "Polizeischulen"]
    var buildingCountList = [controlRoom, firestation, firebrigadeschool, ambulancestation, hospital, policestationLP, policestationBP, policeschool]
    while (allBuildingTypes > round) {
        var tr = document.createElement("tr");
        var type = document.createElement("td");
        type.style.textAlign = "center";
        type.style.width = "50%";
        var count = document.createElement("td");
        count.style.textAlign = "center";
        count.style.width = "50%";
        type.innerText = totalBuildingList[round];
        count.innerText = buildingCountList[round];
        tr.appendChild(type);
        tr.appendChild(count);
        tbody.appendChild(tr);
        round++;
    }
    thead.appendChild(tbody);
}