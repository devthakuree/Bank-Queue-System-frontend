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
    <aside className="h-[calc(100vh-40px)] w-[260px] rounded-3xl bg-white p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-emerald-600" />
        <div>
          <div className="text-base font-semibold text-slate-900">Bank Queue</div>
          <div className="text-xs text-slate-400">Dashboard</div>
        </div>
      </div>

      <div className="mt-8 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Menu
      </div>

      <nav className="mt-3 grid gap-2 text-sm">
        <NavLink
          to={isCustomerPage ? "/customer?view=all" : "/admin?view=all"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${
              isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"
            }`
          }
          end={false}
        >
          <span>📊</span>
          Dashboard
        </NavLink>

        {isCustomerPage ? (
          <>
            <Link
              to="/customer?view=token"
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${
                activeView === "token"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>🎫</span>
              Token Form
            </Link>
            <Link
              to="/customer?view=queue"
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${
                activeView === "queue"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>📍</span>
              Queue Status
            </Link>
          </>
        ) : null}

        {isAdminPage ? (
          <>
            <Link
              to="/admin?view=counters"
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${
                activeView === "counters"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>🧾</span>
              Counters
            </Link>
            <Link
              to="/admin?view=services"
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${
                activeView === "services"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>🗂️</span>
              Service Queue
            </Link>
          </>
        ) : null}
      </nav>

      <div className="mt-10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        General
      </div>

      <div className="mt-3 grid gap-2 text-sm">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50"
        >
          <span>🏠</span>
          Home
        </Link>
        {loggedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold text-slate-600 hover:bg-slate-50"
          >
            <span>🚪</span>
            Logout
          </button>
        ) : (
          <Link
            to={loggedIn ? "/admin" : "/admin/login"}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50"
          >
            <span>🔐</span>
            Login
          </Link>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
