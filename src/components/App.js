import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';

import Bet from './Bet';
import Nav from './Nav'


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
              <Route path = '/play' component = { Bet } />
            </div>
          </Router>
          <br />
          <br />
          <div className="container">
            <footer className="footer">
              <p>&copy; Company 2017</p>
            </footer>
          </div>
        </div>
    );
  }
};

import { loadDeck, loadRiggedDeck } from '../store';

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> dispatch(loadRiggedDeck()),
  };
};

export default connect(null, mapDispatchToProps)(App);