import React, { Component } from 'react';
import Sound from 'react-sound';

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
            playSound: false,
            hidden: true
        };
        this.show = this.show.bind(this);
        soundManager.setup({ debugMode: false });
    };

    componentDidMount(){
        var that = this;
        setTimeout(function(){
            that.show();
        }, that.props.wait);
    }

    show(){
        this.setState({
            hidden: false,
            playSound: true
        })
    }


    render(){

        var card = this.props.card;

        return (
            <div>
                {
                    this.state.playSound && (
                        <div>
                        <Sound 
                            url='sounds/card.mp3' 
                            playStatus={Sound.status.PLAYING} 
                        />
                        <Sound url='sound/card.mp3' playStatus={Sound.status.PAUSED} />
                        </div>
                    )
            }
                {
                    !this.state.hidden && (
                    <RollinDiv>
                        <img className="px-1" src={`cards/${card.rank}${card.suit}.png`} />
                    </RollinDiv>
                    )
                }
            </div>
        )
    }
};