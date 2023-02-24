let savedCompanies = [];
let fullHide = false;
getCompanies();
getFullHide();

function add() {
  const companyInput = document.getElementById("company")
  const companyTitle = companyInput.value;

  addCompany(companyTitle)
  render();
  clearInput(companyInput)
}

function setHidden() {
  const isChecked = document.getElementById("full-hide").checked;
  
  setFullHide(isChecked);
}

function clearInput(element) {
  element.value = '';
}

function deleteCompany(event) {
  const deleteButton = event.target;
  const companyToDelete = deleteButton.id;

  removeCompany(companyToDelete);
  render();
}

document.addEventListener('DOMContentLoaded', () => {
    var but = document.getElementById("add-button");
    if (but) {
      but.addEventListener("click", add);
    }

    var fullHideCheckbox = document.getElementById("full-hide");
    if (fullHideCheckbox) {
      fullHideCheckbox.addEventListener("change", setHidden)
    }
  }
)

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

function saveCompanies() {
  chrome.storage.local.set({'EyeCompanies': savedCompanies});
}

function getCompanies() {
  chrome.storage.local.get(['EyeCompanies']).then((result) => {
    if (result.EyeCompanies) {
      savedCompanies = result.EyeCompanies
    } else {
      savedCompanies = []
    }
    sortCompanies();
    render();
  });
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

function getFullHide() {
  chrome.storage.local.get(['EyeFullHide']).then((result) => {
    if (result.EyeFullHide) {
      fullHide = result.EyeFullHide;
    } else {
      fullHide = false;
    }
    render();
  });
}

function render() {
  document.getElementById("company-ignore-list").innerHTML = "";
  document.getElementById("full-hide").checked = fullHide;

  savedCompanies.forEach(function (company) {
    const element = document.createElement('div');
    element.classList.add('company-item');
    element.innerText = company;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '-';
    deleteButton.classList.add('delete-button')
    deleteButton.style = 'margin-left: 12px;';
    deleteButton.id = company;
    deleteButton.onclick = deleteCompany;
    element.append(deleteButton);

    document.getElementById("company-ignore-list").appendChild(element);
  })
}