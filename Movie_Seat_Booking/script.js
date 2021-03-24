'use strict';

const seatGroupEl = document.querySelector('.seat-group');
const numOfSeatsEl = document.getElementById('num-of-seats');
const movieSelectorEl = document.getElementById('select');
const ticketPriceEl = document.getElementById('ticket-price');
const allSeats = document.querySelectorAll('.seat');

/* get movie name */

const getMovieName = function (el) {
  return el.value.slice(0, el.value.length - 2).trim();
};

const getTicketPrice = function (el) {
  return el.value.slice(-2);
};

let selectedSeats;
let currentMovieTicketPrice = getTicketPrice(movieSelectorEl);
let currentMovie = getMovieName(movieSelectorEl);

let bookedSeatsZorro = [];
let bookedSeatsBaywatch = [];

let currentArray =
  getMovieName(movieSelectorEl) === 'Zorro'
    ? bookedSeatsZorro
    : bookedSeatsBaywatch;

/* FUNCTIONS */

const updateText = function (currentArray) {
  numOfSeatsEl.innerText = `${currentArray.length}`;
  ticketPriceEl.innerText = `${currentArray.length * currentMovieTicketPrice}`;
};

const resetApp = function () {
  localStorage.clear();
  allSeats.forEach(seat => {
    seat.classList.remove('occupied-seat');
    seat.classList.remove('selected-seat');
  });
};

/* resetApp(); */

const updateSeats = function (currentArray) {
  allSeats.forEach(seat => {
    seat.classList.remove('selected-seat');
    seat.classList.remove('occupied-seat');
  });

  currentArray.forEach(seat => {
    document.getElementById(`${seat}`).classList.add('occupied-seat');
  });
};

const bookASeat = function (e) {
  if (e.target.id.includes('seat')) {
    if (e.target.classList.contains('occupied-seat')) return;

    if (e.target.classList.contains('selected-seat')) {
      e.target.classList.remove('selected-seat');
      removeSeatFromArray(currentArray, e);
    } else {
      e.target.classList.add('selected-seat');
      addSeatToArray(currentArray, e);
    }
  }
};

/* ADD BOOKED SEATS TO ARRAY */

const addSeatToArray = function (arr, e) {
  arr.push(e.target.id);
};

const removeSeatFromArray = function (arr, e) {
  const i = arr.findIndex(seat => seat === e.target.id);
  arr.splice(i, 1);
};

/* ARRAYS TO AND FROM LOCAL STORAGE */

const setLocalStorage = function (key, arr) {
  const data = JSON.stringify(arr);
  localStorage.setItem(key, data);
};

const getLocalStorage = function (key, arr) {
  selectedSeats = arr.length;
  const data = JSON.parse(localStorage.getItem(key));

  if (!data) return;

  currentArray = data;

  currentArray.forEach(id => {
    document.getElementById(`${id}`).classList.add('selected-seat');
  });
};

/* UPDATE CURRENT VALUES */

const updateCurrents = function (e) {
  /* current movie */
  currentMovie = e.target.value.slice(0, e.target.value.length - 2).trim();

  /* current ticket price */
  currentMovieTicketPrice = +e.target.value.slice(-2);

  /* current array */
  currentArray =
    currentMovie === 'Zorro' ? bookedSeatsZorro : bookedSeatsBaywatch;
};

/* EVENT LISTENERS */

window.addEventListener('load', function () {
  getLocalStorage(currentMovie, currentArray);
  updateSeats(currentArray);
  updateText(currentArray);
});

seatGroupEl.addEventListener('click', function (e) {
  bookASeat(e);
  setLocalStorage(currentMovie, currentArray);
  updateText(currentArray);
});

movieSelectorEl.addEventListener('change', function (e) {
  updateCurrents(e);
  getLocalStorage(currentMovie, currentArray);
  updateSeats(currentArray);
  updateText(currentArray);
});
