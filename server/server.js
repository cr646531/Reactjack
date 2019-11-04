const app = require('./app');
const port = process.env.PORT || 3000;
const db = require('./db');

app.listen(port, ()=> console.log(`listening on port ${port}`));

db.syncAndSeed();
