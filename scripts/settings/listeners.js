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

export function listenShowIgnoredTab(func) {
  var but = document.getElementById("ignored-tab-button");
  if (but) {
    but.addEventListener("click", func);
  }
}

export function listenShowFavoredTab(func) {
  var but = document.getElementById("favored-tab-button");
  if (but) {
    but.addEventListener("click", func);
  }
}

export function listenBaseColor(func) {
  var but = document.getElementById("base-color");
  if (but) {
    but.addEventListener("change", func);
  }
}

export function listenIgnoredColor(func) {
  var but = document.getElementById("ignored-color");
  if (but) {
    but.addEventListener("change", func);
  }
}

export function listenFavoredColor(func) {
  var but = document.getElementById("favored-color");
  if (but) {
    but.addEventListener("change", func);
  }
}