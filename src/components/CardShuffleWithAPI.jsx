import React, { useState, useEffect } from 'react';

// API endpoint to get a new shuffled deck
const NEW_DECK_URL = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

const CardShuffleWithAPI = () => {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAllCards, setShowAllCards] = useState(false); // State to control visibility of all cards
  
    // Fetch a new shuffled deck
    const fetchNewDeck = async () => {
      setLoading(true);
      try {
        const response = await fetch(NEW_DECK_URL);
        const data = await response.json();
        setDeckId(data.deck_id);
      } catch (error) {
        console.error('Failed to fetch a new deck:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Draw cards from the deck
    const drawCards = async (count = 52) => {
      if (!deckId) return;
      setLoading(true);
      try {
        const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
        const data = await response.json();
        setCards(data.cards);
      } catch (error) {
        console.error('Failed to draw cards:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Initial fetch to get a new shuffled deck
    useEffect(() => {
      fetchNewDeck();
    }, []);
  
    // Handle shuffle and draw cards
    const handleShuffleAndDraw = async () => {
      setShowAllCards(false); // Reset card visibility
      await fetchNewDeck();
      drawCards();
    };
  
    // Toggle visibility of all cards
    const handleShowAllCards = () => {
      setShowAllCards((prev) => !prev);
    };

  return (
    <>
    <main style={{display:"flex",flexDirection:'column',}}>
    <h1 style={{display:"flex", justifyContent:'center'}}>Card Shuffle Simulation with API</h1>
      <button onClick={handleShuffleAndDraw} disabled={loading} style={{width:'15%',color:'white',backgroundColor:'green',padding:'10px'}} >
        {loading ? 'Shuffling...' : 'Shuffle and Draw'}
      </button>
      
      {/* Display the top card or the entire stack based on showAllCards state */}
      <div style={{ marginTop: '20px' }}>
        {cards.length > 0 && !showAllCards && (
          <div 
            onClick={handleShowAllCards} 
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <img src={cards[0].image} alt={cards[0].code} style={{ width: '100px', height: '140px' }} />
            <p>Click to reveal all cards</p>
          </div>
        )}

        {showAllCards && (
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2px' }}>
            {cards.map((card) => (
              <div key={card.code} style={{ margin: '10px', textAlign: 'center' }}>
                <img src={card.image} alt={card.code} style={{ width: '100px', height: '140px' }} />
                <p>{card.value} of {card.suit}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
    </>
    
  );
};

export default CardShuffleWithAPI;
