import { NavLink } from "react-router-dom";

function LandingInfoPage({ title, description }) {
  return (
    <section className="h-screen overflow-hidden bg-[#f7f9f8] px-4 py-6 md:px-8">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
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

        <div className="mx-auto mt-28 w-full max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-4 text-lg text-slate-500">{description}</p>
        </div>
      </div>
    </section>
  );
}

export default LandingInfoPage;
