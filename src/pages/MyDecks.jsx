// src/pages/MyDecks.jsx
import React, { useState, useEffect } from "react";

const MyDecks = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const [decks, setDecks] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load decks from server
  useEffect(() => {
    fetch(`${API_URL}/api/decks`)
      .then((res) => {
        if (!res.ok) throw new Error(`Load error: ${res.status}`);
        return res.json();
      })
      .then(setDecks)
      .catch((err) => setErrorMsg(err.message));
  }, [API_URL]);

  // Handle file input
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0] || null);
  };

  // Create a new deck
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!deckName.trim() || !deckDescription.trim()) {
      setErrorMsg("Name and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", deckName.trim());
    formData.append("description", deckDescription.trim());
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await fetch(`${API_URL}/api/decks`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Server error");
      setDecks((prev) => [...prev, data.deck]);
      setDeckName("");
      setDeckDescription("");
      setSelectedFile(null);
      setSuccessMsg("Deck created!");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Delete a deck
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this deck?")) return;
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/decks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Delete failed");
      setDecks((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>My Decks</h2>

      <section
        style={{
          border: "1px solid #26AEE7",
          borderRadius: 8,
          padding: 20,
          marginBottom: 30,
          backgroundColor: "#2C2A27",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label style={{ color: "#FFD700", marginBottom: 5 }}>
            Deck Name
          </label>
          <input
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            required
            style={{
              padding: 8,
              borderRadius: 4,
              border: "1px solid #26AEE7",
              marginBottom: 15,
            }}
          />

          <label style={{ color: "#FFD700", marginBottom: 5 }}>
            Description
          </label>
          <textarea
            value={deckDescription}
            onChange={(e) => setDeckDescription(e.target.value)}
            rows="3"
            required
            style={{
              padding: 8,
              borderRadius: 4,
              border: "1px solid #26AEE7",
              marginBottom: 15,
            }}
          />

          <label style={{ color: "#FFD700", marginBottom: 5 }}>
            Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: 15 }}
          />

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#26AEE7",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Add Deck
          </button>
        </form>

        {errorMsg && (
          <p style={{ color: "#ff6b6b", marginTop: 10 }}>{errorMsg}</p>
        )}
        {successMsg && (
          <p style={{ color: "#4caf50", marginTop: 10 }}>{successMsg}</p>
        )}
      </section>

      <section>
        <h3>Your Decks</h3>
        {decks.length === 0 ? (
          <p>No decks yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {decks.map((d) => (
              <li
                key={d.id}
                style={{
                  border: "1px solid #26AEE7",
                  borderRadius: 5,
                  marginBottom: 15,
                  padding: 15,
                  backgroundColor: "#2C2A27",
                  position: "relative",
                }}
              >
                {d.image && (
                  <img
                    src={`${API_URL}${d.image}`}
                    alt={d.name}
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      maxHeight: 150,
                      objectFit: "contain",
                      margin: "0 auto 10px",
                    }}
                  />
                )}
                <strong style={{ color: "#FFD700", fontSize: 18 }}>
                  {d.name}
                </strong>
                <p style={{ margin: "8px 0" }}>{d.description}</p>
                <button
                  onClick={() => handleDelete(d.id)}
                  style={{
                    position: "absolute",
                    top: 15,
                    right: 15,
                    background: "transparent",
                    border: "none",
                    color: "#ff6b6b",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default MyDecks;
