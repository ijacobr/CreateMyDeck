// src/pages/Analysis.jsx
import React, { useEffect, useState } from "react";

const DeckAnalysis = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  // point to your live server
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://createmydeck-server.onrender.com";

  // 1) fetch decks on mount
  useEffect(() => {
    setError("");
    fetch(`${API_URL}/api/decks`)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Loaded decks:", data);
        setDecks(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load decks.");
      });
  }, [API_URL]);

  const analyze = () => {
    setError("");
    setAnalysis(null);

    if (!selectedDeckId) {
      return setError("Please select a deck first.");
    }
    const deck = decks.find((d) => d.id === selectedDeckId);
    console.log("Analyzing deck:", deck);
    if (!deck) {
      return setError("Selected deck not found in state.");
    }

    const cards = deck.cards || [];
    if (cards.length === 0) {
      window.alert("This deck has no cards!");
      return setAnalysis({ message: "Deck empty—add some cards!", points: [] });
    }

    // compute averages
    let totalCost = 0,
      totalAtk = 0,
      totalHp = 0;
    cards.forEach((c) => {
      totalCost += +c.cost;
      totalAtk += +c.attack;
      totalHp += +c.health;
    });
    const avgCost = totalCost / cards.length;
    const avgAtk = totalAtk / cards.length;
    const avgHp = totalHp / cards.length;

    // build insights
    const points = [];
    if (avgCost < 4) points.push("⚡ Very low curve—fast starts!");
    else if (avgCost < 7) points.push("⚖️ Mid curve—well‑balanced.");
    else points.push("🐢 High curve—late‑game powerhouses.");

    if (avgAtk >= 7) points.push("💥 High attack—burst damage.");
    else if (avgAtk <= 3) points.push("🔮 Low attack—may rely on spells.");

    if (avgHp >= 7) points.push("🛡️ High health—survives clears.");
    else if (avgHp <= 3) points.push("⚗️ Fragile—watch out for AoE.");

    const diff = avgAtk - avgHp;
    if (diff >= 3) points.push("🔪 Offensive skew—go face!");
    else if (diff <= -3) points.push("🛡️ Defensive skew—value minions.");

    // combined
    if (avgCost < 4 && avgHp < 4)
      points.push("🏃 Hyper‑aggro—end game quickly!");
    if (avgCost > 7 && avgAtk < 5)
      points.push("🎯 Control style—value cards over damage.");

    // pop up the “dialog”
    window.alert(
      `Analysis for “${deck.name}”:\n• Avg Cost: ${avgCost.toFixed(
        1
      )}\n• Avg Atk: ${avgAtk.toFixed(1)}\n• Avg HP: ${avgHp.toFixed(
        1
      )}\n\nInsights:\n- ${points.join("\n- ")}`
    );

    setAnalysis({
      avgCost: avgCost.toFixed(1),
      avgAttack: avgAtk.toFixed(1),
      avgHealth: avgHp.toFixed(1),
      points,
      message: "",
    });
  };

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Deck Analysis</h2>

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
            borderRadius: 4,
            border: "1px solid #26AEE7",
            marginBottom: 15,
          }}
        >
          <option value="">-- select a deck --</option>
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
            {[
              { icon: "mana", label: "Avg Cost", value: analysis.avgCost },
              {
                icon: "attack",
                label: "Avg Attack",
                value: analysis.avgAttack,
              },
              {
                icon: "health",
                label: "Avg Health",
                value: analysis.avgHealth,
              },
            ].map((m) => (
              <div
                key={m.icon}
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
                  src={`${process.env.PUBLIC_URL}/projects/images/${m.icon}.png`}
                  alt={m.label}
                  style={{ width: 40, height: 40, marginBottom: 10 }}
                />
                <h4 style={{ margin: "10px 0" }}>{m.value}</h4>
                <p style={{ fontSize: "0.85rem" }}>{m.label}</p>
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
                <li key={i} style={{ marginBottom: 8, color: "#fff" }}>
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
