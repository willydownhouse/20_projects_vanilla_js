'use strict';

const inputNameEl = document.getElementById('name');
const inputEmailEl = document.getElementById('email');
const inputPasswordEl = document.getElementById('password');
const inputConPasswordEl = document.getElementById('con-password');

const allInputEl = document.querySelectorAll('input');
const allWarningText = document.querySelectorAll('.warning');

const warningNameEl = document.querySelector('.warning-name');
const warningEmailEl = document.querySelector('.warning-email');
const warningPasswordEl = document.querySelector('.warning-password');
const warningConPasswordEl = document.querySelector('.warning-con-password');
const formEl = document.querySelector('.form');

/* FORM EVENT LISTENER */

formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = inputNameEl.value;
  const email = inputEmailEl.value;
  const password = inputPasswordEl.value;
  const conPassword = inputConPasswordEl.value;
  /////////////////////////////

  name === '' || name.length < 3
    ? addWarning(inputNameEl, warningNameEl)
    : addInputOkBorder(inputNameEl);

  email === ''
    ? addWarning(inputEmailEl, warningEmailEl)
    : addInputOkBorder(inputEmailEl);

  password === '' || password.length < 6
    ? addWarning(inputPasswordEl, warningPasswordEl)
    : addInputOkBorder(inputPasswordEl);

  conPassword === '' || conPassword !== password || conPassword.length < 6
    ? addWarning(inputConPasswordEl, warningConPasswordEl)
    : addInputOkBorder(inputConPasswordEl);

  inputNameEl.value = inputEmailEl.value = inputPasswordEl.value = inputConPasswordEl.value =
    '';
});

/* REMOVE WARNINGS borders*/

allInputEl.forEach(input => {
  input.addEventListener('click', function (e) {
    allWarningText.forEach(text => text.classList.add('hidden'));
    allInputEl.forEach(input => {
      input.classList.remove('wrong-input');
      input.classList.remove('right-input');
    });

    input.focus();
  });
});

/* FUNCTIONS */

const addWarning = function (inputEl, warninTextEl) {
  inputEl.classList.add('wrong-input');
  warninTextEl.classList.remove('hidden');
};

const addInputOkBorder = function (inputEl) {
  inputEl.classList.add('right-input');
};
