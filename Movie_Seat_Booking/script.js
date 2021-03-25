'use strict';

const movies = [
  { name: 'Zorro', price: 10, bookedSeats: [] },
  { name: 'Baywatch', price: 12, bookedSeats: [] },
  { name: 'Dum and Dummer', price: 9, bookedSeats: [] },
  { name: 'James Bond', price: 13, bookedSeats: [] },
  { name: 'Tarzan', price: 6, bookedSeats: [] },
  { name: 'Ace Ventura', price: 10, bookedSeats: [] },
];

const seatGroupEl = document.querySelector('.seat-group');
const numOfSeatsEl = document.getElementById('num-of-seats');
const movieSelectorEl = document.getElementById('select');
const ticketPriceEl = document.getElementById('ticket-price');
const allSeats = document.querySelectorAll('.seat');

let currentMovie = movies[0];

/* create selector options from movies array */

movies.forEach(film => {
  const html = `<option value="${film.name} ${film.price}">${film.name} ${film.price}$</option>`;

  movieSelectorEl.insertAdjacentHTML('beforeend', html);
});

/* FUNCTIONS */

/* LOCAL STORAGE */

const setLocalStorage = function (currentMovie) {
  const data = JSON.stringify(currentMovie.bookedSeats);

  localStorage.setItem(`${currentMovie.name}`, data);
};

const getLocalStorage = function (currentMovie) {
  const data = JSON.parse(localStorage.getItem(`${currentMovie.name}`));

  if (!data) return;

  currentMovie.bookedSeats = data;
};

const reset = function () {
  localStorage.clear();
};

/* reset(); */

/* UPDATE BOOKEDSEATS ARRAY */

const addSeatBookings = function (seat) {
  currentMovie.bookedSeats.push(seat);
};

const removeSeatBookings = function (seat) {
  const i = currentMovie.bookedSeats.findIndex(value => value === seat);
  currentMovie.bookedSeats.splice(i, 1);
};

/* CHANGE SEAT COLOR */

const changeSeatColor = function (e) {
  if (!e.target.classList.contains('seat')) return;

  if (e.target.classList.contains('occupied-seat')) return;

  if (!e.target.classList.contains('selected-seat')) {
    e.target.classList.add('selected-seat');
    addSeatBookings(e.target.id);
  } else {
    e.target.classList.remove('selected-seat');
    removeSeatBookings(e.target.id);
  }
};

/* UPDATE TEXT */

const updateText = function (currentMovie) {
  numOfSeatsEl.innerText = currentMovie.bookedSeats.length;
  ticketPriceEl.innerText = `${
    currentMovie.price * currentMovie.bookedSeats.length
  }`;
};

/* UPDATE SEATS */

const updateSeats = function (currentMovie) {
  allSeats.forEach(seat => {
    seat.classList.remove('selected-seat');
    seat.classList.remove('occupied-seat');
  });

  currentMovie.bookedSeats.forEach(seat => {
    document.getElementById(`${seat}`).classList.add('occupied-seat');
  });
};

/* UPDATE CURRENT MOVIE */

const changeCurrentMovie = function (e) {
  const filmName = e.target.value.slice(0, e.target.value.length - 2).trim();
  currentMovie = movies.find(movie => movie.name === filmName);
};

/* EVENT LISTENERS */

window.addEventListener('load', function () {
  getLocalStorage(currentMovie);
  updateSeats(currentMovie);
  updateText(currentMovie);
});

seatGroupEl.addEventListener('click', function (e) {
  changeSeatColor(e);
  updateText(currentMovie);
});

movieSelectorEl.addEventListener('change', function (e) {
  changeCurrentMovie(e);
  getLocalStorage(currentMovie);
  updateSeats(currentMovie);
  updateText(currentMovie);
});

document.querySelector('.btn').addEventListener('click', function () {
  setLocalStorage(currentMovie);
  updateSeats(currentMovie);
  updateText(currentMovie);
});
