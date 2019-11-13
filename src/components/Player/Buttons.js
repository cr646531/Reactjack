import React, { Component } from 'react';
import { connect } from 'react-redux';

class Buttons extends Component {

    render(){
        return (
            <div>
                <div>
                    <button onClick={this.props.hit}>Hit Me</button>
                    <button onClick={this.props.dealersTurn}>Stay</button>
                    {
                        this.props.displayDoubleDown && (
                            <button onClick={this.props.doubleDown}>Double-down</button>
                        )
                    }
                    {
                        this.props.displaySplitButton && (
                            <button onClick={this.props.split}>Split</button>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        displayDoubleDown: state.displayDoubleDown,
        displaySplitButton: state.displaySplitButton
    }
};

export default connect(mapStateToProps)(Buttons);