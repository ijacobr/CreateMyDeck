import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Helper function to normalize strings
const normalize = (str) => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const CardPreview = () => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let cardKey = params.get("card");

    if (!cardKey) {
      setError("No card selected. Please select a card from the Browse page.");
      return;
    }

    cardKey = normalize(cardKey);

    fetch(process.env.PUBLIC_URL + "/projects/json/cards.json")
      .then((response) => response.json())
      .then((cards) => {
        const foundCard = cards.find((c) => normalize(c.name) === cardKey);
        if (foundCard) {
          setCard(foundCard);
        } else {
          setError("Unknown Card. No description available.");
        }
      })
      .catch((err) => {
        console.error("Error loading card data:", err);
        setError("Error loading card data.");
      });
  }, []);

  return (
    <>
      <main>
        <h2>Card Preview</h2>
        <div id="card-preview">
          <img
            id="card-image"
            src={
              card
                ? `/${card.img}`
                : process.env.PUBLIC_URL + "/projects/images/cards/aldorpeacekeeper.png"
            }
            alt={card ? card.name : "Card Preview"}
          />
          <div id="card-details">
            <h3 id="card-name">
              {card ? card.name : error ? "Unknown Card" : "No card selected"}
            </h3>
            <p id="card-description">
              {card ? card.text : error ? error : "Please select a card from the Browse page."}
            </p>
            <p id="card-stats">
              {card ? `Cost: ${card.cost}, Attack: ${card.attack}, Health: ${card.health}` : ""}
            </p>
          </div>
        </div>
        <Link to="/Browse" className="back-link">Back to Browse</Link>
      </main>
    </>
  );
};

export default CardPreview;
