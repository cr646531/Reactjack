import React, { Component } from 'react';

import Bet from './Bet';

export default class Game extends Component {

    constructor(){
        super();
        this.state = {
            game_over: false
        };
        this.endGame = this.endGame.bind(this);
    };
    
    endGame(){
        this.setState({
            game_over: true
        });
    };

    render(){
        return (
            <div>
                {
                    !this.state.game_over ? (
                        <Bet endGame={this.endGame} />
                    ) : (
                        <div className="container">
                            <br />
                            <div className="container py-4">
                                <img src="game_over.gif" />
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}