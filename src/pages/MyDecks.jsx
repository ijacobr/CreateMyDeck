import React, { useState } from "react";
import "./css/styles.css"; // Adjust the path as needed
import { Link } from "react-router-dom";

const MyDecks = () => {
    // State for deck list and form inputs
    const [decks, setDecks] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");

    // Handle form submission
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
            <header>
                <div id="top-main">
                    <img
                        id="main-img"
                        src={
                            process.env.PUBLIC_URL + "/projects/images/logo.PNG"
                        }
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
                <h2>My Decks</h2>
                <p>
                    Manage your decks below. You can add a new deck, edit
                    existing ones, or delete them. All changes are saved locally
                    in your browser.
                </p>

                {/* Form to add/edit decks */}
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

                {/* List of decks */}
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
