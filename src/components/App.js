import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';

import { loadDeck } from '../store';

import Bet from './Bet';


class App extends Component{

  componentDidMount(){
    this.props.init();
  }

  render(){
      return (
        <div>
          <h1>Blackjack</h1>
          <hr />
          <Router>
            <div>
              <Route path = '/play' component = { Bet } />
            </div>
          </Router>
        </div>
      
    );
  }
};

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> dispatch(loadDeck()),
  };
};

export default connect(null, mapDispatchToProps)(App);