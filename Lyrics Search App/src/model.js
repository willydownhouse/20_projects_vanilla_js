export const state = {
  artistAndSongs: [],
  nextSetURL: '',
  lyrics: '',
};

export const inputEl = document.getElementById('input');
const overlayEl = document.querySelector('.overlay');
const errorEl = document.querySelector('.error');
let errorBtn;

const createObject = function (data) {
  const arr = data.map(ob => {
    return {
      id: ob.id,
      artist: ob.artist.name,
      song: ob.title,
    };
  });
  return arr;
};

/* SEARCH ARTIST AND SONGS WITH WORD*/

export const getSongsByWord = async function () {
  try {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${inputEl.value}`);

    const data = await res.json();

    const { data: arr, next } = data;

    console.log(data);
    console.log(next);
    state.nextSetURL = next;
    state.artistAndSongs = createObject(arr);

    inputEl.value = '';

    if (data.data.length === 0) {
      throw new Error('No songs found!');
    }
  } catch (err) {
    throw err;
  }
};

/* SEARCH LYRICS */

export const getLyricsByArtistAndTitle = async function (artist, title) {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);

    /* if (!res.ok) throw new Error('Lyrics not found'); */

    const data = await res.json();

    state.lyrics = data;
  } catch (err) {
    throw err;
  }
};

/* get next set of songs and artists */

export const getNextSetOfSongs = async function () {
  try {
    console.log(state.nextSetURL);
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/${state.nextSetURL}/`
    );

    console.log(res);

    const data = await res.json();

    const { data: arr, next } = data;

    state.nextSetURL = next;
    state.artistAndSongs = createObject(arr);

    console.log(state.nextSetURL);
    console.log(state.artistAndSongs);

    if (data.length === 0) {
      throw new Error('No songs found!');
    }
  } catch (err) {
    throw err;
  }
};

/* ERRORS */

export const renderErrorMessage = function (err) {
  const html = `
  <div class="e-content">
    <p>${err}</p>
    <butto id="error-btn" class="btn">Try again!</butto>
  </div>`;

  errorEl.innerHTML = html;

  errorEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');

  errorEl.classList.add('show');
  overlayEl.classList.add('show');

  errorBtn = document.getElementById('error-btn');
  console.log(errorBtn);
};

export const handlerErrorBtn = function () {
  errorBtn.addEventListener('click', function () {
    errorEl.classList.add('hidden');
    overlayEl.classList.add('hidden');
  });

  inputEl.value = '';
};
