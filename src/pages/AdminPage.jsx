import { useEffect, useState } from "react";

import CounterCard from "../components/CounterCard";
import QueueTable from "../components/QueueTable";
import SummaryCard from "../components/SummaryCard";
import {
  callNextToken,
  completeToken,
  getCounters,
  getQueueOverview,
} from "../services/api";

function AdminPage() {
  const [overview, setOverview] = useState(null);
  const [counters, setCounters] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [queueData, counterData] = await Promise.all([
        getQueueOverview(),
        getCounters(),
      ]);

      setOverview(queueData);
      setCounters(counterData.counters);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to load admin data.");
    }
  };

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCallNext = async (counterId) => {
    setMessage("");
    setError("");

    try {
      const data = await callNextToken(counterId);
      setMessage(
        `${data.token.tokenNumber} has been assigned to ${data.counter.name}.`
      );
      await loadData();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to call next token.");
    }
  };

  const handleComplete = async (counterId) => {
    setMessage("");
    setError("");

    try {
      const data = await completeToken(counterId);
      setMessage(`${data.token.tokenNumber} has been marked as completed.`);
      await loadData();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to complete token.");
    }
  };

  return (
    <div className="admin-layout">
      <div className="summary-grid">
        <SummaryCard
          title="Waiting"
          value={overview?.summary?.totalWaiting ?? 0}
          helperText="Pending tokens"
        />
        <SummaryCard
          title="Serving"
          value={overview?.summary?.totalServing ?? 0}
          helperText="Active counter calls"
        />
        <SummaryCard
          title="Completed"
          value={overview?.summary?.totalCompleted ?? 0}
          helperText="Finished service requests"
        />
      </div>

      {message ? <p className="success-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      <div className="counter-grid">
        {counters.map((counter) => (
          <CounterCard
            key={counter._id}
            counter={counter}
            onCallNext={handleCallNext}
            onComplete={handleComplete}
          />
        ))}
      </div>

      <QueueTable serviceQueues={overview?.serviceQueues || []} />
    </div>
  );
}

export default AdminPage;
