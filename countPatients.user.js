// ==UserScript==
// @name         Show Patients
// @namespace    http://tampermonkey.net/
// @version      1.0.5
// @run-at       document-end
// @description  Shows all patients in the hospitals and the hospital capacity
// @author       KeineAhnung
// @match        https://rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/countPatients.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/countPatients.user.js
// @grant        none
// ==/UserScript==

if (
  localStorage.getItem("allPatients") != null &&
  localStorage.getItem("allPatients") != undefined &&
  localStorage.getItem("allPatients") >= 0
) {
  var allPatients = localStorage.getItem("allPatients");
} else {
  allPatients = 0;
  localStorage.setItem("allPatients", allPatients);
}

document.querySelectorAll(".currentpatients").forEach((e) => {
  e.addEventListener("DOMSubtreeModified", () => {
    countPatients();
  });
});

async function countPatients() {
  $.ajax({
    url: "/api/userBuildings",
    dataType: "json",
    type: "GET",
    success: function (r) {
      localStorage.setItem("allPatients", 0);
      localStorage.setItem("totalPatientSlots", 0);
      var allBuildings = r;
      for (actualBuilding in allBuildings) {
        if (allBuildings[actualBuilding].buildingType == "4") {
          var totalPatientSlotSet =
            parseInt(localStorage.getItem("totalPatientSlots")) +
            r[actualBuilding].level +
            9;
          localStorage.setItem("totalPatientSlots", totalPatientSlotSet);
        }
      }
      var allPatientsOnLoad =
        document.getElementsByClassName("currentpatients");
      var round = 0;
      while (round != allPatientsOnLoad.length) {
        var actualPatients =
          parseInt(localStorage.getItem("allPatients")) +
          parseInt(allPatientsOnLoad[round].innerText);
        localStorage.setItem("allPatients", actualPatients);
        round++;
      }
      if (document.querySelector("#patientInformation") === null) {
        showPanel();
      }
      updatePanel();
    },
  });
}

async function showPanel() {
  var position = document.querySelector(".muenzen_marken");
  var span = document.createElement("span");
  span.id = "patientInformation";
  span.innerHTML =
    " | " +
    '<span id="KeineAhnungActual">' +
    localStorage.getItem("allPatients") +
    "</span>" +
    " Patient(en) bei " +
    '<span id="KeineAhnungTotal">' +
    localStorage.getItem("totalPatientSlots") +
    "</span>" +
    " Betten";
  position.appendChild(span);
}

async function updatePanel() {
  var areaActual = document.getElementById("KeineAhnungActual");
  areaActual.innerText = localStorage.getItem("allPatients");
  var areaTotal = document.getElementById("KeineAhnungTotal");
  areaTotal.innerText = localStorage.getItem("totalPatientSlots");
}

countPatients();
