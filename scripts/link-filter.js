const filt =  async () => {
  chrome.storage.local.get(['EyeCompanies']).then((result) => {
    let ignoredCompanies = []
    if (result.EyeCompanies) {
      ignoredCompanies = result.EyeCompanies;
    }
    document.querySelectorAll("div.job-card-container").forEach( node => {
      const names = node.querySelectorAll("a.job-card-container__company-name")
      if (names && names.length > 0) {
        if (ignoredCompanies.includes(names[0].innerText)) {
          node.style.background = "darkblue"
        } else {
          node.style.background = "cornsilk"
        }
      } 
    })
  });
}
setInterval(filt, 200)