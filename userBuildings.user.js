// ==UserScript==
// @name         ReSi Count Buildings
// @namespace    http://tampermonkey.net/
// @version      2.0.3
// @description  Count the buildings
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online/profile
// @match        https://rettungssimulator.online/profile/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userBuildings.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userBuildings.user.js
// ==/UserScript==

if (
  localStorage.getItem("buildingCountGameversion") <
    new URLSearchParams(
      "?" + document.querySelector("link[rel]").href.split("?")[1]
    ).get("v") ||
  localStorage.getItem("buildingCountGameversion") == null
) {
  var gameVersion = new URLSearchParams(
    "?" + document.querySelector("link[rel]").href.split("?")[1]
  ).get("v");
  localStorage.setItem("buildingCountGameversion", gameVersion);
  storeBuildingTypes();
}

async function storeBuildingTypes() {
  const builingTypes = await (await fetch("/api/buildings")).json();
  localStorage.setItem(
    "buildingCountBuildingCategories",
    JSON.stringify(builingTypes)
  );
}

if (
  localStorage.getItem("buildingCountBuildings") == null ||
  Number(JSON.parse(localStorage.getItem("buildingCountBuildings")).update) <
    new Date().getTime() - 86400
) {
  buildingCount();
}

async function buildingCount() {
  const buildings = await (await fetch("/api/userBuildings")).json();
  let object = {
    userBuildings: buildings,
    update: new Date().getTime(),
  };
  localStorage.setItem("buildingCountBuildings", JSON.stringify(object));
}

async function buildingStats() {
  const buildings = JSON.parse(localStorage.getItem("buildingCountBuildings"));
  const buildingCategories = JSON.parse(
    localStorage.getItem("buildingCountBuildingCategories")
  );

  let buildingCount = {};
  for (let elem of buildingCategories) {
    buildingCount[elem.buildingID] = {
      buildingName: elem.buildingName,
      organisation: elem.organisationName,
      buildingCategory: elem.buildingCategory,
      count: 0,
    };
  }

  for (let elem in buildings["userBuildings"]) {
    buildingCount[buildings["userBuildings"][elem].buildingType].count++;
  }

  var parentDiv = document.querySelectorAll(
    "body div.iframe-content div.card-collapse"
  );

  var parentDiv0 = parentDiv[0].parentNode;
  var parentDiv1 = parentDiv[1];
  let showBuildingDiv = document.createElement("div");
  showBuildingDiv.classList.add("card", "card-collapse", "collapsed");
  showBuildingDiv.innerHTML =
    '<div class="card-headline card-headline-danger">Gebäude <i class="fas fa-angle-up card-collapse-toggle pointer right"></i></div><div class="card-body"><div class="element-container"><table class="striped table-divider" id="theadBuildings"><thead><tr><th style="text-align: center;">Typ</th><th style="text-align: center;">Anzahl</th></tr></thead></table></div></div>';
  parentDiv0.insertBefore(showBuildingDiv, parentDiv1);
  var thead = document.querySelector("#theadBuildings");
  var tbody = document.createElement("tbody");
  tbody.style.width = "100%";
  for (var elem in buildingCount) {
    var tr = document.createElement("tr");
    var type = document.createElement("td");
    type.style.textAlign = "center";
    type.style.width = "50%";
    var count = document.createElement("td");
    count.style.textAlign = "center";
    count.style.width = "50%";
    if (buildingCount[elem].buildingName.endsWith("e")) {
      type.innerText = buildingCount[elem].buildingName += "n";
    } else if (buildingCount[elem].buildingName.endsWith("haus")) {
      type.innerText = buildingCount[elem].buildingName.replace(
        "haus",
        "häuser"
      );
    } else if (buildingCount[elem].buildingName.endsWith("ort")) {
      type.innerText = buildingCount[elem].buildingName.replace("ort", "orte");
    } else {
      type.innerText = buildingCount[elem].buildingName;
    }
    count.innerText = buildingCount[elem].count;
    tr.appendChild(type);
    tr.appendChild(count);
    tbody.appendChild(tr);
  }
  thead.appendChild(tbody);
}

window.addEventListener("load", () => {
  buildingStats();
});
