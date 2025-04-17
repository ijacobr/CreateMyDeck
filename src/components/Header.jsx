import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => setIsNavOpen((open) => !open);

    // Close mobile nav when a link is clicked
    const handleLinkClick = () => {
        if (isNavOpen) setIsNavOpen(false);
    };

    return (
        <header>
            <div id="top-main">
                <img
                    id="main-img"
                    src={process.env.PUBLIC_URL + "/projects/images/logo.PNG"}
                    alt="CreateMyDeck Logo"
                />
                <h1 id="main-header">CreateMyDeck</h1>
                <button id="main-btn">Log In</button>
                <button
                    id="hamburger"
                    className="hamburger"
                    onClick={toggleNav}
                    aria-label="Toggle navigation"
                    aria-expanded={isNavOpen}
                >
                    &#9776;
                </button>
            </div>

            <nav id="main-nav" className={isNavOpen ? "open" : ""}>
                <Link to="/home" onClick={handleLinkClick}>
                    Home
                </Link>
                <Link to="/MyDecks" onClick={handleLinkClick}>
                    My Decks
                </Link>
                <Link to="/Browse" onClick={handleLinkClick}>
                    Browse Cards
                </Link>
                <Link to="/Analysis" onClick={handleLinkClick}>
                    Deck Analysis
                </Link>
                <Link to="/About" onClick={handleLinkClick}>
                    About Us
                </Link>
            </nav>
        </header>
    );
};
export default Header;
