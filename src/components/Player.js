import React, { Component } from 'react';
import { connect } from 'react-redux';


class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayButtons: true
        }
        this.totalCheck = this.totalCheck.bind(this);
        this.reset = this.reset.bind(this);
    }
    

    totalCheck(){
        var nextCard = this.props.topCard;

        if(this.props.playerTotal + nextCard.value == 21){
            this.setState({ displayButtons: false});
            //dealer plays
        } else if(this.props.playerTotal + nextCard.value > 21){
            this.setState({ displayButtons: false});
            this.props.playerLoses();
        }

        this.props.playerHit();
    }

    reset(){
        this.setState({ displayButtons: true });
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
                    this.state.displayButtons ? (
                        <div>
                            <button onClick={this.totalCheck}>Hit Me</button>
                            <button>Stay</button>
                            <button>Double-down</button>
                        </div>
                    ) : (
                        <div>
                            <h1>BUSTED!</h1>
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
        topCard: state.topCard
    }
};

import { playerHit, getTopCard, gameOver, playerLoses, playerWins } from '../store';

const mapDispatchToProps = (dispatch)=> {
    return {
        playerHit: ()=> dispatch(playerHit()),
        getTopCard: ()=> dispatch(getTopCard()),
        gameOver: ()=> dispatch(gameOver()),
        playerLoses: ()=> dispatch(playerLoses()),
        playerWins: ()=> dispatch(playerWins())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);