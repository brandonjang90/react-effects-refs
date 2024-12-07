import React from "react";
import "./Card.css";

const Card = ({ card }) => {
  return (
    <div className="card">
      <img src={card.image} alt={`${card.value} of ${card.suit}`} className="card-image" />
      <p className="card-description">{`${card.value} of ${card.suit}`}</p>
    </div>
  );
};

export default Card;
