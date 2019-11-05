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
        this.props.placeBet(this.state.bet);
        this.props.deal();
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
                                <input type="range" min="1" max={this.state.bankroll} name="bet" default="1" onChange={this.toggleBet}/>
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
        bankroll: state.bankroll
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        placeBet: (bet)=> dispatch(placeBet(bet)),
        deal: ()=> dispatch(deal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bet);