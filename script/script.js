// get data on page load
window.onload = (event) => {
  event.preventDefault();
  getData();
};

let fullData = {};

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
  fullData = data;
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
  forexDropdown(currencyName);
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
    // console.log(curr, data["rates"][curr]);
  }
  let rate = document.querySelector(".rate h5");
  let conversionAmt = document.getElementById("conversion-amt");
  rate.innerText = data["rates"][
    conversionAmt[conversionAmt.selectedIndex].value
  ].toFixed(2);
  console.log(conversionAmt[conversionAmt.selectedIndex].value);
  console.log(rate);
}

// function conversionDisplay() {
//   let currencyList = document.getElementById("currency-list");
//   console.log(currencyList[currencyList.selectedIndex].value);
// }

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
  fullData = data;
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
    // console.log(curr, data["rates"][curr]);
  }
  forexChange();
}

// add forex dropdown on page load
function forexDropdown(currencyName) {
  let currencyAmt = document.getElementById("conversion-amt");
  let optionTag = document.createElement("option");
  optionTag.innerHTML = `${currencyName}`;
  optionTag.setAttribute("value", `${currencyName}`);
  currencyAmt.appendChild(optionTag);
}

// get conversion currency name
function forexChange() {
  let conversionAmt = document.getElementById("conversion-amt");
  console.log(conversionAmt[conversionAmt.selectedIndex].value);
  changeForexValue(conversionAmt[conversionAmt.selectedIndex].value);
  console.log(fullData);
}

// change conversion currency value
function changeForexValue(currency) {
  let rate = document.querySelector(".rate h5");
  rate.innerText = fullData["rates"][currency].toFixed(2);
  console.log(rate);
}
