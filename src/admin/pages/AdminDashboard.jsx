import React from "react";
import PageHeader from "../../Components/PageHeader";

const recentRegistrations = [
  {
    id: 1,
    name: "Arjun Sharma",
    mobile: "9876543210",
    course: "React.js Fundamentals",
    dateJoined: "15 Nov 2026",
    status: "Active"
  },
  {
    id: 2,
    name: "Priya Nair",
    mobile: "9123456780",
    course: "Python for Data Science",
    dateJoined: "14 Nov 2026",
    status: "Active"
  },
  {
    id: 3,
    name: "Rahul Verma",
    mobile: "8899001122",
    course: "UI/UX Design Basics",
    dateJoined: "13 Nov 2026",
    status: "Pending"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    mobile: "9700112233",
    course: "Java Full Stack",
    dateJoined: "12 Nov 2026",
    status: "Active"
  },
  {
    id: 5,
    name: "Kiran Mehta",
    mobile: "9345678901",
    course: "Digital Marketing",
    dateJoined: "11 Nov 2026",
    status: "Pending"
  }
];

const recentActivity = [
  {
    id: 1,
    text: "Arjun Sharma enrolled in React.js Fundamentals",
    sub: "Student enrollment",
    time: "2 hrs ago",
    color: "#2563eb"
  },
  {
    id: 2,
    text: "New course \"AWS Cloud Practitioner\" was published",
    sub: "Course published",
    time: "5 hrs ago",
    color: "#7c3aed"
  },
  {
    id: 3,
    text: "Priya Nair completed Module 3 of Python course",
    sub: "Module completed",
    time: "Yesterday",
    color: "#16a34a"
  },
  {
    id: 4,
    text: "Announcement sent: \"Upcoming Exam Schedule\"",
    sub: "Announcement broadcast",
    time: "Yesterday",
    color: "#f97316"
  }
];

const statCards = [
  {
    label: "Total Students",
    value: "248",
    caption: "Active learners",
    accent: "#2563eb",
    bg: "#dbeafe"
  },
  {
    label: "Total Courses",
    value: "32",
    caption: "Published courses",
    accent: "#7c3aed",
    bg: "#ede9fe"
  },
  {
    label: "Avg Attendance",
    value: "87%",
    caption: "Platform average",
    accent: "#16a34a",
    bg: "#dcfce7"
  },
  {
    label: "Revenue",
    value: "₹4.2L",
    caption: "This month",
    accent: "#f97316",
    bg: "#ffedd5"
  }
];

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Welcome to the SkillUp administration panel."
      />

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {statCards.map((card) => (
          <div key={card.label} className="admin-stat-card">
            <div
              className="stat-label"
              style={{ color: card.accent }}
            >
              {card.label}
            </div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-caption">{card.caption}</div>
          </div>
        ))}
      </div>

      {/* Recent Registrations */}
      <section className="panel" style={{ marginBottom: "24px" }}>
        <div className="panel-heading">
          <h2>Recent Registrations</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Course Enrolled</th>
                <th>Date Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.map((student, idx) => (
                <tr key={student.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <strong>{student.name}</strong>
                  </td>
                  <td>{student.mobile}</td>
                  <td>{student.course}</td>
                  <td>{student.dateJoined}</td>
                  <td>
                    <span
                      className={`badge ${
                        student.status === "Active"
                          ? "badge-green"
                          : "badge-yellow"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Platform Activity */}
      <section className="panel">
        <div className="panel-heading">
          <h2>Platform Activity</h2>
        </div>
        <div className="activity-list">
          {recentActivity.map((item) => (
            <div key={item.id} className="activity-row">
              <div
                className="activity-dot"
                style={{ background: item.color }}
              />
              <div className="activity-info">
                <strong>{item.text}</strong>
                <span>{item.sub}</span>
              </div>
              <div className="activity-time">{item.time}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
