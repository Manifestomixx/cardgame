import React,{useState} from 'react'

// Define the ranks and suits of a deck of cards
const ranks = ['Ace', 'Deuce', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

// Generate the deck of cards
const generateDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(`${rank} of ${suit}`);
    }
  }
  return deck;
};

// Shuffle function using the Fisher-Yates algorithm
const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

const CardGame = () => {
    const [deck, setDeck] = useState(generateDeck());

  const handleShuffle = () => {
    setDeck(shuffleDeck(deck));
  };
  return (
    <>
    <div>
      <h1>Card Shuffle Simulation</h1>
      <button onClick={handleShuffle}>Shuffle Deck</button>
      <ul>
        {deck.map((card, index) => (
          <li key={index}>{card}</li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default CardGame