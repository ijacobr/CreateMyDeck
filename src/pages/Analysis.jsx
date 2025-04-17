import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;
const IMG_PATH = process.env.PUBLIC_URL + "/projects/images";

const DeckAnalysis = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/decks`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch decks");
        return res.json();
      })
      .then(setDecks)
      .catch((err) => setError(err.message));
  }, []);

  const selectedDeck = decks.find((d) => d.id === selectedDeckId);

  const analyze = () => {
    setError("");
    setAnalysis(null);
    if (!selectedDeck) {
      setError("Please select a deck to analyze.");
      return;
    }
    const cards = selectedDeck.cards || [];
    if (cards.length === 0) {
      setAnalysis({ message: "This deck has no cards yet.", points: [] });
      return;
    }

    let totalCost = 0,
      totalAttack = 0,
      totalHealth = 0;
    cards.forEach((c) => {
      totalCost += +c.cost;
      totalAttack += +c.attack;
      totalHealth += +c.health;
    });
    const avgCost = totalCost / cards.length;
    const avgAttack = totalAttack / cards.length;
    const avgHealth = totalHealth / cards.length;
    const points = [];

    if (avgCost < 4) points.push("Low average cost…");
    else if (avgCost < 7) points.push("Midrange cost…");
    else points.push("High average cost…");

    if (avgAttack >= 7) points.push("High average attack…");
    else if (avgAttack <= 3) points.push("Low average attack…");

    if (avgHealth >= 7) points.push("High average health…");
    else if (avgHealth <= 3) points.push("Low average health…");

    const diff = avgAttack - avgHealth;
    if (diff >= 3) points.push("Offensive skew…");
    else if (diff <= -3) points.push("Defensive skew…");

    if (avgCost < 4 && avgHealth < 4)
      points.push("Hyper-aggressive…");
    if (avgCost > 7 && avgAttack < 5)
      points.push("Control-oriented…");

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
      <p>Select one of your decks below…</p>

      <section
        style={{
          border: "1px solid #26AEE7",
          borderRadius: 8,
          padding: 20,
          marginBottom: 30,
          backgroundColor: "#2C2A27",
        }}
      >
        <label htmlFor="analysisDeckSelect" style={{ color: "#FFD700" }}>
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
            margin: "10px 0",
          }}
        >
          <option value="">-- Select a deck --</option>
          {decks.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <button onClick={analyze} style={{ padding: "8px 16px" }}>
          Analyze Deck
        </button>
        {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
      </section>

      {selectedDeck && (
        <section style={{ /*… your styles …*/ }}>
          <h3 style={{ color: "#FFD700" }}>
            Cards in “{selectedDeck.name}”
          </h3>
          {selectedDeck.cards.length === 0 ? (
            <p>No cards in this deck.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedDeck.cards.map((c, i) => (
                <li key={i} style={{ padding: "8px 0" }}>
                  {c.name} — Cost: {c.cost}, Attack: {c.attack}, Health:{" "}
                  {c.health}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {analysis && (
        <section
          id="analysis-metrics"
          style={{ display: "flex", gap: 20, margin: "30px 0" }}
        >
          <div className="metric">
            <img
              src={`${IMG_PATH}/mana.png`}
              alt="Mana"
              style={{ width: 40 }}
            />
            <h3>Average Cost</h3>
            <p>{analysis.avgCost}</p>
          </div>
          <div className="metric">
            <img
              src={`${IMG_PATH}/attack.png`}
              alt="Attack"
              style={{ width: 40 }}
            />
            <h3>Average Attack</h3>
            <p>{analysis.avgAttack}</p>
          </div>
          <div className="metric">
            <img
              src={`${IMG_PATH}/health.png`}
              alt="Health"
              style={{ width: 40 }}
            />
            <h3>Average Health</h3>
            <p>{analysis.avgHealth}</p>
          </div>
        </section>
      )}

      {analysis && analysis.points && (
        <section>
          <h3 style={{ color: "#FFD700" }}>Insights</h3>
          <ul>
            {analysis.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </section>
      )}

      {analysis && analysis.message && <p>{analysis.message}</p>}
    </main>
  );
};

export default DeckAnalysis;
