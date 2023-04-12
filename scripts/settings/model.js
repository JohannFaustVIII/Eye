var activeTab = "ignored";

export function addCompany(company) {
  return getCompanies().then((companies) => {
    companies[activeTab].push(company);
    sortCompanies(companies[activeTab]);
    return companies;
  }).then( (companies) => {
    saveCompanies(companies);
    return companies;
  });
}

export function removeCompany(company) {
  return getCompanies().then((companies) => {
    companies[activeTab] = companies[activeTab].filter( (c) => {
      return c !== company;
    });
    sortCompanies(companies[activeTab]);
    return companies;
  }).then( (companies) => {
    saveCompanies(companies);
    return companies;
  })
}

function saveCompanies(companies) {
  chrome.storage.local.set({'EyeCompanies': companies["ignored"], 'EyeFavoriteCompanies' : companies["favorite"]});
}

export function getCompanies() {
  return chrome.storage.local.get(['EyeCompanies', 'EyeFavoriteCompanies']).then((result) => {
    var ignoredCompanies = [];
    var favoriteCompanies = [];
    if (result.EyeCompanies) {
      ignoredCompanies = result.EyeCompanies;
    }
    if (result.EyeFavoriteCompanies) {
      favoriteCompanies = result.EyeFavoriteCompanies;
    }
    return {
      "ignored" : ignoredCompanies,
      "favorite" : favoriteCompanies
    };
  }).then( (companies) => {
    sortCompanies(companies["ignored"]);
    sortCompanies(companies["favorite"]);
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

export function setActiveTab(tabName) {
  return new Promise( (resolve) => {
    activeTab = tabName;
    resolve(activeTab);
  });
}

export function getActiveTab() {
  return new Promise( (resolve) => {
    resolve(activeTab);
  });
}

export function saveBaseColor(color) {
  chrome.storage.local.set({'EyeBaseColor': color});
}

export function getBaseColor() {
  return chrome.storage.local.get(['EyeBaseColor']).then((result) => {
    if (result.EyeBaseColor) {
      return result.EyeBaseColor;
    } else {
      return '#FFF8DC';
    }
  });
}

export function saveIgnoredColor(color) {
  chrome.storage.local.set({'EyeIgnoredColor': color});
}

export function getIgnoredColor() {
  return chrome.storage.local.get(['EyeIgnoredColor']).then((result) => {
    if (result.EyeIgnoredColor) {
      return result.EyeIgnoredColor;
    } else {
      return '#00008B';
    }
  });
}

export function saveFavoriteColor(color) {
  chrome.storage.local.set({'EyeFavoriteColor': color});
}

export function getFavoriteColor() {
  return chrome.storage.local.get(['EyeFavoriteColor']).then((result) => {
    if (result.EyeFavoriteColor) {
      return result.EyeFavoriteColor;
    } else {
      return '#ADFF2F';
    }
  });
}