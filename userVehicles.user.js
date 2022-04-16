// ==UserScript==
// @name         ReSi count vehicles
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  Count the Vehicles
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online/profile
// @match        https://rettungssimulator.online/profile/
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userVehicles.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/userVehicles.user.js
// ==/UserScript==

async function vehicleStats() {
  if (
    !sessionStorage.vehicleCategories ||
    JSON.parse(sessionStorage.vehicleCategories).lastUpdate <
      new Date().getTime() - 6000000000
  ) {
    await $.getJSON("/api/vehicleCategories").done((data) =>
      sessionStorage.setItem(
        "vehicleCategories",
        JSON.stringify({ lastUpdate: new Date().getTime(), value: data })
      )
    );
  }
  const vehicleCategories = JSON.parse(sessionStorage.vehicleCategories).value;
  saveVehicleCategories();
  var vehicles = JSON.parse(sessionStorage.getItem("vehicles"));

  //get User Vehicles
  $.ajax({
    url: "/api/userVehicles",
    dataType: "json",
    type: "GET",
    success: function (r) {
      for (var actualVehicle of r) {
        assignVehicleCategories(actualVehicle);
      }
      showCard();
    },
  });

  async function assignVehicleCategories(actualVehicle) {
    var id = actualVehicle.vehicleID;
    if (localStorage.getItem("userVehicles-" + String(id))) {
      for (var elem in vehicles) {
        if (vehicles[elem].ids.includes(id)) {
          vehicles[elem].count += 1;
        }
      }
      return;
    }
    for (var i in vehicles) {
      if (vehicles[i].ids.includes(id)) {
        localStorage.setItem(
          "userVehicles-" + String(id),
          vehicles[i].readableShortName
        );
      }
    }
  }

  async function showCard(totalVehicleList) {
    let style = document.createElement("style");
    style.innerHTML =
      ".card-headline.card-headline-danger{background-color:#DB1111;color:#fff}.card";
    document.head.appendChild(style);
    var parentDiv = document.querySelectorAll(".card-collapse");
    parentDiv0 = parentDiv[0].parentNode;
    parentDiv1 = parentDiv[1];
    let showVehicleDiv = document.createElement("div");
    showVehicleDiv.classList.add("card", "card-collapse", "collapsed");
    showVehicleDiv.innerHTML =
      '<div class="card-headline card-headline-danger">Fahrzeuge <i class="fas fa-angle-up card-collapse-toggle pointer right"></i></div><div class="card-body"><div class="element-container"><table class="striped table-divider" id="theadVehicles"><thead><tr><th style="text-align: center;">Typ</th><th style="text-align: center;">Anzahl</th></tr></thead></table></div></div>';
    parentDiv0.insertBefore(showVehicleDiv, parentDiv1);
    var thead = document.querySelector("#theadVehicles");
    var tbody = document.createElement("tbody");
    tbody.style.width = "100%";
    for (var showVehicle in vehicles) {
      var tr = document.createElement("tr");
      var type = document.createElement("td");
      type.style.textAlign = "center";
      type.style.width = "50%";
      var count = document.createElement("td");
      count.style.textAlign = "center";
      count.style.width = "50%";
      type.innerText = vehicles[showVehicle].readableShortName;
      count.innerText = vehicles[showVehicle].count;
      tr.appendChild(type);
      tr.appendChild(count);
      tbody.appendChild(tr);
    }
    thead.appendChild(tbody);
  }

  async function saveVehicleCategories() {
    //check sessionStorage
    if (
      sessionStorage.getItem("vehiclesUpdate") === null ||
      sessionStorage.getItem("vehiclesUpdate") === undefined
    ) {
      let lastUpdateVehicle = new Date().getTime();
      sessionStorage.setItem("vehiclesUpdate", lastUpdateVehicle);
    }
    if (
      sessionStorage.getItem("1") === null ||
      sessionStorage.getItem("1") === undefined ||
      sessionStorage.getItem("vehiclesUpdate") <
        sessionStorage.getItem("vehiclesUpdate") - 86400000
    ) {
      //create Variables for vehicleIds
      let lastUpdateVehicle = new Date().getTime();
      sessionStorage.setItem("vehiclesUpdate", lastUpdateVehicle);
      var vehicles = new Object();
      for (var e in vehicleCategories) {
        var ids = vehicleCategories[e].ids;
        if (!ids.length <= 0) {
          if (ids[0] < 10000) {
            vehicles[vehicleCategories[e].shortName] = new Object();
          }
        }
      }

      //set sessionStorage
      for (var vehicleType in vehicles) {
        vehicles[vehicleType].readableShortName =
          vehicleCategories[vehicleType].readableShortName;
        vehicles[vehicleType].count = 0;
        vehicles[vehicleType].ids = vehicleCategories[vehicleType].ids;
      }
      sessionStorage.setItem("vehicles", JSON.stringify(vehicles));
    }
  }
}

window.addEventListener("load", () => {
  vehicleStats();
});
