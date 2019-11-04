const HIT = 'HIT';
const RESET_HAND = 'RESET_HAND';

export const handReducer = ( state = [], action )=> {
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