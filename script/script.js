// get data on page load
window.onload = (event) => {
  event.preventDefault();
  getData();
};

// make fetch request on page load
function getData() {
  let date = new Date();
  fetch(
    `https://api.ratesapi.io/api/${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}?base=USD`
  )
    .then((response) => response.json())
    .then((data) => loadPageData(data));
}

function loadPageData(data) {
  // add main currency dropdown
  Object.keys(data["rates"]).map((currencyName) =>
    currencyDropdown(currencyName)
  );
  // add fluctuations for each currency
  fluxCards(data);
  // Object.keys(data["rates"])
  //   .filter((otherCurr) => otherCurr !== currencyList)
  //   .map((currencyName) => conversionDisplay(currencyName));
  console.log(data);
}

// add main currency dropdown on page load
function currencyDropdown(currencyName) {
  let currencyList = document.getElementById("currency-list");
  let optionTag = document.createElement("option");
  optionTag.innerHTML = `${currencyName}`;
  optionTag.setAttribute("value", `${currencyName}`);
  currencyList.appendChild(optionTag);

  // conversion currency dropdown
  // let conversionAmt = document.getElementById("conversion-amt");
  // conversionAmt.appendChild(optionTag);
}

// add fluctuation card for each currency
function fluxCards(data) {
  let fluxCardList = document.getElementsByClassName("flux-cards-list")[0];
  for (const curr in data["rates"]) {
    let eachFluxCard = document.createElement("div");
    eachFluxCard.setAttribute("class", "each-flux-card");
    fluxCardList.appendChild(eachFluxCard);
    let currName = document.createElement("h6");
    currName.innerText = curr;
    eachFluxCard.appendChild(currName);
    let currAmt = document.createElement("h5");
    currAmt.innerText = data["rates"][curr].toFixed(2);
    eachFluxCard.appendChild(currAmt);
    console.log(curr, data["rates"][curr]);
  }
}

function conversionDisplay() {
  let currencyList = document.getElementById("currency-list");
  console.log(currencyList[currencyList.selectedIndex].value);
}

function changeCurrency() {
  let currencyList = document.getElementById("currency-list");
  console.log(currencyList[currencyList.selectedIndex].value);
  let date = new Date();
  fetch(
    `https://api.ratesapi.io/api/${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}?base=${currencyList[currencyList.selectedIndex].value}`
  )
    .then((response) => response.json())
    .then((data) => newCurrency(data));
}

function newCurrency(data) {
  const parent = document.getElementsByClassName("flux-cards-list")[0];
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
  let fluxCardList = document.getElementsByClassName("flux-cards-list")[0];
  for (const curr in data["rates"]) {
    let eachFluxCard = document.createElement("div");
    eachFluxCard.setAttribute("class", "each-flux-card");
    fluxCardList.appendChild(eachFluxCard);
    let currName = document.createElement("h6");
    currName.innerText = curr;
    eachFluxCard.appendChild(currName);
    let currAmt = document.createElement("h5");
    currAmt.innerText = data["rates"][curr].toFixed(2);
    eachFluxCard.appendChild(currAmt);
    console.log(curr, data["rates"][curr]);
  }
}
