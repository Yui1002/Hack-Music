import React from 'react';
import Search from './Search.jsx';
import SpotifyController from '../../../helpers/spotify.js';
import PlayLists from './PlayLists.jsx';
import FavoritePlayLists from './FavoritePlayLists.jsx';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      genre: '',
      artist: '',
      year: '',
      album: '',
      albums: [],
      playlists: [],
      likedPlayLists: []
    }
    this.SpotifyController = new SpotifyController();
    this.onChange = this.onChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.updateSearchForArtist = this.updateSearchForArtist.bind(this);
    this.completeSearch = this.completeSearch.bind(this);
    this.updateSearchForYear = this.updateSearchForYear.bind(this);
    this.updateSearchForAlbum = this.updateSearchForAlbum.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async componentDidMount() {
    // get all genre categories
    const token = await this.SpotifyController.getToken();
    const genres = await this.SpotifyController.getAllGenres(token);

    this.setState({ genres: genres.genres });

    // get all the favorite playlists of the user
    const response = await fetch('/getFavoritePlaylists');
    const likedPlayLists = await response.json();

    this.setState({ likedPlayLists: likedPlayLists });
  }

  // user select
  async onChange(value) {
    this.setState({ genre: value });

    const token = await this.SpotifyController.getToken();
    const playlists = await this.SpotifyController.getPlayListsFromGenre(this.state.genre, token);

    this.setState({ playlists: playlists });
  }

  async updateSearchForArtist(value) {
    this.setState({ artist: value });
  }

  async updateSearchForYear(value) {
    this.setState({ year: value });
  }

  async updateSearchForAlbum(value) {
    this.setState({ album: value });
  }

  async completeSearch() {
    console.log('clicked')
    if (this.state.artist === '' && this.state.year === '' && this.state.album === '') {
      console.log('the user does not select anything');
      return new Error('select something');
    }

    const token = await this.SpotifyController.getToken();

    if (this.state.artist.length !== 0) {
      // get an album of the artist
      let albums = await this.SpotifyController.getAlbumByArtist(token, this.state.artist);
      this.setState({ albums: albums });
    } else if (this.state.year.length !== 0) {
      // get an album of the year
      let albums = await this.SpotifyController.getAlbumByYear(token, this.state.year);
      this.setState({ albums: albums });
    } else if (this.state.album.length !== 0) {
      // get an album of the keyword
      let albums = await this.SpotifyController.getAlbumByKeyword(token, this.state.album);
      this.setState({ albums: albums });
    }
  }

  // if a user clicks the heart icon, save the selected playlist to the database
  async saveItem(id, name, url, image) {
    const data = {id, name, url, image};
    // add your clicked playlist to database
     // send post request to the server
    const response = await fetch('/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const favoritePlaylists = await response.json();

    this.setState({ likedPlayLists: favoritePlaylists });
  }

  async deleteItem(id) {
    const deletedId = {id};

    const response1 = await fetch('/deleteFavoritePlaylists', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deletedId)
    });
    const response2 = await fetch('/getFavoritePlaylists');
    const playlists = await response2.json();
    console.log(playlists)
    this.setState({ likedPlayLists: playlists })
  }

  render() {
    return (
      <div className="container">
        <Search
          genres={this.state.genres}
          onChange={this.onChange}
          updateSearchForArtist={this.updateSearchForArtist}
          updateSearchForYear={this.updateSearchForYear}
          updateSearchForAlbum={this.updateSearchForAlbum}
          completeSearch={this.completeSearch}
        />
        <h1 className='title'>Discover Music</h1>
        <PlayLists playlists={this.state.playlists} saveItem={this.saveItem} albums={this.state.albums} />
        {this.state.likedPlayLists.length === 0 ? <div></div> : <FavoritePlayLists likedPlayLists={this.state.likedPlayLists} deleteItem={this.deleteItem} />}
      </div>
    )
  }
}

export default App;