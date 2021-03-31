const words = ['programming', 'javascript', 'asshole', 'lyngen'];
const guessedWrongLetters = [];
const guessedAllLetters = [];
const guessedRight = [];
let word = [];
let wrongAnswers = 0;

const popupEl = document.querySelector('.popup');
const allBodyParts = document.querySelectorAll('.body');
const wordEl = document.querySelector('.word');
const wrongTitle = document.querySelector('.wrong-title');
const wrongList = document.querySelector('.wrong-list');
const head = document.getElementById('head');
const body = document.getElementById('body');
const leg1 = document.getElementById('leg1');
const leg2 = document.getElementById('leg2');
const hands = document.getElementById('hands');
const btnPlayAgain = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

/* HIDE HANGMAN and modal*/

allBodyParts.forEach(part => part.classList.add('hidden'));

/* CHOOSE AND RENDER RANDOM WORD */

const randomWordAndRenderIt = function () {
  word = [...words[Math.trunc(Math.random() * words.length)]];

  let str = '';

  word.forEach((letter, i) => {
    str += `<div class="letter"><span class="span hidden" id="letter-${i}">${letter}</span></div>`;
  });

  const html = `${str}`;
  wordEl.innerHTML = html;
};

randomWordAndRenderIt();

const allSpans = Array.from(document.querySelectorAll('.span'));

/* RENDER ERROR MESSAGE */

const renderErrorMessage = function () {
  popupEl.classList.remove('hide-popup');
  popupEl.classList.add('render-popup');

  setTimeout(() => {
    popupEl.classList.add('hide-popup');
    popupEl.classList.remove('render-popup');
  }, 2000);
};

const renderModal = function (value) {
  modal.innerHTML = '';

  const html = `<h1>You ${value} the game! ${
    value === 'lost' ? '🤣' : '😎'
  }</h1>
  <button class="btn">Play again</button>`;

  modal.innerHTML = html;

  modal.classList.remove('hidden');
  modal.classList.add('reveal');
  overlay.classList.remove('hidden');

  document.querySelector('.btn').addEventListener('click', function () {
    location.reload();
  });
};

const checkWrongAnswers = function (num) {
  if (num === 1) head.classList.remove('hidden');
  if (num === 2) body.classList.remove('hidden');
  if (num === 3) leg1.classList.remove('hidden');
  if (num === 4) leg2.classList.remove('hidden');
  if (num === 5) {
    hands.classList.remove('hidden');
    renderModal('lost');
  }
};

const renderWrongAnswers = function () {
  wrongTitle.classList.remove('hidden');
  wrongList.classList.remove('hidden');
  wrongList.innerHTML = '';

  let html = '';

  guessedWrongLetters.forEach(letter => {
    html += `<li>${letter}</li>`;
  });

  wrongList.innerHTML = html;
};

const checkIfGuessed = function (letter) {
  if (!guessedAllLetters.includes(letter)) return;

  renderErrorMessage();
};

/* EVENT LISTENERS */

document.addEventListener('keydown', function (e) {
  if (!modal.classList.contains('hidden')) return;
  /* no numbers */
  if (isFinite(+e.key)) return;

  /* check if already guessed */
  checkIfGuessed(e.key);

  /* add pressed key to a list */
  guessedAllLetters.push(e.key);

  if (word.includes(e.key)) {
    word.forEach((letter, i) => {
      if (letter === e.key) {
        document.getElementById(`letter-${i}`).classList.remove('hidden');

        if (allSpans.every(el => !el.classList.contains('hidden'))) {
          renderModal('won');
        }
      }
    });
  } else {
    wrongAnswers++;
    guessedWrongLetters.push(e.key);
    /* render wrong letters */
    checkWrongAnswers(wrongAnswers);
    renderWrongAnswers();
  }
});
