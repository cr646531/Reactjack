import React, {Component} from 'react';

export default class Player extends Component {

    constructor(props){

        super(props);
        this.state = {
            hand: props.hand,
            bankroll: 100,
            bet: 0
        }
    }

    render(){
        const {hand, bankroll, bet} = this.state;

        return (
            <div>
                <h1>Hand: {hand}</h1>
                <h1>Bankroll: {bankroll} </h1>
                <h1>Bet: {bet}</h1>
                <br />
                <hr />
            </div>
            
        )
    }

}