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
                <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <a class="navbar-brand" href="#">Blackjack-react</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Rules</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
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