// ==UserScript==
// @name         designOptimizations
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @run-at       document-end
// @description  Optimize the design of the forum
// @author       KeineAhnung
// @match        https://forum.rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=forum.rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/main/forum/designOptimizations.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/main/forum/designOptimizations.user.js
// @grant        none
// ==/UserScript==

function removeBlueLineOfCategoryHeaders(params) {
  let style = document.createElement("style");
  style.innerText = `li.wbbCategory header{color: #a11116 !important;}`;
  document.head.appendChild(style);
}

function pageHeaderBackgroundImage(
  params = {
    imageUrl:
      "https://forum.rettungssimulator.online/cms/index.php?media/3-image-5-jpg",
  }
) {
  let pageHeader = document.querySelector("#pageHeaderFacade");
  let imageUrl = params.imageUrl;
  pageHeader.style.backgroundImage = `url(${imageUrl})`;
}

// Function returns a dictionary with the following keys: "funtionName", "functionDescription"
function settingsUiContent() {
  return {
    0: {
      title: "Kategorieheader",
      description: "Entfernt die blauen Linien der Kategorieheader.",
      params: [null],
      func: "removeBlueLineOfCategoryHeaders",
    },
    1: {
      title: "Seitenheader",
      description: "Ändert das Hintergrundbild des Seitenheaders.",
      params: ["imageUrl"],
      func: "pageHeaderBackgroundImage",
    },
  };
}

function setDefaultConfig() {
  if (
    localStorage.getItem("designOptConfig") == null ||
    localStorage.getItem("designOptConfig") == undefined
  ) {
    let options = Object.keys(settingsUiContent()).length;
    let defaultConfig = {};
    for (let i = 0; i < options; i++) {
      defaultConfig[i] = {
        active: false,
        params: {},
      };
    }
    localStorage.setItem("designOptConfig", JSON.stringify(defaultConfig));
  }
}

function settingsUITrigger() {
  let settingsWheel = document.querySelector(".userPanelItems");
  let settingsButton = document.createElement("li");
  settingsButton.classList.add("designSettings");
  let settingsLink = document.createElement("a");
  settingsLink.href = "#";
  settingsLink.id = "designSettings";
  settingsLink.setAttribute("data-tooltip", "Design Settings");
  let settingsSpan = document.createElement("span");
  let settingsSpanText = document.createElement("span");
  settingsSpanText.innerText = "Design Settings";
  settingsSpan.classList.add("icon", "icon32", "fa-cog");
  settingsLink.appendChild(settingsSpan);
  settingsButton.appendChild(settingsLink);
  settingsWheel.appendChild(settingsButton);

  settingsLink.addEventListener("click", () => {
    toggleUiDisplay();
  });
}

function saveConfig() {
  var content = settingsUiContent();
  let settingsNew = {};
  for (let e in content) {
    let elem = document.querySelector(
      `#${content[e].title.replaceAll(" ", "-")}`
    );
    let params = content[e].params;
    let paramsObj = {};
    params.forEach((param) => {
      let elem = document.querySelector(
        `#${content[e].title.replaceAll(" ", "-")}-${param}`
      );
      if (elem != undefined && elem != null) {
        let value = elem.value;
        paramsObj[param] = value;
      }
    });
    settingsNew[e] = {
      active: elem.checked,
      params: paramsObj,
    };
  }
  localStorage.setItem("designOptConfig", JSON.stringify(settingsNew));
  location.reload();
}

function settingsUi() {
  let body = document.querySelector("body");
  let settingsMenu = document.createElement("div");
  settingsMenu.id = "designSettingsMenu";
  settingsMenu.style.position = "absolute";
  settingsMenu.style.width = "95%";
  settingsMenu.style.height = "auto";
  settingsMenu.style.display = "none";
  settingsMenu.setAttribute("aria-hidden", "true");
  settingsMenu.classList.add("dialogContainer");
  settingsMenu.setAttribute("role", "dialog");
  let settingsUiContentCards = giveSettingsUiContent();
  let gridRows = Math.ceil(Object.keys(settingsUiContent()).length / 4);
  settingsMenu.innerHTML = `
    <header>
      <span class="dialogTitle">Design Einstellungen</span>
      <a class="dialogCloseButton" id="designSettingsMenuClose" aria-label="Schließen" data-tooltip="Schließen">
        <span class="icon icon24 fa-times"></span>
      </a>
    </header>
    <div class="dialogContent" style="height: 100%;">
      <div class="designSettingsMenuContentItem">
        <div class="designSettingsMenuContentItemContent" style="display: grid; grid-template-rows: repeat(${gridRows}, 100%); grid-template-columns: 24% 24% 24% 24%; grid-column-gap: 1%; grid-row-gap: 1%;">
          ${settingsUiContentCards}
        </div>
      </div>
      <button id="designOptConfigSafe" type="submit" style="margin-top: 1rem;">Speichern</button>
    </div>
    `;
  let area = document.querySelector(".dialogOverlay");
  area.appendChild(settingsMenu);
  let settingsDialog = document.querySelector("#designSettingsMenu");
  settingsDialog.style.display = "block";
  document
    .querySelector("#designSettingsMenuClose")
    .addEventListener("click", () => {
      toggleUiDisplay();
    });
  document
    .querySelector("#designOptConfigSafe")
    .addEventListener("click", () => {
      saveConfig();
    });
}

// Add the settings UI to the settings popup
function giveSettingsUiContent() {
  var content = settingsUiContent();
  var config = JSON.parse(localStorage.getItem("designOptConfig"));
  var finalContent = "";
  for (var e in content) {
    finalContent += addSettingsUiContentTemplateCard(
      content[e].title,
      content[e].description,
      content[e].params,
      config[e].active,
      e
    );
  }
  return finalContent;
}

function addSettingsUiContentTemplateCard(title, desc, params, checked, id) {
  let savedParams = JSON.parse(localStorage.getItem("designOptConfig"));
  if (checked) {
    checked = "checked";
  } else {
    checked = "";
  }
  let paramHTML = "";
  if (params[0] != null) {
    params.forEach((element) => {
      if (savedParams[id].params[element] != undefined) {
        var value = savedParams[id].params[element];
      } else {
        var value = "";
      }
      paramHTML += `<input type="text" id="${title.replaceAll(
        " ",
        "-"
      )}-${element}" placeholder="${element}" value="${value}">`;
    });
  }
  return `
    <div class="designSettingsMenuContentItem" data-name="${title}" style="border: 2px solid rgba(161, 17, 22, 1); border-radius: 15px; margin-top: 0.25rem;">
      <header style="font-size: 1.5rem; background-color: rgba(161, 17, 22, 1); padding: 0.25rem 1rem; border-top-left-radius: 11px; border-top-right-radius: 11px;"><span style="display: inline-block;">${title}<input id="${title.replaceAll(
    " ",
    "-"
  )}" type="checkbox" ${checked}></span></header>
      <div class="designSettingsCardDescription" style="padding: 0.25rem 1rem;">${desc}</div>
      <div class="params" style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; margin-bottom: 0.25rem;">
        ${paramHTML}
      </div>
    </div>
  `;
}

function toggleUiDisplay() {
  let settingsUiElement = document.querySelector("#designSettingsMenu");
  let dialogOverlay = document.querySelector(".dialogOverlay");
  if (!settingsUiElement.classList.contains("active")) {
    dialogOverlay.setAttribute("aria-hidden", "false");
    settingsUiElement.setAttribute("aria-hidden", "false");
    settingsUiElement.classList.add("active");
  } else {
    dialogOverlay.setAttribute("aria-hidden", "true");
    settingsUiElement.setAttribute("aria-hidden", "true");
    settingsUiElement.classList.remove("active");
  }
}

function loadConfig() {
  let config = JSON.parse(localStorage.getItem("designOptConfig"));
  let content = settingsUiContent();
  for (let e in config) {
    if (config[e].active) {
      let func = content[e].func;
      let params = JSON.stringify(config[e].params);
      eval(`${func}(${params})`);
    }
  }
}

window.addEventListener("load", function () {
  setDefaultConfig();
  settingsUi();
  settingsUITrigger();
  loadConfig();
});
