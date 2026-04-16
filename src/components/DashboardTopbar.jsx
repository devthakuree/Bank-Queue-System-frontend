function DashboardTopbar({ title, subtitle }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="text-slate-400">🔎</span>
          <input
            placeholder="Search"
            className="w-56 bg-transparent text-sm text-slate-700 outline-none"
          />
          <span className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-400">
            ⌘F
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-12 w-12 rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
            aria-label="Messages"
          >
            ✉️
          </button>
          <button
            type="button"
            className="h-12 w-12 rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
            aria-label="Notifications"
          >
            🔔
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">Bank Staff</div>
              <div className="text-xs text-slate-500">queue@bank.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTopbar;

