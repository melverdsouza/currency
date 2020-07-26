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
