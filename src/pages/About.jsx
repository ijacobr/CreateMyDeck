import React from "react";
import "./css/styles.css"; // Adjust the path based on your folder structure
import { Link } from "react-router-dom";

const About = () => {
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
                <h2>About Us</h2>
                <section id="content-text">
                    <p>
                        This website is an independent, fan-made project and is
                        not affiliated with, endorsed by, or sponsored by
                        Blizzard Entertainment, Inc. Hearthstone®, along with
                        all related images, artwork, card designs, and
                        trademarks, are the sole property of Blizzard
                        Entertainment, Inc. All Hearthstone assets used on this
                        site are for informational, educational, and
                        entertainment purposes only, in accordance with fair use
                        principles. If you are a representative of Blizzard
                        Entertainment and have any concerns regarding the
                        content on this website, please contact us, and we will
                        promptly address any issues.
                    </p>
                    <p>
                        Our mission is to empower Hearthstone enthusiasts with
                        intuitive deck building and analysis tools. We are
                        passionate about providing an engaging platform that
                        enhances your gameplay and strategic planning. Join us
                        on this journey and elevate your deck-building
                        experience!
                    </p>
                    <p>Contact us at: email@email.com</p>
                    <p>Phone: (555) 555-5555</p>
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            "/projects/images/aboutuspic.png"
                        }
                        alt="About Us"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            marginTop: "20px",
                        }}
                    />
                </section>

                {/* Contact Section Embedded within About */}
                <h2>Contact Us</h2>
                <section id="contact">
                    <div className="contact-container">
                        {/* Contact Form */}
                        <div className="form-container">
                            <form id="contactForm">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                />

                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                />

                                <label htmlFor="subject">Subject:</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                />

                                <label htmlFor="message">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                ></textarea>

                                <button type="submit">Send Message</button>
                                <span id="form-status"></span>
                            </form>
                        </div>
                        {/* IFrame Embed (YouTube Video) */}
                        <div className="iframe-container">
                            <iframe
                                src="https://www.youtube.com/embed/vPguoeYTvMI"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default About;
