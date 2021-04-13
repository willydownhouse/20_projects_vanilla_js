'use strict';

const btnSearch = document.getElementById('search');
const input = document.getElementById('input');
const resultsEl = document.getElementById('results');
const btnNext = document.getElementById('next');

let nextSetURL;

/* ajax calls */

const getSongsByWord = async function (word) {
  try {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${word}`);

    console.log(res);

    const data = await res.json();

    const { data: songs, next } = data;

    nextSetURL = next;

    if (songs.length === 0) {
      throw new Error('No songs found!');
    }

    console.log(songs);
    console.log(nextSetURL);

    const arr = songs.map(ob => {
      return {
        id: ob.id,
        artist: ob.artist.name,
        song: ob.title,
      };
    });

    return arr;
  } catch (err) {
    console.log(err);
  }
};

const getLyricsByArtistAndTitle = async function (artist, title) {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);

    console.log(res);

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

/* getLyricsByArtistAndTitle('eminem', 'lose yourself'); */

/* functions */

const renderArtistsAndSongs = function (arr) {
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

  resultsEl.innerHTML = html;
};

const renderLyrics = function (artist, title, lyrics) {
  const html = `<h2>${artist}: ${title}</h2> <p>${lyrics}</p> <button id="back" class="btn">Back</button>`;

  resultsEl.innerHTML = html;
};

/* event listeners */

btnSearch.addEventListener('click', async function (e) {
  try {
    const keyword = input.value.trim();

    if (!keyword || isFinite(keyword)) {
      alert('Please insert a keyword.');
      input.value = '';
      return;
    }
    const arr = await getSongsByWord(keyword);

    console.log(arr);

    renderArtistsAndSongs(arr);

    /* add even listeners lyrics buttons */
    const btnLyricsAll = document.querySelectorAll('.btn-lyrics');

    btnLyricsAll.forEach(btn => {
      btn.addEventListener('click', async function (e) {
        e.preventDefault();
        const artist = e.target.name;
        const title = e.target.value;

        console.log(artist);
        console.log(title);
        const data = await getLyricsByArtistAndTitle(artist, title);

        const { lyrics } = data;

        renderLyrics(artist, title, lyrics);
      });
    });

    input.value = '';
  } catch (err) {
    console.log(err);
  }
});

// const btnBack = document.getElementById('back');

// btnBack.addEventListener('click', function (e) {
//   console.log('click');
//   renderArtistsAndSongs(arr);
// });
