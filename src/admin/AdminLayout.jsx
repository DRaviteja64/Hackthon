import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { getLoggedInUser } from "../RegisterLoginComponents/AuthService";
import "./admin.css";

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getLoggedInUser();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="portal-layout">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Admin Sidebar */}
      <AdminSidebar
        mobileMenu={mobileMenuOpen}
        closeMenu={closeMenu}
        user={user}
      />

      {/* Main Container */}
      <div className="portal-main">
        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
