import { deleteCompany } from "./controller.js";

export function clearInput(element) {
  element.value = '';
}

export function renderFullHideCheckbox(hide) {
  document.getElementById("full-hide").checked = hide;
}

export function renderNoCompanyCheckbox(hide) {
  document.getElementById("hide-no-companies").checked = hide;
}

export function renderCompanyList(companies) {
  document.getElementById("company-ignore-list").innerHTML = "";
  document.getElementById("company-favored-list").innerHTML = "";

  companies["ignored"].forEach((company) => {
    addCompanyElementToList(company, "company-ignore-list");
  });

  companies["favorite"].forEach((company) => {
    addCompanyElementToList(company, "company-favored-list");
  });
}

function addCompanyElementToList(company, listName) {
  const element = document.createElement('div');
  element.classList.add('company-item');
  const companyName = document.createElement('p');
  companyName.innerText = company;
  companyName.classList.add('company-name');
  element.append(companyName);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = '-';
  deleteButton.classList.add('delete-button');
  deleteButton.id = company;
  deleteButton.onclick = deleteCompany;
  element.append(deleteButton);

  document.getElementById(listName).appendChild(element);
}

export function showDefaultTab() {
  showTab("ignored");
}

const tabDict = {
  "ignored" : ["ignored-tab-button", "company-ignore-list"],
  "favorite" : ["favored-tab-button", "company-favored-list"]
};

export function showTab(tabName) {
  var lists = document.getElementsByClassName("company-list")
  if (lists) {
    for (var i = 0; i < lists.length; i++) {
      lists[i].style.display = "none";
    }
  }

  document.querySelectorAll("div.tab button").forEach(button => {
    button.classList.remove("active");
  });

  document.getElementById(tabDict[tabName][0]).classList.add("active");
  document.getElementById(tabDict[tabName][1]).style.display = "block";
}