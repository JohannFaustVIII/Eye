export function addCompany(company) {
  return getCompanies().then((companies) => {
    companies.push(company);
    sortCompanies(companies);
    return companies;
  }).then( (companies) => {
    saveCompanies(companies);
    return companies;
  });
}

export function removeCompany(company) {
  return getCompanies().then((companies) => {
    companies = companies.filter( (c) => {
      return c !== company;
    });
    sortCompanies(companies);
    return companies;
  }).then( (companies) => {
    saveCompanies(companies);
    return companies;
  })
}

function saveCompanies(companies) {
  chrome.storage.local.set({'EyeCompanies': companies});
}

export function getCompanies() {
  return chrome.storage.local.get(['EyeCompanies']).then((result) => {
    if (result.EyeCompanies) {
      return result.EyeCompanies;
    } else {
      return [];
    }
  }).then( (companies) => {
    sortCompanies(companies);
    return companies;
  });
}

function sortCompanies(companies) {
  companies.sort( (a, b) => {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
  })
}

export function setFullHide(hide) {
  chrome.storage.local.set({'EyeFullHide': hide});
}

export function setHideNoCompanies(hide) {
  chrome.storage.local.set({'EyeHideNoCompanies': hide});
}

export function getFullHide() {
  return chrome.storage.local.get(['EyeFullHide']).then((result) => {
    if (result.EyeFullHide) {
      return result.EyeFullHide;
    } else {
      return false;
    }
  });
}

export function getHideNoCompanies() {
  return chrome.storage.local.get(['EyeHideNoCompanies']).then((result) => {
    if (result.EyeHideNoCompanies) {
      return result.EyeHideNoCompanies;
    } else {
      return false;
    }
  });
}
