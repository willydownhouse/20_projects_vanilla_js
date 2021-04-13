import * as model from './model.js';
import artistListView from './artistListView.js';

const btnNextEl = document.getElementById('next');
const inputEl = document.getElementById('input');

const controlSearch = async function () {
  try {
    await model.getSongsByWord(inputEl.value);

    console.log(model.state.artistAndSongs);
    console.log(model.state.nextSetURL);
    artistListView.render(model.state.artistAndSongs);
  } catch (err) {
    console.log(err);
  }
};

const controlLyricsSearch = async function (artist, title) {
  try {
    await getLyricsByArtistAndTitle(artist, title);

    console.log(state.lyrics);
  } catch (err) {
    console.log(err);
  }
};

/* EVENT LISTENERS */

artistListView.addHandler(controlSearch);
artistListView.activateLyricsButtons(controlLyricsSearch);

/* btnSearch.addEventListener('click', function (e) {
  const input = inputEl.value;
  controlSearch(input);
}); */

/* lyrics button */
