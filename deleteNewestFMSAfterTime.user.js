// ==UserScript==
// @name         Delete newest FMS after time
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Delete newest FMS after set time
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/showOnlyLatestRadioMessage.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/showOnlyLatestRadioMessage.user.js
// ==/UserScript==

function updateField(vehicleFMSObject) {
  let time;
  if (localStorage.getItem("deleteNewestFMSAfterTime")) {
    time = localStorage.getItem("deleteNewestFMSAfterTime");
  } else {
    localStorage.setItem("deleteNewestFMSAfterTime", "");
    time = localStorage.getItem("deleteNewestFMSAfterTime");
  }

  time = parseInt(time);

  setTimeout(() => {
    if (
      document.querySelectorAll(
        `div.radio-vehicle.frame-opener[uservehicleid="${vehicleFMSObject.userVehicleID}"]`
      )
    ) {
      if (
        document.querySelectorAll(
          `div.radio-vehicle.frame-opener[uservehicleid="${vehicleFMSObject.userVehicleID}"]`
        )
      ) {
        let elements = document.querySelectorAll(
          `div.radio-vehicle.frame-opener[uservehicleid="${vehicleFMSObject.userVehicleID}"]`
        );
        for (let i = 0; i < elements.length; i++) {
          console.log(elements[i]);
          elements[i].remove();
        }
      }
    }
  }, time);
}

socket.on("vehicleFMS", (vehicleFMSObject) => {
  updateField(vehicleFMSObject);
});
