export function listenAddButton(func) {
  var but = document.getElementById("add-button");
  if (but) {
    but.addEventListener("click", func);
  }
}

export function listenEnterAddCompany(func) {
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

export function listenFullHideButton(func) {
  var fullHideCheckbox = document.getElementById("full-hide");
  if (fullHideCheckbox) {
    fullHideCheckbox.addEventListener("change", func);
  }
}

export function listenHideNoCompaniesButton(func) {
  var hideNoCompaniesCheckbox = document.getElementById("hide-no-companies");
  if (hideNoCompaniesCheckbox) {
    hideNoCompaniesCheckbox.addEventListener("change", func);
  }
}