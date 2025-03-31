// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import MyDecks from "./pages/MyDecks";
import Browse from "./pages/Browse";
import Analysis from "./pages/Analysis";
import About from "./pages/About";
import CardPreview from "./pages/CardPreview";
import Nopage from "./pages/Nopage";
import Layout from "./Layout";

function App() {
    return (
        <BrowserRouter basename="/createmydeck">
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Redirect the root to /home */}
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="MyDecks" element={<MyDecks />} />
                    <Route path="Browse" element={<Browse />} />
                    <Route path="Analysis" element={<Analysis />} />
                    <Route path="About" element={<About />} />
                    <Route path="CardPreview" element={<CardPreview />} />
                    <Route path="*" element={<Nopage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
