// ==UserScript==
// @name         designOptimizations
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @run-at       document-end
// @description  Optimize the design of the forum
// @author       KeineAhnung
// @match        https://forum.rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=forum.rettungssimulator.online
// @updateURL    https://github.com/TheKeineAhnung/ReSi-Scripte/main/forum/designOptimizations.user.js
// @downloadURL  https://github.com/TheKeineAhnung/ReSi-Scripte/main/forum/designOptimizations.user.js
// @grant        none
// ==/UserScript==

function removeBlueLineOfCategoryHeaders() {
  let style = document.createElement("style");
  style.innerText = `li.wbbCategory header{color: #a11116 !important;}`;
  document.head.appendChild(style);
}

function pageHeaderBackgroundImage(
  imageUrl = "https://forum.rettungssimulator.online/cms/index.php?media/3-image-5-jpg"
) {
  let pageHeader = document.querySelector("#pageHeaderFacade");
  pageHeader.style.backgroundImage = `url(${imageUrl})`;
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

function settingsUi() {
  let body = document.querySelector("body");
  let settingsMenu = document.createElement("div");
  settingsMenu.id = "designSettingsMenu";
  settingsMenu.style.position = "absolute";
  settingsMenu.style.width = "90%";
  settingsMenu.style.height = "auto";
  settingsMenu.setAttribute("aria-hidden", "true");
  settingsMenu.classList.add("dialogContainer");
  settingsMenu.setAttribute("role", "dialog");
  let settingsUiContent = giveSettingsUiContent();
  settingsMenu.innerHTML = `
    <header>
      <span class="dialogTitle">Design Einstellungen</span>
      <a class="dialogCloseButton" id="designSettingsMenuClose" aria-label="Schließen" data-tooltip="Schließen">
        <span class="icon icon24 fa-times"></span>
      </a>
    </header>
    <div class="dialogContent" style="height: 100%;">
      <div class="designSettingsMenuContentItem">
        <div class="designSettingsMenuContentItemContent" style="display: grid: grit">
          ${settingsUiContent}
        </div>
      </div>
    </div>
    `;
  body.appendChild(settingsMenu);
  document
    .querySelector("#designSettingsMenuClose")
    .addEventListener("click", () => {
      toggleUiDisplay();
    });
}

// Function returns a dictionary with the following keys: "funtionName", "functionDescription"
function settingsUiContent() {
  return {
    1: {
      title: "Blaue Linien entfernen",
      description: "Remove the blue line of category headers.",
    },
    2: {
      title: "Hintergrundbild des Seitenheaders ändern",
      description: "Change the background image of the page header.",
    },
  };
}

// Add the settings UI to the settings popup
function giveSettingsUiContent() {
  var content = settingsUiContent();
  var finalContent = "";
  for (var e in content) {
    finalContent += addSettingsUiContentTemplateCard(
      content[e].title,
      content[e].description
    );
  }
  return finalContent;
}

function addSettingsUiContentTemplateCard(title, desc) {
  return `
    <div class="designSettingsMenuContentItem" data-name="${title}" style="border: 2px solid rgba(161, 17, 22, 1); border-radius: 15px; margin-top: 0.25rem;">
      <header style="font-size: 1.5rem; background-color: rgba(161, 17, 22, 1); padding: 0.25rem 2rem; border-top-left-radius: 11px; border-top-right-radius: 11px;">${title}</header>
      <div class="designSettingsCardDescription" style="padding: 0.25rem 2rem;">${desc}</div>
    </div>
  `;
}

function toggleUiDisplay() {
  let settingsUiElement = document.querySelector("#designSettingsMenu");
  if (!settingsUiElement.classList.contains("active")) {
    settingsUiElement.setAttribute("aria-hidden", "false");
    settingsUiElement.classList.add("active");
  } else {
    settingsUiElement.setAttribute("aria-hidden", "true");
    settingsUiElement.classList.remove("active");
  }
}

window.addEventListener("load", function () {
  removeBlueLineOfCategoryHeaders();
  settingsUi();
  settingsUITrigger();
});
