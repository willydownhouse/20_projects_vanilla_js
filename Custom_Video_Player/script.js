'use strict';

const videoEl = document.querySelector('.video');
const playEl = document.getElementById('play');
const stopEl = document.getElementById('stop');
const time = document.querySelector('.time');
const audioline = document.querySelector('.audioline');
const audioblock = document.querySelector('.block');
const progressBar = document.getElementById('progress');

let isPlaying = false;

function setTime() {
  let minutes = Math.floor(videoEl.currentTime / 60);
  let seconds = Math.floor(videoEl.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  let mediaTime = minuteValue + ':' + secondValue;
  time.innerHTML = `<p>${mediaTime}</p>`;
}

/* FUNCTIONS */

const updateProgress = function () {
  /* console.log(videoEl.currentTime); */
  progressBar.value = (videoEl.currentTime / videoEl.duration) * 100;
};

const setVideoProgress = function () {
  videoEl.currentTime = (+progressBar.value * videoEl.duration) / 100;
};

/* EVENT LISTENERS */

playEl.addEventListener('click', function (e) {
  if (isPlaying) return;

  videoEl.innerHTML = `<source src="videos/gone.mp4" type="video/mp4" />`;
  videoEl.play();
  updateProgress();
  isPlaying = true;
});

stopEl.addEventListener('click', function (e) {
  if (!isPlaying) return;

  videoEl.pause();
  isPlaying = false;
});

videoEl.addEventListener('ended', function (e) {
  videoEl.pause();
  videoEl.currentTime = 0;
  isPlaying = false;
});

videoEl.addEventListener('click', function (e) {
  if (isPlaying) {
    videoEl.pause();
    isPlaying = false;
  } else {
    videoEl.innerHTML = `<source src="videos/gone.mp4" type="video/mp4" />`;
    videoEl.play();
    isPlaying = true;
  }
});

videoEl.addEventListener('timeupdate', setTime);
videoEl.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('change', setVideoProgress);
