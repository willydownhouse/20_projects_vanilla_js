const audio = document.getElementById('audio');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');
const popup = document.querySelector('.popup');
const img = document.getElementById('img');
const songname = document.getElementById('songname');
const progressBar = document.getElementById('progress');
/* set right image */

const song = audio.getAttribute('src').slice(8, -4);

img.style.background = `url('./images/${song}.jpg') no-repeat center center/cover`;

let playing = false;

/* FUNCTIONS */

const updateProgress = function () {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
};

const setAudioProgress = function (e) {
  audio.currentTime = (+progressBar.value * audio.duration) / 100;
};

const fromPlayToPauseButton = function () {
  play.classList.remove('fa-play-circle');
  play.classList.add('fa-pause-circle');
};
const fromPauseToPlayButton = function () {
  play.classList.remove('fa-pause-circle');
  play.classList.add('fa-play-circle');
};

const modSongName = function (name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
};

/* EVENTLISTENERS */

play.addEventListener('click', function (e) {
  if (!playing) {
    audio.play();
    fromPlayToPauseButton();
    updateProgress();
    popup.classList.add('up');
    img.style.animation = 'spin 2s linear infinite';

    songname.innerText = modSongName(audio.getAttribute('src').slice(8, -4));
    playing = true;
  } else {
    audio.pause();
    fromPauseToPlayButton();
    img.style.animation = 'play-state paused';
    playing = false;
  }
});

stop.addEventListener('click', function (e) {
  audio.pause();
  audio.currentTime = 0;
  fromPauseToPlayButton();
  playing = false;

  popup.classList.remove('up');
  img.style.animation = 'play-state paused';
});

audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('change', setAudioProgress);

audio.addEventListener('ended', function (e) {
  audio.pause();
  audio.currentTime = 0;
});

forward.addEventListener('click', function () {
  audio.currentTime += 10;
  updateProgress();
});
backward.addEventListener('click', function () {
  audio.currentTime -= 10;
  updateProgress();
});
