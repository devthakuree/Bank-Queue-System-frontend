function DashboardTopbar({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

export default DashboardTopbar;

