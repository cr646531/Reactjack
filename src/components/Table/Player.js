import React, { Component } from 'react';
import { connect } from 'react-redux';

import Buttons from './Buttons';
import Split from './Split';


import Bust from './alerts/Bust';
import Win from './alerts/Win';
import Lose from './alerts/Lose';
import Push from './alerts/Push';
import Blackjack from './alerts/Blackjack';

import Card from './Card';



class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayButtons: true,
            displayBusted: false,
            displayWin: false,
            displayLose: false,
            displayPush: false,
            displaySplit: false
        }
        this.hit = this.hit.bind(this);
        this.reset = this.reset.bind(this);
        this.dealersTurn = this.dealersTurn.bind(this);
        this.checkWinConditions = this.checkWinConditions.bind(this);
        this.split = this.split.bind(this);
    }

    hit(){
        var playerTotal = this.props.playerTotal;
        var playerNumAces = this.props.playerNumAces;
        var deck = this.props.deck;

        var card = deck[0];
        if(card.rank == 'Ace'){ 
            playerNumAces++ 
        };

        deck = deck.slice(1);

        playerTotal += card.value;

        if(playerTotal == 21){
            this.setState({ displayButtons: false });
            this.props.playerHit({ card: card, deck: deck, playerTotal: playerTotal, playerNumAces: playerNumAces });
            this.dealersTurn()
            // dealer's turn
        } else if(playerTotal > 21){
            if(playerNumAces > 0){
                playerNumAces--;
                playerTotal -= 10;
                console.log('Ace');
                this.props.playerHit({ card: card, deck: deck, playerTotal: playerTotal, playerNumAces: playerNumAces })
            } else {
                this.setState({ displayButtons: false, displayBusted: true})
                this.props.playerHit({ card: card, deck: deck, playerTotal: playerTotal, playerNumAces: playerNumAces })
                this.props.playerLoses();
            }
        } else {
            this.props.playerHit({ card: card, deck: deck, playerTotal: playerTotal, playerNumAces: playerNumAces })
        }
    }

    dealersTurn(playerTotal){

        this.setState({ displayButtons: false });
        var deck = this.props.deck;

        var dealerTotal = this.props.dealerTotal;
        var dealerNumAces = this.props.dealerNumAces;
        
        var index = 0;
        while(dealerTotal < 17){
            if(deck[index].value == 11){
                dealerNumAces++;
            }
            dealerTotal += deck[index].value;
            if(dealerTotal > 21 && dealerNumAces > 0){
                dealerNumAces--;
                dealerTotal -= 10;
            }
            index++;
        }

        var cards = deck.slice(0, index);
        deck = deck.slice(index);

        this.props.dealersTurn({ cards: cards, dealerTotal: dealerTotal, dealerNumAces: dealerNumAces, deck: deck })

        // call a new function to check win conditions
        this.checkWinConditions(dealerTotal, playerTotal);
    }

    checkWinConditions(dealerTotal, playerTotal){
        if(playerTotal > 21){
            this.props.playerLoses();
            this.setState({ displayButtons: false, displayBusted: true })
        } else {
            playerTotal = this.props.playerTotal;
            if(dealerTotal > 21){
                this.props.playerWins();
                this.setState({ displayButtons: false, displayWin: true });
            } else if(dealerTotal > playerTotal){
                this.props.playerLoses();
                this.setState({ displayButtons: false, displayLose: true });
            } else if(dealerTotal < playerTotal){
                this.props.playerWins();
                this.setState({ displayButtons: false, displayWin: true });
            } else {
                this.props.push();
                this.setState({ displayButtons: false, displayPush: true });
            }
        }
    }

    reset(){
        this.setState({ displayButtons: true, displayBusted: false, displayWin: false, displayLose: false, displayPush: false });
        // take bets is passed down from the bet component
        this.props.takeBets();
    }

    split(){
        this.setState({ displaySplit: true });
    }

    render(){
        var count = 1000;

        return (
            <div>
                {
                    !this.state.displaySplit ? (
                        <div>
                            <h3>Player's Hand <span className="badge badge-pill badge-dark">{this.props.playerTotal}</span></h3>
                            <div className="container py-2">
                                <div className="row">
                                    {
                                        this.props.playerHand.map(card => {
                                            if(count === 1000){
                                                count += 1000;
                                            } else if(count === 2000){
                                                count += 1000;
                                            } else {
                                                count = 0;
                                            }
                                            return (
                                                <Card card={card} wait={count}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <br />
                            {
                                this.state.displayButtons && !this.props.displayBlackjack && (
                                    <Buttons hit={this.hit} dealersTurn={this.dealersTurn} split={this.split} />
                                )
                            }
                            { this.state.displayBusted && ( <Bust reset={this.reset} /> ) }
                            { this.state.displayWin && ( <Win reset={this.reset} /> ) }
                            { this.state.displayLose && ( <Lose reset={this.reset} /> ) }
                            { this.state.displayPush && ( <Push reset={this.reset} /> ) }
                            { this.props.blackjack && ( <Blackjack reset={this.reset} /> ) }
                        </div>
                    ) : (
                        <Split takeBets={this.props.takeBets} />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        playerHand: state.playerHand,
        playerTotal: state.playerTotal,
        playerNumAces: state.playerNumAces,
        dealerHand: state.dealerHand,
        dealerTotal: state.dealerTotal,
        dealerNumAces: state.dealerNumAces,
        deck: state.deck
    }
};

import { playerHit, playerLoses, playerWins, dealersTurn, push } from '../../store';

const mapDispatchToProps = (dispatch)=> {
    return {
        playerHit: (obj)=> dispatch(playerHit(obj)),
        dealersTurn: (obj)=> dispatch(dealersTurn(obj)),
        playerLoses: ()=> dispatch(playerLoses()),
        playerWins: ()=> dispatch(playerWins()),
        push: ()=> dispatch(push())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);