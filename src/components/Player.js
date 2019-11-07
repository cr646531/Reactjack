import React, { Component } from 'react';
import { connect } from 'react-redux';


class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayButtons: true,
            displayBusted: false,
            displayWin: false,
            displayLose: false,
            displayPush: false
        }
        this.totalCheck = this.totalCheck.bind(this);
        this.reset = this.reset.bind(this);
        this.dealerTurn = this.dealerTurn.bind(this);
    }
    

    totalCheck(){
        var nextCard = this.props.topCard;
        var numAces = this.props.numAces;
        var ace = 0;

        if(nextCard.value == 11){
            ace = 1;
        }

        if(this.props.playerTotal + nextCard.value == 21){
            this.setState({ displayButtons: false });
            this.props.playerHit({ card: nextCard, ace: ace});
            this.dealerTurn();
        } else if(this.props.playerTotal + nextCard.value > 21){
            if(ace == 1){
                ace = 0;
                nextCard.value = 1;
            } else if(numAces > 0) {
                ace = -1;
                nextCard.value -= 10;
            }
            this.setState({ displayButtons: false, displayBusted: true });
            this.props.playerHit({ card: nextCard, ace: ace});
            this.props.playerLoses();
        } else {
            this.props.playerHit({ card: nextCard, ace: ace});
        }
    }

    dealerTurn(){
        let deck = this.props.deck;
        var total = this.props.dealerTotal;
        var aces = 0;

        var index = 0;
        while(total < 17){
            if(deck[index].value == 11){
                aces++;
            }
            total += deck[index].value;
            if(total > 21 && aces > 0){
                aces--;
                total -= 10;
            }
            index++;
        }

        var cards = deck.slice(0, index);
        var sum = 0;
        aces = 0;
        for(var i = 0; i < cards.length; i++){
            if(cards[i].value == 11){
                aces++;
            }
            sum += cards[i].value;
            if(sum > 21 && aces > 0){
                aces--;
                sum -= 10;
            }
        }

        if(this.props.dealerTotal + sum > 21){
            this.props.playerWins();
            this.setState({ displayButtons: false, displayWin: true });
            this.props.dealerHit({cards: cards, sum: sum});
        } else if(this.props.dealerTotal + sum > this.props.playerTotal){
            this.props.playerLoses();
            this.setState({ displayButtons: false, displayLose: true });
            this.props.dealerHit({cards: cards, sum: sum});
        } else if(this.props.dealerTotal + sum < this.props.playerTotal){
            this.props.playerWins();
            this.setState({ displayButtons: false, displayWin: true });
        } else {
            this.props.push();
            this.setState({ displayButtons: false, displayPush: true });
            this.props.dealerHit({cards: cards, sum: sum});
        }
        




        
    }

    reset(){
        this.setState({ displayButtons: true });
        // take bets is passed down from the bet component
        this.props.takeBets();
        this.props.gameOver();
    }

    render(){
        return (
            <div>
    
                <h1>Player's Hand ({this.props.playerTotal}): </h1>
                <ul>
                    {
                        this.props.playerHand.map(card => (
                            <li key={card.id} >{card.rank} of {card.suit}</li>
                        ))
                    }
                </ul>
                <br />
                {
                    this.state.displayButtons && (
                        <div>
                            <button onClick={this.totalCheck}>Hit Me</button>
                            <button onClick={this.dealerTurn}>Stay</button>
                            <button>Double-down</button>
                        </div>
                    )
                }
                {
                    this.state.displayBusted && (
                        <div>
                            <h1>BUSTED!</h1>
                            <br />
                            <button onClick={this.reset}>Play again?</button>
                        </div>
                    )
                }
                {
                    this.state.displayWin && (
                        <div>
                            <h1>Player Wins!</h1>
                            <br />
                            <button onClick={this.reset}>Play again?</button>
                        </div>
                    )
                }
                {
                    this.state.displayLose && (
                        <div>
                            <h1>Dealer Wins!</h1>
                            <br />
                            <button onClick={this.reset}>Play again?</button>
                        </div>
                    )
                }
                {
                    this.state.displayPush && (
                        <div>
                            <h1>Push</h1>
                            <br />
                            <button onClick={this.reset}>Play again?</button>
                        </div>
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
        numAces: state.numAces,
        topCard: state.topCard,
        dealerTotal: state.dealerTotal,
        deck: state.deck
    }
};

import { playerHit, getTopCard, gameOver, playerLoses, playerWins, dealerHit, push } from '../store';

const mapDispatchToProps = (dispatch)=> {
    return {
        playerHit: (obj)=> dispatch(playerHit(obj)),
        dealerHit: (cards)=> dispatch(dealerHit(cards)),
        getTopCard: ()=> dispatch(getTopCard()),
        gameOver: ()=> dispatch(gameOver()),
        playerLoses: ()=> dispatch(playerLoses()),
        playerWins: ()=> dispatch(playerWins()),
        push: ()=> dispatch(push())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);