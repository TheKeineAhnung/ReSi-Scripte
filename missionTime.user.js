// ==UserScript==
// @name         ReSi Show Mission Time
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  Show mission time in mission list
// @author       KeineAhnung
// @run-at       document-end
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/missionTime.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/raw/main/missionTime.user.js
// ==/UserScript==

var ids = [];

socket.on("missionStatus", (missionStatusObject) => {
  setIds(missionStatusObject, "missionStatus");
});

socket.on("finishMission", (userMissionID) => {
  setIds(userMissionID, "finishMission");
});

async function setIds(missionStatusObject, socketType) {
  document.querySelectorAll("div.mission-list-content").forEach((e) => {
    if (
      e.getAttribute("frame-url") ===
        `mission/${missionStatusObject.userMissionID}` &&
      socketType === "missionStatus" &&
      missionStatusObject.userMissionStatus === 3
    ) {
      if (!ids.includes(missionStatusObject.userMissionID)) {
        ids.push(missionStatusObject.userMissionID);
      }
      var container = e.querySelector(
        "div.mission-list-text div.mission-list-name"
      );
      var date = new Date();
      var finishTime = new Date(missionStatusObject.userMissionFinishTime);
      var remainingTime = finishTime.getTime();
      remainingTime = missionStatusObject.userMissionFinishTime
        .split(" ")
        .pop();
      remainingTime = remainingTime.split(":");
      var remainingTimeUnix =
        Number(remainingTime[0]) * 3600 +
        Number(remainingTime[1]) * 60 +
        Number(remainingTime[2]);
      var hoursUnix = date.getHours() * 3600;
      var minutesUnix = date.getMinutes() * 60;
      var secondsUnix = date.getSeconds();
      var completeNowUnix = hoursUnix + minutesUnix + secondsUnix;
      remainingTimeUnix = remainingTimeUnix - completeNowUnix;
      var finishSeconds = remainingTimeUnix % 60;
      if (finishSeconds <= 9) {
        finishSeconds = `0${String(finishSeconds)}`;
      }
      var remainingTimeDisplay = String(
        (remainingTimeUnix - finishSeconds) / 60 + `:${finishSeconds}`
      );
      if (container.querySelector(".mission-time") === null) {
        container.innerHTML += `<div class='mission-time id-${missionStatusObject.userMissionID}'></div>`;
      }
      if (missionStatusObject.userMissionFinishTime !== undefined) {
        container.querySelector(
          ".mission-time"
        ).innerHTML = `${remainingTimeDisplay}`;
      }
    }
    if (ids.includes(missionStatusObject) && socketType === "finishMission") {
      const index = ids.indexOf(missionStatusObject);
      if (index > -1) {
        ids.splice(index, 1);
      }
    }
    try {
      var idContainer = document.querySelector(
        `.id-${missionStatusObject.userMissionID}`
      );
    } catch {
      var idContainer = undefined;
    }
    if (idContainer !== undefined && idContainer !== null) {
      if (idContainer.classList.contains("mission-time")) {
        if (
          missionStatusObject.userMissionStatus === 2 ||
          missionStatusObject.userMissionStatus === 1
        ) {
          var timeContainer = document.querySelector(
            `.${missionStatusObject.userMissionID}`
          );
          timeContainer.classList.replace(
            "mission-time",
            "mission-time-paused"
          );
        }
      }
      if (idContainer.classList.contains("mission-time-paused")) {
        if (missionStatusObject.userMissionStatus === 3) {
          var timeContainer = document.querySelector(
            `.${missionStatusObject.userMissionID}`
          );
          timeContainer.classList.replace(
            "mission-time-paused",
            "mission-time"
          );
        }
      }
    }
  });
}

function refreshIds() {
  var elements = document.querySelectorAll("div.mission-time");
  elements.forEach((e) => {
    var time = String(e.innerText);
    var minutes = time.split(":")[0];
    var seconds = time.split(":")[1];
    if (!time.indexOf(":") > 1 || minutes === "NaN" || seconds === "NaN") {
      e.innerHTML = "0:00";
    } else if (e.innerText === "0:00") {
    } else {
      var minutesInSeconds = Math.floor(Number(minutes) * 60);
      var targetTimeSeconds = minutesInSeconds + Number(seconds);
      var targetSeconds = targetTimeSeconds % 60;
      if (targetSeconds === 0) {
        targetSeconds = 59;
      } else {
        targetSeconds--;
      }
      var targetMinutes = Math.round(targetTimeSeconds - targetSeconds);
      var targetTime =
        String(Math.floor(targetMinutes / 60)) +
        ":" +
        String(targetSeconds <= 9 ? `0${targetSeconds}` : `${targetSeconds}`);
      e.innerHTML = targetTime;
    }
  });
}

var interval = setInterval(refreshIds, 1000);
