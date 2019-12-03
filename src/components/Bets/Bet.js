import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from '../Table/Player';
import Dealer from '../Table/Dealer';

import Chips from './Chips';
import Buttons from './Buttons';
import Minimum from './alerts/Minimum';
import Funds from './alerts/Funds';
import Blackjack from '../Table/alerts/Blackjack';

var style = {
    height: "150%",
    backgroundSize: "cover",
    backgroundImage: "url('felt.jpg')",
    backgroundRepeat: "repeat",
}


class Bet extends Component{
    constructor(){
        super();
        this.state = {
            bet: 0,
            displayChips: true,
            displayPlayerAndUser: false,
            displayBlackjack: false,
            displayBetAlert: false,
            displayFundsAlert: false
        }
        this.deal = this.deal.bind(this);
        this.takeBets = this.takeBets.bind(this);
        this.bet = this.bet.bind(this);
        this.resetBet = this.resetBet.bind(this);
    }

    // passed to "Player" component
    takeBets(){
        if(this.props.bankroll == 0){
            this.props.endGame();
        }
        this.setState({
            displayChips: true,
            displayBlackjack: false,
            bet: 0
        })
        this.props.gameOver();
    }

    bet(amount){
        if(this.state.bet + amount > this.props.bankroll){
            this.setState({ displayFundsAlert: true })
        } else {
            this.setState({ displayBetAlert: false, displayFundsAlert: false, bet: this.state.bet + amount }) 
        }
    }

    resetBet(){
        this.setState({ bet: 0, displayFundsAlert: false, displayBetAlert: false });
    };

    deal(){
        // check to see if player placed minimum bet
        if(this.state.bet == 0){
            this.setState({ displayBetAlert: true });
            return;
        } else {
            var bet = this.state.bet * 1;
        }

        // hide chips and display 'Player' and 'Dealer' components
        this.setState({ displayFundsAlert: false, displayBetAlerts: false, displayChips: false, displayPlayerAndDealer: true })

        var deck = this.props.deck;
        var playerHand = [];
        var playerTotal = 0;
        var playerNumAces = 0;
        var dealerHand = [];
        var dealerTotal = 0;
        var dealerNumAces = 0;

        // deal the cards
        playerHand = deck.slice(0, 2);
        dealerHand = deck.slice(2, 3);
        deck = deck.slice(3);

        // calculate player's total, and record how many aces were drawn
        if(playerHand[0].rank == 'Ace' && playerHand[1].rank == 'Ace'){
            playerTotal = 12;
            playerNumAces = 1;
        } else if(playerHand[0].rank == 'Ace' || playerHand[1].rank == 'Ace') {
            playerTotal = playerHand[0].value + playerHand[1].value;
            playerNumAces = 1;
        } else {
            playerTotal = playerHand[0].value + playerHand[1].value;
            playerNumAces = 0;
        }

        // calculate dealer's total, and record how many aces were drawn
        if(dealerHand[0].rank == 'Ace'){
            dealerNumAces = 1;
        }
        dealerTotal = dealerHand[0].value;


        // if the player can afford to double-down, display the 'double-down' button
        var displayDoubleDown = false;
        if(bet * 2 <= this.props.bankroll){
            displayDoubleDown = true;
        }

        // if the player was dealt two-of-a-kind, display the 'split' button
        var displaySplitButton = false;
        if(displayDoubleDown == true){
            if(playerHand[0].rank == playerHand[1].rank){
                displaySplitButton = true;
            }
        }

        // update the game state
        this.props.deal({
            playerHand: playerHand,
            playerTotal: playerTotal,
            playerNumAces: playerNumAces,
            dealerHand: dealerHand,
            dealerTotal: dealerTotal,
            dealerNumAces: dealerNumAces,
            deck: deck,
            bet: bet,
            displayDoubleDown: displayDoubleDown,
            displaySplitButton: displaySplitButton
        });

        // if the player was dealt a blackjack, display the 'blackjack' message and update the game state
        if(playerTotal == 21){
            this.setState({ displayChips: false, displayBlackjack: true })
            this.props.blackjack();
        }
    }

    render(){
        return (
            <div id="main" style={style} className="container">
                <br />
                <div className="container py-2">
                    <div className="row align-items-center">
                        <div className="col">
                            <p className="h3 text-center text-white">Bankroll: <span className="badge badge-pill badge-success">${this.props.bankroll - this.state.bet}</span></p>
                        </div>
                        <div className="col">
                            <p className="h3 text-center text-white">Bet: <span className="badge badge-pill badge-warning">${this.state.bet}</span></p>
                        </div>
                    </div>
                </div>
                {
                    this.state.displayChips ? (
                        <div>
                            <hr />
                            <div className="container py-2">
                                <Chips bet={this.bet} wait={500} />
                                { this.state.displayBetAlert && ( <Minimum /> ) }
                                { this.state.displayFundsAlert && ( <Funds /> ) }
                                <hr />
                                <br />
                                <Buttons resetBet={this.resetBet} deal={this.deal} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <hr />
                            <Dealer />
                            <hr />
                            {
                                <Player takeBets={this.takeBets} displayBlackjack={this.state.displayBlackjack}/>
                            }
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

import { deal, gameOver, blackjack } from '../../store';

const mapDispatchToProps = (dispatch)=> {
    return {
        deal: (obj)=> dispatch(deal(obj)),
        gameOver: ()=> dispatch(gameOver()),
        blackjack: ()=> dispatch(blackjack())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bet);