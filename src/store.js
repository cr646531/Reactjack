// import packages
import { createStore, applyMiddleware, combineReducers } from 'redux';
import think from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';

const initialState = {
    deck: [],
    topCard: {},

    playerHand: [],
    playerTotal: 0,
    dealerHand: [],
    dealerTotal: 0,

    bankroll: 100,
    bet: 0
}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case 'LOAD_DECK':
            return Object.assign({}, state, {
                deck: action.deck
            })
        case 'GET_TOP_CARD':
            return Object.assign({}, state, {
                topCard: state.deck[0]
            });
        case 'PLAYER_HIT':
            return Object.assign({}, state, {
                playerHand: [...state.playerHand, state.deck[0]],
                playerTotal: state.playerTotal + state.deck[0].value,
                topCard: state.deck[1],
                deck: [...state.deck.slice(1)]
                
            });
        case 'PLACE_BET':
            return Object.assign({}, state, {
                bet: action.bet
            });
        case 'DEAL':
            return Object.assign({}, state, {
                playerHand: [...state.playerHand, state.deck[0], state.deck[1]],
                playerTotal: state.playerTotal + state.deck[0].value + state.deck[1].value,
                dealerHand: [...state.dealerHand, state.deck[2]],
                dealerTotal: state.dealerTotal + state.deck[2].value,
                topCard: state.deck[3],
                deck: [...state.deck.slice(3)]
            });
        case 'GAME_OVER':
            return Object.assign({}, state, {
                playerHand: [],
                playerTotal: 0,
                dealerHand: [],
                dealerTotal: 0,
                topCard: {},
                deck: action.deck
            });
        case 'PLAYER_LOSES':
            return Object.assign({}, state, {
                bankroll: state.bankroll - state.bet,
                bet: 0
            });
        case 'PLAYER_WINS':
                return Object.assign({}, state, {
                    bankroll: state.bankroll + state.bet,
                    bet: 0
                });
        default:
            return state;
    };
        

};


// create store
export default createStore(reducer, applyMiddleware(think, logger));


// action creators

const _loadDeck = (deck)=> ({
    type: 'LOAD_DECK',
    deck
});

const _playerHit = ()=> ({
    type: 'PLAYER_HIT'
});

const _placeBet = (bet)=> ({
    type: 'PLACE_BET',
    bet
});

const _deal = ()=> ({
    type: 'DEAL'
});

const _getTopCard = ()=> ({
    type: 'GET_TOP_CARD'
})

const _gameOver = (deck)=> ({
    type: 'GAME_OVER',
    deck
});

const _playerLoses = ()=> ({
    type: 'PLAYER_LOSES'
});

const _playerWins = ()=> ({
    type: 'PLAYER_WINS'
});

// action dispatch

const loadDeck = ()=> {
    return (dispatch)=> {
        return axios.get('/data/cards')
            .then(res => res.data)
            .then(deck => dispatch(_loadDeck(deck)))
    };
};

const playerHit = ()=> {
    return (dispatch) => {
        dispatch(_playerHit());
    };
};

const placeBet = (bet)=> {
    return (dispatch)=> {
        dispatch(_placeBet(bet));
    };
};

const deal = ()=> {
    return (dispatch)=> {
        dispatch(_deal());
    }
};

const getTopCard = ()=> {
    return (dispatch)=> {
        dispatch(_getTopCard());
    }
}

const gameOver = (deck)=> {
    return (dispatch)=> {
        return axios.get('/data/cards')
            .then(res => res.data)
            .then(deck => dispatch(_gameOver(deck)));
    }
}

const playerLoses = ()=> {
    return (dispatch)=> {
        dispatch(_playerLoses());
    }
}

const playerWins = ()=> {
    return (dispatch)=> {
        dispatch(_playerWins());
    }
}

// export actions

export { loadDeck, playerHit, placeBet, deal, getTopCard, gameOver, playerLoses, playerWins };

