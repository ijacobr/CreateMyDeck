import React, { useEffect, useState } from "react";

const DeckAnalysis = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  // point at your Render server
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://createmydeck-server.onrender.com";

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

  const selectedDeck = decks.find((d) => d.id === selectedDeckId);

  const analyze = () => {
    setError("");
    setAnalysis(null);
    if (!selectedDeck) return setError("Please select a deck first.");
    const cards = selectedDeck.cards || [];
    if (cards.length === 0) {
      return setAnalysis({ message: "This deck has no cards yet.", points: [] });
    }

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

    const points = [];
    // Curve insights
    if (avgCost < 4)
      points.push("Very low curve—lightning starts but may run dry late.");
    else if (avgCost < 7)
      points.push("Moderate curve—flexible early and late.");
    else
      points.push("Heavy curve—game‑ender threat but shaky vs rush.");

    // Attack
    if (avgAttack >= 7)
      points.push("High average attack—strong trades & burst.");
    else if (avgAttack <= 3)
      points.push("Low average attack—may depend on spells or combos.");

    // Health
    if (avgHealth >= 7)
      points.push("High average health—survives board clears.");
    else if (avgHealth <= 3)
      points.push("Low average health—fragile to AoE.");

    // Skew
    const diff = avgAttack - avgHealth;
    if (diff >= 3)
      points.push("Aggressive skew: damage over durability.");
    else if (diff <= -3)
      points.push("Defensive skew: durability over punch.");

    // Combined
    if (avgCost < 4 && avgAttack < 4 && avgHealth < 4)
      points.push("Hyper‑aggro: super fast, aim to finish early.");
    if (avgCost > 7 && avgAttack < 5)
      points.push("Control style: late‑game value over minion damage.");

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
          style={{ color: "#FFD700", display: "block", marginBottom: 10 }}
        >
          Pick a deck:
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
          <option value="">-- Select --</option>
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
        {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
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
          <h3 style={{ color: "#FFD700" }}>
            Cards in “{selectedDeck.name}”
          </h3>
          {selectedDeck.cards.length === 0 ? (
            <p>No cards.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedDeck.cards.map((c, i) => (
                <li
                  key={i}
                  style={{
                    padding: "8px 0",
                    borderBottom:
                      i < selectedDeck.cards.length - 1 &&
                      "1px solid #463C2D",
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
            <h3 style={{ color: "#FFD700" }}>Insights</h3>
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
