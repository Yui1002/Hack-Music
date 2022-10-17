const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('../database/mongoose.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/playlists', async (req, res) => {
  const data = {
    id: req.body.id,
    name: req.body.name,
    url: req.body.url,
    image: req.body.image
  };

  await mongoose.savePlaylists(data)
    .then(async () => {
      return await mongoose.getPlaylists()
    })
    .then(getDocs => {
      res.send(getDocs);
    })
    .catch(err => {
      res.send(500).send(err);
    })
});

app.get('/getFavoritePlaylists', async (req, res) => {
  // get all the playlists of the user from the database
  await mongoose.getPlaylists()
    .then(getDocs => {
      res.send(getDocs);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

app.delete('/deleteFavoritePlaylists', async (req, res) => {
  const id = req.body.id;
  await mongoose.deleteFavoritePlaylists(id)
    .then(deletedDocs => {
      res.send(deletedDocs);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

