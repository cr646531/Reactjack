import React, { Component } from 'react';

export default class Rules extends Component {

    render(){
        const p1 = `Blackjack is a card game that pits player versus dealer. It is played with one or more decks of cards. Cards are counted as their respective numbers, face cards as ten, and ace as either eleven or one (in our game it will show on the counter as an 11 unless you are over 21). The object of Blackjack is the beat the dealer. This can be accomplished by getting Blackjack (first two cards equal 21) without dealer Blackjack, having your final card count be higher than the dealers without exceeding 21, or by not exceeding 21 and dealer busting by exceeding their card count of 21.`

        const p2 = `In Blackjack, or 21, the player must decide what to bet before the hand. Click the chips to add them to your bet. Click the chip again to remove it back to your pile of money. Once you click "deal" your bet is set, and two cards are dealt to the player face up and two cards are dealt to the dealer, one face up and one face down. You must then decide if you will "hit" (take another card from the deck), "stay" (keep the hand you are dealt), or "double" (you double your bet and are given only one more card). If the dealer has an Ace showing, you can click the "Insurance" button (this means you will place a bet worth half your hand bet, which will be paid out if the dealer has Blackjack but will be taken if the dealer does not).`
    
        const p3 = `Once the Blackjack hand is played out, three outcomes can occur. First you can win (as previously described), secondly you can lose (bust hand or have less than dealer hand), or you can push (have same hand - number count or Blackjack - as dealer). If you win, you get your bet money back PLUS that same amount from the dealer, YAY! If you win with Blackjack, you get your original bet back PLUS you win 1.5 times your bet from the dealer, WOOHOO! If you lose, the dealer takes your bet money. If you push, you keep your bet money but do not win anything additional.`;

        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Blackjack-react!</h1>
                    <p className="lead">Blackjack, also known to some as twenty-one, is one of the most popular casino games around - and also super simple to learn! This easy to use, simple Blackjack game will certainly become your new favorite on the web!</p>
                    <hr className="my-4" />
                    <p>{p1}</p>
                    <p>{p2}</p>
                    <p>{p3}</p>
                    <a className="btn btn-primary btn-lg" onClick={this.props.toggleRules} href="#" role="button">Hide</a>
                </div>
            </div>
        )
    }
}