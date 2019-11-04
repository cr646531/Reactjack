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

app.get('/data/cards', (req, res, next)=> {
    Card.findAll()
      .then(cards => res.send(cards))
      .catch(next);
});

app.delete('/data/card/:id', (req, res, next)=> {
    Card.findById(req.params.id)
      .then( card => card.destroy() )
      .then( () => res.sendStatus(204))
      .catch(next);
  });


module.exports = app;