import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]/g, "");

const CardPreview = () => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let key = params.get("card");
    if (!key) {
      setError("No card selected.");
      return;
    }
    key = normalize(key);
    fetch(`${API_URL}/api/cards`)
      .then((res) => res.json())
      .then((cards) => {
        const found = cards.find((c) => normalize(c.name) === key);
        if (found) setCard(found);
        else setError("Unknown Card");
      })
      .catch(() => setError("Error loading card data."));
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h2>Card Preview</h2>
      <div id="card-preview">
        <img
          src={
            card
              ? `${API_URL}/${card.img}`
              : `${API_URL}/images/aldorpeacekeeper.png`
          }
          alt={card ? card.name : "Preview"}
          style={{ maxWidth: 300, display: "block", margin: "auto" }}
        />
        <h3>{card ? card.name : error || "Loading…"}</h3>
        <p>{card ? card.text : error}</p>
        {card && (
          <p>
            Cost: {card.cost}, Attack: {card.attack}, Health: {card.health}
          </p>
        )}
      </div>
      <Link to="/Browse">Back to Browse</Link>
    </main>
  );
};

export default CardPreview;
