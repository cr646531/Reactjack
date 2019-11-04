const conn = require('./conn');
const Card = require('./models/Card');

const syncAndSeed = ()=> {
    return conn.sync({ force: true })
        .then(()=> {
            return Promise.all([
                Card.create({ rank: 'Two', suit: 'Diamonds', value: 2 }),
                Card.create({ rank: 'Three', suit: 'Diamonds', value: 3 }),
                Card.create({ rank: 'Four', suit: 'Diamonds', value: 4 }),
                Card.create({ rank: 'Five', suit: 'Diamonds', value: 5 }),
                Card.create({ rank: 'Six', suit: 'Diamonds', value: 6 }),
                Card.create({ rank: 'Seven', suit: 'Diamonds', value: 7 }),
                Card.create({ rank: 'Eight', suit: 'Diamonds', value: 8 }),
                Card.create({ rank: 'Nine', suit: 'Diamonds', value: 9 }),
                Card.create({ rank: 'Ten', suit: 'Diamonds', value: 10 }),
                Card.create({ rank: 'Jack', suit: 'Diamonds', value: 10 }),
                Card.create({ rank: 'Queen', suit: 'Diamonds', value: 10 }),
                Card.create({ rank: 'King', suit: 'Diamonds', value: 10 }),
                Card.create({ rank: 'Ace', suit: 'Diamonds', value: 11 }),

                Card.create({ rank: 'Two', suit: 'Clubs', value: 2 }),
                Card.create({ rank: 'Three', suit: 'Clubs', value: 3 }),
                Card.create({ rank: 'Four', suit: 'Clubs', value: 4 }),
                Card.create({ rank: 'Five', suit: 'Clubs', value: 5 }),
                Card.create({ rank: 'Six', suit: 'Clubs', value: 6 }),
                Card.create({ rank: 'Seven', suit: 'Clubs', value: 7 }),
                Card.create({ rank: 'Eight', suit: 'Clubs', value: 8 }),
                Card.create({ rank: 'Nine', suit: 'Clubs', value: 9 }),
                Card.create({ rank: 'Ten', suit: 'Clubs', value: 10 }),
                Card.create({ rank: 'Jack', suit: 'Clubs', value: 10 }),
                Card.create({ rank: 'Queen', suit: 'Clubs', value: 10 }),
                Card.create({ rank: 'King', suit: 'Clubs', value: 10 }),
                Card.create({ rank: 'Ace', suit: 'Clubs', value: 11 }),
                
                Card.create({ rank: 'Two', suit: 'Hearts', value: 2 }),
                Card.create({ rank: 'Three', suit: 'Hearts', value: 3 }),
                Card.create({ rank: 'Four', suit: 'Hearts', value: 4 }),
                Card.create({ rank: 'Five', suit: 'Hearts', value: 5 }),
                Card.create({ rank: 'Six', suit: 'Hearts', value: 6 }),
                Card.create({ rank: 'Seven', suit: 'Hearts', value: 7 }),
                Card.create({ rank: 'Eight', suit: 'Hearts', value: 8 }),
                Card.create({ rank: 'Nine', suit: 'Hearts', value: 9 }),
                Card.create({ rank: 'Ten', suit: 'Hearts', value: 10 }),
                Card.create({ rank: 'Jack', suit: 'Hearts', value: 10 }),
                Card.create({ rank: 'Queen', suit: 'Hearts', value: 10 }),
                Card.create({ rank: 'King', suit: 'Hearts', value: 10 }),
                Card.create({ rank: 'Ace', suit: 'Hearts', value: 11 }),
                
                Card.create({ rank: 'Two', suit: 'Spades', value: 2 }),
                Card.create({ rank: 'Three', suit: 'Spades', value: 3 }),
                Card.create({ rank: 'Four', suit: 'Spades', value: 4 }),
                Card.create({ rank: 'Five', suit: 'Spades', value: 5 }),
                Card.create({ rank: 'Six', suit: 'Spades', value: 6 }),
                Card.create({ rank: 'Seven', suit: 'Spades', value: 7 }),
                Card.create({ rank: 'Eight', suit: 'Spades', value: 8 }),
                Card.create({ rank: 'Nine', suit: 'Spades', value: 9 }),
                Card.create({ rank: 'Ten', suit: 'Spades', value: 10 }),
                Card.create({ rank: 'Jack', suit: 'Spades', value: 10 }),
                Card.create({ rank: 'Queen', suit: 'Spades', value: 10 }),
                Card.create({ rank: 'King', suit: 'Spades', value: 10 }),
                Card.create({ rank: 'Ace', suit: 'Spades', value: 11 })
            ])
        });
};

module.exports = {
    models: {
        Card
    },
    syncAndSeed
};