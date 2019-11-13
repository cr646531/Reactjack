import React, { Component } from 'react';

export default class Blackjack extends Component {

    render(){
        return (
            <div>
                <div className="row">
                    <h3>Blackjack</h3>
                    <br />
                </div>
                <div className="row">
                    <button onClick={this.props.reset}>Play again?</button>
                </div>
            </div>
        )
    }
}