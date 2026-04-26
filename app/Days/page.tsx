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

{/* 🔥 Heatmap */}
<div style={{ marginTop: "40px" }}>
  <h2>Activity</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(10, 1fr)",
      gap: "6px",
      marginTop: "10px",
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
          style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: "4px",
            background: colors[level],
            transition: "0.2s",
          }}
        />
      );
    })}
  </div>
</div>