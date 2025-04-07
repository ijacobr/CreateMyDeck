import React from "react";

const DeckAnalysis = () => {
  return (
    <>
      <main>
        <h2>Deck Analysis</h2>
        <p id="analysis-intro">
          Welcome to Deck Analysis! Here, you can get a detailed breakdown of your deck's performance.
          Review average stats, identify strengths and weaknesses, and discover strategies to enhance your gameplay.
        </p>
        <p>
          Before you begin, here are some key metrics: Average Cost, Average Attack, and Average Health.
          Use these insights to refine your deck and tailor your playstyle.
        </p>

        <section>
          <label htmlFor="analysisDeckSelect">Analyze which deck?</label>
          <select id="analysisDeckSelect">
            <option value="">-- Select a deck --</option>
            {/* Options can be populated dynamically */}
          </select>
          <button id="analyzeDeckBtn">Analyze Deck</button>
        </section>

        <section id="analysis-deck-list">
          {/* Deck cards will be listed dynamically */}
        </section>

        <section id="analysis-metrics">
          <div className="metric">
            <img
              src={process.env.PUBLIC_URL + "/projects/images/mana.png"}
              alt="Mana Icon"
              style={{ width: "50px", height: "50px", display: "block", margin: "0 auto" }}
            />
            <h3>Average Cost</h3>
            <p id="avg-cost"></p>
          </div>
          <div className="metric">
            <img
              src={process.env.PUBLIC_URL + "/projects/images/attack.png"}
              alt="Attack Icon"
              style={{ width: "50px", height: "50px", display: "block", margin: "0 auto" }}
            />
            <h3>Average Attack</h3>
            <p id="avg-attack"></p>
          </div>
          <div className="metric">
            <img
              src={process.env.PUBLIC_URL + "/projects/images/health.png"}
              alt="Health Icon"
              style={{ width: "50px", height: "50px", display: "block", margin: "0 auto" }}
            />
            <h3>Average Health</h3>
            <p id="avg-health"></p>
          </div>
        </section>

        <section id="analysis-description">
          <p id="deck-description"></p>
        </section>
      </main>
    </>
  );
};

export default DeckAnalysis;
