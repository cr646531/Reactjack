import React, { Component } from 'react';

export default class Nav extends Component {

    constructor(){
        super();
        this.state = {
            displayJumbotron: true
        };
        this.hideJumbotron = this.hideJumbotron.bind(this);
    }

    hideJumbotron(){
        this.setState({ displayJumbotron: false });
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand" href="#">Blackjack-react</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Rules</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
                </nav>  
                <br />
                <br />   
            </div>
        )
    }
}