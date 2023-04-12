import { listenAddButton, listenBaseColor, listenEnterAddCompany, listenFavoredColor, listenFullHideButton, listenHideNoCompaniesButton, listenIgnoredColor, listenShowFavoredTab, listenShowIgnoredTab } from './listeners.js'
import { add, setBaseColor, setFavoredColor, setFavoriteTab, setHidden, setHiddenNoCompanies, setIgnoredColor, setIgnoredTab} from './controller.js'
import { getBaseColor, getCompanies, getFavoriteColor, getFullHide, getHideNoCompanies, getIgnoredColor } from './model.js';
import { renderBaseColor, renderCompanyList, renderFavoriteColor, renderFullHideCheckbox, renderIgnoredColor, renderNoCompanyCheckbox, showDefaultTab} from './view.js';

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
    listenBaseColor(setBaseColor);
    listenIgnoredColor(setIgnoredColor);
    listenFavoredColor(setFavoredColor);
  });
}

function startPage() {
  fullHide();
  noCompaniesHide();
  companies();
  showDefaultTab();
  colorInputs();
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

function colorInputs() {
  getBaseColor().then( (color) => renderBaseColor(color));
  getIgnoredColor().then( (color) => renderIgnoredColor(color));
  getFavoriteColor().then( (color) => renderFavoriteColor(color));
}