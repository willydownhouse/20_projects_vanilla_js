'use strict';

const difSelector = document.getElementById('difficulty-selector');
const difBar = document.querySelector('.difficulty-bar');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const wordEl = document.getElementById('word');
const inputEl = document.getElementById('input');
const btnEl = document.querySelector('.btn');

const modalGameOver = document.querySelector('.modal-game-over');
const overlay = document.querySelector('.overlay');
const btnNewGame = document.querySelector('.new-game');
const gameOverMessage = document.getElementById('game-over-message');

const easy = 6;
const medium = 4;
const hard = 2;

const words = ['säm', 'kimi', 'mike', 'john', 'maria', 'ben'];
let index = 0;
let score = 0;
let time = 30;
let currentDifficulty = easy;

/* set first word */

const setRandomWord = function () {
  return words[Math.trunc(Math.random() * words.length)];
};

let currentWord = setRandomWord();

inputEl.focus();
timeEl.innerText = `${time}s`;
wordEl.innerText = currentWord;

const setGameTime = function (time) {
  const timer = setInterval(() => {
    time--;
    timeEl.innerText = `${time}s`;

    if (time === 0) {
      clearInterval(timer);
      renderGameOver();
    }
  }, 1000);

  return timer;
};

const renderGameOver = function () {
  modalGameOver.classList.remove('hidden');
  modalGameOver.classList.add('show');
  overlay.classList.remove('hidden');

  gameOverMessage.innerText = `You got ${score} points!`;
};

const checkRightAnswer = function (e) {
  if (e.target.value === currentWord) {
    score++;

    scoreEl.innerText = `Score: ${score}`;
    inputEl.value = '';
    let currentTime = +timeEl.innerText.slice(0, -1) + currentDifficulty;
    clearInterval(timer);
    timer = setGameTime(currentTime);

    if (index === words.length) {
      index = 0;
    }

    currentWord = setRandomWord();
    wordEl.innerText = currentWord;
  }
};

let timer = setGameTime(time);

/* eventlisteners */

btnNewGame.addEventListener('click', function () {
  location.reload();
});

inputEl.addEventListener('input', checkRightAnswer);

difSelector.addEventListener('change', function (e) {
  if (e.target.value === 'easy') currentDifficulty = easy;
  if (e.target.value === 'medium') currentDifficulty = medium;
  if (e.target.value === 'hard') currentDifficulty = hard;

  clearInterval(timer);
  timer = setGameTime(time + 1);
});

btnEl.addEventListener('click', function () {
  difBar.classList.toggle('bar-down');
});
