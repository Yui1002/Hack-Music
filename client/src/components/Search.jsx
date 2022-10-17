import React from 'react';
import config from '../../../config.js';
import './Search.css';

const Search = (props) => {
  return (
    <div className="search_container">
      <div className="search_category">
        <div className="search_title">Select by genre</div>
        <select className="select_form"
          onChange={(e) => props.onChange(e.target.value)}>
          <option>Select</option>
          {props.genres.map(genre => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div className="search_category">
        <div className="search_title">Select by artist</div>
        <input placeholder="type an artist"
          className="artist_input"
          onChange={(e) => props.updateSearchForArtist(e.target.value)}></input>
      </div>
      <div className="search_category">
        <div className="search_title">Select by year</div>
        <input placeholder="type a year"
          className="year_input"
          onChange={(e) => props.updateSearchForYear(e.target.value)}></input>
      </div>
      <div className="search_category">
        <div className="search_title">Select by album</div>
        <input placeholder="type an album"
          className="album_input"
          onChange={(e) => props.updateSearchForAlbum(e.target.value)}></input>
      </div>
      <button className="search_button" onClick={() => props.completeSearch()}>Search</button>
    </div>
  )
}

export default Search;