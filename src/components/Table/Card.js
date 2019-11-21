import React, { Component } from 'react';

import styled, { keyframes } from 'styled-components';
import { rollIn } from 'react-animations';

const rollinAnimation = keyframes`${rollIn}`;
const RollinDiv = styled.div`
    animation: 2s ${rollinAnimation};
`;

export default class Card extends Component {

    constructor(){
        super();
        this.state = {
            playSound: true,
            hidden: true
        };
        this.show = this.show.bind(this);
    };

    componentDidMount(){
        var that = this;
        setTimeout(function(){
            that.show();
        }, that.props.wait);
    }

    show(){
        this.setState({
            hidden: false
        })
    }

    render(){

        var card = this.props.card;

        return (
            <div>
                {
                    !this.state.hidden && (
                    <RollinDiv>
                        <img key={`${card.rank}${card.suit}`} className="px-1" src={`cards/${card.rank}${card.suit}.png`} />
                    </RollinDiv>
                    )
                }
            </div>
        )
    }
};