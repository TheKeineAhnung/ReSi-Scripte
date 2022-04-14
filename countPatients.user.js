// ==UserScript==
// @name         Show Patients
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @run-at       document-end
// @description  Shows all patients in the hospitals and the hospital capacity
// @author       KeineAhnung
// @include      https://rettungssimulator.online
// @include      https://rettungssimulator.online/*
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/countPatients.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/countPatients.user.js
// @grant        none
// ==/UserScript==

var loop = 0;

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

$(".currentpatients").on("DOMSubtreeModified", function () {
  countPatients();
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
      if (loop == 0) {
        showPanel();
        loop++;
      }
      updatePanel();
    },
  });
}

async function showPanel() {
  var position = document.querySelector(".muenzen_marken");
  var span = document.createElement("span");
  span.innerHTML =
    "| " +
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
