window.onload = (event) => {
  event.preventDefault();
  getData();
};

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
  Object.keys(data["rates"]).map((currencyName) =>
    currencyDropdown(currencyName)
  );
  fluxCards(data);
  console.log(data);
}

function currencyDropdown(currencyName) {
  let currencyList = document.getElementById("currency-list");
  let optionTag = document.createElement("option");
  optionTag.innerHTML = `${currencyName}`;
  optionTag.setAttribute("value", `${currencyName}`);
  currencyList.appendChild(optionTag);
}

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
