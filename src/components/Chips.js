import React, { Component } from 'react';

export default class Chips extends Component {

    render(){
        return (
            <div className="row align-items-center">
                <div className="col">
                    <img src={'chips/one_chip.png'} onClick={this.props.betOne} />
                </div>
                <div className="col">
                    <img src={'chips/five_chip.png'} onClick={this.props.betFive} />
                </div>
                <div className="col">
                    <img src={'chips/ten_chip.png'} onClick={this.props.betTen} />
                </div>
                <div className="col">
                    <img src={'chips/twenty_chip.png'} onClick={this.props.betTwenty} />
                </div>
                <div className="col">
                    <img src={'chips/fifty_chip.png'} onClick={this.props.betFifty} />
                </div>
                <div className="col">
                    <img src={'chips/hundred_chip.png'} onClick={this.props.betHundred} />
                </div>
            </div>
        )
    }
}