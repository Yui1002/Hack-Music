import React from 'react';
import FavoritePlayList from './FavoritePlayList.jsx';
import './FavoritePlayLists.css';

const FavoritePlayLists = (props) => {
  return (
    <div>
      <h5 className="favorite_playlists_title">Your Favorites</h5>
      <div className="favorite_playlists">
        {props.likedPlayLists.map(likedPlayList => (
          <FavoritePlayList key={likedPlayList.id} likedPlayList={likedPlayList} deleteItem={props.deleteItem} />
        ))}
      </div>
    </div>
  )
}

export default FavoritePlayLists;