const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/music');

const playListSchema = new mongoose.Schema({
  id: String,
  name: String,
  url: String,
  image: String
});

const PlaylistModel = mongoose.model('Playlist', playListSchema);

var hasDuplicate = async function(data) {
  return await PlaylistModel.find({ id: data.id })
    .then(duplicate => {
      return duplicate.length === 0;
    });
}

var savePlaylists = async function(data) {
  var result = await hasDuplicate(data);
  if (result) {
    const doc = new PlaylistModel({
      id: data.id,
      name: data.name,
      url: data.url,
      image: data.image
    });

    return doc.save();
  }
}

var getPlaylists = async function() {
  return await PlaylistModel.find();
}

var deleteFavoritePlaylists = async function(id) {
  return await PlaylistModel.deleteOne({id: id}, (err) => {
    if (err) {
      throw err;
    }
  })
}

module.exports.savePlaylists = savePlaylists;
module.exports.getPlaylists = getPlaylists;
module.exports.deleteFavoritePlaylists = deleteFavoritePlaylists;

