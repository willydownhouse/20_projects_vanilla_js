import View from './View.js';

class lyricsView extends View {
  _btnElement;

  render = function (artist, title, lyrics) {
    const html = `<h2>${artist}: ${title}</h2> <p>${
      lyrics
        ? lyrics
        : 'There was no lyrics for this song. Please try another song. 😎'
    }</p> <button id="back" class="btn">Back</button>`;

    this._parentElement.innerHTML = html;
    this._btnElement = document.getElementById('back');
  };
}

export default new lyricsView();
