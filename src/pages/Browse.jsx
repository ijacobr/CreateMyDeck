import React from "react";
import "./css/styles.css"; // Adjust the path as needed
import { Link } from "react-router-dom";

const BrowseCards = () => {
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
                <h2>Browse Cards</h2>
                <p>
                    Select a deck to add cards to, or simply view the
                    collection. Click any of the sort buttons below to view
                    cards from highest to lowest by cost, attack, or health.
                    Then click "Add" to place a card into your chosen deck.
                </p>

                {/* Deck selection dropdown */}
                <section id="deck-dropdown">
                    <label htmlFor="deckSelect">Add cards to:</label>
                    <select id="deckSelect">
                        <option value="">-- Select a deck --</option>
                        {/* Options will be populated dynamically */}
                    </select>
                </section>

                {/* Sorting Section */}
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

                {/* Card Gallery (grid layout) */}
                <section id="card-gallery" className="grid">
                    {/* Cards will be loaded dynamically */}
                </section>
            </main>
        </>
    );
};

export default BrowseCards;
