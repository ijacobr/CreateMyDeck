import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Browse = () => {
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "";

  // fetch all cards
  useEffect(() => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then(setCards)
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  // fetch user's decks
  useEffect(() => {
    fetch("/api/decks")
      .then((res) => res.json())
      .then(setDecks)
      .catch((err) => console.error("Error fetching decks:", err));
  }, []);

  // sort handler
  const sortBy = (metric) => {
    const sorted = [...cards].sort(
      (a, b) => parseInt(b[metric], 10) - parseInt(a[metric], 10)
    );
    setCards(sorted);
  };

  // add card to deck
  const handleAdd = async (card) => {
    if (!selectedDeckId) {
      alert("Please select a deck first.");
      return;
    }
    try {
      const res = await fetch(`/api/decks/${selectedDeckId}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Server error");
      alert(`${card.name} added to deck!`);
    } catch (err) {
      alert("Error adding card: " + err.message);
    }
  };

  return (
    <main style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Browse Cards</h2>

      <section
        style={{
          border: "1px solid #26AEE7",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
          backgroundColor: "#2C2A27",
        }}
      >
        <label
          htmlFor="deckSelect"
          style={{
            color: "#FFD700",
            display: "block",
            marginBottom: "10px",
          }}
        >
          Add cards to:
        </label>
        <select
          id="deckSelect"
          value={selectedDeckId}
          onChange={(e) => setSelectedDeckId(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #26AEE7",
            marginBottom: "20px",
          }}
        >
          <option value="">-- Select a deck --</option>
          {decks.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* sort buttons wrapped in a flex container */}
        <div className="sort-container">
          <button onClick={() => sortBy("cost")} className="sort-button">
            Sort by Cost
          </button>
          <button onClick={() => sortBy("attack")} className="sort-button">
            Sort by Attack
          </button>
          <button onClick={() => sortBy("health")} className="sort-button">
            Sort by Health
          </button>
        </div>
      </section>

      <section className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #26AEE7",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#2C2A27",
              textAlign: "center",
            }}
          >
            <Link to={`/preview?card=${encodeURIComponent(card.name)}`}>
              <img
                src={`${API_URL}/${card.img}`}
                alt={card.name}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
            </Link>
            <button
              onClick={() => handleAdd(card)}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#26AEE7",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Browse;
