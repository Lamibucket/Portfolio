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

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("dayData");
    if (saved) setData(JSON.parse(saved));
  }, []);

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
    <main style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h1>Daily Tracker</h1>

      {/* Date Picker */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ padding: "10px", marginBottom: "30px" }}
      />

      {/* Card */}
      <div
        style={{
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid #ddd",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Tasks for {selectedDate}</h2>

        {/* Task Buttons */}
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
              }}
            >
              {task}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
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

        {/* Feedback */}
        {completed === total && (
          <p style={{ marginTop: "15px", color: "green" }}>
            Perfect day. 🔥
          </p>
        )}
      </div>
    </main>
  );
}
