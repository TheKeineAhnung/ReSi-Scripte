// ==UserScript==
// @name         Hide disabled departments
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Hides departments which contain only S6 vehicles
// @author       KeineAhnung
// @match        https://rettungssimulator.online/mission/*
// @grant        none
// ==/UserScript==

const departments = document.querySelectorAll(
  "#mission-vehicle-group-by-building div.mission-vehicles-group"
);

for (let i = 0; i < departments.length; i++) {
  const department = departments[i];
  const vehicles = department.querySelectorAll(
    "div.mission-vehicles div.mission-vehicle"
  );

  for (let j = 0; j < vehicles.length; j++) {
    const vehicle = vehicles[j];

    if (!vehicle.querySelector(".vehicle-status").classList.contains("s6")) {
      break;
    }

    if (j == vehicles.length - 1) {
      department.style.display = "none";
    }
  }
}
