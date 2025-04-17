import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Normalize for matching (lowercase, alphanumeric only)
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

const CardPreview = () => {
    const location = useLocation();
    const [card, setCard] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Base URL for your API
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cardParam = params.get("card");
        if (!cardParam) {
            setError("No card selected. Please choose one from Browse.");
            setLoading(false);
            return;
        }

        const key = normalize(cardParam);

        fetch(`${API_URL}/api/cards`)
            .then((res) => {
                if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
                return res.json();
            })
            .then((cards) => {
                const found = cards.find((c) => normalize(c.name) === key);
                if (!found) {
                    setError(`Unknown card "${cardParam}".`);
                } else {
                    setCard(found);
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Error loading card data.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location.search, API_URL]);

    if (loading) {
        return (
            <main style={{ padding: 20, textAlign: "center" }}>
                <p>Loading card…</p>
            </main>
        );
    }

    return (
        <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h2>Card Preview</h2>

            {error ? (
                <div style={{ color: "#ff6b6b", marginBottom: 20 }}>
                    {error}
                </div>
            ) : (
                <div
                    id="card-preview"
                    style={{
                        border: "1px solid #26AEE7",
                        borderRadius: 8,
                        padding: 20,
                        background: "#2C2A27",
                        textAlign: "center",
                    }}
                >
                    <img
                        src={`${API_URL}/${card.img}`}
                        alt={card.name}
                        style={{
                            maxWidth: "100%",
                            maxHeight: 300,
                            objectFit: "contain",
                            marginBottom: 15,
                        }}
                    />
                    <h3 style={{ color: "#FFD700", margin: "10px 0" }}>
                        {card.name}
                    </h3>
                    <p style={{ margin: "10px 0" }}>{card.text}</p>
                    <p style={{ fontStyle: "italic", marginBottom: 0 }}>
                        Cost: {card.cost} &nbsp;|&nbsp; Attack: {card.attack}{" "}
                        &nbsp;|&nbsp; Health: {card.health}
                    </p>
                </div>
            )}

            <Link
                to="/Browse"
                style={{
                    display: "inline-block",
                    marginTop: 20,
                    color: "#26AEE7",
                    textDecoration: "underline",
                }}
            >
                ← Back to Browse
            </Link>
        </main>
    );
};

export default CardPreview;
