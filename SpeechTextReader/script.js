'use strict';

const btnToggle = document.getElementById('toggle');
const overlay = document.querySelector('.overlay');
const windowEl = document.querySelector('.window');
const btnClosewindow = document.getElementById('close');
const voiceSelectorEl = document.getElementById('voice');
const boxesContainer = document.querySelector('.grid-cont');
const readBtn = document.getElementById('read');
const textarea = document.getElementById('textarea');

let synth = window.speechSynthesis;

function setSpeech() {
  return new Promise(function (resolve, reject) {
    let id;

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}

const voices = setSpeech();

voices.then(voices => {
  const html = voices
    .map(voice => {
      return `<option value="${voice.name}">${voice.name}</option>`;
    })
    .join('');

  voiceSelectorEl.innerHTML = html;
});

/* EVENT LISTENERS */

btnToggle.addEventListener('click', function () {
  overlay.classList.remove('hidden');
  windowEl.classList.remove('hidden');
  windowEl.classList.add('show');
});

overlay.addEventListener('click', function () {
  overlay.classList.add('hidden');
  windowEl.classList.add('hidden');
  windowEl.classList.remove('show');
  textarea.value = '';
});

btnClosewindow.addEventListener('click', function () {
  overlay.classList.add('hidden');
  windowEl.classList.add('hidden');
  windowEl.classList.remove('show');
  textarea.value = '';
});

boxesContainer.addEventListener('click', function (e) {
  const box = e.target.closest('.box');

  if (!box) return;

  const frase = box.children[1].innerText;

  const message = new SpeechSynthesisUtterance(frase);
  synth.speak(message);
});

readBtn.addEventListener('click', function (e) {
  const voiceName = voiceSelectorEl.value;
  const frase = textarea.value;

  const message = new SpeechSynthesisUtterance(frase);

  voices.then((resolve, reject) => {
    const ob = resolve.find(voice => voice.name === voiceName);

    message.voice = ob;
    synth.speak(message);
  });
});
