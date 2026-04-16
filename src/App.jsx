import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import CustomerPage from "./pages/CustomerPage";
import LandingInfoPage from "./pages/LandingInfoPage";
import PortalSelectionPage from "./pages/PortalSelectionPage";
import "./App.scss";

function App() {
  const location = useLocation();
  const showSidebar =
    location.pathname.startsWith("/customer") ||
    location.pathname.startsWith("/admin");

  return (
    <div className={`app-shell ${showSidebar ? "with-sidebar" : "no-sidebar"}`}>
      {showSidebar ? <Sidebar /> : null}
      <main className={showSidebar ? "main-content dashboard-main" : "main-content"}>
        <Routes>
          <Route path="/" element={<PortalSelectionPage />} />
          <Route
            path="/about"
            element={
              <LandingInfoPage
                title="About Bank Queue"
                description="This platform digitizes bank queues with secure token generation and organized customer flow."
              />
            }
          />
          <Route
            path="/services"
            element={
              <LandingInfoPage
                title="Our Services"
                description="Cash operations, account services, inquiry management, and smart queue scheduling."
              />
            }
          />
          <Route
            path="/contact"
            element={
              <LandingInfoPage
                title="Contact"
                description="For support or onboarding, contact bank operations desk at your nearest branch."
              />
            }
          />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
