import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./CardDeck.css";

const CardDeck = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        setDeck(response.data);
      } catch (err) {
        setError("Failed to load deck. Please try again.");
      }
    };
    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (!deck) return;

    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
      if (response.data.remaining === 0) {
        setError("Error: no cards remaining!");
      } else {
        setCard(response.data.cards[0]);
        setError(""); // Clear any previous errors
      }
    } catch (err) {
      setError("Error while drawing a card. Please try again.");
    }
  };

  const shuffleDeck = async () => {
    if(!deck) return;
    setShuffle(true);
    setError("");
    setCard(null);

    try {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
        setShuffle(false);
        } catch(err) {
            setError("Error while shuffling deck. Please try again.");
            setShuffle(false);
        }
  }

  return (
    <div className="card-deck">
        {error && <p className="error">{error}</p>}
        <button 
        className="draw-button" 
        onClick={drawCard}
        disabled={shuffle}>
        Draw a Card
        </button>
        <button
        onClick={shuffleDeck}
        className={`shuffle-button ${shuffle ? "disabled" : ""}`}
        disabled={shuffle}>
        {shuffle ? "Shuffling Deck..." : "Shuffle Deck"}
        </button>
      {card && <Card card={card} />}
    </div>
  );
};

export default CardDeck;
