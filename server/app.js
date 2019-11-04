const express = require('express');
const app = express();
const db = require('./db');
const { Card } = db.models;

const path = require('path');
const indexFile = path.join(__dirname, '..', 'public', 'index.html');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static('public'));


app.get('/', (req, res, next) => res.sendFile(indexFile));

app.get('/cards', (req, res, next)=> {
    Card.findAll()
      .then(cards => res.send(cards))
      .catch(next);
});


module.exports = app;