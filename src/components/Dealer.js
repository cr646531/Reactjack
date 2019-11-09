import React, { Component} from 'react';
import { connect } from 'react-redux';

class Dealer extends Component{

    render(){
        return (
            <div>
                <h1>Dealer's Hand ({this.props.dealerTotal}): </h1>
                <div className="container py-4">
                    <div className="row">
                        {
                            this.props.dealerHand.map(card => (
                                <img key={card.id} className="px-1" src={`cards/${card.rank}${card.suit}.png`} />
                            ))
                        }
                        {
                            this.props.displayFaceDownCard && <img className="px-1" src="cards/red_back.png" />
                        }
                    </div>
                </div>
            </div>
        );
    };  
};

const mapStateToProps = (state)=> {
    return {
        dealerHand: state.dealerHand,
        dealerTotal: state.dealerTotal,
        displayFaceDownCard: state.displayFaceDownCard
    }
};

export default connect(mapStateToProps)(Dealer);