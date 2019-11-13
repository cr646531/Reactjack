import React, { Component } from 'react';

export default class Chips extends Component {

    render(){
        return (
            <div className="row align-items-center">
                <div className="col">
                    <img src={'chips/one_chip.png'} onClick={()=> this.props.bet(1)} />
                </div>
                <div className="col">
                    <img src={'chips/five_chip.png'} onClick={()=> this.props.bet(5)} />
                </div>
                <div className="col">
                    <img src={'chips/ten_chip.png'} onClick={()=> this.props.bet(10)} />
                </div>
                <div className="col">
                    <img src={'chips/twenty_chip.png'} onClick={()=> this.props.bet(20)} />
                </div>
                <div className="col">
                    <img src={'chips/fifty_chip.png'} onClick={()=> this.props.bet(50)} />
                </div>
                <div className="col">
                    <img src={'chips/hundred_chip.png'} onClick={()=> this.props.bet(100)} />
                </div>
            </div>
        )
    }
}