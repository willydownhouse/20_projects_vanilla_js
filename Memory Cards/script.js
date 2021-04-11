'use strict';

const btnAddNew = document.getElementById('add-new');
const pageMain = document.querySelector('.main');
const pageAddCard = document.querySelector('.add-card');
const btnX = document.getElementById('x');
const cardEl = document.querySelector('.card-box');
const flipCardInner = document.querySelector('.flip-card-inner');

/* EVENT LISTENERS */

btnAddNew.addEventListener('click', function () {
  pageMain.classList.add('hidden');
  pageAddCard.classList.remove('hidden');
  pageAddCard.classList.add('show');
});

btnX.addEventListener('click', function () {
  pageMain.classList.remove('hidden');
  pageAddCard.classList.add('hidden');
  pageMain.classList.add('show');
});

cardEl.addEventListener('click', function () {
  flipCardInner.classList.toggle('flip');
});
