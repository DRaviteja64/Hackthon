import React from "react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  caption,
  tone = "blue"
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        {Icon && <Icon size={20} />}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {caption && <div className="stat-caption">{caption}</div>}
    </div>
  );
}
