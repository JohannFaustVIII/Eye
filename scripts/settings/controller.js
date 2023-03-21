import { addCompany, setFullHide, setHideNoCompanies, removeCompany } from "./model.js";
import { clearInput, renderCompanyList } from "./view.js";

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