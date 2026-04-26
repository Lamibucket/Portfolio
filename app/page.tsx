"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [daysDone, setDaysDone] = useState(0);
  const [posts, setPosts] = useState(0);

  useEffect(() => {
    const savedDays = localStorage.getItem("dayData");
    const savedPosts = localStorage.getItem("posts");

    if (savedDays) {
      const parsed = JSON.parse(savedDays);
      setDaysDone(Object.keys(parsed).length);
    }

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts).length);
    }
  }, []);

  const progress = Math.min((daysDone / 30) * 100, 100);

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
        Every day counts.
      </h1>
      <p style={{ color: "#666" }}>
        Build consistency. Track progress. Reflect.
      </p>

      {/* 📊 Stats */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <div style={cardStyle}>
          <h3>{daysDone}</h3>
          <p>Days Tracked</p>
        </div>

        <div style={cardStyle}>
          <h3>{posts}</h3>
          <p>Journal Entries</p>
        </div>
      </div>

      {/* 📈 Progress */}
      <div style={{ marginTop: "30px" }}>
        <h3>Consistency Progress</h3>
        <div style={progressBar}>
          <div
            style={{
              ...progressFill,
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* 🚀 Navigation Cards */}
      <div style={{ marginTop: "40px" }}>
        <h2>Get Started</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div
            style={navCard}
            onClick={() => router.push("/Days")}
          >
            <h3>📅 Days Tracker</h3>
            <p>Track your daily habits</p>
          </div>

          <div
            style={navCard}
            onClick={() => router.push("/blog")}
          >
            <h3>✍️ Journal</h3>
            <p>Write thoughts & book principles</p>
          </div>
        </div>
      </div>

      {/* 🎯 Focus */}
      <div style={{ marginTop: "40px" }}>
        <h2>Focus Today</h2>
        <p style={{ fontSize: "18px" }}>
          Show up. Do the work. No distractions.
        </p>
      </div>
    </main>
  );
}

/* 🎨 Styles */

const cardStyle = {
  flex: 1,
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  textAlign: "center" as const,
};

const navCard = {
  flex: 1,
  padding: "25px",
  borderRadius: "14px",
  border: "1px solid #ccc",
  cursor: "pointer",
  transition: "0.2s",
};

const progressBar = {
  height: "10px",
  background: "#eee",
  borderRadius: "5px",
  overflow: "hidden",
  marginTop: "10px",
};

const progressFill = {
  height: "100%",
  background: "#4CAF50",
  transition: "0.3s",
};