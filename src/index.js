import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import pages and shared components
import Header from "./components/Header";
import Home from "./pages/Home";
import MyDecks from "./pages/MyDecks";
import BrowseCards from "./pages/Browse";
import DeckAnalysis from "./pages/Analysis";
import About from "./pages/About";
import CardPreview from "./pages/CardPreview";
import Contact from "./pages/Contact";

// Import global styles (index.css is next to index.js)
import "./index.css";

const Root = () => {
  return (
    <Router>
      {/* Shared Header appears on every page */}
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/MyDecks" element={<MyDecks />} />
        <Route path="/Browse" element={<BrowseCards />} />
        <Route path="/Analysis" element={<DeckAnalysis />} />
        <Route path="/About" element={<About />} />
        <Route path="/preview" element={<CardPreview />} />
        <Route path="/contact" element={<Contact />} />
        {/* Redirect any unknown path to Home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
