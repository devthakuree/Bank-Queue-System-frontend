function QueueTable({ serviceQueues }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Queues by Service</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Service
            </th>
            <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Priority
            </th>
            <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Waiting
            </th>
            <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Token Numbers
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceQueues.map((queue) => (
            <tr key={queue.serviceId} className="border-t border-slate-100">
              <td className="py-4 pr-3 font-semibold text-slate-800">
                {queue.serviceName}
              </td>
              <td className="py-4 pr-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    queue.priorityLevel === "high"
                      ? "bg-red-50 text-red-700"
                      : queue.priorityLevel === "medium"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {queue.priorityLevel}
                </span>
              </td>
              <td className="py-4 pr-3 text-slate-700">{queue.waitingCount}</td>
              <td className="py-4 text-slate-600">
                {queue.waitingTokens.length
                  ? queue.waitingTokens.map((token) => token.tokenNumber).join(", ")
                  : "No waiting tokens"}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default QueueTable;
