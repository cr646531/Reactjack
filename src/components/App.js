import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';

import Nav from './Nav'
import Game from './Game';

class App extends Component{

  componentDidMount(){
    this.props.init();
  }

  render(){
      return (
        <div>
          <Nav />
          <Router>
            <div>
              <Route path = '/play' component = { Game } />
            </div>
          </Router>
          <br />
          <br />
          <div className="container">
            <footer className="footer">
              <p>&copy; 2DMerchant</p>
            </footer>
          </div>
          <br />
          <br />
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