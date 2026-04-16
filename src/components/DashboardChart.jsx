function DashboardChart({ serviceQueues }) {
  const chartData = serviceQueues.map((queue) => ({
    label: queue.serviceName,
    value: queue.waitingCount,
  }));

  const maxValue = Math.max(1, ...chartData.map((item) => item.value));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Queue Volume</h3>
          <p className="mt-1 text-sm text-slate-500">
            Waiting tokens by service, updated in real time.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {serviceQueues.length} services
        </div>
      </div>

      <div className="space-y-5">
        {chartData.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
              <span className="font-medium text-slate-800">{item.label}</span>
              <span className="font-semibold text-slate-900">{item.value}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardChart;
