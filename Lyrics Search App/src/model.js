export const state = {
  artistAndSongs: [],
  nextSetURL: '',
  lyrics: '',
};

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

/* SEARCH ARTIST AND SONGS */

export const getSongsByWord = async function (word) {
  try {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${word}`);

    console.log(res);

    const data = await res.json();

    const { data: arr, next } = data;

    state.nextSetURL = next;
    state.artistAndSongs = createObject(arr);

    if (data.length === 0) {
      throw new Error('No songs found!');
    }

    return arr;
  } catch (err) {
    throw err;
  }
};

/* SEARCH LYRICS */

export const getLyricsByArtistAndTitle = async function (artist, title) {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);

    const data = await res.json();

    state.lyrics = data;
  } catch (err) {
    throw err;
  }
};
