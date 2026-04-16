function TokenCard({ tokenData }) {
  if (!tokenData) {
    return (
      <div className="card">
        <h3>Your Token</h3>
        <p>Generate a token to see your queue position and waiting time.</p>
      </div>
    );
  }

  const { token, queueInfo } = tokenData;

  return (
    <div className="card token-card">
      <h3>Generated Token</h3>
      <div className="token-number">{token.tokenNumber}</div>
      <p>
        <strong>Customer:</strong> {token.customerName}
      </p>
      <p>
        <strong>Service:</strong> {token.service.name}
      </p>
      <p>
        <strong>Status:</strong> {token.status}
      </p>
      <p>
        <strong>Queue Position:</strong> {queueInfo.position}
      </p>
      <p>
        <strong>Estimated Waiting Time:</strong> {queueInfo.estimatedWaitingTime}{" "}
        minutes
      </p>
      <p>
        <strong>Priority:</strong> {token.priorityLevel}
      </p>
      {token.counter ? (
        <p>
          <strong>Assigned Counter:</strong> {token.counter.name}
        </p>
      ) : null}
    </div>
  );
}

export default TokenCard;
