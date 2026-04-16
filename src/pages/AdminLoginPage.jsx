import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../services/api";
import { setAuthToken } from "../services/auth";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginAdmin(formData);
      setAuthToken(data.token);
      navigate("/admin", { replace: true });
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-layout bg-slate-50 px-4">
      <div className="card login-card overflow-hidden border border-slate-200 shadow-2xl">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 px-8 py-8 text-white">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">
                Admin Portal
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
                Access the Bank Queue Dashboard
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-200/90">
                Secure sign-in for bank staff to manage counters, token flow, and live queue performance.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="form-grid">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@bank.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="grid gap-3">
              <button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </div>
          </form>

          {error ? <p className="error-text mt-4">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;

