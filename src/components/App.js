import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';

import $ from 'jquery';
import Popper from 'popper.js';

import Nav from './Nav/Navbar'
import Bet from './Bets/Bet';

class App extends Component{

  constructor(){
    super();
    this.state = {
        game_over: false
    };
    this.endGame = this.endGame.bind(this);
  };

  endGame(){
      this.setState({
          game_over: true
      });
  };

  componentDidMount(){
    this.props.init();
  }

  render(){
      return (
        <div>
          <Nav />
          {
                    !this.state.game_over ? (
                        <Bet endGame={this.endGame} />
                    ) : (
                        <div className="container">
                            <br />
                            <div className="container py-10">
                                <img src="game_over.gif" />
                            </div>
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
    init: ()=> dispatch(loadRiggedSplit()),
  };
};

export default connect(null, mapDispatchToProps)(App);