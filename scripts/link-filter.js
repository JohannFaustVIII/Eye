let isFullHideMode = false;
getAndListenFullHideMode();
let ignoredCompanies = []

const filt =  async () => {
  chrome.storage.local.get(['EyeCompanies']).then((result) => {
    if (result.EyeCompanies) {
      ignoredCompanies = result.EyeCompanies;
    } else {
      ignoredCompanies = [];
    }
    document.querySelectorAll("div.job-card-container").forEach( node => {
      const names = node.querySelectorAll("a.job-card-container__company-name")
      if (names && names.length > 0) {
        setBackground(node, names[0].innerText.trim(), ignoredCompanies);
        setDisplay(node, names[0].innerText.trim(), ignoredCompanies);
      } 
    })
  });
}
setInterval(filt, 200)

function setBackground(node, text, ignoredCompanies) {
  if (!isFullHideMode) {
    if (ignoredCompanies.includes(text)) {
      node.style.background = "darkblue"
    } else {
      node.style.background = "cornsilk"
    }
  } else {
    node.style.background = "cornsilk"
  }
}

function setDisplay(node, text, ignoredCompanies) {
  if (isFullHideMode) {
    if (ignoredCompanies.includes(text)) {
      node.style.display = "none"
    } else {
      node.style.display = "block"
    }
  } else {
    node.style.display = "block"
  }
}

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