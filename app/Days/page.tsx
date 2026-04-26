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

  // 📅 Get today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  // 🔹 Load from storage
  useEffect(() => {
    const saved = localStorage.getItem("dayData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  // 🔹 Save to storage
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

  return (
    <main style={{ padding: "40px", maxWidth: "600px" }}>
      <h1>Daily Tracker</h1>

      {/* 📅 Date Picker */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px" }}
      />

      {/* ✅ Tasks */}
      <div>
        {Object.entries(current).map(([task, value]) => (
          <div key={task} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggleTask(task as keyof DayData)}
            />
            <label style={{ marginLeft: "8px", textTransform: "capitalize" }}>
              {task}
            </label>
          </div>
        ))}
      </div>

      {/* 🎯 Progress */}
      <div style={{ marginTop: "20px" }}>
        <h3>
          Progress:{" "}
          {
            Object.values(current).filter(Boolean).length
          } / {Object.keys(current).length}
        </h3>

        {Object.values(current).every(Boolean) && (
          <p style={{ color: "green" }}>Perfect day. 🔥</p>
        )}
      </div>
    </main>
  );
}