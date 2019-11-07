import React, { Component} from 'react';
import { connect } from 'react-redux';

class Dealer extends Component{

    dealerTurn(){
        this.props.dealerHit();
        var total = this.props.dealerTotal;

        if(total < 16){
            this.dealerTurn();
        } else if(total > 21) {
            this.props.playerWins();
        } else if(total == 21) {
            if(playerTotal == 21){
                //push
            } else {
                this.props.playerLoses();
            }
        }
    }

    render(){
        return (
            <div>
                <h1>Dealer's Hand ({this.props.dealerTotal}): </h1>
                <ul>
                    {
                        this.props.dealerHand.map(card => (
                            <li key={card.id} >{card.rank} of {card.suit}</li>
                        ))
                    }
                </ul>
            </div>
        );
    };  
};

const mapStateToProps = (state)=> {
    return {
        dealerHand: state.dealerHand,
        dealerTotal: state.dealerTotal,
        playerTotal: state.playerTotal
    }
};

import { dealersTurn, playerWins, playerLoses } from '../test_store';

const mapDispatchToProps = (dispatch)=> {
    return {
        dealersTurn: ()=> dispatch(dealersTurn()),
        playerWins: ()=> dispatch(playerWins()),
        playerLoses: ()=> dispatch(playerLoses())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);