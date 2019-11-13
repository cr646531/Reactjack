// import packages
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import think from 'redux-thunk';
import { logger } from 'redux-logger';
import axios from 'axios';

const initialState = {
    deck: [],

    bet: 0,
    bankroll: 100,

    playerHand: [],
    playerTotal: 0,
    playerNumAces: 0,

    dealerHand: [],
    dealerTotal: 0,
    dealerNumAces: 0,

    displayFaceDownCard: true,
    displayDoubleDown: false,
    displaySplitButton: false
    // displaySplit: false

}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case 'LOAD_DECK':
            return Object.assign({}, state, {
                deck: action.deck
            })
        case 'LOAD_RIGGED_DECK':
            return Object.assign({}, state, {
                deck: action.deck
            })
        case 'DEAL':
            return Object.assign({}, state, {
                playerHand: action.obj.playerHand,
                playerTotal: action.obj.playerTotal,
                playerNumAces: action.obj.playerNumAces,
                dealerHand: action.obj.dealerHand,
                dealerTotal: action.obj.dealerTotal,
                dealerNumAces: action.obj.dealerNumAces,
                deck: action.obj.deck,
                bet: action.obj.bet,
                displayDoubleDown: action.obj.displayDoubleDown,
                displaySplitButton: action.obj.displaySplitButton
            });
        case 'PLAYER_HIT':
            return Object.assign({}, state, {
                playerHand: [...state.playerHand, action.obj.card],
                playerTotal: action.obj.playerTotal,
                playerNumAces: action.obj.playerNumAces,
                deck: action.obj.deck
            });
        case 'DEALERS_TURN':
            return Object.assign({}, state, {
                dealerHand: [...state.dealerHand].concat(action.obj.cards),
                dealerTotal: action.obj.dealerTotal,
                dealerNumAces: action.obj.dealerNumAces,
                deck: action.obj.deck,
                displayFaceDownCard: false
            });
        case 'GAME_OVER':
            return Object.assign({}, state, {
                playerHand: [],
                playerTotal: 0,
                playerNumAces: 0,
                dealerHand: [],
                dealerTotal: 0,
                dealerNumAces: 0,
                deck: action.deck,
                displayFaceDownCard: true,
                displaySplitButton: false,
                displaySplit: false
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
        case 'PUSH':
            return Object.assign({}, state, {
                bet: 0
            });
        case 'BLACKJACK':
            return Object.assign({}, state, {
                bankroll: state.bankroll + (Math.ceil(state.bet * 1.5)),
                bet: 0
            });
        case 'DOUBLE_BET':
            return Object.assign({}, state, {
                bet: state.bet * 2
            });
        // case 'SPLIT':
        //     return Object.assign({}, state, {
        //         displaySplit: true
        //     });
        case 'RESOLVE_SPLIT':
            return Object.assign({}, state, {
                bankroll: state.bankroll + action.winnings,
                bet: 0
            })
        default:
            return state;
    };
        

};


// create store
export default createStore(reducer, applyMiddleware(think, logger));


const _loadDeck = (deck)=> ({
    type: 'LOAD_DECK',
    deck
});

const _loadRiggedDeck = (deck)=> ({
    type: 'LOAD_RIGGED_DECK',
    deck
})

const _deal = (obj)=> ({
    type: 'DEAL',
    obj
});

const _playerHit = (obj)=> ({
    type: 'PLAYER_HIT',
    obj
});

const _placeBet = (bet)=> ({
    type: 'PLACE_BET',
    bet
});

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

const _dealersTurn = (obj)=> ({
    type: 'DEALERS_TURN',
    obj
});

const _push = ()=> ({
    type: 'PUSH'
});

const _blackjack = ()=> ({
    type: 'BLACKJACK'
});

const _doubleBet = ()=> ({
    type: 'DOUBLE_BET'
});

// const _split = ()=> ({
//     type: 'SPLIT'
// });

const _resolveSplit = (winnings)=> ({
    type: 'RESOLVE_SPLIT',
    winnings
})

// action dispatch


const loadDeck = ()=> {
    return (dispatch)=> {
        return axios.get('/data/cards')
            .then(res => res.data)
            .then(deck => dispatch(_loadDeck(deck)))
    };
};

const loadRiggedDeck = ()=> {
    return (dispatch)=> {
        return axios.get('/data/rigged')
            .then(res => res.data)
            .then(deck => dispatch(_loadRiggedDeck(deck)))
    };
};

const loadRiggedSplit = ()=> {
    return (dispatch)=> {
        return axios.get('/data/rigSplit')
            .then(res => res.data)
            .then(deck => dispatch(_loadDeck(deck)))
    }
}

const deal = (obj)=> {
    return (dispatch)=> {
        dispatch(_deal(obj));
    }
};

const playerHit = (obj)=> {
    return (dispatch) => {
        dispatch(_playerHit(obj));
    };
};

const placeBet = (bet)=> {
    return (dispatch)=> {
        dispatch(_placeBet(bet));
    };
};

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

const dealersTurn = (obj)=> {
    return (dispatch)=> {
        dispatch(_dealersTurn(obj));
    }
}

const push = ()=> {
    return (dispatch)=> {
        dispatch(_push());
    }
}

const blackjack = ()=> {
    return (dispatch)=> {
        dispatch(_blackjack());
    }
}

const doubleBet = ()=> {
    return (dispatch)=> {
        dispatch(_doubleBet());
    }
}

// const split = ()=> {
//     return (dispatch)=> {
//         dispatch(_split());
//     }
// }

const resolveSplit = (winnings)=> {
    return (dispatch)=> {
        dispatch(_resolveSplit(winnings));
    }
}

// export actions

export { loadDeck, loadRiggedDeck, loadRiggedSplit, playerHit, placeBet, deal, gameOver, playerLoses, playerWins, dealersTurn, push, blackjack, doubleBet, resolveSplit };

