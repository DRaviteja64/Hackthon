import React, { useState } from "react";
import PageHeader from "../../Components/PageHeader";

export default function AdminSettings() {
  // Platform settings
  const [siteName, setSiteName] = useState("SkillUp Learning Portal");
  const [supportEmail, setSupportEmail] = useState("support@skillup.in");
  const [maxStudents, setMaxStudents] = useState(50);

  // Security settings
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [require2FA, setRequire2FA] = useState(false);

  // Maintenance mode
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <PageHeader
        title="Admin Settings"
        subtitle="Configure platform-wide settings."
      />

      <form onSubmit={handleSave}>
        {/* Platform Settings */}
        <div className="settings-panel">
          <h3>Platform Settings</h3>

          <div className="settings-field">
            <label>Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Enter site name"
            />
          </div>

          <div className="settings-field">
            <label>Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              placeholder="Enter support email"
            />
          </div>

          <div className="settings-field">
            <label>Max Students Per Course</label>
            <input
              type="number"
              value={maxStudents}
              min={1}
              max={500}
              onChange={(e) => setMaxStudents(e.target.value)}
            />
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-panel">
          <h3>Security</h3>

          <div className="settings-field">
            <label>Session Timeout</label>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
            </select>
          </div>

          <div className="toggle-row">
            <div className="toggle-label">
              <strong>Require Two-Factor Authentication (2FA)</strong>
              <span>Enforce 2FA for all admin accounts</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={require2FA}
                onChange={(e) => setRequire2FA(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="settings-panel">
          <h3>Maintenance Mode</h3>

          <div className="toggle-row">
            <div className="toggle-label">
              <strong>Enable Maintenance Mode</strong>
              <span>
                Students will see a maintenance page when this is active
              </span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {maintenanceMode && (
            <div className="maintenance-warning">
              ⚠️ Maintenance mode is currently <strong>ON</strong>. Students
              cannot access the portal. Remember to turn this off once
              maintenance is complete.
            </div>
          )}
        </div>

        {/* Save Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button type="submit" className="primary-modal-btn">
            Save Settings
          </button>
          {saved && (
            <span style={{ color: "#16a34a", fontSize: "14px", fontWeight: 600 }}>
              ✓ Settings saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
