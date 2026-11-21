import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  UserRound,
  Settings as SettingsIcon,
  LogOut,
  CheckCircle2,
  CalendarCheck,
  BookOpen
} from "lucide-react";
import { logoutUser } from "../RegisterLoginComponents/AuthService";

export default function Header({ onMenu, user }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const studentName = user?.fullName || "Student Learner";
  const studentEmail = user?.email || "student@skillup.edu";
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ST";

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore-courses?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button mobile-menu"
          onClick={onMenu}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <form onSubmit={handleSearchSubmit} className="top-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search courses, lessons, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="top-actions">
        {/* Notifications */}
        <div className="dropdown-container" ref={notifRef}>
          <button
            type="button"
            className={`icon-button notification ${showNotifications ? "active" : ""}`}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <i className="notif-dot" />
          </button>

          {showNotifications && (
            <div className="dropdown-menu notif-dropdown">
              <div className="dropdown-header">
                <b>Notifications</b>
                <span className="badge-pill">3 new</span>
              </div>
              <div className="dropdown-list">
                <div className="notif-item">
                  <div className="notif-icon blue">
                    <CalendarCheck size={16} />
                  </div>
                  <div className="notif-text">
                    <p>Java Collections test scheduled for today at 4:00 PM.</p>
                    <small>15m ago</small>
                  </div>
                </div>
                <div className="notif-item">
                  <div className="notif-icon green">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="notif-text">
                    <p>Attendance verified: 92% monthly consistency rate.</p>
                    <small>2h ago</small>
                  </div>
                </div>
                <div className="notif-item">
                  <div className="notif-icon violet">
                    <BookOpen size={16} />
                  </div>
                  <div className="notif-text">
                    <p>New practice module available in React Architecture.</p>
                    <small>1d ago</small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="dropdown-container" ref={userMenuRef}>
          <div
            className="top-user"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
          >
            <div className="avatar avatar-blue">{initials}</div>
            <div className="user-meta">
              <b>{studentName}</b>
              <span>{user?.role || "Learner"}</span>
            </div>
            <ChevronDown size={15} className={`chevron ${showUserMenu ? "open" : ""}`} />
          </div>

          {showUserMenu && (
            <div className="dropdown-menu user-dropdown">
              <div className="user-dropdown-info">
                <strong>{studentName}</strong>
                <span>{studentEmail}</span>
              </div>
              <div className="dropdown-divider" />
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/my-profile");
                }}
              >
                <UserRound size={16} />
                <span>My Profile</span>
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/settings");
                }}
              >
                <SettingsIcon size={16} />
                <span>Account Settings</span>
              </button>
              <div className="dropdown-divider" />
              <button
                type="button"
                className="dropdown-item danger"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
