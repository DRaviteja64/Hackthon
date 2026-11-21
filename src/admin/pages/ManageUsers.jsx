import React, { useState } from "react";
import PageHeader from "../../Components/PageHeader";

const allUsers = [
  {
    id: 1,
    name: "Arjun Sharma",
    mobile: "9876543210",
    email: "arjun.sharma@email.com",
    role: "Student",
    status: "Active"
  },
  {
    id: 2,
    name: "Priya Nair",
    mobile: "9123456780",
    email: "priya.nair@email.com",
    role: "Student",
    status: "Active"
  },
  {
    id: 3,
    name: "Rahul Verma",
    mobile: "8899001122",
    email: "rahul.verma@email.com",
    role: "Student",
    status: "Pending"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    mobile: "9700112233",
    email: "sneha.reddy@email.com",
    role: "Student",
    status: "Active"
  },
  {
    id: 5,
    name: "Kiran Mehta",
    mobile: "9345678901",
    email: "kiran.mehta@email.com",
    role: "Student",
    status: "Pending"
  },
  {
    id: 6,
    name: "Divya Pillai",
    mobile: "9654321098",
    email: "divya.pillai@email.com",
    role: "Student",
    status: "Active"
  },
  {
    id: 7,
    name: "Amit Joshi",
    mobile: "9011223344",
    email: "amit.joshi@email.com",
    role: "Student",
    status: "Active"
  },
  {
    id: 8,
    name: "Lakshmi Iyer",
    mobile: "8765432109",
    email: "lakshmi.iyer@email.com",
    role: "Student",
    status: "Pending"
  }
];

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allUsers.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Manage Users"
        subtitle="View, search and manage all registered students."
      />

      {/* Search Bar */}
      <div className="admin-search-bar">
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="panel">
        <div className="panel-heading">
          <h2>All Students</h2>
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Showing {filtered.length} of {allUsers.length} students
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", color: "#94a3b8", padding: "32px" }}
                  >
                    No students found matching "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => (
                  <tr key={user.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>{user.name}</strong>
                    </td>
                    <td>{user.mobile}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge badge-blue">{user.role}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "Active" ? "badge-green" : "badge-yellow"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="outline-button">View</button>
                        <button className="danger-btn">Suspend</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
