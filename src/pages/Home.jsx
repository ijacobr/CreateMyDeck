import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <main>
                <section id="hero">
                    <h2>Welcome to CreateMyDeck</h2>
                    <p>
                        Your one-stop site for building, analyzing, and
                        mastering your Hearthstone decks. Explore our features
                        and start crafting your perfect deck today!
                    </p>
                </section>

                <section id="features">
                    <div className="feature">
                        <h3>Build Your Deck</h3>
                        <p>
                            Drag and drop your favorite cards to create a deck
                            that suits your playstyle.
                        </p>
                    </div>
                    <div className="feature">
                        <h3>Analyze Your Strategy</h3>
                        <p>
                            Get in-depth analysis on your deck's strengths and
                            weaknesses.
                        </p>
                    </div>
                    <div className="feature">
                        <h3>Preview Cards</h3>
                        <p>
                            Click on a card to see detailed stats and art on a
                            dedicated preview page.
                        </p>
                        {/* Passing a default query parameter so that a valid card appears */}
                        <Link
                            to="/preview?card=aldorpeacekeeper"
                            className="preview-link"
                        >
                            View Preview
                        </Link>
                    </div>
                </section>

                <section id="blog-updates">
                    <h3>Blog Updates</h3>
                    <article>
                        <p className="date">2/7/25</p>
                        <p>
                            Hey Hearthstone fans! 🎉 We're excited to bring you
                            the latest updates to our Deck Builder & Analyzer.
                            Enjoy our new features and let us know your
                            feedback!
                        </p>
                    </article>
                </section>
            </main>
        </>
    );
};

export default Home;
