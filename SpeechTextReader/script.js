'use strict';

const btnToggle = document.getElementById('toggle');
const overlay = document.querySelector('.overlay');
const windowEl = document.querySelector('.window');

btnToggle.addEventListener('click', function () {
  overlay.classList.remove('hidden');
  windowEl.classList.add('show');
});

overlay.addEventListener('click', function () {
  overlay.classList.add('hidden');
  windowEl.classList.remove('show');
});
