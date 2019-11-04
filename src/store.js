import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';

// ------------------------- //

const LOAD_CARDS = 'LOAD_CARDS';
const REMOVE_CARD = 'REMOVE_CARD';
const SHUFFLE_CARDS = 'SHUFFLE_DECK';
const HIT = 'HIT';
const RESET_HAND = 'RESET_HAND';

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

// const playerReducer = (state = { bankroll: 100, bet: 0, playerTotal: 0, numAces: 0, hand: [] }, action )=> {
//     switch(action.type){
//         case HIT:
//             state = { hand: hand.push}
//     }
// }

const handReducer = ( state = [], action )=> {
    switch(action.type){
        case HIT:
            state = [...state, action.card];
            break;
        case RESET_HAND:
            state = [];
            break;
    };
    return state;
}

// ------------------------- //

const reducer = combineReducers({
    cards: cardsReducer,
    hand: handReducer
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
const _hit = (card)=> ({
    type: HIT,
    card
});

const _resetHand = ()=> ({
    type: RESET_HAND
});

// ------------------------- //

const loadCards = ()=> {
    return (dispatch)=> {
        return axios.get('/data/cards')
            .then(res => res.data)
            .then(cards => dispatch(_loadCards(cards)))
    }
};

const removeCard = ()=> {
    return (dispatch)=> {
        dispatch(_removeCard());
    }
};

const shuffleCards = ()=> {
    return (dispatch)=> {
        dispatch(_shuffleCards());
    }
};

const hit = (card)=> {
    return (dispatch)=> {
        dispatch(_hit(card));
    }
};

const resetHand = ()=> {
    return (dispatch)=> {
        dispatch(_resetHand());
    }
};

const resetDeck = ()=> {
    return (dispatch)=> {
        return axios.post('/data/reset')
            .then(()=> dispatch(loadCards()))
    }
}

export { loadCards, removeCard, shuffleCards, resetDeck, hit, resetHand };
