import React, { useState, useEffect } from "react";
import "./css/styles.css"; // Adjust the path based on your folder structure
import { Link } from "react-router-dom";

// Helper function to normalize strings
const normalize = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const CardPreview = () => {
    const [card, setCard] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let cardKey = params.get("card");

        if (!cardKey) {
            setError(
                "No card selected. Please select a card from the Browse page."
            );
            return;
        }

        cardKey = normalize(cardKey);

        fetch("/projects/json/cards.json")
            .then((response) => response.json())
            .then((cards) => {
                const foundCard = cards.find(
                    (c) => normalize(c.name) === cardKey
                );
                if (foundCard) {
                    setCard(foundCard);
                } else {
                    setError("Unknown Card. No description available.");
                }
            })
            .catch((err) => {
                console.error("Error loading card data:", err);
                setError("Error loading card data.");
            });
    }, []);

    return (
        <>
            <header>
                <div id="top-main">
                    <img
                        id="main-img"
                        src="/projects/images/logo.PNG"
                        alt="CreateMyDeck Logo"
                    />
                    <h1 id="main-header">CreateMyDeck</h1>
                    <button id="main-btn">Log In</button>
                    <div id="hamburger" className="hamburger">
                        &#9776;
                    </div>
                </div>
                <nav id="main-nav">
                    <Link to="/home">Home</Link>
                    <Link to="/MyDecks">My Decks</Link>
                    <Link to="/Browse">Browse Cards</Link>
                    <Link to="/Analysis">Deck Analysis</Link>
                    <Link to="/About">About Us</Link>
                </nav>
            </header>

            <main>
                <h2>Card Preview</h2>
                <div id="card-preview">
                    <img
                        id="card-image"
                        src={
                            card
                                ? `/${card.img}`
                                : "/projects/images/cards/aldorpeacekeeper.png"
                        }
                        alt={card ? card.name : "Card Preview"}
                    />
                    <div id="card-details">
                        <h3 id="card-name">
                            {card
                                ? card.name
                                : error
                                ? "Unknown Card"
                                : "No card selected"}
                        </h3>
                        <p id="card-description">
                            {card
                                ? card.text
                                : error
                                ? error
                                : "Please select a card from the Browse page."}
                        </p>
                        <p id="card-stats">
                            {card
                                ? `Cost: ${card.cost}, Attack: ${card.attack}, Health: ${card.health}`
                                : ""}
                        </p>
                    </div>
                </div>
                <a href="/browse" className="back-link">
                    Back to Browse
                </a>
            </main>
        </>
    );
};

export default CardPreview;
