import React, { useState } from "react";
import PageHeader from "../../Components/PageHeader";

const initialAnnouncements = [
  {
    id: 1,
    title: "Upcoming Mid-Term Exam Schedule",
    message:
      "Dear students, mid-term exams will be held from 25th November to 30th November. Please check the timetable on the portal.",
    date: "18 Nov 2026",
    priority: "Urgent"
  },
  {
    id: 2,
    title: "New Course: AWS Cloud Practitioner",
    message:
      "We are excited to announce the launch of our new AWS Cloud Practitioner course. Enroll now to get early-bird access!",
    date: "15 Nov 2026",
    priority: "Normal"
  },
  {
    id: 3,
    title: "Platform Maintenance on 20th Nov",
    message:
      "The SkillUp portal will undergo scheduled maintenance on 20th November from 11 PM to 2 AM. Services may be intermittently unavailable.",
    date: "12 Nov 2026",
    priority: "Urgent"
  },
  {
    id: 4,
    title: "Holiday Notice: Diwali Break",
    message:
      "The portal will be on a Diwali break from 1st November to 3rd November. Classes will resume on 4th November. Happy Diwali!",
    date: "29 Oct 2026",
    priority: "Normal"
  }
];

const emptyForm = {
  title: "",
  message: "",
  target: "All Students",
  priority: "Normal"
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    setAnnouncements((prev) => [
      {
        id: prev.length + 1,
        title: form.title,
        message: form.message,
        date: today,
        priority: form.priority
      },
      ...prev
    ]);
    setForm(emptyForm);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="page-header-row">
        <PageHeader
          title="Announcements"
          subtitle="Broadcast messages to all students."
        />
        <button
          className="primary-modal-btn"
          onClick={() => setShowModal(true)}
        >
          + New Announcement
        </button>
      </div>

      {/* Announcement List */}
      {announcements.length === 0 ? (
        <div
          className="panel"
          style={{ textAlign: "center", color: "#94a3b8", padding: "48px" }}
        >
          No announcements yet. Click "New Announcement" to create one.
        </div>
      ) : (
        announcements.map((ann) => (
          <div key={ann.id} className="announcement-card">
            <div className="announcement-body">
              <h4>{ann.title}</h4>
              <p>{ann.message}</p>
              <div className="announcement-meta">
                <span>{ann.date}</span>
                <span
                  className={`badge ${
                    ann.priority === "Urgent" ? "badge-red" : "badge-blue"
                  }`}
                >
                  {ann.priority}
                </span>
              </div>
            </div>
            <button
              className="danger-btn"
              onClick={() => handleDelete(ann.id)}
              style={{ flexShrink: 0 }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      {/* New Announcement Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal-box">
            <h3>New Announcement</h3>
            <form onSubmit={handleSubmit}>
              <div className="modal-field">
                <label>Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Announcement title"
                  required
                />
              </div>
              <div className="modal-field">
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your announcement here..."
                  rows={4}
                  required
                />
              </div>
              <div className="modal-field">
                <label>Target</label>
                <select name="target" value={form.target} onChange={handleChange}>
                  <option>All Students</option>
                  <option>Specific Course</option>
                </select>
              </div>
              <div className="modal-field">
                <label>Priority</label>
                <select name="priority" value={form.priority} onChange={handleChange}>
                  <option>Normal</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="outline-button"
                  onClick={() => { setForm(emptyForm); setShowModal(false); }}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-modal-btn">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
