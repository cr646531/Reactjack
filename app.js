const express = require('express');
const app = express();

const path = require('path');
const indexFile = path.join(__dirname, 'index.html');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(indexFile));


module.exports = app;