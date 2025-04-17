import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// Normalize function to match card names ignoring punctuation/case
const normalize = (str = "") =>
  str.toLowerCase().replace(/[^a-z0-9]/g, "");

// Use localhost when developing, otherwise use your Render URL
const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL || "http://localhost:3001"
    : "https://createmydeck-server.onrender.com";

const CardPreview = () => {
  const { search } = useLocation();
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const cardParam = params.get("card");
    if (!cardParam) {
      setError("No card selected. Please choose a card from Browse.");
      return;
    }

    const key = normalize(cardParam);
    setError("");
    setCard(null);

    fetch(`${API_URL}/api/cards`)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then((cards) => {
        const found = cards.find((c) => normalize(c.name) === key);
        if (found) {
          setCard(found);
        } else {
          setError("Unknown card. No data available.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading card data.");
      });
  }, [search]);

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Card Preview</h2>

      {error ? (
        <p style={{ color: "#ff6b6b" }}>{error}</p>
      ) : card ? (
        <div id="card-preview" style={{ textAlign: "center" }}>
          <img
            src={`${API_URL}/${card.img}`}
            alt={card.name}
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: 300,
              objectFit: "contain",
              margin: "auto 0 20px",
            }}
          />
          <h3 style={{ color: "#FFD700", marginBottom: 10 }}>{card.name}</h3>
          <p style={{ marginBottom: 15 }}>{card.text}</p>
          <p style={{ fontWeight: "bold" }}>
            Cost: {card.cost} | Attack: {card.attack} | Health: {card.health}
          </p>
        </div>
      ) : (
        <p>Loading…</p>
      )}

      <Link
        to="/Browse"
        style={{
          display: "inline-block",
          marginTop: 20,
          color: "#26AEE7",
          textDecoration: "underline",
        }}
      >
        &larr; Back to Browse
      </Link>
    </main>
  );
};

export default CardPreview;
