import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CounterCard from "../components/CounterCard";
import DashboardChart from "../components/DashboardChart";
import DashboardTopbar from "../components/DashboardTopbar";
import QueueTable from "../components/QueueTable";
import SummaryCard from "../components/SummaryCard";
import {
  callNextToken,
  completeToken,
  getCounters,
  getQueueOverview,
} from "../services/api";

function AdminPage() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "all";
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
    <div>
      <DashboardTopbar
        title="Dashboard"
        subtitle="Monitor counters and control service flow in real time."
      />

      <div className="grid gap-6">
        {(view === "all" || view === "overview") && (
          <div className="grid gap-4 md:grid-cols-3">
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
        )}

        {(view === "all" || view === "overview") && (
          <div className="mt-6">
            <DashboardChart serviceQueues={overview?.serviceQueues || []} />
          </div>
        )}

        {message ? <p className="success-text">{message}</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        {(view === "all" || view === "counters") && (
          <div className="grid gap-4 lg:grid-cols-2">
            {counters.map((counter) => (
              <CounterCard
                key={counter._id}
                counter={counter}
                onCallNext={handleCallNext}
                onComplete={handleComplete}
              />
            ))}
          </div>
        )}

        {(view === "all" || view === "services") && (
          <QueueTable serviceQueues={overview?.serviceQueues || []} />
        )}

        {view !== "all" &&
        view !== "overview" &&
        view !== "counters" &&
        view !== "services" ? (
          <section className="card">
            <p>Please select a valid admin view from the sidebar.</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default AdminPage;
