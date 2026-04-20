"use client";
import { useEffect, useState } from "react";

export default function Days() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [tasks, setTasks] = useState({
    study: false,
    workout: false,
    journal: false,
  });

  // 🔹 LOAD from localStorage
  useEffect(() => {
    const savedDays = localStorage.getItem("days");
    const savedTasks = localStorage.getItem("tasks");

    if (savedDays) setCompletedDays(JSON.parse(savedDays));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // 🔹 SAVE when days change
  useEffect(() => {
    localStorage.setItem("days", JSON.stringify(completedDays));
  }, [completedDays]);

  // 🔹 SAVE when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function toggleDay(day: number) {
    setCompletedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  }

  function toggleTask(task: string) {
    setTasks((prev) => ({
      ...prev,
      [task]: !prev[task as keyof typeof prev],
    }));
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Daily Tracker</h1>

      {/* Days */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          const done = completedDays.includes(day);

          return (
            <div
              key={day}
              onClick={() => toggleDay(day)}
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
                cursor: "pointer",
                background: done ? "#4CAF50" : "#fff",
                color: done ? "#fff" : "#000",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Tasks */}
      <section style={{ marginTop: "30px" }}>
        <h2>Tasks</h2>

        {Object.entries(tasks).map(([task, value]) => (
          <div key={task}>
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggleTask(task)}
            />
            <label style={{ marginLeft: "8px" }}>{task}</label>
          </div>
        ))}

        {Object.values(tasks).every(Boolean) && (
          <p style={{ color: "green" }}>Nice work! 🎉</p>
        )}
      </section>
    </main>
  );
}