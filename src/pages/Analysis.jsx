// src/pages/Analysis.jsx

import React, { useEffect, useState } from "react";

const DeckAnalysis = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  // Always default to your Render URL if the env var isn't set
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://createmydeck-server.onrender.com";

  // Fetch decks once on mount
  useEffect(() => {
    setError("");
    fetch(`${API_URL}/api/decks`)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then(setDecks)
      .catch((err) => setError(err.message));
  }, [API_URL]);

  // Find the deck object whenever selection changes
  const selectedDeck = decks.find((d) => d.id === selectedDeckId);

  const analyze = () => {
    setError("");
    setAnalysis(null);

    if (!selectedDeck) {
      setError("Please select a deck first.");
      return;
    }
    const cards = selectedDeck.cards || [];
    if (cards.length === 0) {
      setAnalysis({ message: "This deck has no cards yet.", points: [] });
      return;
    }

    // Compute averages
    let totalCost = 0,
      totalAttack = 0,
      totalHealth = 0;
    cards.forEach((c) => {
      totalCost += parseInt(c.cost, 10);
      totalAttack += parseInt(c.attack, 10);
      totalHealth += parseInt(c.health, 10);
    });
    const avgCost = totalCost / cards.length;
    const avgAttack = totalAttack / cards.length;
    const avgHealth = totalHealth / cards.length;

    // Build insight points
    const points = [];
    if (avgCost < 4) {
      points.push(
        "Very low average cost – excellent early game but may fizzle out late."
      );
    } else if (avgCost < 7) {
      points.push(
        "Moderate curve – balanced early and late game presence."
      );
    } else {
      points.push(
        "High cost curve – strong late drops but vulnerable to rush decks."
      );
    }

    if (avgAttack >= 7) {
      points.push(
        "High attack – strong trading power and potential burst damage."
      );
    } else if (avgAttack <= 3) {
      points.push(
        "Low attack – likely relies on spells or synergy rather than raw damage."
      );
    }

    if (avgHealth >= 7) {
      points.push(
        "High health – resilient minions that survive board clears."
      );
    } else if (avgHealth <= 3) {
      points.push(
        "Low health – fragile board that can be cleared by AoE."
      );
    }

    const diff = avgAttack - avgHealth;
    if (diff >= 3) {
      points.push(
        "Offensive skew: high damage minions but may lack staying power."
      );
    } else if (diff <= -3) {
      points.push(
        "Defensive skew: durable minions but may struggle to finish games."
      );
    }

    // Combo insights
    if (avgCost < 4 && avgAttack < 4 && avgHealth < 4) {
      points.push(
        "Hyper-aggressive: extremely fast, play two turns ahead but beware stabilizers."
      );
    }
    if (avgCost > 7 && avgAttack < 5) {
      points.push(
        "Control-style: late-game value engines rather than minion aggression."
      );
    }

    setAnalysis({
      avgCost: avgCost.toFixed(1),
      avgAttack: avgAttack.toFixed(1),
      avgHealth: avgHealth.toFixed(1),
      points,
      message: "",
    });
  };

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Deck Analysis</h2>
      <p>Select a deck below and click “Analyze Deck” to see its metrics.</p>

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
          htmlFor="analysisDeckSelect"
          style={{ color: "#FFD700", marginBottom: 10, display: "block" }}
        >
          Which deck?
        </label>
        <select
          id="analysisDeckSelect"
          value={selectedDeckId}
          onChange={(e) => {
            setSelectedDeckId(e.target.value);
            setAnalysis(null);
            setError("");
          }}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 15,
            borderRadius: 4,
            border: "1px solid #26AEE7",
          }}
        >
          <option value="">-- Select a deck --</option>
          {decks.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <button
          onClick={analyze}
          style={{
            padding: "10px 20px",
            backgroundColor: "#26AEE7",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Analyze Deck
        </button>
        {error && (
          <p style={{ color: "#ff6b6b", marginTop: 10 }}>{error}</p>
        )}
      </section>

      {selectedDeck && (
        <section
          style={{
            border: "1px solid #26AEE7",
            borderRadius: 8,
            padding: 20,
            marginBottom: 30,
            backgroundColor: "#2C2A27",
          }}
        >
          <h3 style={{ color: "#FFD700", marginBottom: 10 }}>
            Cards in “{selectedDeck.name}”
          </h3>
          {selectedDeck.cards.length === 0 ? (
            <p>No cards in this deck.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedDeck.cards.map((c, i) => (
                <li
                  key={i}
                  style={{
                    padding: "8px 0",
                    borderBottom:
                      i < selectedDeck.cards.length - 1 && "1px solid #463C2D",
                  }}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {analysis && (
        <>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginBottom: 30,
            }}
          >
            {["mana", "attack", "health"].map((icon, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #26AEE7",
                  borderRadius: 8,
                  padding: 20,
                  textAlign: "center",
                  backgroundColor: "#2C2A27",
                  width: 120,
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/projects/images/${icon}.png`}
                  alt={`${icon} icon`}
                  style={{ width: 40, height: 40, marginBottom: 10 }}
                />
                <h4 style={{ margin: "10px 0" }}>
                  {icon === "mana"
                    ? analysis.avgCost
                    : icon === "attack"
                    ? analysis.avgAttack
                    : analysis.avgHealth}
                </h4>
                <p style={{ fontSize: "0.9rem" }}>
                  {icon === "mana"
                    ? "Avg Cost"
                    : icon === "attack"
                    ? "Avg Attack"
                    : "Avg Health"}
                </p>
              </div>
            ))}
          </section>

          <section
            style={{
              border: "1px solid #26AEE7",
              borderRadius: 8,
              padding: 20,
              backgroundColor: "#2C2A27",
            }}
          >
            <h3 style={{ color: "#FFD700", marginBottom: 10 }}>Insights</h3>
            <ul style={{ paddingLeft: 20 }}>
              {analysis.points.map((pt, i) => (
                <li key={i} style={{ marginBottom: 8 }}>
                  {pt}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
};

export default DeckAnalysis;
