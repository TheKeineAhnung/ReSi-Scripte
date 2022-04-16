// ==UserScript==
// @name         Remove AAO vehicle types
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @run-at       document-end
// @description  Remove selected AAO vehicles types
// @author       KeineAhnung
// @match        https://rettungssimulator.online/aaoEdit/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideBuildingIcons.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/hideBuildingIcons.user.js
// ==/UserScript==

function removeVehicleOptions() {
  let removeVehicleTypes;
  if (localStorage.getItem("removeVehicleOptions")) {
    removeVehicleTypes = JSON.parse(
      localStorage.getItem("removeVehicleOptions")
    );
  } else {
    localStorage.setItem("removeVehicleOptions", JSON.stringify([]));
    removeVehicleTypes = JSON.parse(
      localStorage.getItem("removeVehicleOptions")
    );
  }

  let elements = document.querySelectorAll("select.aao-edit-selcet");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let options = element.querySelectorAll("option");
    for (let j = 0; j < options.length; j++) {
      let option = options[j];
      if (!option.selected && removeVehicleTypes.includes(option.value)) {
        option.remove();
      }
    }
  }
}

removeVehicleOptions();

window.addEventListener("load", () => {
  removeVehicleOptions();
});
