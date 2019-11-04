import React, {Component} from 'react';
import { connect } from 'react-redux';
import { removeCard } from '../store/store';



class Player extends Component {

    constructor(){

        super();
        this.state = {
            bankroll: 100,
            bet: 0,
            hand: [],
            cardIndex: [],
            dealt: false,
            playerTotal: 0,
            bust: false,
            deck: []
        }
        this.hit = this.hit.bind(this);
        this.deal = this.deal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.shuffle = this.shuffle.bind(this);
    }

    shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }


    deal(){

        var deck = this.props.cards;
        this.shuffle(deck);
        this.setState({ deck: deck });

        this.setState({ dealt: true });

        this.hit();
        this.hit();
    }
    
    hit(){
        console.log('\n--------------\n\nRunning inside of hit function')
        //var deck = this.props.cards;
        var remove = this.props.removeCard;

        var deck = this.state.deck;

        console.log('deck: ', deck);
        var card = deck.pop();

        // var randomId = Math.floor(Math.random() * (51 - 1) + 1) + 1;

        // while(removed.includes(randomId)){
        //     randomId = Math.floor(Math.random() * (51 - 1) + 1) + 1;
        //     console.log('random id: ', randomId);
        // }

        // removed.push(randomId);
        // this.setState({ removed: removed });
        
        
        for(var i = 0; i < deck.length; i++){
            if(deck[i].id == card.id){
                cardId = card.id            }
        }

        console.log('Found card: ', card);
        var hand  = this.state.hand;
        console.log("hand: ", hand);
        hand.push(card);
        this.setState({ hand: hand, deck: deck });
        console.log('hand in the state: ', this.state.hand);
        remove(card.id);

        console.log('\nRunning inside of hit function\n--------------\n')

        var total = 0;

        for(var i = 0; i < hand.length; i++){
            total += hand[i].value;
        }

        if(total > 21){
            this.setState({ bust: true })
        }
    }

    onSubmit(event){
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        const { hand, bankroll, bet, dealt, takingBets, bust } = this.state;

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
                    !dealt && (
                        <div class="slidecontainer">
                            <form onSubmit={this.onSubmit} >
                                <input type="range" min="1" max={bankroll} name="bet" onChange={this.onSubmit}/>
                            </form>
                        </div>
                    )
                }
                {
                    dealt && !bust ? (
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