// ==UserScript==
// @name         Show latest radio message
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Show only the latest radio message in the radio message field
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/showOnlyLatestRadioMessage.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/showOnlyLatestRadioMessage.user.js
// ==/UserScript==

function updateField(vehicleFMSObject) {
  if (
    document.querySelectorAll(
      `div.radio-vehicle.frame-opener[uservehicleid="${vehicleFMSObject.userVehicleID}"]`
    )
  ) {
    if (
      document.querySelectorAll(
        `div.radio-vehicle.frame-opener[uservehicleid="${vehicleFMSObject.userVehicleID}"]`
      ).length > 1
    ) {
      let elements = document.querySelectorAll(
        `div.radio-vehicle.frame-opener[uservehicleid="${vehicleFMSObject.userVehicleID}"]`
      );
      for (let i = 0; i < elements.length; i++) {
        if (i > 0) {
          elements[i].remove();
        }
      }
    }
  }
}

socket.on("vehicleFMS", (vehicleFMSObject) => {
  updateField(vehicleFMSObject);
});
