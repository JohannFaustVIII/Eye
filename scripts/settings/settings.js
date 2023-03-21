let savedCompanies = [];
let fullHide = false;
let hideNoCompanies = false;

getCompanies();
getFullHide();
getHideNoCompanies();

setEventListeners();

function add() {
  const companyInput = document.getElementById("company")
  const companyTitle = companyInput.value;

  addCompany(companyTitle)
  renderCompanyList();
  clearInput(companyInput)
}

function setHidden() {
  const isChecked = document.getElementById("full-hide").checked;
  
  setFullHide(isChecked);
}

function setHiddenNoCompanies() {
  const isChecked = document.getElementById("hide-no-companies").checked;
  
  setHideNoCompanies(isChecked);
}

function clearInput(element) {
  element.value = '';
}

function deleteCompany(event) {
  const deleteButton = event.target;
  const companyToDelete = deleteButton.id;

  removeCompany(companyToDelete);
  renderCompanyList();
}

function setEventListeners() {
  document.addEventListener('DOMContentLoaded', () => {
    listenAddButton(add);
    listenEnterAddCompany(add);
    listenFullHideButton(setHidden);
    listenHideNoCompaniesButton(setHiddenNoCompanies);
  });
}

function listenAddButton(func) {
  var but = document.getElementById("add-button");
  if (but) {
    but.addEventListener("click", func);
  }
}

function listenEnterAddCompany(func) {
  var companyInput = document.getElementById("company");
  if (companyInput) {
    companyInput.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.key === 'Enter') {
        func();
      }
    });
  }
}

function listenFullHideButton(func) {
  var fullHideCheckbox = document.getElementById("full-hide");
  if (fullHideCheckbox) {
    fullHideCheckbox.addEventListener("change", func);
  }
}

function listenHideNoCompaniesButton(func) {
  var hideNoCompaniesCheckbox = document.getElementById("hide-no-companies");
  if (hideNoCompaniesCheckbox) {
    hideNoCompaniesCheckbox.addEventListener("change", func);
  }
}

function addCompany(company) {
  savedCompanies.push(company);
  sortCompanies();
  saveCompanies();
}

function removeCompany(company) {
  savedCompanies = savedCompanies.filter( (c) => {
    return c !== company;
  })
  sortCompanies();
  saveCompanies();
}

function setFullHide(isFullHide) {
  fullHide = isFullHide;
  saveFullHide();
}

function setHideNoCompanies(isHideNoCompanies) {
  hideNoCompanies = isHideNoCompanies;
  saveHideNoCompanies();
}

function saveCompanies() {
  chrome.storage.local.set({'EyeCompanies': savedCompanies});
}

function getCompanies() {
  chrome.storage.local.get(['EyeCompanies']).then((result) => {
    if (result.EyeCompanies) {
      return result.EyeCompanies;
    } else {
      return [];
    }
  }).then( (companies) => {
    savedCompanies = companies;
    sortCompanies();
  }).then( () => {
    renderCompanyList();
  })
}

function sortCompanies() {
  savedCompanies.sort( (a, b) => {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
  })
}

function saveFullHide() {
  chrome.storage.local.set({'EyeFullHide': fullHide});
}

function saveHideNoCompanies() {
  chrome.storage.local.set({'EyeHideNoCompanies': hideNoCompanies});
}

function getFullHide() {
  chrome.storage.local.get(['EyeFullHide']).then((result) => {
    if (result.EyeFullHide) {
      return result.EyeFullHide;
    } else {
      return false;
    }
  }).then((hide) => {
    fullHide = hide;
  }).then( () => {
    renderFullHideCheckbox();
  });
}

function getHideNoCompanies() {
  chrome.storage.local.get(['EyeHideNoCompanies']).then((result) => {
    if (result.EyeHideNoCompanies) {
      return result.EyeHideNoCompanies;
    } else {
      return false;
    }
  }).then( (hide) => {
    hideNoCompanies = hide;
  }).then( () => {
    renderNoCompanyCheckbox();
  });
}

function renderFullHideCheckbox() {
  document.getElementById("full-hide").checked = fullHide;
}

function renderNoCompanyCheckbox() {
  document.getElementById("hide-no-companies").checked = hideNoCompanies;
}

function renderCompanyList() {
  document.getElementById("company-ignore-list").innerHTML = "";

  savedCompanies.forEach(function (company) {
    const element = document.createElement('div');
    element.classList.add('company-item');
    element.innerText = company;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '-';
    deleteButton.classList.add('delete-button');
    deleteButton.id = company;
    deleteButton.onclick = deleteCompany;
    element.append(deleteButton);

    document.getElementById("company-ignore-list").appendChild(element);
  });
}