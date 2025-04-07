import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
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
                <div id="hamburger" className="hamburger" onClick={toggleNav}>
                    &#9776;
                </div>
            </div>
            <nav id="main-nav" className={isNavOpen ? "open" : ""}>
                <Link to="/home">Home</Link>
                <Link to="/MyDecks">My Decks</Link>
                <Link to="/Browse">Browse Cards</Link>
                <Link to="/Analysis">Deck Analysis</Link>
                <Link to="/About">About Us</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
};

export default Header;
