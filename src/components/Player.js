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
        this.hit = this.hit.bind(this);
        this.reset = this.reset.bind(this);
        this.dealersTurn = this.dealersTurn.bind(this);
        this.checkWinConditions = this.checkWinConditions.bind(this);
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
            // dealer's turn
        } else if(playerTotal > 21){
            if(playerNumAces > 0){
                playerNumAces--;
                playerTotal -= 10;
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

    dealersTurn(){
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
        this.checkWinConditions(dealerTotal);
    }

    checkWinConditions(dealerTotal){
        var playerTotal = this.props.playerTotal;

        console.log('playerTotal: ', playerTotal);
        console.log('dealerTotal: ', dealerTotal);

        if(dealerTotal > 21){
            this.props.playerWins();
            this.setState({ displayButtons: false, displayWin: true });
            console.log('1')
        } else if(dealerTotal > playerTotal){
            this.props.playerLoses();
            this.setState({ displayButtons: false, displayLose: true });
            console.log('2');
        } else if(dealerTotal < playerTotal){
            this.props.playerWins();
            this.setState({ displayButtons: false, displayWin: true });
            console.log('3')
        } else {
            this.props.push();
            this.setState({ displayButtons: false, displayPush: true });
            console.log('4')
        }
    }

    reset(){
        this.setState({ displayButtons: true, displayBusted: false, displayWin: false, displayLose: false, displayPush: false });
        // take bets is passed down from the bet component
        this.props.takeBets();
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
                    this.state.displayButtons && !this.props.displayBlackjack && (
                        <div>
                            <button onClick={this.hit}>Hit Me</button>
                            <button onClick={this.dealersTurn}>Stay</button>
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
                {
                    this.props.blackjack && (
                        <div>
                            <h1>Blackjack!</h1>
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
        playerNumAces: state.playerNumAces,
        dealerHand: state.dealerHand,
        dealerTotal: state.dealerTotal,
        dealerNumAces: state.dealerNumAces,
        deck: state.deck
    }
};

//import { playerHit, getTopCard, gameOver, playerLoses, playerWins, dealerHit, push } from '../store';
import { playerHit, getTopCard, gameOver, playerLoses, playerWins, dealersTurn, push } from '../store';

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