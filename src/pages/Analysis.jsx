// src/pages/Analysis.jsx

import React, { useEffect, useState } from "react";

const DeckAnalysis = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  // use the render.com URL in production, localhost in dev
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
  const IMG_PATH = process.env.PUBLIC_URL + "/projects/images";

  // fetch decks from remote API
  useEffect(() => {
    fetch(`${API_URL}/api/decks`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch decks");
        return res.json();
      })
      .then(setDecks)
      .catch((err) => setError(err.message));
  }, [API_URL]);

  const selectedDeck = decks.find((d) => d.id === selectedDeckId);

  const analyze = () => {
    setError("");
    setAnalysis(null);

    if (!selectedDeck) {
      setError("Please select a deck to analyze.");
      return;
    }
    const cards = selectedDeck.cards || [];
    const count = cards.length;
    if (count === 0) {
      setAnalysis({ message: "This deck has no cards yet.", points: [] });
      return;
    }

    // compute totals & curve buckets
    let totalCost = 0,
      totalAttack = 0,
      totalHealth = 0;
    let lowCount = 0,
      midCount = 0,
      highCount = 0;

    cards.forEach((c) => {
      const cost = parseInt(c.cost, 10);
      totalCost += cost;
      totalAttack += parseInt(c.attack, 10);
      totalHealth += parseInt(c.health, 10);
      if (cost <= 3) lowCount++;
      else if (cost <= 6) midCount++;
      else highCount++;
    });

    const avgCost = totalCost / count;
    const avgAttack = totalAttack / count;
    const avgHealth = totalHealth / count;
    const points = [];

    // summary
    points.push(`Total cards: ${count}`);
    points.push(`Curve: ${lowCount} low, ${midCount} mid, ${highCount} high`);

    // curve type
    if (avgCost < 3) points.push("Hyper‑aggro curve — extremely fast start");
    else if (avgCost < 4.5) points.push("Aggro curve — strong early pressure");
    else if (avgCost < 6) points.push("Midrange curve — balanced throughout");
    else points.push("Control/Late‑game curve — heavy endgame focus");

    // attack insights
    if (avgAttack >= 7) points.push("High avg attack — excels at trades/burst");
    else if (avgAttack >= 4) points.push("Moderate avg attack — versatile trades");
    else points.push("Low avg attack — likely spell/combo reliant");

    // health insights
    if (avgHealth >= 7) points.push("High avg health — minions survive removal");
    else if (avgHealth >= 4) points.push("Moderate avg health — mix of sturdy & fragile");
    else points.push("Low avg health — vulnerable to AoE");

    // attack vs health balance
    const diff = avgAttack - avgHealth;
    if (diff >= 3) points.push("Offensive skew — more damage than staying power");
    else if (diff <= -3) points.push("Defensive skew — durable but may lack punch");
    else points.push("Balanced offense/defense profile");

    // additional curve tips
    if (lowCount / count > 0.5) points.push(">50% low‑cost cards — may fizzle late");
    if (highCount / count > 0.3) points.push(">30% high‑cost cards — consider more early plays");
    if (midCount / count > 0.4) points.push("Midrange heavy — very adaptable");

    setAnalysis({
      avgCost: avgCost.toFixed(1),
      avgAttack: avgAttack.toFixed(1),
      avgHealth: avgHealth.toFixed(1),
      points,
    });
  };

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Deck Analysis</h2>
      <p>Select a deck to see detailed metrics and tailored insights.</p>

      {/* deck selector */}
      <section style={{
        border: "1px solid #26AEE7",
        borderRadius: 8,
        padding: 20,
        marginBottom: 30,
        backgroundColor: "#2C2A27"
      }}>
        <label htmlFor="analysisDeckSelect" style={{ color: "#FFD700", marginBottom: 10, display: "block" }}>
          Which deck?
        </label>
        <select
          id="analysisDeckSelect"
          value={selectedDeckId}
          onChange={(e) => { setSelectedDeckId(e.target.value); setAnalysis(null); setError(""); }}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #26AEE7",
            marginBottom: 15
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
            cursor: "pointer"
          }}
        >
          Analyze Deck
        </button>
        {error && <p style={{ color: "#ff6b6b", marginTop: 10 }}>{error}</p>}
      </section>

      {/* card list */}
      {selectedDeck && (
        <section style={{
          border: "1px solid #26AEE7",
          borderRadius: 8,
          padding: 20,
          marginBottom: 30,
          backgroundColor: "#2C2A27"
        }}>
          <h3 style={{ color: "#FFD700", marginBottom: 15 }}>
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
                      i < selectedDeck.cards.length - 1 && "1px solid #463C2D"
                  }}
                >
                  <strong>{c.name}</strong> — Cost: {c.cost}, Attack: {c.attack}, Health: {c.health}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* metrics row */}
      {analysis && (
        <section id="analysis-metrics" style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginBottom: 30
        }}>
          {[
            { icon: "mana.png", label: "Average Cost", value: analysis.avgCost },
            { icon: "attack.png", label: "Average Attack", value: analysis.avgAttack },
            { icon: "health.png", label: "Average Health", value: analysis.avgHealth }
          ].map((m) => (
            <div key={m.label} style={{
              border: "1px solid #26AEE7",
              borderRadius: 8,
              padding: 20,
              textAlign: "center",
              backgroundColor: "#2C2A27",
              width: 150
            }}>
              <img
                src={`${IMG_PATH}/${m.icon}`}
                alt={m.label}
                style={{ width: 40, height: 40, marginBottom: 10 }}
              />
              <h3 style={{ margin: "10px 0" }}>{m.label}</h3>
              <p style={{ fontSize: "1.2rem" }}>{m.value}</p>
            </div>
          ))}
        </section>
      )}

      {/* insights */}
      {analysis && (
        <section style={{
          border: "1px solid #26AEE7",
          borderRadius: 8,
          padding: 20,
          backgroundColor: "#2C2A27"
        }}>
          <h3 style={{ color: "#FFD700", marginBottom: 10 }}>Insights</h3>
          <ul style={{ listStyle: "disc outside", paddingLeft: 20 }}>
            {analysis.points.map((pt, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                {pt}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default DeckAnalysis;
