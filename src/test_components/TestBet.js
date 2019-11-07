import React, { Component } from 'react';
import { connect } from 'react-redux';

import TestPlayer from './TestPlayer';
import TestDealer from './TestDealer';

class Bet extends Component{
    constructor(){
        super();
        this.state = {
            bet: 0,
            displayBetSlider: true
        }
        this.toggleBet = this.toggleBet.bind(this);
        this.deal = this.deal.bind(this);
        this.takeBets = this.takeBets.bind(this);
    }

    // passed to player component
    takeBets(){
        this.setState({
            displayBetSlider: true,
            bet: 0
        })
    }

    toggleBet(event){
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    deal(){
        this.setState({ displayBetSlider: false })

        var deck = this.props.deck;
        var bet = this.state.bet * 1;

        var playerHand = [];
        var playerTotal = 0;
        var playerNumAces = 0;

        // special case - player is dealt two Aces
        if(deck[0].rank == 'Ace' && deck[0].rank == 'Ace'){
            playerTotal = 12;
            playerNumAces = 1;
        } else if(deck[0].rank == 'Ace' || deck[1].rank == 'Ace') {
            playerTotal = deck[0].value + deck[1].value;
            playerNumAces = 1;
        } else {
            playerTotal = deck[0].value + deck[1].value;
            playerNumAces = 0;
        }

        var dealerHand = [];
        var dealerTotal = 0;
        var dealerNumAces = 0;

        if(deck[2].rank == 'Ace'){
            dealerNumAces = 1;
        }
        dealerTotal = deck[2].value;

        playerHand = deck.slice(0, 2);
        dealerHand = deck.slice(2, 3);
        deck = deck.slice(3);

        this.props.deal({
            playerHand: playerHand,
            playerTotal: playerTotal,
            playerNumAces: playerNumAces,
            dealerHand: dealerHand,
            dealerTotal: dealerTotal,
            dealerNumAces: dealerNumAces,
            deck: deck,
            bet: bet
        });
    }

    render(){
        return (
            <div>
                <h1>Bankroll: {this.props.bankroll}</h1>
                <h1>Bet: {this.state.bet}</h1>
                <br />
                {
                    this.state.displayBetSlider ? (
                        <div className="slidecontainer">
                            <form >
                                <input type="range" min="1" max={this.props.bankroll} name="bet" default="1" onChange={this.toggleBet}/>
                            </form>
                            <button onClick={this.deal}>Deal</button>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <hr />
                            <TestDealer />
                            <br />
                            <hr />
                            <TestPlayer takeBets={this.takeBets} />
                        </div>
                    )
                }
                <hr />
            </div>
        )
    }


}


const mapStateToProps = (state) => {
    return {
        bet: state.bet,
        bankroll: state.bankroll,
        deck: state.deck
    }
}

import { deal } from '../test_store';

const mapDispatchToProps = (dispatch)=> {
    return {
        deal: (obj)=> dispatch(deal(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bet);