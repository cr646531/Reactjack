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
        this.doubleDown = this.doubleDown.bind(this);
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
        this.setState({ displayButtons: false });
        this.props.playerHit({ card: card, deck: deck, playerTotal: playerTotal, playerNumAces: playerNumAces });
        this.props.doubleBet();
        this.dealersTurn(playerTotal);
        console.log('doubleDown: ', playerTotal);
    }

    dealersTurn(playerTotal){
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
        console.log('playerTotal: ', playerTotal);
        console.log('dealerTotal: ', dealerTotal);

        if(playerTotal > 21){
            this.props.playerLoses();
            this.setState({ displayButtons: false, displayBusted: true })
            console.log('0');
        } else {
            playerTotal = this.props.playerTotal;
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
    }

    reset(){
        this.setState({ displayButtons: true, displayBusted: false, displayWin: false, displayLose: false, displayPush: false });
        // take bets is passed down from the bet component
        this.props.takeBets();
    }

    render(){
        return (
            <div>
    
                <h3>Player's Hand ({this.props.playerTotal}): </h3>

                <div className="container py-2">
                    <div className="row">
                        {
                            this.props.playerHand.map(card => (
                                <img key={`${card.rank}${card.suit}`} className="px-1" src={`cards/${card.rank}${card.suit}.png`} />
                            ))
                        }
                    </div>
                </div>

                <br />
                {
                    this.state.displayButtons && !this.props.displayBlackjack && (
                        <div>
                            <button onClick={this.hit}>Hit Me</button>
                            <button onClick={this.dealersTurn}>Stay</button>
                            {
                                this.props.displayDoubleDown && (
                                    <button onClick={this.doubleDown}>Double-down</button>
                                )
                            }
                            {
                                this.props.displaySplitButton && (
                                    <button onClick={this.props.split}>Split</button>
                                )
                            }
                        </div>
                    )
                }
                {
                    this.state.displayBusted && (
                        <div>
                            <h3>BUSTED!</h3>
                            <br />
                            <button onClick={this.reset}>Play again?</button>
                        </div>
                    )
                }
                {
                    this.state.displayWin && (
                        <div>
                            <h3>Player Wins!</h3>
                            <br />
                            <button onClick={this.reset}>Play again?</button>
                        </div>
                    )
                }
                {
                    this.state.displayLose && (
                        <div>
                            <h3>Dealer Wins!</h3>
                            <br />
                            <button onClick={this.reset}>Play again?</button>
                        </div>
                    )
                }
                {
                    this.state.displayPush && (
                        <div>
                            <h3>Push</h3>
                            <br />
                            <button onClick={this.reset}>Play again?</button>
                        </div>
                    )
                }
                {
                    this.props.blackjack && (
                        <div>
                            <h3>Blackjack!</h3>
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
        deck: state.deck,
        displayDoubleDown: state.displayDoubleDown,
        displaySplitButton: state.displaySplitButton
    }
};

//import { playerHit, getTopCard, gameOver, playerLoses, playerWins, dealerHit, push } from '../store';
import { playerHit, getTopCard, gameOver, playerLoses, playerWins, dealersTurn, push, doubleBet, split } from '../store';

const mapDispatchToProps = (dispatch)=> {
    return {
        playerHit: (obj)=> dispatch(playerHit(obj)),
        dealersTurn: (obj)=> dispatch(dealersTurn(obj)),
        playerLoses: ()=> dispatch(playerLoses()),
        playerWins: ()=> dispatch(playerWins()),
        push: ()=> dispatch(push()),
        doubleBet: ()=> dispatch(doubleBet()),
        split: ()=> dispatch(split())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);