// This script is only available with my scriptmanager, because tampermonkey is trash with regex.
// match url: \/https:\/\/rettungssimulator.online\/association\/[0-9]*#associationMembers

let element = document.querySelectorAll("div.card")[4];
let head = element.querySelector("div.card-headline");
head.style.display = "flex";
head.innerHTML +=
  '<div><input type="checkbox" id="green" name="Online" checked><label for="green">Online</label></div><div><input type="checkbox" id="red" name="red" checked><label for="red">Offline</label></div><div><input type="checkbox" id="purple" name="purple" checked><label for="purple">Mehr als 90 Tage offline</label></div>';

let online = document.querySelector("input#green");
let offline = document.querySelector("input#red");
let longOffline = document.querySelector("input#purple");

online.addEventListener("change", () => {
  if (online.checked) {
    let elements = document.querySelectorAll("tr.toplistTr");
    elements.forEach((element) => {
      if (element.children[0].classList.contains("toplist-online")) {
        element.style.display = "table-row";
      }
    });
  } else {
    let elements = document.querySelectorAll("tr.toplistTr");
    elements.forEach((element) => {
      if (element.children[0].classList.contains("toplist-online")) {
        element.style.display = "none";
      }
    });
  }
});
offline.addEventListener("change", () => {
  if (offline.checked) {
    let elements = document.querySelectorAll("tr.toplistTr");
    elements.forEach((element) => {
      if (element.children[0].classList.contains("toplist-offline")) {
        element.style.display = "table-row";
      }
    });
  } else {
    let elements = document.querySelectorAll("tr.toplistTr");
    elements.forEach((element) => {
      if (element.children[0].classList.contains("toplist-offline")) {
        element.style.display = "none";
      }
    });
  }
});
longOffline.addEventListener("change", () => {
  if (longOffline.checked) {
    let elements = document.querySelectorAll("tr.toplistTr");
    elements.forEach((element) => {
      if (element.children[0].classList.contains("toplist-absent")) {
        element.style.display = "table-row";
      }
    });
  } else {
    let elements = document.querySelectorAll("tr.toplistTr");
    elements.forEach((element) => {
      if (element.children[0].classList.contains("toplist-absent")) {
        element.style.display = "none";
      }
    });
  }
});
