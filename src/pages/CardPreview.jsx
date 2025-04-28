import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// normalize helper
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

const API_URL = process.env.REACT_APP_API_URL || "";

const CardPreview = () => {
    const [card, setCard] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let cardKey = params.get("card");
        if (!cardKey) {
            setError("No card selected.");
            return;
        }
        cardKey = normalize(cardKey);

        fetch(`${API_URL}/api/cards`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load cards");
                return res.json();
            })
            .then((cards) => {
                const found = cards.find((c) => normalize(c.name) === cardKey);
                if (found) setCard(found);
                else setError("Unknown card.");
            })
            .catch((err) => setError(err.message));
    }, []);

    return (
        <main style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
            <h2>Card Preview</h2>
            <div id="card-preview" style={{ textAlign: "center" }}>
                <img
                    id="card-image"
                    src={
                        card
                            ? `${API_URL}/${card.img}`
                            : `${API_URL}/projects/images/cards/aldorpeacekeeper.png`
                    }
                    alt={card ? card.name : "Card Preview"}
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        marginBottom: 20,
                    }}
                />
                <div id="card-details">
                    <h3 id="card-name" style={{ color: "#FFD700" }}>
                        {card
                            ? card.name
                            : error
                            ? "Unknown Card"
                            : "No card selected"}
                    </h3>
                    <p id="card-description" style={{ color: "#fff" }}>
                        {card
                            ? card.text
                            : error
                            ? error
                            : "Please select a card from Browse."}
                    </p>
                </div>
            </div>
            <Link
                to="/Browse"
                style={{ display: "block", marginTop: 20, color: "#26AEE7" }}
            >
                ← Back to Browse
            </Link>
        </main>
    );
};

export default CardPreview;
