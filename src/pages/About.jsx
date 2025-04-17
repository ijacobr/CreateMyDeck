import React from "react";

const About = () => {
    return (
        <>
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

                <h2>Contact Us</h2>
                <section id="contact">
                    <div className="contact-container">
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
                        <div className="iframe-container">
                            <iframe
                                src="https://www.youtube.com/embed/vPguoeYTvMI"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube Video"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default About;
