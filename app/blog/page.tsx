"use client";
import { useEffect, useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // 🔹 LOAD posts
  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // 🔹 SAVE posts
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  function addPost() {
    if (!input) return;
    setPosts([input, ...posts]);
    setInput("");
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Journal</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write your thoughts..."
        style={{ width: "100%", height: "100px" }}
      />

      <button onClick={addPost}>Save Entry</button>

      <div style={{ marginTop: "20px" }}>
        {posts.map((post, i) => (
          <p key={i}>• {post}</p>
        ))}
      </div>
    </main>
  );
}