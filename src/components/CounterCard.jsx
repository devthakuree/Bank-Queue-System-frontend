function CounterCard({ counter, onCallNext, onComplete }) {
  return (
    <div className="card counter-card">
      <h3>{counter.name}</h3>
      <p>
        <strong>Number:</strong> {counter.counterNumber}
      </p>
      <p>
        <strong>Status:</strong> {counter.status}
      </p>
      <p>
        <strong>Supports:</strong> {counter.supportedPriorities.join(", ")}
      </p>

      {counter.currentToken ? (
        <div className="current-token-box">
          <p>
            <strong>Now Serving:</strong> {counter.currentToken.tokenNumber}
          </p>
          <p>{counter.currentToken.service.name}</p>
        </div>
      ) : (
        <p>No token is being served right now.</p>
      )}

      <div className="button-row">
        <button onClick={() => onCallNext(counter._id)}>Call Next Token</button>
        <button
          className="secondary-btn"
          onClick={() => onComplete(counter._id)}
          disabled={!counter.currentToken}
        >
          Complete Token
        </button>
      </div>
    </div>
  );
}

export default CounterCard;
