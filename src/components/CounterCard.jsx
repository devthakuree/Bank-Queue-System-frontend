function CounterCard({ counter, onCallNext, onComplete }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{counter.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Counter #{counter.counterNumber}
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {counter.status}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        <span className="font-semibold text-slate-700">Supports:</span>{" "}
        {counter.supportedPriorities.join(", ")}
      </p>

      {counter.currentToken ? (
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-800">
            Now Serving: {counter.currentToken.tokenNumber}
          </p>
          <p className="mt-1 text-sm text-emerald-700">{counter.currentToken.service.name}</p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">No token is being served right now.</p>
      )}

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          onClick={() => onCallNext(counter._id)}
        >
          Call Next
        </button>
        <button
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          onClick={() => onComplete(counter._id)}
          disabled={!counter.currentToken}
        >
          Complete
        </button>
      </div>
    </div>
  );
}

export default CounterCard;
