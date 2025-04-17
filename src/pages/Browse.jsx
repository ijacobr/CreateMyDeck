import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL || "http://localhost:3001"
    : "https://createmydeck-server.onrender.com";

const Browse = () => {
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/cards`)
      .then((res) => res.json())
      .then(setCards)
      .catch((err) => console.error("Error fetching cards:", err));
    fetch(`${API_URL}/api/decks`)
      .then((res) => res.json())
      .then(setDecks)
      .catch((err) => console.error("Error fetching decks:", err));
  }, []);

  const sortBy = (field) => {
    setCards((prev) =>
      [...prev].sort(
        (a, b) => parseInt(b[field], 10) - parseInt(a[field], 10)
      )
    );
  };

  const handleAdd = async (card) => {
    if (!selectedDeckId) {
      alert("Please select a deck first.");
      return;
    }
    try {
      const res = await fetch(
        `${API_URL}/api/decks/${selectedDeckId}/cards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(card),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Server error");
      alert(`${card.name} added to deck!`);
    } catch (err) {
      alert("Error adding card: " + err.message);
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Browse Cards</h2>

      <section
        style={{
          border: "1px solid #26AEE7",
          borderRadius: 8,
          padding: 20,
          marginBottom: 30,
          backgroundColor: "#2C2A27",
        }}
      >
        <label
          htmlFor="deckSelect"
          style={{ color: "#FFD700", marginBottom: 10, display: "block" }}
        >
          Add cards to:
        </label>
        <select
          id="deckSelect"
          value={selectedDeckId}
          onChange={(e) => setSelectedDeckId(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #26AEE7",
            marginBottom: 20,
          }}
        >
          <option value="">-- Select a deck --</option>
          {decks.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["cost", "attack", "health"].map((m) => (
            <button
              key={m}
              onClick={() => sortBy(m)}
              className="sort-button"
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                border: "1px solid #FFD700",
                color: "#FFD700",
                cursor: "pointer",
              }}
            >
              Sort by {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #26AEE7",
              borderRadius: 8,
              padding: 10,
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
                  maxHeight: 200,
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
            </Link>
            <button
              onClick={() => handleAdd(card)}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                backgroundColor: "#26AEE7",
                color: "#fff",
                border: "none",
                borderRadius: 4,
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
