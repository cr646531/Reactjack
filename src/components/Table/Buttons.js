import React, { Component } from 'react';
import { connect } from 'react-redux';

class Buttons extends Component {

    constructor(){
        super();
        this.doubleDown = this.doubleDown.bind(this);
    };

    doubleDown(){
        var playerTotal = this.props.playerTotal;
        var playerNumAces = this.props.playerNumAces;
        var deck = this.props.deck;

        var card = deck[0];
        if(card.rank == 'Ace'){ 
            playerNumAces++ 
        };

        deck = deck.slice(1);

        playerTotal += card.value;
        this.props.playerHit({ card: card, deck: deck, playerTotal: playerTotal, playerNumAces: playerNumAces });
        this.props.doubleBet();
        this.props.dealersTurn(playerTotal);
        console.log('double: ', playerTotal);
    }

    render(){
        return (
            <div>
                <div>
                    <button className="btn btn-success mx-2" onClick={this.props.hit}>Hit Me</button>
                    <button className="btn btn-secondary mx-2" onClick={this.props.dealersTurn}>Stay</button>
                    {
                        this.props.displayDoubleDown && (
                            <button className="btn btn-warning mx-2" onClick={this.doubleDown}>Double-down</button>
                        )
                    }
                    {
                        this.props.displaySplitButton && (
                            <button className="btn btn-info mx-2" onClick={this.props.split}>Split</button>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        playerTotal: state.playerTotal,
        playerNumAces: state.playerNumAces,
        deck: state.deck,
        displayDoubleDown: state.displayDoubleDown,
        displaySplitButton: state.displaySplitButton
    }
};


import { playerHit, doubleBet } from '../../store';

const mapDispatchToProps = (dispatch)=> {
    return {
        playerHit: (obj)=> dispatch(playerHit(obj)),
        doubleBet: ()=> dispatch(doubleBet()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);