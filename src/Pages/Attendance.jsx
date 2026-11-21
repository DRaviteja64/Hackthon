import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";
import StatCard from "../Components/StatCard";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  PlusCircle,
  X,
  FileCheck
} from "lucide-react";

const initialRecords = [
  { id: 1, date: "Nov 21, 2026", course: "Java Programming", status: "Present", timing: "09:00 AM - 11:00 AM" },
  { id: 2, date: "Nov 20, 2026", course: "React Development", status: "Present", timing: "11:30 AM - 01:30 PM" },
  { id: 3, date: "Nov 19, 2026", course: "SQL & Database Design", status: "Late", timing: "02:00 PM - 04:00 PM" },
  { id: 4, date: "Nov 18, 2026", course: "Java Programming", status: "Present", timing: "09:00 AM - 11:00 AM" },
  { id: 5, date: "Nov 17, 2026", course: "Python Essentials", status: "Present", timing: "11:30 AM - 01:30 PM" },
  { id: 6, date: "Nov 14, 2026", course: "React Development", status: "Absent", timing: "09:00 AM - 11:00 AM" },
  { id: 7, date: "Nov 13, 2026", course: "Cloud Computing", status: "Present", timing: "02:00 PM - 04:00 PM" },
  { id: 8, date: "Nov 12, 2026", course: "SQL & Database Design", status: "Present", timing: "09:00 AM - 11:00 AM" }
];

export default function Attendance() {
  const [records, setRecords] = useState(initialRecords);
  const [filter, setFilter] = useState("All");
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [appealForm, setAppealForm] = useState({
    date: "",
    course: "Java Programming",
    reason: ""
  });
  const [appealSubmitted, setAppealSubmitted] = useState(false);

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;
  const lateCount = records.filter((r) => r.status === "Late").length;
  const attendanceRate = Math.round((presentCount / records.length) * 100);

  const filteredRecords = records.filter((r) =>
    filter === "All" ? true : r.status === filter
  );

  const handleAppealSubmit = (e) => {
    e.preventDefault();
    if (!appealForm.date || !appealForm.reason) return;
    setAppealSubmitted(true);
    setRecords((prev) => [
      {
        id: Date.now(),
        date: appealForm.date,
        course: appealForm.course,
        status: "Present",
        timing: "Regularized by Academic Desk"
      },
      ...prev
    ]);
    setTimeout(() => {
      setShowAppealModal(false);
      setAppealSubmitted(false);
      setAppealForm({ date: "", course: "Java Programming", reason: "" });
    }, 1400);
  };

  return (
    <div className="attendance-page">
      <PageHeader
        title="Attendance & Participation"
        subtitle="Review your attendance record, verified class sessions, and participation analytics."
        action={
          <button
            type="button"
            className="primary-action-btn"
            onClick={() => setShowAppealModal(true)}
          >
            <PlusCircle size={17} />
            <span>Request Leave / Regularization</span>
          </button>
        }
      />

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={CalendarCheck}
          label="Attendance Rate"
          value={`${attendanceRate}%`}
          caption="Overall consistency"
          tone="green"
        />
        <StatCard
          icon={CheckCircle2}
          label="Sessions Present"
          value={presentCount}
          caption="Attended on time"
          tone="blue"
        />
        <StatCard
          icon={Clock}
          label="Late Arrivals"
          value={lateCount}
          caption="Logged with grace time"
          tone="violet"
        />
        <StatCard
          icon={XCircle}
          label="Absences"
          value={absentCount}
          caption="Missed sessions"
          tone="orange"
        />
      </div>

      {/* Attendance History Panel */}
      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h2>Attendance History</h2>
            <p>Session-by-session verification records</p>
          </div>

          <div className="table-filter-pills">
            {["All", "Present", "Late", "Absent"].map((status) => (
              <button
                key={status}
                type="button"
                className={`pill ${filter === status ? "selected" : ""}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Course</th>
                <th>Session Timing</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((r) => (
                <tr key={r.id}>
                  <td>
                    <b>{r.date}</b>
                  </td>
                  <td>{r.course}</td>
                  <td>
                    <span className="timing-text">{r.timing}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${r.status.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Request Leave / Regularization Modal */}
      {showAppealModal && (
        <div className="modal-backdrop" onClick={() => setShowAppealModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-kicker">ACADEMIC DESK</span>
                <h3>Request Leave / Regularization</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowAppealModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {appealSubmitted ? (
              <div className="modal-body text-center py-4">
                <FileCheck size={48} className="text-green-500 mb-2" />
                <h4>Request Submitted Successfully!</h4>
                <p>Your academic advisor will review your attendance request within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleAppealSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Course Session</label>
                    <select
                      className="form-input"
                      value={appealForm.course}
                      onChange={(e) =>
                        setAppealForm({ ...appealForm, course: e.target.value })
                      }
                    >
                      <option value="Java Programming">Java Programming</option>
                      <option value="React Development">React Development</option>
                      <option value="SQL & Database Design">SQL & Database Design</option>
                      <option value="Python Essentials">Python Essentials</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Date of Absence / Leave</label>
                    <input
                      type="date"
                      className="form-input"
                      required
                      value={appealForm.date}
                      onChange={(e) =>
                        setAppealForm({ ...appealForm, date: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Reason / Justification</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="e.g. Medical leave, college exams, hackathon participation..."
                      required
                      value={appealForm.reason}
                      onChange={(e) =>
                        setAppealForm({ ...appealForm, reason: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="outline-button"
                    onClick={() => setShowAppealModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-modal-btn">
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
