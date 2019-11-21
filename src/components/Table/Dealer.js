import React, { Component} from 'react';
import { connect } from 'react-redux';

import Card from './Card';

class Dealer extends Component{

    render(){
        var count = 0;
        var downCard = {
            rank: 'red_back',
            suit: ''
        }
        return (
            <div>
                <h3>Dealer's Hand <span className="badge badge-pill badge-dark">{this.props.dealerTotal}</span></h3>
                <div className="container py-4">
                    <div className="row">
                        {
                            this.props.dealerHand.map(card => {
                                count += 500;
                                return (
                                    <Card card={card} wait={count} />
                                )
                            })

                                //<img key={card.id} className="px-1" src={`cards/${card.rank}${card.suit}.png`} />
                        }
                        {
                            //this.props.displayFaceDownCard && <img className="px-1" src="cards/red_back.png" />
                            this.props.displayFaceDownCard && <Card card={downCard} count={0} />
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