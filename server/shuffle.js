const shuffle = (deck) => {
    var currentIndex = deck.length, temporaryValue, randomIndex;
      
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporaryValue;
    }

    return deck;
};

const rig = (deck) => {
    deck.reverse();
    return deck;
}

const rigSplit = (deck) => {
    deck[0] = { rank: 'Ace', suit: 'Hearts', value: 11 };
    deck[1] = { rank: 'Ace', suit: 'Diamonds', value: 11 };

    return deck;
}

module.exports = {
    shuffle, 
    rig,
    rigSplit
}