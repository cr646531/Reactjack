import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player';
import Dealer from './Dealer';
import Split from './Split';
import Chips from './Chips';

class Bet extends Component{
    constructor(){
        super();
        this.state = {
            bet: 0,
            displayBetSlider: true,
            displayPlayerAndUser: false,
            displayBlackjack: false,
            displayBetAlert: false,
            displayFundsAlert: false
        }
        this.deal = this.deal.bind(this);
        this.takeBets = this.takeBets.bind(this);
        this.checkBlackjack = this.checkBlackjack.bind(this);
        this.betOne = this.betOne.bind(this);
        this.betFive = this.betFive.bind(this);
        this.betTen = this.betTen.bind(this);
        this.betTwenty = this.betTwenty.bind(this);
        this.betFifty = this.betFifty.bind(this);
        this.betHundred = this.betHundred.bind(this);
        this.resetBet = this.resetBet.bind(this);
    }

    // passed to player component
    takeBets(){
        if(this.props.bankroll == 0){
            this.props.endGame();
        }
        this.setState({
            displayBetSlider: true,
            displayBlackjack: false,
            bet: 0
        })
        this.props.gameOver();
    }

    betOne(){ 
        if(this.state.bet + 1 > this.props.bankroll){
            this.setState({ displayFundsAlert: true })
        } else {
            this.setState({ displayBetAlert: false, displayFundsAlert: false, bet: this.state.bet + 1 }) 
        }
    };
    betFive(){ 
        if(this.state.bet + 5 > this.props.bankroll){
            this.setState({ displayFundsAlert: true })
        } else {
            this.setState({ displayBetAlert: false, displayFundsAlert: false, bet: this.state.bet + 5 }) 
        }
    };
    betTen(){ 
        if(this.state.bet + 10 > this.props.bankroll){
            this.setState({ displayFundsAlert: true })
        } else {
            this.setState({ displayBetAlert: false, displayFundsAlert: false, bet: this.state.bet + 10 }) 
        }
    };
    betTwenty(){ 
        if(this.state.bet + 20 > this.props.bankroll){
            this.setState({ displayFundsAlert: true })
        } else {
            this.setState({ displayBetAlert: false, displayFundsAlert: false, bet: this.state.bet + 20 }) 
        }
    };
    betFifty(){ 
        if(this.state.bet + 50 > this.props.bankroll){
            this.setState({ displayFundsAlert: true })
        } else {
            this.setState({ displayBetAlert: false, displayFundsAlert: false, bet: this.state.bet + 50 }) 
        } 
    };
    betHundred(){ 
        if(this.state.bet + 100 > this.props.bankroll){
            this.setState({ displayFundsAlert: true })
        } else {
            this.setState({ displayBetAlert: false, displayFundsAlert: false, bet: this.state.bet + 100 }) 
        }
    };

    resetBet(){
        this.setState({
            bet: 0
        });
    };

    checkBlackjack(){
        var deck = this.props.deck;

        if(deck[0].value + deck[1].value == 21){
            this.setState({ displayBetSlider: false, displayBlackjack: true })
            this.deal();
            this.props.blackjack();
        } else {
            this.deal();
        }
    }

    deal(){
        if(this.state.bet == 0){
            this.setState({ displayBetAlert: true });
            return;
        } else {
            this.setState({ displayFundsAlert: false, displayBetAlers: false })
        }

        this.setState({ displayBetSlider: false, displayPlayerAndDealer: true })

        var deck = this.props.deck;

        var playerHand = [];
        var playerTotal = 0;
        var playerNumAces = 0;

        // special case - player is dealt two Aces
        if(deck[0].rank == 'Ace' && deck[1].rank == 'Ace'){
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
        var bet = this.state.bet * 1;

        var displayDoubleDown = false;
        if(bet * 2 <= this.props.bankroll){
            displayDoubleDown = true;
        }

        var displaySplitButton = false;
        if(displayDoubleDown == true){
            if(playerHand[0].rank == playerHand[1].rank){
                displaySplitButton = true;
            }
        }

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
    }

    render(){
        return (
            <div className="container bg-light">
                <br />
                <div className="container py-2">
                    <div className="row align-items-center">
                        <div className="col">
                            <p className="h2 text-center">Bankroll: <span class="badge badge-pill badge-success">${this.props.bankroll - this.state.bet}</span></p>
                        </div>
                        <div className="col">
                            <p className="h2 text-center">Bet: <span class="badge badge-pill badge-warning">${this.state.bet}</span></p>
                        </div>
                    </div>
                </div>
                {
                    this.state.displayBetSlider ? (
                        <div>
                            <hr />
                            <div className="container py-2">
                                <Chips betOne={this.betOne} betFive={this.betFive} betTen={this.betTen} betTwenty={this.betTwenty} betFifty={this.betFifty} betHundred={this.betHundred} />
                                {
                                    this.state.displayBetAlert && (
                                        <div className="row-align-center pt-4">
                                            <div class="container-fluid">
                                                <div class="row">
                                                    <div class="col-md-10 col-md-offset-1">
                                                        <div class="alert alert-warning" role="alert">
                                                            <strong>You must bet at least $1</strong>
                                                        </div>
                                                    </div>

                                                 </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    this.state.displayFundsAlert && (
                                        <div className="row-align-center pt-4">
                                            <div class="container-fluid">
                                                <div class="row">
                                                    <div class="col-md-10 col-md-offset-1">
                                                        <div class="alert alert-warning" role="alert">
                                                            <strong>Insufficient funds!</strong>
                                                        </div>
                                                    </div>

                                                 </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <hr />
                                <br />
                                <div className="row align-items-center">
                                    <div className="col">
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.resetBet}>Reset</button>
                                    </div>
                                    <div className="col">
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.checkBlackjack}>Deal</button>
                                    </div>
                                    <div className="col">
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <hr />
                            <Dealer />
                            <hr />
                            {
                                this.props.displaySplit ? (
                                    <div>
                                        <Split takeBets={this.takeBets} />
                                    </div>
                                ) : (
                                    <div>
                                        <Player takeBets={this.takeBets} displayBlackjack={this.state.displayBlackjack} />
                                    </div>
                                )
                            }
                            {
                                this.state.displayBlackjack && (
                                    <div>
                                        <h3>Blackjack!</h3>
                                        <br />
                                        <button onClick={this.takeBets}>Play again?</button>
                                    </div>
                                )
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
        deck: state.deck,
        displaySplit: state.displaySplit
    }
}

import { deal, gameOver, blackjack } from '../store';

const mapDispatchToProps = (dispatch)=> {
    return {
        deal: (obj)=> dispatch(deal(obj)),
        gameOver: ()=> dispatch(gameOver()),
        blackjack: ()=> dispatch(blackjack())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bet);