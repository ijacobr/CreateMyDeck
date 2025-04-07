import React, { useEffect, useState } from "react";

const BrowseCards = () => {
    const [cards, setCards] = useState([]);
    // Use the REACT_APP_API_URL environment variable or default to localhost
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

    useEffect(() => {
        fetch(`${API_URL}/api/cards`)
            .then((response) => response.json())
            .then((data) => setCards(data))
            .catch((err) => console.error("Error fetching cards:", err));
    }, [API_URL]);

    return (
        <>
            <main>
                <h2>Browse Cards</h2>
                <p>
                    Select a deck to add cards to, or simply view the
                    collection. Click any of the sort buttons below to view
                    cards from highest to lowest by cost, attack, or health.
                    Then click "Add" to place a card into your chosen deck.
                </p>

                <section id="deck-dropdown">
                    <label htmlFor="deckSelect">Add cards to:</label>
                    <select id="deckSelect">
                        <option value="">-- Select a deck --</option>
                        {/* Options can be populated dynamically */}
                    </select>
                </section>

                <section id="card-sort">
                    <button className="sort-button" data-sort="cost">
                        Sort by Cost
                    </button>
                    <button className="sort-button" data-sort="attack">
                        Sort by Attack
                    </button>
                    <button className="sort-button" data-sort="health">
                        Sort by Health
                    </button>
                </section>

                <section id="card-gallery" className="grid">
                    {cards.map((card) => (
                        <div key={card.id} className="card">
                            <img
                                src={process.env.PUBLIC_URL + "/" + card.img}
                                alt={card.name}
                            />
                            <h3>{card.name}</h3>
                            <p>
                                <strong>Cost:</strong> {card.cost}
                            </p>
                            <p>
                                <strong>Attack:</strong> {card.attack}
                            </p>
                            <p>
                                <strong>Health:</strong> {card.health}
                            </p>
                            <p>{card.text}</p>
                            <button>Add</button>
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
};

export default BrowseCards;
