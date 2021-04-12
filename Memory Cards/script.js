'use strict';

const btnAddNew = document.getElementById('add-new');
const pageMain = document.querySelector('.main');
const pageAddCard = document.querySelector('.add-card');
const btnX = document.getElementById('x');
const cardEl = document.querySelector('.card-box');
const flipCardInner = document.querySelector('.flip-card-inner');

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const add = document.getElementById('add');
const btnRemove = document.getElementById('remove');

const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

let cards = [];
let currentCard = 0;

/* FUNCTIONS */

const renderCards = function (cards, currentCard) {
  const html = `
      <div class="flip-card-front">
        <p>${cards[currentCard].question}</p>
      </div>
      <div class="flip-card-back">
      <p>${cards[currentCard].answer}</p>
      </div>
    `;

  flipCardInner.innerHTML = html;
};

const nextCard = function () {
  if (flipCardInner.classList.contains('flip')) return;
  if (cards.length === 0) return;

  currentCard++;

  if (currentCard === cards.length) currentCard = 0;

  renderCards(cards, currentCard);
};

const previousCard = function () {
  if (flipCardInner.classList.contains('flip')) return;
  if (cards.length === 0) return;

  currentCard--;

  if (currentCard === -1) currentCard = cards.length - 1;

  renderCards(cards, currentCard);
};

const setLocalStorage = function (arr) {
  const data = JSON.stringify(arr);
  localStorage.setItem('cards', data);
};

const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('cards'));
  if (!data) return;

  cards = data;

  if (cards.length === 0) return;

  renderCards(cards, currentCard);
};

/* EVENT LISTENERS */

add.addEventListener('click', function (e) {
  const question1 = questionEl.value.trim();
  const answer1 = answerEl.value.trim();

  if (!question1 || !answer1) {
    alert('Please enter a question and answer 😊');
    return;
  }

  const card = {
    question: question1,
    answer: answer1,
  };
  cards.push(card);

  renderCards(cards, currentCard);
  setLocalStorage(cards);

  questionEl.value = answerEl.value = '';
});

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

btnRemove.addEventListener('click', function (e) {
  cards = [];
  currentCard = 0;
  flipCardInner.innerHTML = '';
  setLocalStorage(cards);
});

btnRight.addEventListener('click', nextCard);
btnLeft.addEventListener('click', previousCard);

window.addEventListener('load', function () {
  getLocalStorage();
});
