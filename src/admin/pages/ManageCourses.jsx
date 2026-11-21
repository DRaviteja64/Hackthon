import React, { useState } from "react";
import PageHeader from "../../Components/PageHeader";

const initialCourses = [
  {
    id: 1,
    name: "React.js Fundamentals",
    category: "Web Development",
    enrolled: 48,
    duration: "6 weeks",
    status: "Published"
  },
  {
    id: 2,
    name: "Python for Data Science",
    category: "Data Science",
    enrolled: 36,
    duration: "8 weeks",
    status: "Published"
  },
  {
    id: 3,
    name: "UI/UX Design Basics",
    category: "Design",
    enrolled: 22,
    duration: "4 weeks",
    status: "Published"
  },
  {
    id: 4,
    name: "Java Full Stack Development",
    category: "Web Development",
    enrolled: 54,
    duration: "12 weeks",
    status: "Published"
  },
  {
    id: 5,
    name: "Digital Marketing Essentials",
    category: "Marketing",
    enrolled: 30,
    duration: "5 weeks",
    status: "Draft"
  },
  {
    id: 6,
    name: "AWS Cloud Practitioner",
    category: "Cloud",
    enrolled: 18,
    duration: "6 weeks",
    status: "Draft"
  }
];

const emptyForm = {
  name: "",
  category: "Web Development",
  duration: "",
  status: "Published"
};

export default function ManageCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: courses.length + 1,
      name: form.name,
      category: form.category,
      enrolled: 0,
      duration: form.duration,
      status: form.status
    };
    setCourses((prev) => [...prev, newCourse]);
    setForm(emptyForm);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="page-header-row">
        <PageHeader
          title="Manage Courses"
          subtitle="Oversee all published and draft courses."
        />
        <button
          className="primary-modal-btn"
          onClick={() => setShowModal(true)}
        >
          + Add New Course
        </button>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <h2>All Courses</h2>
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            {courses.length} courses total
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Category</th>
                <th>Enrolled</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr key={course.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <strong>{course.name}</strong>
                  </td>
                  <td>{course.category}</td>
                  <td>{course.enrolled}</td>
                  <td>{course.duration}</td>
                  <td>
                    <span
                      className={`badge ${
                        course.status === "Published"
                          ? "badge-green"
                          : "badge-gray"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="outline-button">Edit</button>
                      <button
                        className="danger-btn"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Course Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal-box">
            <h3>Add New Course</h3>
            <form onSubmit={handleSubmit}>
              <div className="modal-field">
                <label>Course Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Node.js Masterclass"
                  required
                />
              </div>
              <div className="modal-field">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option>Web Development</option>
                  <option>Data Science</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Cloud</option>
                  <option>Mobile Development</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="modal-field">
                <label>Duration</label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 6 weeks"
                  required
                />
              </div>
              <div className="modal-field">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option>Published</option>
                  <option>Draft</option>
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
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
