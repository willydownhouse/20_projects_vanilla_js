'use strict';

const btnSignUp = document.querySelector('.btn');
const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.modal-close');
const sideBarImage = document.querySelector('.img');
const menu = document.querySelector('.hamburger-menu');
const sideBarEl = document.querySelector('.sidebar');
const container = document.querySelector('.container');

/* MODAL */

const openModal = function () {
  overlay.classList.remove('hidden');
  modalWindow.classList.remove('hidden');

  modalWindow.style.opacity = 1;
};
const closeModal = function () {
  overlay.classList.add('hidden');
  modalWindow.classList.add('hidden');
};

const getPersonData = async function () {
  try {
    const res = await fetch('https://randomuser.me/api/');

    const data = await res.json();

    const [img] = data.results;

    const { thumbnail: image } = img.picture;

    sideBarImage.innerHTML = `<img class="image" src="${image}" alt="img">`;
  } catch (err) {
    console.log(err);
  }
};

let menuClicked = false;

const revealSideBar = function () {
  if (!menuClicked) {
    sideBarEl.style.transform = 'translateX(0)';
    container.style.transform = 'translateX(160px)';
    menuClicked = true;
  } else {
    sideBarEl.style.transform = 'translateX(-160px)';
    container.style.transform = 'translateX(0)';
    menuClicked = false;
  }
};

/* EVENTLISTENERS */
window.addEventListener('load', getPersonData);

btnSignUp.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
btnCloseModal.addEventListener('click', closeModal);

menu.addEventListener('click', revealSideBar);
