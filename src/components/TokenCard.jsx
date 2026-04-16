function TokenCard({ tokenData }) {
  if (!tokenData) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Your Token</h3>
        <p className="mt-2 text-sm text-slate-500">
          Generate a token to see your queue position and waiting time.
        </p>
      </div>
    );
  }

  const { token, queueInfo } = tokenData;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Generated Token</h3>
      <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-2xl font-semibold text-emerald-800">
        {token.tokenNumber}
      </div>

      <div className="mt-5 grid gap-2 text-sm text-slate-700">
        <div>
          <span className="font-semibold">Customer:</span> {token.customerName}
        </div>
        <div>
          <span className="font-semibold">Service:</span> {token.service.name}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {token.status}
        </div>
        <div>
          <span className="font-semibold">Queue Position:</span> {queueInfo.position}
        </div>
        <div>
          <span className="font-semibold">Estimated Waiting Time:</span>{" "}
          {queueInfo.estimatedWaitingTime} minutes
        </div>
      </div>
      {token.counter ? (
        <div className="mt-3 text-sm text-slate-700">
          <span className="font-semibold">Assigned Counter:</span> {token.counter.name}
        </div>
      ) : null}
    </div>
  );
}

export default TokenCard;
