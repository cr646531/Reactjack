import React from 'react';
import { connect } from 'react-redux';

const Dealer = ({ dealerHand, dealerTotal }) => {

    return (
        <div>

            <h1>Dealer's Hand ({dealerTotal}): </h1>
            <ul>
                {
                    dealerHand.map(card => (
                        <li key={card.id} >{card.rank} of {card.suit}</li>
                    ))
                }
            </ul>
        </div>
    )
};

const mapStateToProps = (state)=> {
    return {
        dealerHand: state.dealerHand,
        dealerTotal: state.dealerTotal
    }
};

import { playerHit } from '../store';

// const mapDispatchToProps = (dispatch)=> {
//     return {
//         playerHit: ()=> dispatch(playerHit())
//     };
// };

export default connect(mapStateToProps)(Dealer);