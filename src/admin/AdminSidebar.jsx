import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart2,
  Megaphone,
  Settings,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { logoutUser } from "../RegisterLoginComponents/AuthService";

const groups = [
  {
    label: "DASHBOARD",
    items: [
      ["/admin/dashboard", "Dashboard", LayoutDashboard]
    ]
  },
  {
    label: "MANAGEMENT",
    items: [
      ["/admin/users", "Manage Users", Users],
      ["/admin/courses", "Manage Courses", BookOpen]
    ]
  },
  {
    label: "REPORTS",
    items: [
      ["/admin/reports", "Reports & Analytics", BarChart2],
      ["/admin/announcements", "Announcements", Megaphone]
    ]
  }
];

export default function AdminSidebar({ mobileMenu, closeMenu, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    if (closeMenu) closeMenu();
    navigate("/login");
  };

  const adminName = user?.fullName || "Admin User";
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AD";

  return (
    <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
      {/* Brand */}
      <div className="side-brand admin-brand">
        <div className="brand-mark">
          <GraduationCap size={22} />
        </div>
        <div>
          <b>SkillUp</b>
          <small>ADMIN PANEL</small>
        </div>
      </div>

      {/* Admin Mini Profile */}
      <div className="student-mini">
        <div
          className="avatar"
          style={{ background: "#7c3aed", color: "#fff" }}
        >
          {initials}
        </div>
        <div className="student-mini-info">
          <strong>{adminName}</strong>
          <span>Admin Portal</span>
        </div>
        <ChevronLeft size={16} className="collapse-icon" />
      </div>

      {/* Navigation Sections */}
      <nav className="side-nav">
        {groups.map((g) => (
          <section key={g.label} className="nav-group">
            <p className="nav-label">{g.label}</p>
            {g.items.map(([path, label, Icon]) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </section>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="sidebar-bottom">
        <NavLink
          to="/admin/settings"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="nav-item nav-logout-btn"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>

        <div className="side-footer">© 2026 SkillUp · Admin Edition</div>
      </div>
    </aside>
  );
}
