import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";
import {
  Bell,
  Shield,
  Palette,
  CheckCircle2,
  KeyRound,
  X
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English (US)");

  const [passwordModal, setPasswordModal] = useState(false);
  const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (pwdForm.newPwd !== pwdForm.confirm) {
      alert("New passwords do not match.");
      return;
    }
    setPwdSuccess(true);
    setTimeout(() => {
      setPwdSuccess(false);
      setPasswordModal(false);
      setPwdForm({ current: "", newPwd: "", confirm: "" });
    }, 1400);
  };

  return (
    <div className="settings-page">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Configure your learning alerts, study notifications, theme appearance, and security credentials."
      />

      {/* Notifications Section */}
      <section className="panel settings-panel">
        <div className="settings-section-head">
          <Bell size={20} className="section-head-icon" />
          <div>
            <h2>Notifications & Alerts</h2>
            <p>Customize how and when you receive course announcements</p>
          </div>
        </div>

        <div className="setting-row">
          <div>
            <b>Course & Assessment Notifications</b>
            <span>Receive immediate alerts for new quizzes, exam scores, and lessons.</span>
          </div>
          <button
            type="button"
            className={`toggle ${notifications ? "on" : ""}`}
            onClick={() => setNotifications(!notifications)}
            aria-label="Toggle notifications"
          >
            <i />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <b>Daily Study Reminders</b>
            <span>Get consistent daily prompts to maintain your learning streak.</span>
          </div>
          <button
            type="button"
            className={`toggle ${reminders ? "on" : ""}`}
            onClick={() => setReminders(!reminders)}
            aria-label="Toggle study reminders"
          >
            <i />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <b>Weekly Email Digest</b>
            <span>Send a weekly performance summary and upcoming deadlines to your inbox.</span>
          </div>
          <button
            type="button"
            className={`toggle ${emailDigest ? "on" : ""}`}
            onClick={() => setEmailDigest(!emailDigest)}
            aria-label="Toggle weekly email digest"
          >
            <i />
          </button>
        </div>
      </section>

      {/* Interface & Preferences */}
      <section className="panel settings-panel">
        <div className="settings-section-head">
          <Palette size={20} className="section-head-icon" />
          <div>
            <h2>Interface & Sound</h2>
            <p>Personalize your portal look, feel and sound cues</p>
          </div>
        </div>

        <div className="setting-row">
          <div>
            <b>Portal Theme</b>
            <span>Interface visual styling and contrast</span>
          </div>
          <div className="theme-selector">
            {["Light", "Dark", "System"].map((mode) => (
              <button
                key={mode}
                type="button"
                className={`theme-chip ${theme === mode ? "active" : ""}`}
                onClick={() => setTheme(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-row">
          <div>
            <b>Sound Effects</b>
            <span>Audio feedback when completing quiz questions and lessons</span>
          </div>
          <button
            type="button"
            className={`toggle ${soundEffects ? "on" : ""}`}
            onClick={() => setSoundEffects(!soundEffects)}
            aria-label="Toggle sound effects"
          >
            <i />
          </button>
        </div>

        <div className="setting-row">
          <div>
            <b>Portal Language</b>
            <span>Language used for dashboard navigation and instruction labels</span>
          </div>
          <select
            className="setting-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English (US)">English (US)</option>
            <option value="English (UK)">English (UK)</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Telugu">Telugu (తెలుగు)</option>
          </select>
        </div>
      </section>

      {/* Security Credentials */}
      <section className="panel settings-panel">
        <div className="settings-section-head">
          <Shield size={20} className="section-head-icon" />
          <div>
            <h2>Security & Authentication</h2>
            <p>Manage access credentials and password security</p>
          </div>
        </div>

        <div className="setting-row">
          <div>
            <b>Student Password</b>
            <span>Last updated recently · Keep your password strong and private</span>
          </div>
          <button
            type="button"
            className="outline-button"
            onClick={() => setPasswordModal(true)}
          >
            <KeyRound size={15} />
            <span>Change Password</span>
          </button>
        </div>
      </section>

      {/* Password Modal */}
      {passwordModal && (
        <div className="modal-backdrop" onClick={() => setPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-kicker">SECURITY</span>
                <h3>Update Password</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setPasswordModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {pwdSuccess ? (
              <div className="modal-body text-center py-4">
                <CheckCircle2 size={48} className="text-green-500 mb-2" />
                <h4>Password Changed Successfully!</h4>
                <p>Your new credentials have been updated securely.</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      className="form-input"
                      required
                      placeholder="Enter current password"
                      value={pwdForm.current}
                      onChange={(e) =>
                        setPwdForm({ ...pwdForm, current: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-input"
                      required
                      placeholder="At least 8 characters"
                      value={pwdForm.newPwd}
                      onChange={(e) =>
                        setPwdForm({ ...pwdForm, newPwd: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      className="form-input"
                      required
                      placeholder="Repeat new password"
                      value={pwdForm.confirm}
                      onChange={(e) =>
                        setPwdForm({ ...pwdForm, confirm: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="outline-button"
                    onClick={() => setPasswordModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-modal-btn">
                    Update Password
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
