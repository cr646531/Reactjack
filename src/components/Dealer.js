import React, { Component} from 'react';
import { connect } from 'react-redux';

class Dealer extends Component{

    render(){
        return (
            <div>
                <h1>Dealer's Hand ({this.props.dealerTotal}): </h1>
                <ul>
                    {
                        this.props.dealerHand.map(card => (
                            <li key={card.id} >{card.rank} of {card.suit}</li>
                        ))
                    }
                </ul>
            </div>
        );
    };  
};

const mapStateToProps = (state)=> {
    return {
        dealerHand: state.dealerHand,
        dealerTotal: state.dealerTotal
    }
};

export default connect(mapStateToProps)(Dealer);