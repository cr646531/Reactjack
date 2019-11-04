import React, {Component} from 'react';
import { connect } from 'react-redux';
import { removeCard } from '../store';



// function getRndInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) ) + min;
// };

// function getRndCard(cards){
//     randomId = Math.floor(Math.random() * (51 - 1) + 1) ) + 1;
//     var card = cards.find(function(card){
//         card.id === randomId
//     });
//     return card;

// }

class Player extends Component {

    constructor(){

        super();
        this.state = {
            bankroll: 100,
            bet: 0,
            hand: [],
            removed: [],
            dealt: false
        }
        this.hit = this.hit.bind(this);
        this.deal = this.deal.bind(this);
    }

    deal(){
        this.hit();
        this.hit();
        this.setState({ dealt: true });
    }
    
    hit(){
        console.log('\n--------------\n\nRunning inside of hit function')
        var deck = this.props.cards;
        var remove = this.props.removeCard;
        var removed = this.state.removed;

        console.log('deck: ', deck);
        var card;

        var randomId = Math.floor(Math.random() * (51 - 1) + 1) + 1;

        while(removed.includes(randomId) == true){
            randomId = Math.floor(Math.random() * (51 - 1) + 1) + 1;
            console.log('random id: ', randomId);
        }

        removed.push(randomId);
        this.setState({ removed: removed });
        
        
        
        for(var i = 0; i < deck.length; i++){
            if(deck[i].id == randomId){
                card = deck[i]
            }
        }
        console.log('Found card: ', card);
        var hand  = this.state.hand;
        console.log("hand: ", hand);
        hand.push(card);
        this.setState({ hand: hand });
        console.log('hand in the state: ', this.state.hand);
        remove(card);

        console.log('\nRunning inside of hit function\n--------------\n')
    }

    render(){
        const { hand, bankroll, bet, dealt } = this.state;

        return (
            <div>
                <h1>Hand:</h1>
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
                    dealt ? (
                        <button onClick={ this.hit }>Hit Me</button>
                    ) : (
                        <button onClick={ this.deal }>Deal</button>
                    )
                }
                
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
      removeCard: (card)=> dispatch(removeCard(card))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Player);