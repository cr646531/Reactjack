import React, { Component } from 'react';

export default class Buttons extends Component {

    render(){
        return (
            <div className="row align-items-center">
                <div className="col">
                </div>
                <div className="col">
                    <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.props.resetBet}>Reset</button>
                </div>
                <div className="col">
                </div>
                <div className="col">
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.props.deal}>Deal</button>
                </div>
                <div className="col">
                </div>
            </div>
        )
    }
}