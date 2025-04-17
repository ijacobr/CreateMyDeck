import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Helper to normalize names
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]/g, "");

const CardPreview = () => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let cardKey = params.get("card");
    if (!cardKey) {
      setError("No card selected.");
      return;
    }
    cardKey = normalize(cardKey);

    fetch(`${API_URL}/api/cards`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load cards");
        return res.json();
      })
      .then((cards) => {
        const found = cards.find((c) => normalize(c.name) === cardKey);
        if (found) setCard(found);
        else setError("Unknown card.");
      })
      .catch((err) => setError(err.message));
  }, [API_URL]);

  return (
    <main>
      <h2>Card Preview</h2>
      <div id="card-preview">
        <img
          id="card-image"
          src={
            card
              ? `${API_URL}/${card.img}`
              : `${API_URL}/projects/images/cards/aldorpeacekeeper.png`
          }
          alt={card ? card.name : "Card Preview"}
          style={{ display: "block", margin: "auto" }}
        />
        <div id="card-details">
          <h3 id="card-name">
            {card ? card.name : error ? "Unknown Card" : "No card selected"}
          </h3>
          <p id="card-description">
            {card
              ? card.text
              : error
              ? error
              : "Please select a card from Browse."}
          </p>
        </div>
      </div>
      <Link to="/Browse" className="back-link">
        ← Back to Browse
      </Link>
    </main>
  );
};

export default CardPreview;
