import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { clearAuthToken, isAdminLoggedIn } from "../services/auth";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isAdminLoggedIn();
  const isCustomerPage = location.pathname.startsWith("/customer");
  const isAdminPage = location.pathname.startsWith("/admin");
  const query = new URLSearchParams(location.search);
  const activeView = query.get("view") || "all";

  const handleLogout = () => {
    clearAuthToken();
    navigate("/admin/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Bank Queue</h2>
        <p>Dashboard</p>
      </div>

      <nav className="sidebar-nav">
        {isCustomerPage ? <NavLink to="/customer">Customer Panel</NavLink> : null}
        {isAdminPage ? (
          <NavLink to={loggedIn ? "/admin" : "/admin/login"}>Admin Panel</NavLink>
        ) : null}
      </nav>

      {isCustomerPage ? (
        <div className="sidebar-section">
          <p>Customer Views</p>
          <Link
            to="/customer?view=all"
            className={activeView === "all" ? "active" : ""}
          >
            Full Dashboard
          </Link>
          <Link
            to="/customer?view=token"
            className={activeView === "token" ? "active" : ""}
          >
            Token Form
          </Link>
          <Link
            to="/customer?view=queue"
            className={activeView === "queue" ? "active" : ""}
          >
            Queue Status
          </Link>
        </div>
      ) : null}

      {isAdminPage ? (
        <div className="sidebar-section">
          <p>Admin Views</p>
          <Link to="/admin?view=all" className={activeView === "all" ? "active" : ""}>
            Full Dashboard
          </Link>
          <Link
            to="/admin?view=overview"
            className={activeView === "overview" ? "active" : ""}
          >
            Queue Overview
          </Link>
          <Link
            to="/admin?view=counters"
            className={activeView === "counters" ? "active" : ""}
          >
            Counter Control
          </Link>
          <Link
            to="/admin?view=services"
            className={activeView === "services" ? "active" : ""}
          >
            Service Queue
          </Link>
        </div>
      ) : null}

      {loggedIn ? (
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : null}

      <Link to="/" className="back-select-link">
        Back to panel selection
      </Link>
    </aside>
  );
}

export default Sidebar;
