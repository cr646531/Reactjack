import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';

// ------------------------- //

const LOAD_CARDS = 'LOAD_CARDS';
const REMOVE_CARD = 'REMOVE_CARD';
const SHUFFLE_CARDS = 'SHUFFLE_DECK';

// ------------------------- //

const cardsReducer = ( state = [], action )=> {
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

// ------------------------- //

const reducer = combineReducers({
    cards: cardsReducer
});

export default createStore(reducer, applyMiddleware(thunk, logger));

// ------------------------- //

const _loadCards = (cards)=> ({
    type: LOAD_CARDS,
    cards
});

const _removeCard = ()=> ({
    type: REMOVE_CARD
});

const _shuffleCards = ()=> ({
    type: SHUFFLE_CARDS
})

// ------------------------- //

const loadCards = ()=> {
    return (dispatch)=> {
        return axios.get('/data/cards')
            .then(res => res.data)
            .then(cards => dispatch(_loadCards(cards)))
    }
};

const removeCard = (card)=> {
    return (dispatch)=> {
        dispatch(_removeCard());
    }
};

const shuffleCards = ()=> {
    return (dispatch)=> {
        dispatch(_shuffleCards());
    }
}

const resetDeck = ()=> {
    return (dispatch)=> {
        return axios.post('/data/reset')
            .then(()=> dispatch(loadCards()))
    }
}

export { loadCards, removeCard, shuffleCards, resetDeck };
