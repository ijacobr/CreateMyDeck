import React, { useEffect, useState } from "react";

const DeckAnalysis = () => {
    const [decks, setDecks] = useState([]);
    const [selectedDeckId, setSelectedDeckId] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");
    const API_URL = process.env.REACT_APP_API_URL || "";
    const IMG_PATH = process.env.PUBLIC_URL + "/projects/images";

    // Fetch decks once
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

        let totalCost = 0,
            totalAttack = 0,
            totalHealth = 0;

        cards.forEach((c) => {
            totalCost += parseInt(c.cost, 10);
            totalAttack += parseInt(c.attack, 10);
            totalHealth += parseInt(c.health, 10);
        });

        const avgCost = totalCost / count;
        const avgAttack = totalAttack / count;
        const avgHealth = totalHealth / count;
        const points = [];

        // Cost
        if (avgCost < 4) {
            points.push(
                "⏩ Low curve (<4): great early pressure, but may fizzle in late game."
            );
        } else if (avgCost < 7) {
            points.push(
                "⚖️ Midrange (4–6): balanced—handles both fast and slow opponents."
            );
        } else {
            points.push(
                "🐘 High curve (>=7): powerful finishers, but watch out for aggro decks."
            );
        }

        // Attack
        if (avgAttack >= 7) {
            points.push(
                "💥 High attack: strong trades and burst—ideal for board control."
            );
        } else if (avgAttack <= 3) {
            points.push(
                "🧙‍♂️ Low attack: might rely on spells/combo rather than minion trades."
            );
        }

        // Health
        if (avgHealth >= 7) {
            points.push(
                "🛡️ High health: resilient minions that soak up removal."
            );
        } else if (avgHealth <= 3) {
            points.push("⚡ Low health: fragile—vulnerable to AoE damage.");
        }

        // Attack vs Health
        const diff = avgAttack - avgHealth;
        if (diff >= 3) {
            points.push("🔪 Offensive skew: big damage, less staying power.");
        } else if (diff <= -3) {
            points.push("🏰 Defensive skew: sturdy minions, slower finish.");
        }

        // Combined patterns
        if (avgCost < 4 && avgHealth < 4) {
            points.push(
                "🌀 Hyper-Aggro: fast and fragile—aim to end before they stabilize."
            );
        }
        if (avgCost > 7 && avgAttack < 5) {
            points.push(
                "🎯 Control-oriented: value over tempo, strong late-game."
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
        <main style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>Deck Analysis</h2>
            <p style={{ marginBottom: "20px" }}>
                Select one of your decks below:
            </p>

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
                    htmlFor="analysisDeckSelect"
                    style={{
                        display: "block",
                        color: "#FFD700",
                        marginBottom: "10px",
                    }}
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
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #26AEE7",
                        marginBottom: "15px",
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
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Analyze Deck
                </button>
                {error && (
                    <p style={{ color: "#ff6b6b", marginTop: "10px" }}>
                        {error}
                    </p>
                )}
            </section>

            {/* ...rest of the rendering remains the same... */}
            {/* metrics and insights sections */}
        </main>
    );
};

export default DeckAnalysis;
