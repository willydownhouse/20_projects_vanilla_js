'use strict';

const difSelector = document.getElementById('difficulty-selector');
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

const words = ['säm', 'kimi', 'mike'];
let index = 0;
let score = 0;
let time = 30;
let currentDifficulty = easy;

/* set first word */

timeEl.innerText = `${time}s`;
wordEl.innerText = words[index];

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
  if (e.target.value === words[index]) {
    score++;
    index++;
    scoreEl.innerText = `Score: ${score}`;
    inputEl.value = '';
    let currentTime = +timeEl.innerText.slice(0, -1) + currentDifficulty;
    clearInterval(timer);
    timer = setGameTime(currentTime);

    if (index === words.length) {
      index = 0;
    }

    wordEl.innerText = words[index];
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
});
