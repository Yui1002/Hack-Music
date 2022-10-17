import React from 'react';
import PlayList from './PlayList.jsx';
import './PlayLists.css';

const PlayLists = (props) => {
  return (
    <div>
      {props.albums.length
      ?
      <div className="playlists">
        {props.albums.map(playlist => (
          <PlayList key={playlist.id} playlist={playlist} saveItem={props.saveItem}/>
        ))}
      </div>
      :
      <div className="playlists">
        {props.playlists.map(playlist => (
          <PlayList key={playlist.id} playlist={playlist} saveItem={props.saveItem} />
        ))}
      </div>}
    </div>
  )
}

export default PlayLists;