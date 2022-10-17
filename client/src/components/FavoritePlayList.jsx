import React from 'react';
import './FavoritePlayList.css';

const FavoritePlayList = ({ likedPlayList, deleteItem }) => {
  return (
    <div className="favorite_playlist">
      <img className="favorite_playlist_img" src={likedPlayList.image} />
      <a className="favorite_playlist_link" href={likedPlayList.url}>{likedPlayList.name}</a>
      <button onClick={() => deleteItem(likedPlayList.id)}>delete</button>
    </div>
  )
}

export default FavoritePlayList;