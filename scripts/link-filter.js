let ignoredCompanies = []

const delay = ms => new Promise(res => setTimeout(res, ms));

const filt =  async () => {
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
}
setInterval(filt, 200)