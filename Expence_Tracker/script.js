'use strict';

const balanceEl = document.getElementById('balance');
const summaryIncomeEl = document.getElementById('summary-income');
const summaryExpenceEl = document.getElementById('summary-expence');

const listEl = document.getElementById('list');
const inputTextEl = document.getElementById('text');
const inputAmountEl = document.getElementById('amount');
const btnAddEl = document.querySelector('.btn');

let transactions = [];

/* FUNCTIONS */

const checkValidInput = function (item, amount) {
  if (!+amount || !item || !isNaN(+item)) {
    alert('Not a valid input. Please try again. 😊');
    return false;
  } else {
    return true;
  }
};

const updateDom = function (transactions) {
  if (transactions.length === 0) return;

  /* BALANCE */
  balanceEl.innerText = `$${transactions
    .map(transaction => transaction.amount)
    .reduce((acc, value) => {
      return acc + value;
    }, 0)
    .toFixed(2)}`;

  /* BALANCE & EXPENCE BOX */

  /* check if positive values */
  if (transactions.map(transaction => transaction.amount).some(el => el > 0)) {
    summaryIncomeEl.innerText = `$${transactions
      .map(transaction => transaction.amount)
      .filter(el => el > 0)
      .reduce((acc, value) => acc + value)
      .toFixed(2)}`;
  }

  /* check if negative values */

  if (transactions.map(transaction => transaction.amount).some(el => el < 0)) {
    summaryExpenceEl.innerText = `$${Math.abs(
      transactions
        .map(transaction => transaction.amount)
        .filter(el => el < 0)
        .reduce((acc, value) => acc + value)
        .toFixed(2)
    )}`;
  }

  /* add list item */
  listEl.innerHTML = '';

  const html = transactions
    .map((transaction, i) => {
      return `
        <li>
            <div class="${transaction.type}">
                <button id="${transaction.id}" onclick="deleteItem(${transaction.id})" class="btn-x">X</button>
                <h4>${transaction.name}</h4>
                <p>$${transaction.amount}</p>
            </div>
        </li>
        `;
    })
    .join('');

  listEl.innerHTML = html;

  /* addEventListenerToDeleteButton(); */
};

const deleteItem = function (id) {
  const index = transactions.findIndex(transaction => transaction.id === id);
  transactions.splice(index, 1);

  setLocalStorage(transactions);
  location.reload();
};

const setLocalStorage = function (transactions) {
  const data = JSON.stringify(transactions);
  localStorage.setItem('transactions', data);
};

const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('transactions'));

  if (!data) return;

  transactions = data;
};

// const addEventListenerToDeleteButton = function () {
//   const btnDelete = document.querySelectorAll('.btn-x');
//   btnDelete.forEach(btn => {
//     btn.addEventListener('click', function (e) {
//       transactions.splice(+e.target.id, 1);
//       setLocalStorage(transactions);
//       location.reload();
//     });
//   });
// };

/* EVENT LISTENERS */

btnAddEl.addEventListener('click', function (e) {
  e.preventDefault();

  const name = inputTextEl.value;
  const amount = +inputAmountEl.value;

  if (!checkValidInput(name, amount)) {
    inputTextEl.value = inputAmountEl.value = '';
    return;
  }

  const type = amount > 0 ? 'income' : 'expence';

  const id = Math.floor(Math.random() * 10000000);

  /* add amount to tranactions array */
  transactions.push(new Transaction(id, type, name, amount));

  console.log(transactions);

  /* update dom */
  updateDom(transactions);

  /* setLocalStorage */
  setLocalStorage(transactions);

  /* clear input fields */
  inputTextEl.value = inputAmountEl.value = '';
});

window.addEventListener('load', function () {
  getLocalStorage();
  updateDom(transactions);
});

class Transaction {
  constructor(id, type, name, amount) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.amount = amount;
  }
}
