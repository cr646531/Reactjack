const LOAD_CARDS = 'LOAD_CARDS';
const REMOVE_CARD = 'REMOVE_CARD';
const SHUFFLE_CARDS = 'SHUFFLE_DECK';

export const cardsReducer = ( state = [], action )=> {
    switch(action.type){
        case LOAD_CARDS:
            state = action.cards;
            break;
        case REMOVE_CARD:
            state.pop()
            break;
        case SHUFFLE_CARDS:
            var deck = state;
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
            state = deck;
            break;
    }
    return state;
};