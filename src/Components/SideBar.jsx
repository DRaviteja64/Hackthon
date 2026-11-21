import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Compass,
  CalendarCheck,
  ClipboardList,
  ChartNoAxesColumn,
  Trophy,
  MessageCircle,
  Settings,
  UserRound,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { logoutUser } from "../RegisterLoginComponents/AuthService";

const groups = [
  {
    label: "LEARNING",
    items: [
      ["/overview", "Overview", LayoutDashboard],
      ["/my-learning", "My Learning", BookOpen],
      ["/explore-courses", "Explore Courses", Compass]
    ]
  },
  {
    label: "ACADEMIC",
    items: [
      ["/attendance", "Attendance", CalendarCheck],
      ["/tests-exams", "Tests & Exams", ClipboardList],
      ["/my-results", "My Results", ChartNoAxesColumn]
    ]
  },
  {
    label: "GROWTH",
    items: [
      ["/achievements", "Achievements", Trophy],
      ["/ai-assistant", "AI Assistant", MessageCircle]
    ]
  }
];

export default function Sidebar({ mobileMenu, closeMenu, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    if (closeMenu) closeMenu();
    navigate("/login");
  };

  const studentName = user?.fullName || "Student Learner";
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ST";

  return (
    <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
      {/* Brand */}
      <div className="side-brand">
        <div className="brand-mark">
          <GraduationCap size={22} />
        </div>
        <div>
          <b>SkillUp</b>
          <small>LEARNING PORTAL</small>
        </div>
      </div>

      {/* Student Mini Profile */}
      <div className="student-mini">
        <div className="avatar avatar-blue">{initials}</div>
        <div className="student-mini-info">
          <strong>{studentName}</strong>
          <span>{user?.role || "Student"} Portal</span>
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
          to="/my-profile"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <UserRound size={18} />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
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

        <div className="side-help">
          <div className="help-icon">✦</div>
          <b>Keep learning!</b>
          <p>Small steps every day lead to big achievements.</p>
        </div>

        <div className="side-footer">© 2026 SkillUp · Student Edition</div>
      </div>
    </aside>
  );
}
