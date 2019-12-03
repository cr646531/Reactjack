import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';


import Nav from './Nav/Navbar';
import Bet from './Bets/Bet';
import Rules from './Nav/Rules';

class App extends Component{

  constructor(){
    super();
    this.state = {
        game_over: false,
        displayGame: false,
        displayRules: false
    };
    this.endGame = this.endGame.bind(this);
    this.play = this.play.bind(this);
    this.toggleRules = this.toggleRules.bind(this);
  };

  play(){
    this.setState({ displayGame: true });
  }

  endGame(){
      this.setState({
          game_over: true,
          displayGame: false
      });
  };

  componentDidMount(){
    this.props.init();
  }

  toggleRules(){
    if(this.state.displayRules){
      this.setState({ displayRules: false });
    } else {
      this.setState({ displayRules: true });
    }
  }

  render(){
      return (
        <div>
          <Nav toggleRules={this.toggleRules} />
          {
            this.state.displayRules && (
              <Rules toggleRules={this.toggleRules} play={this.play}/>
            )
          }
          {
            this.state.game_over && (
              <div className="container">
                <br />
                <div className="container py-10">
                    <img src="game_over.gif" />
                </div>
              </div>
            )
          }
          {
              this.state.displayGame ? (
                <Bet endGame={this.endGame} />
              ) : (
                <div className="container">
                  {/* <button type="button" className="btn btn-primary btn-lg" onClick={this.play} >Play</button> */}
                  <img onClick={this.play} src="/play.png" />
                </div>
              )
          }


          {/* <Router>
            <div>
              <Route path = '/play' component = { Bet } />
            </div>
          </Router> */}

          <br />
          <div className="container">
            <footer className="footer">
              <p>&copy; 2DMerchant</p>
            </footer>
          </div>
        </div>
    );
  }
};

import { loadDeck, loadRiggedDeck, loadRiggedSplit } from '../store';

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> dispatch(loadDeck()),
  };
};

export default connect(null, mapDispatchToProps)(App);