import * as model from './model.js';
import artistListView from './artistListView.js';
import lyricsView from './lyricsView.js';

const controlSearch = async function () {
  try {
    await model.getSongsByWord();

    artistListView.render(model.state.artistAndSongs);

    artistListView.activateLyricsButtons(controlLyricsSearch);

    artistListView.activateButtonNext(controlNextButton);
  } catch (err) {
    model.renderErrorMessage(err);
    model.handlerErrorBtn();
  }
};

const controlLyricsSearch = async function (artist, title) {
  try {
    await model.getLyricsByArtistAndTitle(artist, title);

    const { lyrics } = model.state.lyrics;

    lyricsView.render(artist, title, lyrics);

    lyricsView.addHandler(controlLyricsBackButton);
  } catch (err) {
    model.renderErrorMessage(err);
    model.handlerErrorBtn();
  }
};

const controlLyricsBackButton = function () {
  artistListView.render(model.state.artistAndSongs);
  artistListView.activateLyricsButtons(controlLyricsSearch);
  artistListView.activateButtonNext(controlNextButton);
};

const controlNextButton = async function () {
  try {
    await model.getNextSetOfSongs();

    artistListView.render(model.state.artistAndSongs);

    artistListView.activateLyricsButtons(controlLyricsSearch);

    artistListView.activateButtonNext(controlNextButton);
  } catch (err) {
    model.renderErrorMessage(err);
    model.handlerErrorBtn();
  }
};

/* EVENT LISTENERS */

artistListView.addHandler(controlSearch);
