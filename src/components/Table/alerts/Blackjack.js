import React, { Component } from 'react';
import Sound from 'react-sound';

export default class Blackjack extends Component {

    constructor(){
        super();
        this.state = {
            active: false
        };
        this.activate = this.activate.bind(this);
    };

    componentDidMount(){
        var that = this;
        setTimeout(function(){
            that.activate();
        }, 5000);
    }

    activate(){
        this.setState({
            active: true
        })
    }

    render(){
        return (
            <div>
                {
                    this.state.active && (
                        <div>
                            <div className="row">
                                <img src="results/blackjack.png" />
                                <Sound url="sounds/blackjack.mp3" playStatus={Sound.status.PLAYING} />
                            </div>
                            <div className="row">
                                <br />
                            </div>
                            <div className="row">
                                <button type="button" class="btn btn-primary" onClick={this.props.reset}>Play Again</button>
                            </div>
                        </div>
                    )
                }  
            </div>
        )
    }
}