import { listenAddButton, listenEnterAddCompany, listenFullHideButton, listenHideNoCompaniesButton, listenShowFavoredTab, listenShowIgnoredTab } from './listeners.js'
import { add, setFavoriteTab, setHidden, setHiddenNoCompanies, setIgnoredTab} from './controller.js'
import { getCompanies, getFullHide, getHideNoCompanies } from './model.js';
import { renderCompanyList, renderFullHideCheckbox, renderNoCompanyCheckbox, showDefaultTab} from './view.js';

startPage();

setEventListeners();

function setEventListeners() {
  document.addEventListener('DOMContentLoaded', () => {
    listenAddButton(add);
    listenEnterAddCompany(add);
    listenFullHideButton(setHidden);
    listenHideNoCompaniesButton(setHiddenNoCompanies);
    listenShowFavoredTab(setFavoriteTab);
    listenShowIgnoredTab(setIgnoredTab);
  });
}

function startPage() {
  fullHide();
  noCompaniesHide();
  companies();
  showDefaultTab();
}

function fullHide() {
  getFullHide().then( (hide) => renderFullHideCheckbox(hide));
}

function noCompaniesHide() {
  getHideNoCompanies().then ( (hide) => renderNoCompanyCheckbox(hide));
}

function companies() {
  getCompanies().then( (companies) => renderCompanyList(companies));
}