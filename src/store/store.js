import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';

import { cardsReducer } from './reducers/cards';
import { handReducer } from './reducers/hand';

const LOAD_CARDS = 'LOAD_CARDS';
const REMOVE_CARD = 'REMOVE_CARD';
const SHUFFLE_CARDS = 'SHUFFLE_DECK';
const HIT = 'HIT';
const RESET_HAND = 'RESET_HAND';



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
