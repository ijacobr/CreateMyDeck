import React, { useEffect, useState } from "react";

const DeckAnalysis = () => {
    const [decks, setDecks] = useState([]);
    const [selectedDeckId, setSelectedDeckId] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const IMG_PATH = process.env.PUBLIC_URL + "/projects/images";

    // Fetch decks once
    useEffect(() => {
        fetch("/api/decks")
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

        // Cost-based insights
        if (avgCost < 4) {
            points.push(
                "Low average cost: this deck excels at early aggression but may run out of steam late."
            );
        } else if (avgCost < 7) {
            points.push(
                "Midrange cost: balanced curve allows flexibility against both aggro and control."
            );
        } else {
            points.push(
                "High average cost: strong late-game powerhouses, but vulnerable to fast decks."
            );
        }

        // Attack-based insights
        if (avgAttack >= 7) {
            points.push(
                "High average attack: strong trades and burst damage—great for pressuring your opponent."
            );
        } else if (avgAttack <= 3) {
            points.push(
                "Low average attack: may rely on spells or combo finishers rather than minion damage."
            );
        }

        // Health-based insights
        if (avgHealth >= 7) {
            points.push(
                "High average health: resilient minions that survive removal and trades."
            );
        } else if (avgHealth <= 3) {
            points.push(
                "Low average health: fragile board presence—beware of AoE removal."
            );
        }

        // Attack vs Health balance
        const diff = avgAttack - avgHealth;
        if (diff >= 3) {
            points.push(
                "Offensive skew: heavy on damage but may lack staying power."
            );
        } else if (diff <= -3) {
            points.push(
                "Defensive skew: durable board control but may struggle to close out games."
            );
        }

        // Additional combined insight
        if (avgCost < 4 && avgHealth < 4) {
            points.push(
                "Hyper-aggressive: fast and fragile—aim to win before the opponent stabilizes."
            );
        }
        if (avgCost > 7 && avgAttack < 5) {
            points.push(
                "Control-oriented: relies on high-value late drops rather than minion damage."
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
                Select one of your decks below to view its card list and key
                metrics.
            </p>

            {/* Deck selection */}
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

            {/* Card list */}
            {selectedDeck && (
                <section
                    style={{
                        border: "1px solid #26AEE7",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "30px",
                        backgroundColor: "#2C2A27",
                    }}
                >
                    <h3 style={{ color: "#FFD700", marginBottom: "15px" }}>
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
                                            i < selectedDeck.cards.length - 1 &&
                                            "1px solid #463C2D",
                                    }}
                                >
                                    <strong>{c.name}</strong> — Cost: {c.cost},
                                    Attack: {c.attack}, Health: {c.health}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}

            {/* Metrics (all on one line) */}
            {analysis && (
                <section
                    id="analysis-metrics"
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                        gap: "20px",
                        marginBottom: "30px",
                    }}
                >
                    <div
                        className="metric"
                        style={{
                            border: "1px solid #26AEE7",
                            borderRadius: "8px",
                            padding: "20px",
                            textAlign: "center",
                            backgroundColor: "#2C2A27",
                            width: "150px",
                        }}
                    >
                        <img
                            src={`${IMG_PATH}/mana.png`}
                            alt="Mana Icon"
                            style={{
                                width: "40px",
                                height: "40px",
                                marginBottom: "10px",
                            }}
                        />
                        <h3 style={{ margin: "10px 0" }}>Average Cost</h3>
                        <p style={{ fontSize: "1.2rem" }}>{analysis.avgCost}</p>
                    </div>

                    <div
                        className="metric"
                        style={{
                            border: "1px solid #26AEE7",
                            borderRadius: "8px",
                            padding: "20px",
                            textAlign: "center",
                            backgroundColor: "#2C2A27",
                            width: "150px",
                        }}
                    >
                        <img
                            src={`${IMG_PATH}/attack.png`}
                            alt="Attack Icon"
                            style={{
                                width: "40px",
                                height: "40px",
                                marginBottom: "10px",
                            }}
                        />
                        <h3 style={{ margin: "10px 0" }}>Average Attack</h3>
                        <p style={{ fontSize: "1.2rem" }}>
                            {analysis.avgAttack}
                        </p>
                    </div>

                    <div
                        className="metric"
                        style={{
                            border: "1px solid #26AEE7",
                            borderRadius: "8px",
                            padding: "20px",
                            textAlign: "center",
                            backgroundColor: "#2C2A27",
                            width: "150px",
                        }}
                    >
                        <img
                            src={`${IMG_PATH}/health.png`}
                            alt="Health Icon"
                            style={{
                                width: "40px",
                                height: "40px",
                                marginBottom: "10px",
                            }}
                        />
                        <h3 style={{ margin: "10px 0" }}>Average Health</h3>
                        <p style={{ fontSize: "1.2rem" }}>
                            {analysis.avgHealth}
                        </p>
                    </div>
                </section>
            )}

            {/* Descriptive insights */}
            {analysis && analysis.points && (
                <section
                    style={{
                        border: "1px solid #26AEE7",
                        borderRadius: "8px",
                        padding: "20px",
                        backgroundColor: "#2C2A27",
                    }}
                >
                    <h3 style={{ color: "#FFD700", marginBottom: "10px" }}>
                        Insights
                    </h3>
                    <ul
                        style={{
                            listStyle: "disc outside",
                            paddingLeft: "20px",
                        }}
                    >
                        {analysis.points.map((point, i) => (
                            <li key={i} style={{ marginBottom: "8px" }}>
                                {point}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Message if no cards */}
            {analysis && analysis.message && (
                <p style={{ color: "#FFD700", marginTop: "20px" }}>
                    {analysis.message}
                </p>
            )}
        </main>
    );
};

export default DeckAnalysis;
