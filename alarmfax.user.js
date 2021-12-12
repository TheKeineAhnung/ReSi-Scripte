// ==UserScript==
// @name         Alarm fax
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @run-at       document-end
// @description  Add a alarm fax box to the mission page
// @author       KeineAhnung
// @match        https://rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/alarmfax.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/alarmfax.user.js
// @grant        none
// ==/UserScript==

if (!localStorage.getItem("alarmfaxInfo")) {
  localStorage.setItem("alarmfaxInfo", JSON.stringify({}));
}

if (!localStorage.getItem("alarmfaxInfoMissionStatus")) {
  localStorage.setItem("alarmfaxInfoMissionStatus", JSON.stringify({}));
}

if (!sessionStorage.getItem("alarmfaxInfoBuildingData")) {
  sessionStorage.setItem("alarmfaxInfoBuildingData", JSON.stringify({}));
}

async function storeData(vehicleFMSObject) {
  // store important information
  var userMissionId = vehicleFMSObject.userMissionID;
  var vehicleId = vehicleFMSObject.userVehicleID;
  var vehicleName = vehicleFMSObject.userVehicleName;
  var userBuildingId = vehicleFMSObject.userDepartmentID;

  if (
    !JSON.parse(sessionStorage.getItem("alarmfaxInfoBuildingData"))[
      userBuildingId
    ]
  ) {
    await $.ajax({
      url: `/api/userBuildings?id=${userBuildingId}`,
      dataType: "json",
      type: "GET",
      success: function (r) {
        let data = JSON.parse(
          sessionStorage.getItem("alarmfaxInfoBuildingData")
        );
        data[userBuildingId] = r.userBuildingName;
        sessionStorage.setItem(
          "alarmfaxInfoBuildingData",
          JSON.stringify(data)
        );
      },
    });
  }

  var userBuildingName = await JSON.parse(
    sessionStorage.getItem("alarmfaxInfoBuildingData")
  )[userBuildingId];
  var date = new Date();
  var alarmTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  var localStorageObject = JSON.parse(localStorage.getItem("alarmfaxInfo"));
  if (localStorageObject[userMissionId] == undefined) {
    localStorageObject[userMissionId] = {};
    localStorageObject[userMissionId][vehicleId] = {
      userMissionId: userMissionId,
      vehicleName: vehicleName,
      alarmTime: alarmTime,
      userBuildingName: userBuildingName,
    };
    localStorage.setItem("alarmfaxInfo", JSON.stringify(localStorageObject));
  } else {
    if (localStorageObject[userMissionId][vehicleId] == undefined) {
      localStorageObject[userMissionId][vehicleId] = {
        userMissionId: userMissionId,
        vehicleName: vehicleName,
        alarmTime: alarmTime,
        userBuildingName: userBuildingName,
      };
      localStorage.setItem("alarmfaxInfo", JSON.stringify(localStorageObject));
    }
  }
  card();
}

function removeData(vehicleFMSObject) {
  // remove important information
  var userMissionId = vehicleFMSObject.userMissionID;
  var userVehicleId = vehicleFMSObject.userVehicleID;
  var alarmFaxInfo = JSON.parse(localStorage.getItem("alarmfaxInfo"));
  delete alarmFaxInfo[userMissionId][userVehicleId];
  localStorage.setItem("alarmfaxInfo", JSON.stringify(alarmFaxInfo));
  card();
}

function card() {
  if (document.querySelector("#alarmfax-card") == null) {
    let alarmfaxCard = document.createElement("div");
    alarmfaxCard.classList.add("card", "alarmfax");
    alarmfaxCard.id = "alarmfax-card";
    let alarmfaxCardHeader = document.createElement("div");
    alarmfaxCardHeader.classList.add("card-headline", "card-headline-info");
    alarmfaxCardHeader.innerText = "Alarmfax";
    alarmfaxCard.appendChild(alarmfaxCardHeader);
    let alarmfaxCardBody = document.createElement("div");
    alarmfaxCardBody.classList.add("card-body");
    let alarmfaxCardBodyTable = document.createElement("table");
    let alarmfaxCardBodyTableBody = document.createElement("tbody");
    alarmfaxCardBodyTable.appendChild(alarmfaxCardBodyTableBody);
    alarmfaxCardBody.appendChild(alarmfaxCardBodyTable);
    alarmfaxCard.appendChild(alarmfaxCardBody);
    let insertArea = document.querySelector("div.alarmed-vehicles");
    insertArea.insertBefore(alarmfaxCard, insertArea.firstChild);
  }
  var alarmfaxCardBody = document.querySelector(
    "#alarmfax-card .card-body table tbody"
  );
  var innerHTMLContent = "";
  var elements = JSON.parse(localStorage.getItem("alarmfaxInfo"));
  innerHTMLContent += `<tr><th>Funkrufname</th><th>Wache</th><th>Alarmzeit</th></tr>`;
  let userMissionId = window.location.href.split("/");
  userMissionId = userMissionId[userMissionId.length - 1];

  for (var e in elements[userMissionId]) {
    innerHTMLContent += `<tr><td>${elements[userMissionId][e].vehicleName}</td><td>${elements[userMissionId][e].userBuildingName}</td><td>${elements[userMissionId][e].alarmTime}</td></tr>`;
  }
  if (window.location.href.includes("/mission")) {
    alarmfaxCardBody.innerHTML = innerHTMLContent;
  }
}

socket.on("vehicleFMS", (vehicleFMSObject) => {
  if (vehicleFMSObject.userVehicleFMS == 3) {
    storeData(vehicleFMSObject);
  } else if (vehicleFMSObject.userVehicleFMS == 1) {
    removeData(vehicleFMSObject);
  }
});

window.addEventListener("load", () => {
  card();
});
