"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [days, setDays] = useState(0);
  const [posts, setPosts] = useState(0);

  useEffect(() => {
    const savedDays = localStorage.getItem("days");
    const savedPosts = localStorage.getItem("posts");

    if (savedDays) setDays(JSON.parse(savedDays).length);
    if (savedPosts) setPosts(JSON.parse(savedPosts).length);
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <p>Days completed: {days}</p>
      <p>Journal entries: {posts}</p>
    </main>
  );
}