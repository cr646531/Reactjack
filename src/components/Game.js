import React, {Component} from 'react';
import { connect } from 'react-redux';
import { removeCard, shuffleCards, resetDeck, hit, resetHand } from '../store/store';



class Game extends Component {

    constructor(){

        super();
        this.state = {
            bankroll: 100,
            bet: 0,
            hand: [],
            playerTotal: 0,
            numAces: 0,

            displayBetSlider: true,
            displayDealButton: true,
            displayHitButton: false,
            displayPlayAgainButton: false,
            displayBust: false,
            displayWin: false,

            deck: []
        }
        this.placeBet = this.placeBet.bind(this);
        this.deal = this.deal.bind(this);
        this.hit = this.hit.bind(this);
        this.lost = this.lost.bind(this);
        this.reset = this.reset.bind(this);
    }

    // Change the betting amount based on the slider
    placeBet(event){
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Remove the bet slider, Create and shuffle the deck, Deal the cards
    deal(){

        var shuffleCards = this.props.shuffleCards;
        
        shuffleCards();

        this.hit();
        this.hit();
        
        this.setState({ displayBetSlider: false, displayHitButton: true, displayDealButton: false });
    }

    hit(){
        var deck = this.props.cards;
        var hand = this.state.hand;

        // take a card off the top of the deck and put it into your hand
        var card = deck[deck.length - 1];
        //hand.push(card);
        this.props.hit(card);
        this.props.removeCard();

        // take note of whether you drew an ace
        if(card.value == 11){
            this.setState({ numAces: this.state.numAces + 1 })
        }

        this.setState({ hand: hand, playerTotal: this.state.playerTotal + card.value })


        var gameOver = false;

        if(this.state.playerTotal > 21){
            if(this.state.numAces > 0){
                this.setState({ numAces: this.state.numAces - 1, playerTotal: this.state.playerTotal - 10 });
            } else {
                this.lost();
                gameOver = true;
            }
        } else if(this.state.playerTotal == 21){
            // win
            this.win();
            gameOver = true;
        }

        if(gameOver){
            //reset - TO DO
            this.setState({
                bet: 0,
                hand: [],
                playerTotal: 0,
                numAces: 0,
                displayHitButton: false,
                displayPlayAgainButton: true
            });
            this.props.resetHand();
        }

        
        
    }

    lost(){
        var { bet, bankroll, displayBust, displayWin } = this.state;

        this.setState({ 
            bankroll: bankroll - bet, 
            displayBust: true
        })
    }

    win(){
        var { bet, bankroll } = this.state;

        this.setState({ 
            bankroll: bankroll + bet,
            displayWin: true
        })
    }

    reset(){
        this.props.resetDeck();
        this.setState({ displayBetSlider: true, displayDealButton:true, displayBust: false, displayWin: false, displayPlayAgainButton: false })
    }

    

    render(){
        const { hand, bankroll, bet, displayBetSlider, displayHitButton, displayDealButton, displayBust, displayPlayAgainButton } = this.state;

        return (
            <div>
                <h1>Hand: ({this.state.playerTotal})</h1>
                <ul>
                    {
                        hand.map(card => (
                            <li key={card.id}>{card.rank} of {card.suit}</li>
                        ))
                    }
                </ul>
                <h1>Bankroll: {bankroll} </h1>
                <h1>Bet: {bet}</h1>
                <br />
                <hr />
                {
                    displayBetSlider && (
                        <div class="slidecontainer">
                            <form onSubmit={this.onSubmit} >
                                <input type="range" min="1" max={bankroll} name="bet" default="50" onChange={this.placeBet}/>
                            </form>
                        </div>
                    )
                }
                { displayDealButton && ( <button onClick={ this.deal }>Deal</button> ) }
                { displayHitButton && ( <button onClick={ this.hit }>Hit Me</button> ) }
                { displayBust && ( <h1>Busted!</h1> ) }
                <br />
                { displayPlayAgainButton && ( <button onClick={ this.reset }>Play Again?</button> )}

                
            </div>
            
        )
    }
}

const mapStateToProps = ({ cards })=> {
    return {
      cards
    };
  };

  const mapDispatchToProps = (dispatch)=> {
    return {
      removeCard: (card)=> dispatch(removeCard(card)),
      shuffleCards: ()=> dispatch(shuffleCards()),
      resetDeck: ()=> dispatch(resetDeck()),
      hit: (card)=> dispatch(hit(card)),
      resetHand: ()=> dispatch(resetHand())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Game);