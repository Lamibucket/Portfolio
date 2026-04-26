"use client";
import { useEffect, useState } from "react";

type DayData = {
  study: boolean;
  workout: boolean;
  journal: boolean;
};

export default function Days() {
  const [data, setData] = useState<Record<string, DayData>>({});
  const [selectedDate, setSelectedDate] = useState("");

  // 📅 Set today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  // 🔹 Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dayData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  // 🔹 Save to localStorage
  useEffect(() => {
    localStorage.setItem("dayData", JSON.stringify(data));
  }, [data]);

  const current = data[selectedDate] || {
    study: false,
    workout: false,
    journal: false,
  };

  function toggleTask(task: keyof DayData) {
    setData((prev) => ({
      ...prev,
      [selectedDate]: {
        ...current,
        [task]: !current[task],
      },
    }));
  }

  const completed = Object.values(current).filter(Boolean).length;
  const total = Object.keys(current).length;
  const progress = (completed / total) * 100;

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Daily Tracker</h1>

      {/* 📅 Date Picker */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "30px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* 🧩 Card */}
      <div
        style={{
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid #ddd",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Tasks for {selectedDate}</h2>

        {/* 🔘 Task Buttons */}
        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          {Object.entries(current).map(([task, value]) => (
            <div
              key={task}
              onClick={() => toggleTask(task as keyof DayData)}
              style={{
                padding: "15px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                border: "1px solid #ccc",
                background: value ? "#4CAF50" : "#f5f5f5",
                color: value ? "#fff" : "#333",
                transition: "0.2s",
                textTransform: "capitalize",
              }}
            >
              {task}
            </div>
          ))}
        </div>

        {/* 📊 Progress */}
        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              height: "10px",
              background: "#eee",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#4CAF50",
                transition: "0.3s",
              }}
            />
          </div>

          <p style={{ marginTop: "10px" }}>
            {completed} / {total} completed
          </p>
        </div>

        {/* 🎉 Feedback */}
        {completed === total && (
          <p style={{ marginTop: "15px", color: "green" }}>
            Perfect day. 🔥
          </p>
        )}
      </div>

      {/* 🔥 Heatmap */}
      <div style={{ marginTop: "50px" }}>
        <h2>Activity</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gap: "6px",
            marginTop: "15px",
          }}
        >
          {Array.from({ length: 60 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (59 - i));

            const key = date.toISOString().split("T")[0];
            const dayData = data[key];

            let level = 0;
            if (dayData) {
              const done = Object.values(dayData).filter(Boolean).length;
              level = done; // 0–3
            }

            const colors = ["#eee", "#a5d6a7", "#66bb6a", "#2e7d32"];

            return (
              <div
                key={key}
                title={key}
                onClick={() => setSelectedDate(key)}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "4px",
                  background: colors[level],
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}