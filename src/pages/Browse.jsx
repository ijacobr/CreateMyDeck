import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL =
    process.env.REACT_APP_API_URL || "https://createmydeck-server.onrender.com";

const Browse = () => {
    const [cards, setCards] = useState([]);
    const [decks, setDecks] = useState([]);
    const [selectedDeckId, setSelectedDeckId] = useState("");

    // fetch all cards from your Render server
    useEffect(() => {
        fetch(`${API_URL}/api/cards`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch cards");
                return res.json();
            })
            .then(setCards)
            .catch((err) => console.error(err));
    }, []);

    // fetch all decks
    useEffect(() => {
        fetch(`${API_URL}/api/decks`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch decks");
                return res.json();
            })
            .then(setDecks)
            .catch((err) => console.error(err));
    }, []);

    const sortBy = (metric) =>
        setCards((cards) => [...cards].sort((a, b) => +b[metric] - +a[metric]));

    const handleAdd = async (card) => {
        if (!selectedDeckId) {
            return alert("Select a deck first");
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
            const { success, message } = await res.json();
            if (!success) throw new Error(message);
            alert(`${card.name} added!`);
        } catch (e) {
            alert("Error: " + e.message);
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
                    style={{
                        color: "#FFD700",
                        display: "block",
                        marginBottom: 10,
                    }}
                >
                    Add cards to:
                </label>
                <select
                    value={selectedDeckId}
                    onChange={(e) => setSelectedDeckId(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 8,
                        marginBottom: 20,
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

                <div
                    className="sort-buttons-container"
                    style={{ textAlign: "center" }}
                >
                    <button
                        onClick={() => sortBy("cost")}
                        className="sort-button"
                    >
                        Sort by Cost
                    </button>
                    <button
                        onClick={() => sortBy("attack")}
                        className="sort-button"
                    >
                        Sort by Attack
                    </button>
                    <button
                        onClick={() => sortBy("health")}
                        className="sort-button"
                    >
                        Sort by Health
                    </button>
                </div>
            </section>

            <section className="grid">
                {cards.map((c) => (
                    <div
                        key={c.id}
                        style={{
                            border: "1px solid #26AEE7",
                            borderRadius: 8,
                            padding: 10,
                            backgroundColor: "#2C2A27",
                        }}
                    >
                        <Link
                            to={`/preview?card=${encodeURIComponent(c.name)}`}
                        >
                            <img
                                src={`${API_URL}/${c.img}`}
                                alt={c.name}
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    maxWidth: "100%",
                                    maxHeight: 200,
                                    objectFit: "contain",
                                }}
                            />
                        </Link>

                        <button
                            style={{
                                marginTop: 10,
                                padding: "8px 16px",
                                backgroundColor: "#26AEE7",
                                color: "#fff",
                                border: "none",
                                borderRadius: 4,
                                cursor: "pointer",
                            }}
                            onClick={() => handleAdd(c)}
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
