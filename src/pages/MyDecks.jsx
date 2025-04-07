import React, { useState } from "react";

const MyDecks = () => {
    const [decks, setDecks] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (deckName.trim() && deckDescription.trim()) {
            const newDeck = {
                name: deckName,
                description: deckDescription,
                cards: [],
            };
            setDecks([...decks, newDeck]);
            setDeckName("");
            setDeckDescription("");
        }
    };

    return (
        <>
            <main>
                <h2>My Decks</h2>
                <p>
                    Manage your decks below. You can add a new deck, edit
                    existing ones, or delete them. All changes are saved locally
                    in your browser.
                </p>

                <section id="deck-form">
                    <form id="deckForm" onSubmit={handleSubmit}>
                        <label htmlFor="deckName">Deck Name:</label>
                        <input
                            type="text"
                            id="deckName"
                            name="deckName"
                            required
                            value={deckName}
                            onChange={(e) => setDeckName(e.target.value)}
                        />

                        <label htmlFor="deckDescription">
                            Deck Description:
                        </label>
                        <textarea
                            id="deckDescription"
                            name="deckDescription"
                            rows="3"
                            required
                            value={deckDescription}
                            onChange={(e) => setDeckDescription(e.target.value)}
                        ></textarea>

                        <button type="submit">Add Deck</button>
                    </form>
                </section>

                <section id="deck-list">
                    <h3>Your Decks</h3>
                    <ul id="deck-ul">
                        {decks.map((deck, index) => (
                            <li key={index}>
                                <strong>{deck.name}</strong>
                                <p>{deck.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
};

export default MyDecks;
