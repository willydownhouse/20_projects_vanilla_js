'use strict';

const listEl = document.querySelector('.list');
const btnAddUser = document.getElementById('add');
const btnCalcTotal = document.getElementById('calculate');
const totalAmountEl = document.getElementById('total');
const btnDoubleMoney = document.getElementById('double');
const btnShowMillionaires = document.getElementById('show');
const btnSort = document.getElementById('sort');

let newUser;
let users = [];
let showRich = false;
let sorted = false;

/* FUNCTIONS */

/* AJAX */
const getRandomPerson = async function () {
  try {
    const res = await fetch('https://randomuser.me/api/');

    const data = await res.json();

    const [person] = data.results;

    const { first: firstName, last: lastName } = person.name;

    newUser = {
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      money: Math.floor(Math.random() * 1000000),
    };

    users.push(newUser);
    addUserDom(users);
  } catch (err) {
    console.log(err);
  }
};

/* RENDER USERS */

const addUserDom = function (users) {
  listEl.innerHTML = '';

  users.forEach(user => {
    const html = `<li class="list-item">
  <h3>${user.firstName} ${user.lastName}</h3>
  <p>${formatMoney(user.money)}</p>
</li>`;

    listEl.insertAdjacentHTML('beforeend', html);
  });
};

const formatMoney = function (number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const calcTotal = function () {
  const sum = users
    .map(user => user.money)
    .reduce((acc, value) => {
      return acc + value;
    }, 0);

  totalAmountEl.innerText = `${formatMoney(sum)}`;
};

const doubleMoney = function () {
  users.map(user => {
    user.money = user.money * 2;
  });

  addUserDom(users);
};

const showMillionaires = function () {
  if (!showRich) {
    const arr = users.filter(user => user.money > 1000000);
    addUserDom(arr);
    showRich = true;
  } else {
    addUserDom(users);
    showRich = false;
  }
};

const sortUsers = function () {
  let arr = users.slice();

  if (!sorted) {
    arr.sort((a, b) => b.money - a.money);
    addUserDom(arr);
    sorted = true;
  } else {
    addUserDom(users);
    sorted = false;
  }
};

/* EVENT LISTENERS */

btnAddUser.addEventListener('click', getRandomPerson);
btnCalcTotal.addEventListener('click', calcTotal);

btnDoubleMoney.addEventListener('click', doubleMoney);

btnShowMillionaires.addEventListener('click', showMillionaires);

btnSort.addEventListener('click', sortUsers);
