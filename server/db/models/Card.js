const conn = require('../conn');

const Card = conn.define('card', {
    rank: conn.Sequelize.STRING,
    value: conn.Sequelize.INTEGER,
    suit: conn.Sequelize.STRING
});

module.exports = Card;