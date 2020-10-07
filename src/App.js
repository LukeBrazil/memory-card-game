import React, { Component } from "react";
import "./App.css";
import MemoryCard from "./componets/MemoryCard.jsx";

let generateDeck = () => {
  const symbols = [`∆`, ` ß`, `£`, `§`, `•`, `$`, `+`, `ø`];
  let deck = [];
  for (let i = 0; i < 16; i++) {
    let card = { isFlipped: false, symbol: symbols[i % 8] };
    deck.push(card);
  }
  shuffle(deck);
  return deck;
};

let shuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: generateDeck(), pickedCards: [] };
  }
   pickCard = (cardIndex) => {
    if (this.state.deck[cardIndex].isFlipped === true) {
      return
    }
    let cardToFlip = {...this.state.deck[cardIndex]};
    cardToFlip.isFlipped = true;
    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    let newDeck = this.state.deck.map((card, index) => {
      if(cardIndex === index) {
        return cardToFlip;
      }
      return card
    })
    if (newPickedCards.length === 2) {
      let card1Index = newPickedCards[0];
      let card2Index = newPickedCards[1];
      let firstCard = newDeck[card1Index]
      let secondCard = newDeck[card2Index]
      if (firstCard.symbol != secondCard.symbol) {
        this.unflipCards(card1Index, card2Index);
        newPickedCards = [];
      }
      
    }
    this.setState({deck: newDeck, pickedCards: newPickedCards});
  }
    unflipCards = (card1Index, card2Index) => {
      let card1 = {...this.state.deck[card1Index]}
      let card2 = {...this.state.deck[card2Index]}
      card1.isFlipped = false
      card2.isFlipped = false
      let newDeck = this.state.deck.map((card, index) => {
        if(card1 === index) {
          return card1
        }
        if(card2 === index) {
          return card2
        }
      })
      this.setState({deck: newDeck})
    }
  render() {
    let cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard symbol ={card.symbol} isFlipped ={card.isFlipped} key={index} pickCard={this.pickCard.bind(this, index)}/>;
    });

    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <h4>Memory Game</h4>
        </header>
        <header>
          <div>
            {cardsJSX.slice(0, 4)}
          </div>
          <div>
          {cardsJSX.slice(4, 8)}
          </div>
          <div>
          {cardsJSX.slice(8, 12)}
          </div>
          <div>
          {cardsJSX.slice(12, 16)}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
