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
    <div className="login-layout">
      <div className="card login-card">
        <h2>Admin / Staff Login</h2>
        <p>Only authorized bank staff can access the admin panel.</p>

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

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {error ? <p className="error-text">{error}</p> : null}
      </div>
    </div>
  );
}

export default AdminLoginPage;

