import View from './View.js';

class artistListView extends View {
  _btnElement = document.getElementById('search');
  _allLyricBtns = document.querySelectorAll('btn-lyrics');

  render = function (arr) {
    const html =
      arr
        .map(ob => {
          return `
      <ul>
          <li>
          <div class="group">
              <h3>${ob.artist}: <span>${ob.song}</span></h3>
              <button name="${ob.artist}" value="${ob.song}" class="btn btn-lyrics">Lyrics</button>
          </div>
          </li>
      </ul>  
          `;
        })
        .join('') + '<button id="next" class="btn">Next</button>';

    this._parentElement.innerHTML = html;
  };

  activateLyricsButtons(handler) {
    this._allLyricBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        const artist = e.target.name;
        const title = e.target.value;

        console.log(artist);
        console.log(title);
        handler();
      });
    });
  }
}

export default new artistListView();
