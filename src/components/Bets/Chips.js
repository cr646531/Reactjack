import React, { Component } from 'react';
import Sound from 'react-sound';

import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';

const slideAnimation = keyframes`${slideInLeft}`;
const SlideDiv = styled.div`
    animation: 1.5s ${slideAnimation};
`;

export default class Chips extends Component {

    constructor(){
        super();
        this.state = {
            hidden: true
        };
        this.show = this.show.bind(this);
    }

    componentDidMount(){
        var that = this;
        setTimeout(function(){
            that.show();
        }, this.props.wait);
    }

    show(){
        this.setState({
            hidden: false
        })
    }

    render(){
        return (
            <div>
                <Sound url='sounds/chips.mp3' playStatus={Sound.status.PLAYING} />
                {
                    !this.state.hidden && (
                        <SlideDiv>
                            <div className="row align-items-center">
                                <div className="col">
                                    <img src={'chips/one_chip.png'} onClick={()=> this.props.bet(1)} />
                                </div>
                                <div className="col">
                                    <img src={'chips/five_chip.png'} onClick={()=> this.props.bet(5)} />
                                </div>
                                <div className="col">
                                    <img src={'chips/ten_chip.png'} onClick={()=> this.props.bet(10)} />
                                </div>
                                <div className="col">
                                    <img src={'chips/twenty_chip.png'} onClick={()=> this.props.bet(20)} />
                                </div>
                                <div className="col">
                                    <img src={'chips/fifty_chip.png'} onClick={()=> this.props.bet(50)} />
                                </div>
                                <div className="col">
                                    <img src={'chips/hundred_chip.png'} onClick={()=> this.props.bet(100)} />
                                </div>
                            </div>
                        </SlideDiv> 
                    )
                }
            </div>
        )
    }
}