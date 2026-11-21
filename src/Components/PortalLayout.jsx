import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "./Header";
import { getLoggedInUser } from "../RegisterLoginComponents/AuthService";

export default function PortalLayout() {
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

      {/* Sidebar */}
      <Sidebar
        mobileMenu={mobileMenuOpen}
        closeMenu={closeMenu}
        user={user}
      />

      {/* Main Container */}
      <div className="portal-main">
        <Header
          onMenu={() => setMobileMenuOpen((prev) => !prev)}
          user={user}
        />
        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
