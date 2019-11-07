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

module.exports = {
    shuffle, 
    rig
}