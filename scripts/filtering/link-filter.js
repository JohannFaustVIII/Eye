let isFullHideMode = false;
let isHideOffersFromNoCompanies = false;
let ignoredCompanies = [];
let favoriteCompanies = [];
let baseColor = "#FFF8DC";
let ignoredColor = "#00008B";
let favoredColor = "#ADFF2F";
const searchUrl = "linkedin.com/jobs/search/";


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
  if (window.location.href.includes(searchUrl)) {
    document.querySelectorAll("div.job-card-container").forEach( node => {
      const names = node.querySelectorAll("div.job-card-container__company-name");
      if (names && names.length > 0) {
        setBackground(node, names[0].innerText.trim(), ignoredCompanies);
        setDisplay(node, names[0].innerText.trim(), ignoredCompanies);
        addFilterButtonIfNeeded(node, names[0].innerText.trim(), ignoredCompanies);
      } else {
        setDisplayForNoCompanies(node);
      }
    });
  }
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
    const filterButton = getButtonBoxWithButton(companyDiv, 'button.filter-button');
    const favoriteButton = getButtonBoxWithButton(companyDiv, 'button.favorite-button');
    const neutralButton = getButtonBoxWithButton(companyDiv, 'button.neutral-button');

    if (favoriteCompanies.includes(companyName)) {
      if (filterButton && filterButton.length > 0) {
        filterButton[0].remove();
      }

      if (favoriteButton && favoriteButton.length > 0) {
        favoriteButton[0].remove();
      }

      if (!neutralButton || neutralButton.length == 0) {
        const button = createUnfavoriteButton(companyName);
        companyDiv[0].append(button);
      }

    } else if (ignoredCompanies.includes(companyName)) {
      if (filterButton && filterButton.length > 0) {
        filterButton[0].remove();
      }

      if (favoriteButton && favoriteButton.length > 0) {
        favoriteButton[0].remove();
      }

      if (!neutralButton || neutralButton.length == 0) {
        const button = createUnignoreButton(companyName);
        companyDiv[0].append(button);
      }
    } else {
      if (neutralButton && neutralButton.length > 0) {
        neutralButton[0].remove();
      }

      if (!filterButton || filterButton.length == 0) {
        const button = createIgnoreButton(companyName);
        companyDiv[0].append(button);
      }

      if (!favoriteButton || favoriteButton.length == 0) {
        const button = createFavoriteButton(companyName);
        companyDiv[0].append(button);
      }
    }
  }
}

function getButtonBoxWithButton(companyDiv, buttonName) {
  let boxes = companyDiv[0].querySelectorAll('div.button-box');
  if (!boxes) {
    return boxes;
  }
  boxes = Array.from(boxes).filter( (box) => {
    button = box.querySelectorAll(buttonName);
    return button && button.length > 0; 
  });
  return boxes;
}

function createIgnoreButton(companyName) {
  const button = document.createElement('button');
  button.innerText = 'Ignore';
  button.classList.add('filter-button');
  button.onclick = filterOutCompany(companyName);
  return wrapInButtonBox(button);
}

function createFavoriteButton(companyName) {
  const button = document.createElement('button');
  button.innerText = 'Favorite';
  button.classList.add('favorite-button');
  button.onclick = favoriteCompany(companyName);
  return wrapInButtonBox(button);
}

function createUnignoreButton(companyName) {
  const button = document.createElement('button');
  button.innerText = 'Unignore';
  button.classList.add('neutral-button');
  button.onclick = filterInCompany(companyName);
  return wrapInButtonBox(button);
}

function createUnfavoriteButton(companyName) {
  const button = document.createElement('button');
  button.innerText = 'Unfavorite';
  button.classList.add('neutral-button');
  button.onclick = unfavoriteCompany(companyName);
  return wrapInButtonBox(button);
}

function wrapInButtonBox(button) {
  const box = document.createElement('div');
  box.classList.add('button-box');
  box.append(button);
  return box;
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

function favoriteCompany(companyName) {
  return () => {
    favoriteCompanies.push(companyName);
    chrome.storage.local.set({'EyeFavoriteCompanies': favoriteCompanies});
  };
}

function unfavoriteCompany(companyName) {
  return () => {
    favoriteCompanies = favoriteCompanies.filter( (c) => {
      return c !== companyName;
    });
    chrome.storage.local.set({'EyeFavoriteCompanies': favoriteCompanies});
  };
}