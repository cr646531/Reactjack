import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player';
import Dealer from './Dealer';

class Bet extends Component{
    constructor(){
        super();
        this.state = {
            bet: 0,
            displayBetSlider: true,
            displayPlayerAndUser: false,
            displayBlackjack: false
        }
        // this.toggleBet = this.toggleBet.bind(this);
        this.deal = this.deal.bind(this);
        this.takeBets = this.takeBets.bind(this);
        this.checkBlackjack = this.checkBlackjack.bind(this);
        this.betOne = this.betOne.bind(this);
        this.betFive = this.betFive.bind(this);
        this.betTen = this.betTen.bind(this);
        this.betTwenty = this.betTwenty.bind(this);
        this.betFifty = this.betFifty.bind(this);
        this.betHundred = this.betHundred.bind(this);
    }

    // passed to player component
    takeBets(){
        this.setState({
            displayBetSlider: true,
            displayBlackjack: false,
            bet: 0
        })
        this.props.gameOver();
    }

    // toggleBet(event){
    //     event.preventDefault();
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // }

    betOne(){ 
        if(this.state.bet + 1 > this.props.bankroll){
            console.log('Insufficient Funds!')
        } else {
            this.setState({ bet: this.state.bet + 1 }) 
        }
    };
    betFive(){ 
        if(this.state.bet + 5 > this.props.bankroll){
            console.log('Insufficient Funds!')
        } else {
            this.setState({ bet: this.state.bet + 5 }) 
        }
    };
    betTen(){ 
        if(this.state.bet + 10 > this.props.bankroll){
            console.log('Insufficient Funds!')
        } else {
            this.setState({ bet: this.state.bet + 10 }) 
        }
    };
    betTwenty(){ 
        if(this.state.bet + 20 > this.props.bankroll){
            console.log('Insufficient Funds!')
        } else {
            this.setState({ bet: this.state.bet + 20 }) 
        }
    };
    betFifty(){ 
        if(this.state.bet + 50 > this.props.bankroll){
            console.log('Insufficient Funds!')
        } else {
            this.setState({ bet: this.state.bet + 50 }) 
        } 
    };
    betHundred(){ 
        if(this.state.bet + 100 > this.props.bet){
            console.log('Insufficient Funds!')
        } else {
            this.setState({ bet: this.state.bet + 100 }) 
        }
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
            <div className="container bg-light">
                <br />
                <div className="container py-4">
                    <div className="row align-items-center">
                        <div className="col">
                            <p className="h1 text-center">Bankroll: ${this.props.bankroll}</p>
                        </div>
                        <div className="col">
                            <p className="h1 text-center">Bet: ${this.state.bet}</p>
                        </div>
                    </div>
                </div>
                {
                    this.state.displayBetSlider ? (
                        // <div className="slidecontainer">
                        //     <form >
                        //         <input type="range" min="1" max={this.props.bankroll} name="bet" default="1" onChange={this.toggleBet}/>
                        //     </form>
                        //     <button className="btn btn-secondary" onClick={this.checkBlackjack}>Deal</button>
                        // </div>
                        <div>
                            <div className="container py-4">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <img src={'one_chip.png'} onClick={this.betOne} />
                                    </div>
                                    <div className="col">
                                        <img src={'five_chip.png'} onClick={this.betFive} />
                                    </div>
                                    <div className="col">
                                        <img src={'ten_chip.png'} onClick={this.betTen} />
                                    </div>
                                    <div className="col">
                                        <img src={'twenty_chip.png'} onClick={this.betTwenty} />
                                    </div>
                                    <div className="col">
                                        <img src={'fifty_chip.png'} onClick={this.betFifty} />
                                    </div>
                                    <div className="col">
                                        <img src={'hundred_chip.png'} onClick={this.betHundred} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <button className="btn btn-secondary" onClick={this.checkBlackjack}>Deal</button>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <hr />
                            <Dealer />
                            <br />
                            <hr />
                            <Player takeBets={this.takeBets} displayBlackjack={this.state.displayBlackjack} />
                            {
                                this.state.displayBlackjack && (
                                    <div>
                                        <h1>Blackjack!</h1>
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
        deck: state.deck
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