import React from "react";
import PageHeader from "../../Components/PageHeader";

const coursePerformance = [
  {
    course: "React.js Fundamentals",
    enrolled: 48,
    completed: 35,
    avgScore: "78%",
    passRate: "92%"
  },
  {
    course: "Python for Data Science",
    enrolled: 36,
    completed: 28,
    avgScore: "74%",
    passRate: "88%"
  },
  {
    course: "UI/UX Design Basics",
    enrolled: 22,
    completed: 20,
    avgScore: "82%",
    passRate: "95%"
  },
  {
    course: "Java Full Stack Development",
    enrolled: 54,
    completed: 38,
    avgScore: "71%",
    passRate: "84%"
  },
  {
    course: "Digital Marketing Essentials",
    enrolled: 30,
    completed: 18,
    avgScore: "79%",
    passRate: "90%"
  }
];

const attendanceSummary = [
  { month: "August 2026", present: "91%", absent: "9%" },
  { month: "September 2026", present: "88%", absent: "12%" },
  { month: "October 2026", present: "85%", absent: "15%" },
  { month: "November 2026", present: "87%", absent: "13%" }
];

const summaryStats = [
  { label: "Total Lessons Completed", value: "1,240", color: "#2563eb", bg: "#dbeafe" },
  { label: "Avg Score", value: "76%", color: "#7c3aed", bg: "#ede9fe" },
  { label: "Dropout Rate", value: "8%", color: "#dc2626", bg: "#fee2e2" }
];

export default function Reports() {
  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Platform-wide performance insights."
      />

      {/* Summary Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "28px"
        }}
      >
        {summaryStats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div className="stat-label" style={{ color: stat.color }}>
              {stat.label}
            </div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Course Performance Table */}
      <section className="panel" style={{ marginBottom: "24px" }}>
        <div className="panel-heading">
          <h2>Course Performance</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Enrolled</th>
                <th>Completed</th>
                <th>Avg Score</th>
                <th>Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {coursePerformance.map((row) => (
                <tr key={row.course}>
                  <td>
                    <strong>{row.course}</strong>
                  </td>
                  <td>{row.enrolled}</td>
                  <td>{row.completed}</td>
                  <td>
                    <span className="badge badge-blue">{row.avgScore}</span>
                  </td>
                  <td>
                    <span className="badge badge-green">{row.passRate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Attendance Summary */}
      <section className="panel">
        <div className="panel-heading">
          <h2>Attendance Summary</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Present %</th>
                <th>Absent %</th>
              </tr>
            </thead>
            <tbody>
              {attendanceSummary.map((row) => (
                <tr key={row.month}>
                  <td>
                    <strong>{row.month}</strong>
                  </td>
                  <td>
                    <span className="badge badge-green">{row.present}</span>
                  </td>
                  <td>
                    <span className="badge badge-red">{row.absent}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
