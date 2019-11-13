import React, { Component } from 'react';

export default class Bust extends Component {

    render(){
        return (
            <div>
                <div className="row">
                    <h3>BUSTED!</h3>
                    <br />
                </div>
                <div className="row">
                    <button onClick={this.props.reset}>Play again?</button>
                </div>
            </div>
        )
    }
}