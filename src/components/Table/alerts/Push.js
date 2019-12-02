import React, { Component } from 'react';
import Sound from 'react-sound';

export default class Push extends Component {

    constructor(){
        super();
        this.state = {
            active: false
        };
        this.activate = this.activate.bind(this);
        soundManager.setup({ debugMode: false });
    };

    componentDidMount(){
        var that = this;
        setTimeout(function(){
            that.activate();
        }, 2000);
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
                                <img src="results/push.png" />
                                <Sound url="sounds/push.mp3" playStatus={Sound.status.PLAYING} />
                            </div>
                            <div className="row">
                                <br />
                            </div>
                            {
                                this.props.displayPlayAgain && (
                                    <div className="row">
                                        <button type="button" className="btn btn-primary" onClick={this.props.reset}>Play Again</button>
                                    </div>
                                )
                            }
                        </div>
                        
                    )
                }  
            </div>
        )
    }
}