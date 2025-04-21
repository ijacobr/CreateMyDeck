// src/pages/MyDecks.jsx
import React, { useState, useEffect } from "react";

const MyDecks = () => {
    const [decks, setDecks] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editFile, setEditFile] = useState(null);

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const API = process.env.REACT_APP_API_URL || "http://localhost:3001";

    // load decks
    useEffect(() => {
        fetch(`${API}/api/decks`)
            .then((r) => r.json())
            .then(setDecks)
            .catch((e) => setErrorMsg("Load decks failed"));
    }, [API]);

    // create
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!deckName.trim() || !deckDescription.trim()) {
            return setErrorMsg("Name & description required.");
        }

        const form = new FormData();
        form.append("name", deckName.trim());
        form.append("description", deckDescription.trim());
        if (selectedFile) form.append("image", selectedFile);

        try {
            const res = await fetch(`${API}/api/decks`, {
                method: "POST",
                body: form,
            });
            const text = await res.text();
            const data = JSON.parse(text);
            if (!data.success) throw new Error(data.message);

            setDecks((d) => [...d, data.deck]);
            setDeckName("");
            setDeckDescription("");
            setSelectedFile(null);
            setSuccessMsg("Deck added!");
        } catch (e) {
            setErrorMsg(e.message);
        }
    };

    // delete
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this deck?")) return;
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const res = await fetch(`${API}/api/decks/${id}`, {
                method: "DELETE",
            });
            const text = await res.text();
            const data = JSON.parse(text);
            if (!data.success) throw new Error(data.message);

            setDecks((d) => d.filter((x) => x.id !== id));
            setSuccessMsg("Deck deleted!");
        } catch (e) {
            setErrorMsg(e.message);
        }
    };

    // begin edit
    const startEdit = (d) => {
        setEditingId(d.id);
        setEditName(d.name);
        setEditDescription(d.description);
        setEditFile(null);
        setErrorMsg("");
        setSuccessMsg("");
    };

    // submit edit
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!editName.trim() || !editDescription.trim()) {
            return setErrorMsg("Name & description required.");
        }

        const form = new FormData();
        form.append("name", editName.trim());
        form.append("description", editDescription.trim());
        if (editFile) form.append("image", editFile);

        try {
            const res = await fetch(`${API}/api/decks/${editingId}`, {
                method: "PUT",
                body: form,
            });
            const text = await res.text();
            const data = JSON.parse(text);
            if (!data.success) throw new Error(data.message);

            setDecks((d) => d.map((x) => (x.id === editingId ? data.deck : x)));
            setEditingId(null);
            setSuccessMsg("Deck updated!");
        } catch (e) {
            setErrorMsg(e.message);
        }
    };

    return (
        <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h2>My Decks</h2>
            {errorMsg && <p style={{ color: "#f55" }}>{errorMsg}</p>}
            {successMsg && <p style={{ color: "#5f5" }}>{successMsg}</p>}

            {/* Create form */}
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
                    <label style={{ color: "#FFD700" }}>Deck Name</label>
                    <input
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        style={{
                            marginBottom: 10,
                            padding: 8,
                            border: "1px solid #26AEE7",
                            borderRadius: 4,
                        }}
                        required
                    />
                    <label style={{ color: "#FFD700" }}>Description</label>
                    <textarea
                        value={deckDescription}
                        onChange={(e) => setDeckDescription(e.target.value)}
                        rows="3"
                        style={{
                            marginBottom: 10,
                            padding: 8,
                            border: "1px solid #26AEE7",
                            borderRadius: 4,
                        }}
                        required
                    />
                    <label style={{ color: "#FFD700" }}>Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        style={{ marginBottom: 10 }}
                    />
                    <button
                        type="submit"
                        style={{
                            alignSelf: "flex-start",
                            padding: "8px 16px",
                            backgroundColor: "#26AEE7",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            cursor: "pointer",
                        }}
                    >
                        Add Deck
                    </button>
                </form>
            </section>

            {/* Deck list */}
            <section>
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
                                {editingId === d.id ? (
                                    // Editing form
                                    <form
                                        onSubmit={handleEditSubmit}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <input
                                            value={editName}
                                            onChange={(e) =>
                                                setEditName(e.target.value)
                                            }
                                            style={{
                                                marginBottom: 8,
                                                padding: 6,
                                                border: "1px solid #26AEE7",
                                                borderRadius: 4,
                                            }}
                                            required
                                        />
                                        <textarea
                                            value={editDescription}
                                            onChange={(e) =>
                                                setEditDescription(
                                                    e.target.value
                                                )
                                            }
                                            rows="2"
                                            style={{
                                                marginBottom: 8,
                                                padding: 6,
                                                border: "1px solid #26AEE7",
                                                borderRadius: 4,
                                            }}
                                            required
                                        />
                                        <label
                                            style={{
                                                fontSize: "0.9rem",
                                                color: "#FFD700",
                                            }}
                                        >
                                            Change Image?
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setEditFile(e.target.files[0])
                                            }
                                            style={{ marginBottom: 8 }}
                                        />
                                        <div>
                                            <button
                                                type="submit"
                                                style={{
                                                    marginRight: 8,
                                                    padding: "6px 12px",
                                                    backgroundColor: "#26AEE7",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: 4,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEditingId(null)
                                                }
                                                style={{
                                                    padding: "6px 12px",
                                                    backgroundColor: "#555",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: 4,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    // Static display
                                    <>
                                        {d.image && (
                                            <img
                                                src={`${API}${d.image}`}
                                                alt={d.name}
                                                style={{
                                                    display: "block",
                                                    maxWidth: "100%",
                                                    maxHeight: 120,
                                                    objectFit: "contain",
                                                    margin: "0 auto 10px",
                                                }}
                                            />
                                        )}
                                        <strong
                                            style={{
                                                color: "#FFD700",
                                                fontSize: 18,
                                            }}
                                        >
                                            {d.name}
                                        </strong>
                                        <p style={{ margin: "8px 0" }}>
                                            {d.description}
                                        </p>
                                        <button
                                            onClick={() => startEdit(d)}
                                            style={{
                                                position: "absolute",
                                                top: 15,
                                                right: 45,
                                                background: "transparent",
                                                border: "none",
                                                color: "#26AEE7",
                                                fontSize: 18,
                                                cursor: "pointer",
                                            }}
                                            title="Edit deck"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            onClick={() => handleDelete(d.id)}
                                            style={{
                                                position: "absolute",
                                                top: 15,
                                                right: 15,
                                                background: "transparent",
                                                border: "none",
                                                color: "#f55",
                                                fontSize: 18,
                                                cursor: "pointer",
                                            }}
                                            title="Delete deck"
                                        >
                                            ×
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
};

export default MyDecks;
