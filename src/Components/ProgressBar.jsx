import React from "react";

export default function ProgressBar({ value = 0, color = "blue", height = 8 }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="progress-track" style={{ height }}>
      <div
        className={`progress-fill ${color}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
