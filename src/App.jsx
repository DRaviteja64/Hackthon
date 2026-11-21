import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

// Authentication Pages
import Register from "./RegisterLoginComponents/Register";
import Login from "./RegisterLoginComponents/Login";
import Dashboard from "./RegisterLoginComponents/Dashboard";

// Portal Layout & Sub-Pages
import PortalLayout from "./Components/PortalLayout";
import Overview from "./Pages/Overview.jsx";
import MyLearning from "./Pages/MyLearning";
import ExploreCourses from "./Pages/ExploreCourses";
import Attendance from "./Pages/Attendance";
import TestsExams from "./Pages/TestsExams";
import MyResults from "./Pages/MyResults";
import Achievements from "./Pages/Achievements";
import AIAssistant from "./Pages/AIAssistant";
import Settings from "./Pages/Settings";
import MyProfile from "./Pages/MyProfile";

// Admin Layout & Pages
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageUsers from "./admin/pages/ManageUsers";
import ManageCourses from "./admin/pages/ManageCourses";
import Reports from "./admin/pages/Reports";
import Announcements from "./admin/pages/Announcements";
import AdminSettings from "./admin/pages/AdminSettings";

// Protected Route — requires a valid token
function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// Admin Protected Route — requires a valid token AND ADMIN role
function AdminProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const userRaw = localStorage.getItem("user");
    const user = userRaw ? JSON.parse(userRaw) : null;
    const role = user?.role?.toUpperCase();

    if (role !== "ADMIN") {
      return <Navigate to="/overview" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page: Always open Login first */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protected Student Portal */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PortalLayout />}>

            <Route path="/overview" element={<Overview />} />

            <Route path="/my-learning" element={<MyLearning />} />
            <Route
              path="/learning"
              element={<Navigate to="/my-learning" replace />}
            />

            <Route path="/explore-courses" element={<ExploreCourses />} />
            <Route
              path="/explore"
              element={<Navigate to="/explore-courses" replace />}
            />

            <Route path="/attendance" element={<Attendance />} />

            <Route path="/tests-exams" element={<TestsExams />} />
            <Route
              path="/tests"
              element={<Navigate to="/tests-exams" replace />}
            />

            <Route path="/my-results" element={<MyResults />} />
            <Route
              path="/results"
              element={<Navigate to="/my-results" replace />}
            />

            <Route path="/achievements" element={<Achievements />} />

            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route
              path="/assistant"
              element={<Navigate to="/ai-assistant" replace />}
            />

            <Route path="/my-profile" element={<MyProfile />} />
            <Route
              path="/profile"
              element={<Navigate to="/my-profile" replace />}
            />

            <Route path="/settings" element={<Settings />} />

          </Route>
        </Route>

        {/* Protected Admin Portal */}
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>

            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/announcements" element={<Announcements />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

          </Route>
        </Route>

        {/* Invalid URLs */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
