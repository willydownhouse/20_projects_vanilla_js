'use strict';

const currency1 = document.getElementById('currency-1');
const currency2 = document.getElementById('currency-2');
const amount1 = document.getElementById('amount-1');
const amount2 = document.getElementById('amount-2');
const btnCalculate = document.querySelector('.btn');
const btnSwap = document.getElementById('swap');

const one = document.querySelector('.one');

//https://v6.exchangerate-api.com/v6/11104d19f77e0d82989c4044/latest/USD
//https://v6.exchangerate-api.com/v6/latest/USD

let rates;

const createOptionElementsForCurrencies = function (arr) {
  arr.forEach(currency => {
    const html = `<option value="${currency}">${currency}</option>`;

    currency1.insertAdjacentHTML('beforeend', html);
    currency2.insertAdjacentHTML('beforeend', html);
  });
};

const getCurrency = async function (currency) {
  try {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency}`
    );

    const data = await res.json();

    rates = data.rates;

    createOptionElementsForCurrencies(Object.keys(rates));
  } catch (err) {
    console.log(err);
  }
  return rates;
};

getCurrency('USD');

currency1.addEventListener('change', function (e) {
  getCurrency(e.target.value);
  currency2.value = '';
});

btnCalculate.addEventListener('click', function (e) {
  e.preventDefault();

  const money1 = currency1.value;
  const amount = amount1.value;
  const money2 = currency2.value;

  if (isNaN(+amount) || +amount <= 0) {
    amount1.value = '';
    return;
  }

  const exchangeValue = rates[`${money2}`] * +amount;

  amount2.innerHTML = `<option value="${exchangeValue}">${exchangeValue.toFixed(
    2
  )} ${money2}</option>`;

  one.innerText = `1 ${money1} = ${rates[`${money2}`].toFixed(2)} ${money2}`;
});

btnSwap.addEventListener('click', async function (e) {
  e.preventDefault();

  const data = await getCurrency(`${currency2.value}`);

  const temp = currency1.value;
  currency1.value = currency2.value;
  currency2.value = temp;

  amount2.innerHTML = `<option value="${currency1.value}">${(
    amount1.value * data[currency2.value]
  ).toFixed(2)} ${currency2.value}</option>`;
});
