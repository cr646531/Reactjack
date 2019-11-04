const app = require('./app');
const path = require('path');
const port = process.env.PORT || 3000;

const indexFile = path.join(__dirname, 'index.html');

app.get('/', (req, res, next) => res.sendFile(indexFile));

app.listen(port, ()=> console.log(`listening on port ${port}`));
