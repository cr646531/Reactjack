import React, { Component } from 'react';
import { connect } from 'react-redux';

import Bust from './alerts/Bust';
import Win from './alerts/Win';
import Lose from './alerts/Lose';
import Push from './alerts/Push';
// import Blackjack from './alerts/Blackjack';
import Card from './Card';


import styled, { keyframes } from 'styled-components';
import { bounceIn } from 'react-animations';

const bounceAnimation = keyframes`${bounceIn}`;
const BounceDiv = styled.div`
    animation: infinite 5s ${bounceAnimation};
`;

class Split extends Component{
    constructor(){
        super();
        this.state = {
            displayOpening: true,
            displayButtonsOne: true,
            displayButtonsTwo: false,
            displayBustedOne: false,
            displayBustedTwo: false,
            displayStayTwo: false,

            displayWinOne: false,
            displayWinTwo: false,
            displayLoseOne: false,
            displayLoseTwo: false,
            displayPushOne: false,
            displayPushTwo: false,
            displayPlayAgain: false,

            handOne: [],
            acesOne: 0,
            totalOne: 0,

            handTwo: [],
            acesTwo: 0,
            totalTwo: 0,

            deck: []
        };
        this.setup = this.setup.bind(this);
        this.oneHit = this.oneHit.bind(this);
        this.twoHit = this.twoHit.bind(this);
        this.oneStay = this.oneStay.bind(this);
        this.twoStay = this.twoStay.bind(this);
        this.dealersTurn = this.dealersTurn.bind(this);
        this.checkWinConditions = this.checkWinConditions.bind(this);
        this.reset = this.reset.bind(this);
    }

    setup(){
        var deck = this.props.deck;
        var topCard = deck.pop();

        var handOne = this.props.playerHand.slice(0, 1);
        handOne.push(topCard);
        var totalOne = handOne[0].value + handOne[1].value;
        var acesOne = 0;
        if(handOne[0].rank == 'Ace'){
            acesOne++;
        }
        if(handOne[1].rank == 'Ace'){
            acesOne++;
        }

        if(totalOne > 21 && acesOne > 0){
            totalOne -= 10;
            acesOne--;
        }

        var handTwo = this.props.playerHand.slice(1);
        var totalTwo = handTwo[0].value;
        var acesTwo = 0;
        if(handTwo[0].rank == 'Ace'){
            acesTwo = 1;
        }

        this.setState({
            handOne: handOne,
            acesOne: acesOne,
            totalOne: totalOne,
            handTwo: handTwo,
            acesTwo: acesTwo,
            totalTwo: totalTwo,
            deck: deck,
            displayOpening: false
        });
    }

    oneHit(){
        var { deck, handOne, acesOne, totalOne } = this.state;

        var topCard = deck.pop();
        handOne.push(topCard);

        if(topCard.rank == 'Ace'){
            acesOne++;
        }

        totalOne += topCard.value;
        if(totalOne > 21 && acesOne > 0){
            totalOne -= 10;
            acesOne--;
        }

        if(totalOne > 21){
            this.setState({
                displayButtonsOne: false,
                displayBustedOne: true,
                displayButtonsTwo: true
            });
        }

        this.setState({
            deck: deck,
            handOne: handOne,
            acesOne: acesOne,
            totalOne: totalOne
        });
    }

    twoHit(){
        var { deck, handTwo, acesTwo, totalTwo } = this.state;

        var topCard = deck.pop();
        handTwo.push(topCard);

        if(topCard.rank == 'Ace'){
            acesOne++;
        }

        totalTwo += topCard.value;
        if(totalTwo > 21 && acesTwo > 0){
            totalTwo -= 10;
            acesTwo--;
        }

        if(totalTwo > 21){
            this.setState({
                displayButtonsTwo: false,
                displayBustedTwo: true
            });
        }

        this.setState({
            deck: deck,
            handTwo: handTwo,
            acesTwo: acesTwo,
            totalTwo: totalTwo,
            displayStayTwo: true
        });
    }

    oneStay(){
        this.setState({
            displayButtonsOne: false,
            displayButtonsTwo: true
        });
    }

    twoStay(){
        this.setState({
            displayButtonsTwo: false
        });
        this.dealersTurn();
    }

    dealersTurn(){
        var deck = this.state.deck;

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
        this.checkWinConditions(dealerTotal);
    }

    checkWinConditions(dealerTotal){
        var bet = this.props.bet;
        var winnings = 0;
        var { totalOne, totalTwo } = this.state;

        if(totalOne <= 21){
            if(dealerTotal > 21){
                this.setState({
                    displayWinOne: true
                });
                winnings += bet;
            } else if(dealerTotal == totalOne){
                this.setState({
                    displayPushOne: true
                });
            } else if(dealerTotal > totalOne){
                this.setState({
                    displayLoseOne: true
                })
                winnings -= bet;
            } else {
                this.setState({
                    displayWinOne: true
                })
                winnings += bet;
            }
        } else {
            winnings -= bet;
        }

        if(totalTwo <= 21){
            if(dealerTotal > 21){
                this.setState({
                    displayWinTwo: true
                });
                winnings += bet;
            } else if(dealerTotal == totalTwo){
                this.setState({
                    displayPushTwo: true
                });
            } else if(dealerTotal > totalTwo){
                this.setState({
                    displayLoseTwo: true
                })
                winnings -= bet;
            } else {
                this.setState({
                    displayWinTwo: true
                })
                winnings += bet;
            }
        } else {
            winnings -= bet;
        }

        this.setState({
            displayPlayAgain: true
        })

        this.props.resolveSplit(winnings);
        
        if(this.state.displayBustedOne && this.state.displayBustedTwo){
            this.reset();
        }
    }

    reset(){
        this.setState({
            displayOpening: true,
            displayButtonsOne: true,
            displayButtonsTwo: false,
            displayBustedOne: false,
            displayBustedTwo: false,
            displayStayTwo: false,

            displayWinOne: false,
            displayWinTwo: false,
            displayLoseOne: false,
            displayLoseTwo: false,
            displayPushOne: false,
            displayPushTwo: false,
            displayPlayAgain: false,

            handOne: [],
            acesOne: 0,
            totalOne: 0,

            handTwo: [],
            acesTwo: 0,
            totalTwo: 0,

            deck: []
        });
        this.props.takeBets();
    }

    render(){
        return (
            <div>
                {
                    this.state.displayOpening && (
                        <div className="container">
                            <div className="container py-2">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h3 className="text-white">Hand <span className="badge badge-pill badge-dark">{this.props.playerHand[0].value}</span></h3>
                                        <div className="container py-2">
                                            <div className="row">
                                                {
                                                    <img className="px-1" src={`cards/${this.props.playerHand[0].rank}${this.props.playerHand[0].suit}.png`} />
                                                }
                                            </div>
                                            <br />
                                            <div className="row">
                                                <button className="btn btn-success mx-2" onClick={this.setup}>Hit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <h3 className="text-white">Hand <span className="badge badge-pill badge-dark">{this.props.playerHand[1].value}</span></h3>
                                        <div className="container py-2">
                                            <div className="row">
                                                {
                                                    <img className="px-1" src={`cards/${this.props.playerHand[1].rank}${this.props.playerHand[1].suit}.png`} />
                                                }
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }  

                {
                    !this.state.displayOpening && (
                        <div>
                            <div className="container">
                                <div className="container py-2">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="text-white">Hand <span className="badge badge-pill badge-dark">{this.state.totalOne}</span></h3>
                                            <div className="container py-2">
                                                <div className="row">
                                                    {

                                                        this.state.handOne.map(card => (
                                                            // <img key={`${card.rank}${card.suit}`} className="px-1" src={`cards/${card.rank}${card.suit}.png`} />
                                                            <Card key={`${card.rank}${card.suit}`} card={card} wait={0}/>
                                                        ))
                                                    }
                                                </div>
                                                <br />
                                                <div className="row">
                                                    {
                                                        this.state.displayButtonsOne && (
                                                            <div>
                                                                <button className="btn btn-success mx-2" onClick={this.oneHit}>Hit</button>
                                                                <button className="btn btn-secondary mx-2" onClick={this.oneStay}>Stay</button>
                                                            </div>
                                                        )
                                                    }
                                                    <BounceDiv>
                                                        { this.state.displayBustedOne && ( <Bust reset={this.reset} displayPlayAgain={false} /> ) }
                                                        { this.state.displayWinOne && ( <Win reset={this.reset} displayPlayAgain={false} /> ) }
                                                        { this.state.displayLoseOne && ( <Lose reset={this.reset} displayPlayAgain={false} /> ) }
                                                        { this.state.displayPushOne && ( <Push reset={this.reset} displayPlayAgain={false} /> ) }
                                                    </BounceDiv>
                                                </div> 
                                            </div>
                                        </div>

                                        <div className="col">
                                            <h3 className="text-white">Hand <span className="badge badge-pill badge-dark">{this.state.totalTwo}</span></h3>
                                            <div className="container py-2">
                                                <div className="row">
                                                    {
                                                        this.state.handTwo.map(card => (
                                                            // <img key={`${card.rank}${card.suit}`} className="px-1" src={`cards/${card.rank}${card.suit}.png`} />
                                                            <Card key={`${card.rank}${card.suit}`} card={card} wait={0}/>
                                                        ))
                                                    }
                                                </div>
                                                <br />
                                                <div className="row">
                                                    {
                                                        this.state.displayButtonsTwo && (
                                                            <div>
                                                                <button className="btn btn-success mx-2" onClick={this.twoHit}>Hit</button>
                                                                {
                                                                    this.state.displayStayTwo && (
                                                                        <button className="btn btn-secondary mx-2" onClick={this.twoStay}>Stay</button>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    <BounceDiv>
                                                        { this.state.displayBustedTwo && ( <Bust reset={this.reset} displayPlayAgain={false} /> ) }
                                                        { this.state.displayWinTwo && ( <Win reset={this.reset} displayPlayAgain={false} /> ) }
                                                        { this.state.displayLoseTwo && ( <Lose reset={this.reset} displayPlayAgain={false} /> ) }
                                                        { this.state.displayPushTwo && ( <Push reset={this.reset} displayPlayAgain={false} /> ) }
                                                    </BounceDiv>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }  
                { 
                    this.state.displayBustedOne && this.state.displayBustedTwo && (
                        <button className="btn btn-primary" onClick={this.checkWinConditions}>Play again?</button>
                    )
                }
                {
                    this.state.displayPlayAgain && (
                        <button className="btn btn-primary" onClick={this.reset} >Play again?</button>
                    )
                }


            </div>
        )
    }

}

const mapStateToProps = (state)=> {
    return {
        playerHand: state.playerHand,
        bet: state.bet,
        deck: state.deck,
        dealerTotal: state.dealerTotal,
        dealerNumAces: state.dealerNumAces
    }
};

import { dealersTurn, resolveSplit } from '../../store';

const mapDispatchToProps = (dispatch)=> {
    return {
        dealersTurn: (obj)=> dispatch(dealersTurn(obj)),
        resolveSplit: (winnings)=> dispatch(resolveSplit(winnings))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Split);