let savedCompanies = [];
getCompanies();

function add() {
  const companyTitle = document.getElementById("company").value;

  addCompany(companyTitle)
  render();
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
  }
)

function addCompany(company) {
  savedCompanies.push(company);
  saveCompanies();
}

function removeCompany(company) {
  savedCompanies = savedCompanies.filter( (c) => {
    return c !== company;
  })
  saveCompanies();
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
    render();
  });
}

function render() {
  document.getElementById("company-ignore-list").innerHTML = "";

  savedCompanies.forEach(function (company) {
    const element = document.createElement('div');
    element.innerText = company;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '-';
    deleteButton.style = 'margin-left: 12px;';
    deleteButton.id = company;
    deleteButton.onclick = deleteCompany;
    element.append(deleteButton);

    document.getElementById("company-ignore-list").appendChild(element);
  })
}