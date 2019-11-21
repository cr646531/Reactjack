import React, { Component } from 'react';

import styled, { keyframes } from 'styled-components';
import { shake } from 'react-animations';

const shakeAnimation = keyframes`${shake}`;
const ShakeDiv = styled.div`
    animation: 2s ${shakeAnimation};
`;

export default class Minimum extends Component {

    render(){
        return (
            <div>
                <ShakeDiv>
                    <div className="row-align-center pt-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col" />
                                <div className="col-md-10 col-md-offset-1">
                                    <div class="alert alert-warning" role="alert">
                                        <strong>You must bet at least $1</strong>
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