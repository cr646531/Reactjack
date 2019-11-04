import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// ------------------------- //

const LOAD_CARDS = 'LOAD_CARDS';

// ------------------------- //

const cardsReducer = ( state = [], action )=> {
    switch(action.type){
        case LOAD_CARDS:
            state = action.cards;
            break;
    }
    return state;
};

// ------------------------- //

const reducer = combineReducers({
    cards: cardsReducer
});

export default createStore(reducer, applyMiddleware(thunk));

// ------------------------- //

const _loadCards = (cards)=> ({
    type: LOAD_CARDS,
    cards
});

// ------------------------- //

const loadCards = ()=> {
    return (dispatch)=> {
        return axios.get('/cards')
            .then(res => res.data)
            .then(cards => dispatch(_loadCards(cards)));
    };
};

export { loadCards };
