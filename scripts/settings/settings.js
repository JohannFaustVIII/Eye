import { listenAddButton, listenEnterAddCompany, listenFullHideButton, listenHideNoCompaniesButton } from './listeners.js'
import { add, setHidden, setHiddenNoCompanies } from './controller.js'
import { getCompanies, getFullHide, getHideNoCompanies } from './model.js';
import { renderCompanyList, renderFullHideCheckbox, renderNoCompanyCheckbox } from './view.js';

startPage();

setEventListeners();

function setEventListeners() {
  document.addEventListener('DOMContentLoaded', () => {
    listenAddButton(add);
    listenEnterAddCompany(add);
    listenFullHideButton(setHidden);
    listenHideNoCompaniesButton(setHiddenNoCompanies);
  });
}

function startPage() {
  fullHide();
  noCompaniesHide();
  companies();
}

function fullHide() {
  console.log('???');
  getFullHide().then( (hide) => renderFullHideCheckbox(hide));
}

function noCompaniesHide() {
  getHideNoCompanies().then ( (hide) => renderNoCompanyCheckbox(hide));
}

function companies() {
  getCompanies().then( (companies) => renderCompanyList(companies));
}