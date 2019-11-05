const initialState = {
    deck: [],
    topCard: {}
}

export const deckReducer = (state = initialState, action)=> {
    switch(action.type){
        case 'LOAD_DECK':
            return Object.assign({}, state, {
                deck: action.deck
            })
        case 'GET_TOP_CARD':
            return Object.assign({}, state, {
                topCard: state.deck[0]
            })
        case 'REMOVE_TOP_CARD':
            return Object.assign({}, state, {
                deck: [...state.deck.slice(1)]
            })
        default:
            return state;
    };
        

};