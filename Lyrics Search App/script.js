'use strict';

const btnSearch = document.getElementById('search');
const input = document.getElementById('input');
const resultsEl = document.getElementById('results');
const btnNext = document.getElementById('next');

let currentListOfSongs;
let nextUrl;

//https://api.lyrics.ovh/suggest/${word}`
//https://api.lyrics.ovh/v1/${artist}/${title}`

/* ajax calls */

const getListOfSongs = async function (value) {
  try {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${value}`);

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

/* ajax get lyrics */

const getLyrics = async function (artist, title) {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

/* ajax next */

const getNextSetOfSongs = async function (url) {
  try {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}/`);

    console.log(res);

    const data = await res.json();
  } catch (err) {
    console.log(err);
  }
};

/* render data */

const renderSongs = function (arr, next) {
  resultsEl.innerHTML = `<ul>
  ${arr
    .map(ob => {
      return `
    <li>
      <div class="group">
          <h3>${ob.artist.name}: <span>${ob.title}</span></h3>
          <button data-artist="${ob.artist.name}" data-title="${ob.title}" class="btn btn-lyrics">Lyrics</button>
      </div>
    </li>`;
    })
    .join('')}
  
</ul>  
${next ? `<button class="btn next">Next</button>` : ''}`;
};

const renderLyrics = function (artist, title, lyrics) {
  const modLyrics = lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  resultsEl.innerHTML = `
  <h2>${artist}: ${title}</h2>
  <p>${modLyrics}</p>
  <button class="btn back">Back</button>`;
};

/* EVENTLISTENERS */

btnSearch.addEventListener('click', async function () {
  try {
    const value = input.value;

    if (!value) return;

    const data = await getListOfSongs(value);

    const { data: arr, next } = data;

    currentListOfSongs = arr;
    nextUrl = next;

    renderSongs(currentListOfSongs, next);

    input.value = '';
  } catch (err) {
    console.log(err);
  }
});

resultsEl.addEventListener('click', async function (e) {
  if (e.target.classList.contains('back')) {
    renderSongs(currentListOfSongs, nextUrl);
  }
  if (e.target.classList.contains('next')) {
    getNextSetOfSongs(nextUrl);
  }
  if (!e.target.classList.contains('btn-lyrics')) return;

  const artist = e.target.getAttribute('data-artist');
  const title = e.target.getAttribute('data-title');

  const data = await getLyrics(artist, title);

  if (data.error === 'No lyrics found') {
    alert('Didnt find any lyrics');
    return;
  } else {
    renderLyrics(artist, title, data.lyrics);
  }
});
