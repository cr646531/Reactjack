import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCards } from '../store/store';
import { Route, HashRouter as Router } from 'react-router-dom';

import Cards from './Cards';
import Game from './Game';


class App extends Component{

  componentDidMount(){
    this.props.init();
  }

  render(){
      const { cards } = this.props;
      
      return (
        <div>
          <Router>
            <div>
              <Route exact path = '/cards' component = { Cards } />
              <Route path = '/player' component = { Game } />
            </div>

          </Router>
        </div>
      
    );
  }
};

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> dispatch(loadCards()),
  };
};

const mapStateToProps = ({ cards })=> {
  return {
    cards 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);