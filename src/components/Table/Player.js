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

import styled, { keyframes } from 'styled-components';
import { bounceIn } from 'react-animations';

const bounceAnimation = keyframes`${bounceIn}`;
const BounceDiv = styled.div`
    animation: infinite 5s ${bounceAnimation};
`;


class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayButtons: true,
            displayBusted: false,
            displayWin: false,
            displayLose: false,
            displayPush: false,
            displaySplit: false,
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
            this.dealersTurn(playerTotal)
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

    dealersTurn(total){

        if(typeof total === "number"){
            var playerTotal = total;    
        } else {
            var playerTotal = this.props.playerTotal;
        }

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
        var count = 1400;

        return (
            <div>
                {
                    !this.state.displaySplit ? (
                        <div>
                            <h3 className="text-white">Player's Hand <span className="badge badge-pill badge-dark">{this.props.playerTotal}</span></h3>
                            <br />
                            <div className="container py-2">
                                    <div className="row">
                                        <div className="col-lg-auto col-md-auto col-sm-auto">
                                            <div className="row">
                                                {
                                                    this.props.playerHand.map(card => {
                                                        if(count === 1400){
                                                            count += 700;
                                                        } else if(count === 2100){
                                                            count += 700;
                                                        } else {
                                                            count = 0;
                                                        }
                                                        return (
                                                            <Card key={`${card.rank}${card.suit}`} card={card} wait={count}/>
                                                        )
                                                    })
                                                }
                                                <br />
                                                <br />
                                            </div>
                                            <div className="row">
                                                <br />
                                            </div>
                                            <div className="row">         
                                                {
                                                    this.state.displayButtons && !this.props.displayBlackjack && (
                                                        <Buttons hit={this.hit} dealersTurn={this.dealersTurn} split={this.split} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-0">
                                        </div>
                                        <div className="col-lg-auto col-md-auto col-sm-auto">
                                            <div className="row">
                                                <BounceDiv>
                                                    { this.state.displayBusted && ( <Bust reset={this.reset} displayPlayAgain={true} /> ) }
                                                    { this.state.displayWin && ( <Win reset={this.reset} displayPlayAgain={true} /> ) }
                                                    { this.state.displayLose && ( <Lose reset={this.reset} displayPlayAgain={true} /> ) }
                                                    { this.state.displayPush && ( <Push reset={this.reset} displayPlayAgain={true} /> ) }
                                                    { this.props.displayBlackjack && ( <Blackjack reset={this.reset} displayPlayAgain={true} /> ) }
                                                </BounceDiv>
                                            </div>
                                        </div>
                                    </div>

                        
                            </div>
                            <br />
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