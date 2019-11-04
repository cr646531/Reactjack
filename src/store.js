import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';

// ------------------------- //

const LOAD_CARDS = 'LOAD_CARDS';
const REMOVE_CARD = 'REMOVE_CARD';

// ------------------------- //

const cardsReducer = ( state = [], action )=> {
    switch(action.type){
        case LOAD_CARDS:
            state = action.cards;
            break;
        case REMOVE_CARD:
            state = state.filter(card => card.id !== action.card.id);
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

const _removeCard = (card)=> ({
    type: REMOVE_CARD,
    card
});

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
        return axios.delete(`/data/card/${card.id}`)
            .then(res => res.data)
            .then(() => dispatch(_removeCard(card)))
    }
};

export { loadCards, removeCard };
