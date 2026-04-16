function QueueTable({ serviceQueues }) {
  return (
    <div className="table-wrapper card">
      <h3>Queues by Service</h3>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Priority</th>
            <th>Waiting Tokens</th>
            <th>Token Numbers</th>
          </tr>
        </thead>
        <tbody>
          {serviceQueues.map((queue) => (
            <tr key={queue.serviceId}>
              <td>{queue.serviceName}</td>
              <td className={`priority ${queue.priorityLevel}`}>
                {queue.priorityLevel}
              </td>
              <td>{queue.waitingCount}</td>
              <td>
                {queue.waitingTokens.length
                  ? queue.waitingTokens.map((token) => token.tokenNumber).join(", ")
                  : "No waiting tokens"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QueueTable;
