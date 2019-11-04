import React from 'react';
import { connect } from 'react-redux';


const Cards = ({ cards })=> {
  return (
    <div>
      <h1>Cards</h1>
      <ul>
        {
          cards.map( card => {
            return (
              <li key={ card.id }>
                {card.rank} of {card.suit}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = ({ cards })=> {
  return {
    cards
  };
};

export default connect(mapStateToProps)(Cards);