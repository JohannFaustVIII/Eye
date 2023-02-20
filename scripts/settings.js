let savedCompanies = getCompanies();
render();

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
  localStorage.setItem('EyeCompanies', JSON.stringify(savedCompanies));
}

function getCompanies() {
  const comps = JSON.parse(localStorage.getItem('EyeCompanies'));
  if (Array.isArray(comps)) {
    return comps;
  } else {
    return [];
  }
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