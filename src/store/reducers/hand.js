const initialState = {
    playerHand: [],
    dealerHand: [],
    playerTotal: 0,
    dealerTotal: 0
};

export const handReducer = ( state = initialState, action )=> {
    switch(action.type){
        case 'PLAYER_HIT':
            return Object.assign({}, state, {
                playerHand: [...state.playerHand, action.card]
            });
    }

    return state;
}