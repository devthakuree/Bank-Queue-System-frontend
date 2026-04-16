function SummaryCard({ title, value, helperText }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </div>
      <div className="mt-3 text-3xl font-semibold text-slate-900">{value}</div>
      <div className="mt-2 text-xs text-slate-500">{helperText}</div>
    </div>
  );
}

export default SummaryCard;
