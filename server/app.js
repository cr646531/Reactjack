const express = require('express');
const app = express();
const db = require('./db');
const { Card } = db.models;

const path = require('path');
const indexFile = path.join(__dirname, '..', 'public', 'index.html');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static('public'));

app.use(require('body-parser').json());


app.get('/', (req, res, next) => res.sendFile(indexFile));

const { shuffle, rig, rigSplit } = require('./shuffle');

app.get('/data/cards', (req, res, next)=> {
    Card.findAll()
      .then(cards => shuffle(cards))
      .then(deck => res.send(deck))
      .catch(next);
});

app.get('/data/rigged', (req, res, next)=> {
  Card.findAll()
    .then(cards => rig(cards))
    .then(deck => res.send(deck))
    .catch(next);
});

app.get('/data/rigSplit', (req, res, next)=> {
  Card.findAll()
    .then(cards => rigSplit(cards))
    .then(deck => res.send(deck))
    .catch(next);
});

app.post('/data/reset', (req, res, next)=> {
  db.syncAndSeed()
    .then(()=> res.sendStatus(204))
    .catch(next);
});

app.delete('/data/card/:id', (req, res, next)=> {
    Card.findById(req.params.id)
      .then( card => card.destroy() )
      .then( () => res.sendStatus(204))
      .catch(next);
  });


module.exports = app;