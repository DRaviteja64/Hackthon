import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";
import {
  UserRound,
  Mail,
  Phone,
  BookOpen,
  CalendarCheck,
  Award,
  Edit3,
  CheckCircle2,
  X,
  School,
  IdCard
} from "lucide-react";
import { getLoggedInUser } from "../RegisterLoginComponents/AuthService";

export default function MyProfile() {
  const [user, setUser] = useState(() => getLoggedInUser() || {
    fullName: "Ravi Teja",
    email: "raviteja@skillup.edu",
    mobile: "9876543210",
    role: "STUDENT"
  });

  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName || "Student Learner",
    email: user.email || "student@skillup.edu",
    mobile: user.mobile || "9876543210",
    bio: user.bio || "Full-stack developer student enthusiastic about building scalable web applications with Java and React.",
    college: user.college || "School of Engineering & Technology",
    studentId: user.studentId || "SKU-2026-64"
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setEditModal(false);
    }, 1200);
  };

  const initials = (user.fullName || "ST")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="profile-page">
      <PageHeader
        title="Student Profile"
        subtitle="Manage your personal learning credentials, academic affiliation, and contact details."
        action={
          <button
            type="button"
            className="primary-action-btn"
            onClick={() => setEditModal(true)}
          >
            <Edit3 size={16} />
            <span>Edit Profile</span>
          </button>
        }
      />

      <section className="profile-panel panel">
        <div className="profile-cover">
          <div className="cover-tag">CERTIFIED STUDENT PORTAL</div>
        </div>

        <div className="profile-main">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-title">
            <h2>{user.fullName || "Student Learner"}</h2>
            <p>
              {user.role || "Student"} · SkillUp Learner · ID: {formData.studentId}
            </p>
          </div>
          <button
            type="button"
            className="outline-button"
            onClick={() => setEditModal(true)}
          >
            <Edit3 size={15} />
            <span>Update Details</span>
          </button>
        </div>

        <div className="profile-bio-box">
          <p>{formData.bio}</p>
        </div>

        <div className="profile-details">
          <div>
            <UserRound className="detail-icon" />
            <span>
              <small>Full Name</small>
              <b>{user.fullName || "Student Learner"}</b>
            </span>
          </div>

          <div>
            <Mail className="detail-icon" />
            <span>
              <small>Email Address</small>
              <b>{user.email || "student@skillup.edu"}</b>
            </span>
          </div>

          <div>
            <Phone className="detail-icon" />
            <span>
              <small>Mobile Number</small>
              <b>+91 {user.mobile || "00000 00000"}</b>
            </span>
          </div>

          <div>
            <School className="detail-icon" />
            <span>
              <small>Institution</small>
              <b>{formData.college}</b>
            </span>
          </div>

          <div>
            <BookOpen className="detail-icon" />
            <span>
              <small>Enrolled Tracks</small>
              <b>4 Specializations</b>
            </span>
          </div>

          <div>
            <CalendarCheck className="detail-icon" />
            <span>
              <small>Verified Attendance</small>
              <b>92% (23/25 Sessions)</b>
            </span>
          </div>

          <div>
            <Award className="detail-icon" />
            <span>
              <small>Average Test Score</small>
              <b>86% Distinction</b>
            </span>
          </div>

          <div>
            <IdCard className="detail-icon" />
            <span>
              <small>Student Identifier</small>
              <b>{formData.studentId}</b>
            </span>
          </div>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {editModal && (
        <div className="modal-backdrop" onClick={() => setEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-kicker">ACCOUNT INFORMATION</span>
                <h3>Update Student Profile</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setEditModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {savedSuccess ? (
              <div className="modal-body text-center py-4">
                <CheckCircle2 size={48} className="text-green-500 mb-2" />
                <h4>Profile Updated Successfully!</h4>
                <p>Your details have been saved across your learning dashboard.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Academic Institution / College</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.college}
                      onChange={(e) =>
                        setFormData({ ...formData, college: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Bio / Learning Statement</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="outline-button"
                    onClick={() => setEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-modal-btn">
                    Save Changes
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
