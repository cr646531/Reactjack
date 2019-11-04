import React, { Component } from 'react';
import Player from './Player';

export default class App extends Component{

  render(){
      var playerHand = '[1, 2]';
      
      return (
        <div>
            <Player hand={playerHand} />
        </div>
      
    );
  }
}