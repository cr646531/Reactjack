import React, { Component } from 'react';

export default class Lose extends Component {

    render(){
        return (
            <div>
                <div className="row">
                    <h3>Dealer Wins!</h3>
                    <br />
                </div>
                <div className="row">
                    <button onClick={this.props.reset}>Play again?</button>
                </div>
            </div>
        )
    }
}