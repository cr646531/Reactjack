import React, { Component } from 'react';
import Sound from 'react-sound';

export default class Nav extends Component {

    constructor(){
        super();
        this.state = {
            displayJumbotron: true,
            mute: true,
            play: false,
            volume: 0
            
        };
        soundManager.setup({ debugMode: false, ignoreMobileRestrictions: true });
        this.mute = this.mute.bind(this);
        this.unmute = this.unmute.bind(this);
        this.hideJumbotron = this.hideJumbotron.bind(this);
        this.toggleVolume = this.toggleVolume.bind(this);
    }

    toggleVolume(event){
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
            mute: false,
            play: true
        });
    }

    mute(){
        this.setState({ mute: true, play: false, volume: 0 });
    }

    unmute(){
        this.setState({ mute: false, play: true, volume: 100 });
    }

    hideJumbotron(){
        this.setState({ displayJumbotron: false });
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="#">Reactjack</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.props.toggleRules} href="#">Rules</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <form className="form-inline my-2 my-lg-0">
                    <div className="slidecontainer">
                        <label htmlFor="volume">Volume  -</label>
                        <input id="volume" type="range" min="0" max="100" name="volume" value={this.state.volume} onChange={this.toggleVolume} />
                    </div>
                        {
                            this.state.mute && (
                                <img className="mx-4" src="sounds/muted.png" onClick={()=> this.unmute()} />
                            )
                        }
                        {
                            this.state.play && (
                                <div>
                                    <img className="mx-4" src="sounds/playing.png" onClick={()=> this.mute()} />
                                    <Sound url="sounds/vegas.mp3" playStatus={Sound.status.PLAYING} volume={this.state.volume}/> 
                                </div>
                            )
                        }
                    </form>
                </nav>  
                <br />
                <br />   
            </div>
        )
    }
}