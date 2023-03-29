let isFullHideMode = false;
let isHideOffersFromNoCompanies = false;
let ignoredCompanies = [];

getAndListenFullHideMode();
getAndListenHigeOffersFromNoCompanies();
getAndListenIgnoredCompanies();

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
  let background = "cornsilk";

  if (!isFullHideMode) {
    if (ignoredCompanies.includes(text)) {
      background = "darkblue";
    }
  }

  setNodeBackground(node, background);
}

function setDisplay(node, text, ignoredCompanies) {
  let display = "block";

  if (isFullHideMode) {
    if (ignoredCompanies.includes(text)) {
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