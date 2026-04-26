"use client";
import { useEffect, useState } from "react";

type BookEntry = {
  book: string;
  idea: string;
  action: string;
};

export default function Blog() {
  const [mode, setMode] = useState<"journal" | "books">("journal");

  const [posts, setPosts] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const [bookEntries, setBookEntries] = useState<BookEntry[]>([]);
  const [book, setBook] = useState("");
  const [idea, setIdea] = useState("");
  const [action, setAction] = useState("");

  // 🔹 Load data
  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    const savedBooks = localStorage.getItem("bookEntries");

    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedBooks) setBookEntries(JSON.parse(savedBooks));
  }, []);

  // 🔹 Save data
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("bookEntries", JSON.stringify(bookEntries));
  }, [bookEntries]);

  function addPost() {
    if (!input) return;
    setPosts([input, ...posts]);
    setInput("");
  }

  function addBookEntry() {
    if (!book || !idea || !action) return;

    const newEntry = { book, idea, action };
    setBookEntries([newEntry, ...bookEntries]);

    setBook("");
    setIdea("");
    setAction("");
  }

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Journal</h1>

      {/* 🔘 Toggle */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <button onClick={() => setMode("journal")}>Journal</button>
        <button onClick={() => setMode("books")}>Book Principles</button>
      </div>

      {/* ✍️ Journal Mode */}
      {mode === "journal" && (
        <>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your thoughts..."
            style={{
              width: "100%",
              height: "100px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button onClick={addPost} style={{ marginTop: "10px" }}>
            Save Entry
          </button>

          <div style={{ marginTop: "30px" }}>
            {posts.map((post, i) => (
              <div
                key={i}
                style={{
                  padding: "15px",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  background: "#fafafa",
                }}
              >
                <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                  {post}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 📚 Book Principles Mode */}
      {mode === "books" && (
        <>
          <input
            value={book}
            onChange={(e) => setBook(e.target.value)}
            placeholder="Book Name"
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="What does the book say?"
            style={{ width: "100%", height: "80px", marginBottom: "10px" }}
          />

          <textarea
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="What did YOU apply?"
            style={{ width: "100%", height: "80px", marginBottom: "10px" }}
          />

          <button onClick={addBookEntry}>Save Principle</button>

          {/* Entries */}
          <div style={{ marginTop: "30px" }}>
            {bookEntries.map((entry, i) => (
              <div
                key={i}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  marginBottom: "20px",
                  background: "#f9f9f9",
                }}
              >
                {/* Book Title */}
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    fontFamily: "serif",
                  }}
                >
                  📘 {entry.book}
                </h2>

                {/* Idea */}
                <p style={{ marginBottom: "8px", fontSize: "15px" }}>
                  <strong>Idea:</strong> {entry.idea}
                </p>

                {/* Action */}
                <p style={{ fontSize: "15px", color: "#444" }}>
                  <strong>Applied:</strong> {entry.action}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}