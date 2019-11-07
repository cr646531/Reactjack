import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player';
import Dealer from './Dealer';

class Bet extends Component{
    constructor(){
        super();
        this.state = {
            bet: 0,
            displayBetSlider: true
        }
        this.toggleBet = this.toggleBet.bind(this);
        this.placeBet = this.placeBet.bind(this);
        this.takeBets = this.takeBets.bind(this);
    }

    toggleBet(event){
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    placeBet(){
        this.setState({
            displayBetSlider: false
        })
        this.props.placeBet(this.state.bet * 1);

        var numAces = 0;
        var offset = 0;

        if(this.props.deck[0].value == 11 && this.props.deck[1].value == 11){
            numAces = 1;
            offset = 10;
        }

        if(this.props.deck[0].value == 11){
            numAces = 1;
        } else if(this.props.deck[1].value == 11){
            numAces = 1
        }

        console.log('offset: ', offset);
        console.log('numAces: ', numAces);
        this.props.deal({ numAces: numAces, offset: offset});
    }

    takeBets(){
        this.setState({
            displayBetSlider: true,
            bet: 0
        })
    }

    render(){
        return (
            <div>
                <h1>Bankroll: {this.props.bankroll}</h1>
                <h1>Bet: {this.state.bet}</h1>
                <br />
                {
                    this.state.displayBetSlider ? (
                        <div className="slidecontainer">
                            <form >
                                <input type="range" min="1" max={this.props.bankroll} name="bet" default="1" onChange={this.toggleBet}/>
                            </form>
                            <button onClick={this.placeBet}>Deal</button>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <hr />
                            <Dealer />
                            <br />
                            <hr />
                            <Player takeBets={this.takeBets} />
                        </div>
                    )
                }
                <hr />
            </div>
        )
    }


}


import { placeBet, deal } from '../store';

const mapStateToProps = (state) => {
    return {
        bet: state.bet,
        bankroll: state.bankroll,
        deck: state.deck
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        placeBet: (bet)=> dispatch(placeBet(bet)),
        deal: (obj)=> dispatch(deal(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bet);