let isFullHideMode = false;
let isHideOffersFromNoCompanies = false;
let ignoredCompanies = [];
let favoriteCompanies = [];
let baseColor = "#FFF8DC";
let ignoredColor = "#00008B";
let favoredColor = "#ADFF2F";


getAndListenFullHideMode();
getAndListenHigeOffersFromNoCompanies();
getAndListenIgnoredCompanies();
getAndListenFavoriteCompanies();
getAndListenBaseColor();
getAndListenIgnoredColor();
getAndListenFavoredColor();

function getAndListenFullHideMode() {
  chrome.storage.local.get(['EyeFullHide']).then((result) => {
    if (result.EyeFullHide) {
      isFullHideMode = result.EyeFullHide;
    } else {
      isFullHideMode = false;
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("EyeFullHide" in changes) {
        isFullHideMode = changes.EyeFullHide.newValue;
    }
  });
}

function getAndListenHigeOffersFromNoCompanies() {
  chrome.storage.local.get(['EyeHideNoCompanies']).then((result) => {
    if (result.EyeHideNoCompanies) {
      isHideOffersFromNoCompanies = result.EyeHideNoCompanies;
    } else {
      isHideOffersFromNoCompanies = false;
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("EyeHideNoCompanies" in changes) {
      isHideOffersFromNoCompanies = changes.EyeHideNoCompanies.newValue;
    }
  });
}

function getAndListenIgnoredCompanies() {
  chrome.storage.local.get(['EyeCompanies']).then((result) => {
    if (result.EyeCompanies) {
      ignoredCompanies = result.EyeCompanies;
    } else {
      ignoredCompanies = [];
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("EyeCompanies" in changes) {
      ignoredCompanies = changes.EyeCompanies.newValue;
    }
  });
}

function getAndListenFavoriteCompanies() {
  chrome.storage.local.get(['EyeFavoriteCompanies']).then((result) => {
    if (result.EyeFavoriteCompanies) {
      favoriteCompanies = result.EyeFavoriteCompanies;
    } else {
      favoriteCompanies = [];
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("EyeFavoriteCompanies" in changes) {
      favoriteCompanies = changes.EyeFavoriteCompanies.newValue;
    }
  });
}

function getAndListenBaseColor() {
  chrome.storage.local.get(['EyeBaseColor']).then((result) => {
    if (result.EyeBaseColor) {
      baseColor = result.EyeBaseColor;
    } else {
      baseColor = "#FFF8DC";
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("EyeBaseColor" in changes) {
      baseColor = changes.EyeBaseColor.newValue;
    }
  });
}

function getAndListenIgnoredColor() {
  chrome.storage.local.get(['EyeIgnoredColor']).then((result) => {
    if (result.EyeIgnoredColor) {
      ignoredColor = result.EyeIgnoredColor;
    } else {
      ignoredColor = "#00008B";
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("EyeIgnoredColor" in changes) {
      ignoredColor = changes.EyeIgnoredColor.newValue;
    }
  });
}

function getAndListenFavoredColor() {
  chrome.storage.local.get(['EyeFavoriteColor']).then((result) => {
    if (result.EyeFavoriteColor) {
      favoredColor = result.EyeFavoriteColor;
    } else {
      favoredColor = "#ADFF2F";
    }
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("EyeFavoriteColor" in changes) {
      favoredColor = changes.EyeFavoriteColor.newValue;
    }
  });
}

const filterOffers =  async () => {
  document.querySelectorAll("div.job-card-container").forEach( node => {
    const names = node.querySelectorAll("a.job-card-container__company-name");
    if (names && names.length > 0) {
      setBackground(node, names[0].innerText.trim(), ignoredCompanies);
      setDisplay(node, names[0].innerText.trim(), ignoredCompanies);
      addFilterButtonIfNeeded(node, names[0].innerText.trim(), ignoredCompanies);
    } else {
      setDisplayForNoCompanies(node);
    }
  })
  removeRedundantContent();
}

setInterval(filterOffers, 50);

function setBackground(node, text, ignoredCompanies) {
  let background = baseColor;
  if (favoriteCompanies.includes(text)) {
    background = favoredColor;
  } else if (!isFullHideMode) {
    if (ignoredCompanies.includes(text)) {
      background = ignoredColor;
    }
  }

  setNodeBackground(node, background);
}

function setDisplay(node, text, ignoredCompanies) {
  let display = "block";

  if (isFullHideMode) {
    if (ignoredCompanies.includes(text) && !favoriteCompanies.includes(text)) {
      display = "none";
    }
  }

  setNodeDisplay(node, display);
}

function setDisplayForNoCompanies(node) {
  let display = "block";

  if (isHideOffersFromNoCompanies) {
    display = "none";
  }

  setNodeDisplay(node, display);
}

function removeRedundantContent() {
  document.querySelectorAll("div.premium-upsell-link").forEach( (node) => {
    node.innerHTML = "";
  });
}

function setNodeBackground(node, bg) {
  node.style.background = bg;
}

function setNodeDisplay(node, dis) {
  node.style.display = dis;
}

function addFilterButtonIfNeeded(node, companyName, ignoredCompanies) {
  const companyDiv = node.querySelectorAll('div.artdeco-entity-lockup__subtitle');
  if (companyDiv && companyDiv.length > 0) {
    const filterOutButton = companyDiv[0].querySelectorAll('button.filter-out-button');
    const filterInButton = companyDiv[0].querySelectorAll('button.filter-in-button');
    if (ignoredCompanies.includes(companyName)) {
      if (filterOutButton && filterOutButton.length > 0) {
        filterOutButton[0].remove();
      }
      if (!filterInButton || filterInButton.length == 0) {
        const addButton = document.createElement('button');
        addButton.innerText = '+';
        addButton.classList.add('filter-in-button');
        addButton.onclick = filterInCompany(companyName);
        companyDiv[0].append(addButton);
      }
    } else {
      if (filterInButton && filterInButton.length > 0) {
        filterInButton[0].remove();
      }

      if (!filterOutButton || filterOutButton.length == 0) {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = '-';
        deleteButton.classList.add('filter-out-button');
        deleteButton.onclick = filterOutCompany(companyName);
        companyDiv[0].append(deleteButton);
      }
    }
  }
}

function filterOutCompany(companyName) {
  return () => {
    ignoredCompanies.push(companyName);
    chrome.storage.local.set({'EyeCompanies': ignoredCompanies});
  };
}

function filterInCompany(companyName) {
  return () => {
    ignoredCompanies = ignoredCompanies.filter( (c) => {
      return c !== companyName;
    });
    chrome.storage.local.set({'EyeCompanies': ignoredCompanies});
  };
}