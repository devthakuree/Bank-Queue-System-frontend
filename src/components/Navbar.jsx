import { NavLink, useNavigate } from "react-router-dom";
import { clearAuthToken, isAdminLoggedIn } from "../services/auth";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = isAdminLoggedIn();

  const handleLogout = () => {
    clearAuthToken();
    navigate("/admin/login");
  };

  return (
    <header className="app-header">
      <div>
        <span className="product-badge">SaaS Dashboard UI</span>
        <h1>Bank Token and Queue Management System</h1>
        <p>Digital token generation and queue handling for bank branches</p>
      </div>

      <nav className="nav-links">
        <NavLink to="/" end>
          Panel Selection
        </NavLink>
        <NavLink to="/customer">
          Customer Panel
        </NavLink>
        <NavLink to={isLoggedIn ? "/admin" : "/admin/login"}>Admin Panel</NavLink>
        {isLoggedIn ? (
          <button type="button" className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : null}
      </nav>
    </header>
  );
}

export default Navbar;
