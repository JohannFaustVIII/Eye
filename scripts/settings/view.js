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

  companies.forEach(function (company) {
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

    document.getElementById("company-ignore-list").appendChild(element);
  });
}