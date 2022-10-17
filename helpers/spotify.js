const config = require('../config.js');

class SpotifyController {
  constructor() {
    this.clientId = config.CLIENT_ID
    this.clientSecret = config.CLIENT_SECRET
  }

  // get access token for using Spotify API
  async getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
      },
      body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
  };

  // get all genre categories from Spotify API
  async getAllGenres(token) {
    const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  };

  // get the 10 playlists of the genre the user selects
  async getPlayListsFromGenre(genre, token) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${genre}&type=playlist&include_external=audio&limit=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data.playlists.items;
  };

  async getAlbumByArtist(token, artist) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=album&include_external=audio&limit=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    return data.albums.items;
  }

  async getAlbumByYear(token, year) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${year}&type=album&include_external=audio&limit=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    return data.albums.items;
  }

  async getAlbumByKeyword(token, keyword) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=album&include_external=audio&limit=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    return data.albums.items;
  }

}

export default SpotifyController;

