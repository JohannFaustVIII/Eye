import { addCompany, setFullHide, setHideNoCompanies, removeCompany, setActiveTab, saveBaseColor, saveIgnoredColor, saveFavoriteColor } from "./model.js";
import { clearInput, renderCompanyList, showTab } from "./view.js";

export function add() {
  const companyInput = document.getElementById("company")
  const companyTitle = companyInput.value;

  addCompany(companyTitle).then( (companies) => {
    renderCompanyList(companies);
  }).then ( () => {
    clearInput(companyInput);
  });
}

export function setHidden() {
  const isChecked = document.getElementById("full-hide").checked;
  
  setFullHide(isChecked);
}

export function setHiddenNoCompanies() {
  const isChecked = document.getElementById("hide-no-companies").checked;
  
  setHideNoCompanies(isChecked);
}

export function deleteCompany(event) {
  const deleteButton = event.target;
  const companyToDelete = deleteButton.id;

  removeCompany(companyToDelete).then( (companies) => {
    renderCompanyList(companies);
  });
}

export function setIgnoredTab() {
  setActiveTab("ignored").then((activeTab) => {
    showTab(activeTab);
  });
}

export function setFavoriteTab() {
  setActiveTab("favorite").then((activeTab) => {
    showTab(activeTab);
  });
}

export function setBaseColor() {
  const color = document.getElementById("base-color").value;

  saveBaseColor(color);
}

export function setIgnoredColor() {
  const color = document.getElementById("ignored-color").value;

  saveIgnoredColor(color);
}

export function setFavoredColor() {
  const color = document.getElementById("favored-color").value;

  saveFavoriteColor(color);
}