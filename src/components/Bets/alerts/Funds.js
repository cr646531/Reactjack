import React, { Component } from 'react';
import Sound from 'react-sound';

import styled, { keyframes } from 'styled-components';
import { shake } from 'react-animations';

const shakeAnimation = keyframes`${shake}`;
const ShakeDiv = styled.div`
    animation: 2s ${shakeAnimation};
`;

export default class Funds extends Component {

    render(){
        return (
            <div>
                <Sound url="sounds/alert.mp3" playStatus={Sound.status.PLAYING} />
                <ShakeDiv>
                    <div className="row-align-center pt-4">
                        <div className="container">
                            <div className="row">
                                <div className="col" />
                                <div className="col-md-10 col-md-offset-1">
                                    <div className="alert alert-warning" role="alert">
                                        <strong>Insufficient funds!</strong>
                                    </div>
                                </div>
                                <div className="col" />
                            </div>
                        </div>
                    </div>
                </ShakeDiv>
            </div>
        )
    }
}