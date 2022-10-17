import React from 'react';
import './PlayList.css';

const PlayList = function(props) {
  const {id, name, external_urls, images} = props.playlist;

  return (
    <div className="playlist">
      <img className="playlist_img" src={images[0].url} alt={name} />
      <a className="playlist_link" href={external_urls.spotify}>{name}</a>
      <button
        className="playlist_button"
        onClick={() => props.saveItem(id, name, external_urls.spotify, images[0].url)}>
        <i
          className="fa-regular fas fa-heart"
          onClick={() => props.saveItem(id, name, external_urls.spotify, images[0].url)}></i>
      </button>
    </div>
  )
}

export default PlayList;