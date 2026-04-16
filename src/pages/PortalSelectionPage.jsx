import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function PortalSelectionPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("customer");

  const handleNext = () => {
    navigate(selectedRole === "customer" ? "/customer" : "/admin");
  };

  return (
    <section className="h-screen overflow-hidden bg-[#f7f9f8] px-4 py-6 md:px-8">
      <div className="mx-auto h-full w-full max-w-6xl">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
          <span className="text-xl font-semibold italic text-slate-900">Bank Queue</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? "border-b-2 border-emerald-500 pb-1 text-slate-900" : "")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "border-b-2 border-emerald-500 pb-1 text-slate-900" : "")}>
            About
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? "border-b-2 border-emerald-500 pb-1 text-slate-900" : "")}>
            Services
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "border-b-2 border-emerald-500 pb-1 text-slate-900" : "")}>
            Contact
          </NavLink>
        </nav>
      </header>

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Select your role</h1>
        <p className="mt-3 text-slate-500">
          Choose how you want to access the bank token and queue system.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setSelectedRole("customer")}
          className={`group rounded-2xl border bg-white p-7 text-left transition-all ${
            selectedRole === "customer"
              ? "border-emerald-500 shadow-xl ring-2 ring-emerald-200"
              : "border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="mb-6 flex h-40 items-center justify-center rounded-xl bg-slate-50 text-6xl">
            👤
          </div>
          <h3 className="text-2xl font-semibold text-slate-900">Customer</h3>
          <p className="mt-2 text-sm text-slate-500">Generate token and track queue status.</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedRole("admin")}
          className={`group rounded-2xl border bg-white p-7 text-left transition-all ${
            selectedRole === "admin"
              ? "border-emerald-500 shadow-xl ring-2 ring-emerald-200"
              : "border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="mb-6 flex h-40 items-center justify-center rounded-xl bg-slate-50 text-6xl">
            🧑‍💼
          </div>
          <h3 className="text-2xl font-semibold text-slate-900">Admin</h3>
          <p className="mt-2 text-sm text-slate-500">Manage counters and control queue flow.</p>
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={handleNext}
          className="rounded-xl bg-emerald-500 px-10 py-3 text-base font-semibold text-white transition hover:bg-emerald-600"
        >
          Next
        </button>
      </div>
      </div>
    </section>
  );
}

export default PortalSelectionPage;
