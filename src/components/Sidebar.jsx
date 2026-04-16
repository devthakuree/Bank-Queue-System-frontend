import { useState } from "react";
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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    clearAuthToken();
    navigate("/admin/login");
  };

  return (
    <>
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

        {!isAdminPage ? (
          <div className="mt-10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            General
          </div>
        ) : null}

        <div className="mt-3 grid gap-2 text-sm">
          {!isAdminPage ? (
            <Link
              to="/"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50"
            >
              <span>🏠</span>
              Home
            </Link>
          ) : null}
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

      {showLogoutDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">Confirm Logout</h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to logout from the admin panel?
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutDialog(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
