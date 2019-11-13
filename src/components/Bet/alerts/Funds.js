import React, { Component } from 'react';

export default class Funds extends Component {

    render(){
        return (
            <div className="row-align-center pt-4">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-10 col-md-offset-1">
                            <div class="alert alert-warning" role="alert">
                                <strong>Insufficient funds!</strong>
                            </div>
                        </div>

                        </div>
                </div>
            </div>
        )
    }
}