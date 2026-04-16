import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import QueueTable from "../components/QueueTable";
import SummaryCard from "../components/SummaryCard";
import TokenCard from "../components/TokenCard";
import { createToken, getQueueOverview, getTokenStatus } from "../services/api";

function CustomerPage() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "all";
  const [overview, setOverview] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    serviceId: "",
  });
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadOverview = async () => {
    try {
      const data = await getQueueOverview();
      setOverview(data);

      if (!formData.serviceId && data.services.length) {
        setFormData((previousValue) => ({
          ...previousValue,
          serviceId: data.services[0]._id,
        }));
      }
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to load queue overview.");
    }
  };

  useEffect(() => {
    loadOverview();
    const intervalId = setInterval(loadOverview, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!tokenData?.token?._id) {
      return undefined;
    }

    const intervalId = setInterval(async () => {
      try {
        const freshToken = await getTokenStatus(tokenData.token._id);
        setTokenData(freshToken);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to refresh token status.");
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [tokenData?.token?._id]);

  const handleChange = (event) => {
    setFormData((previousValue) => ({
      ...previousValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = await createToken(formData);
      setTokenData(data);
      setSuccessMessage("Your digital token has been generated successfully.");
      setFormData((previousValue) => ({
        ...previousValue,
        customerName: "",
      }));
      await loadOverview();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to generate token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`page-grid ${view !== "all" ? "single-view" : ""}`}>
      {(view === "all" || view === "token") && (
        <section className="left-panel">
          <div className="card">
            <h2>Take a Token</h2>
            <form onSubmit={handleSubmit} className="form-grid">
              <div>
                <label htmlFor="customerName">Customer Name</label>
                <input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="serviceId">Select Service</label>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a service</option>
                  {overview?.services?.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name} ({service.priorityLevel} priority)
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Generating Token..." : "Generate Digital Token"}
              </button>
            </form>

            {successMessage ? <p className="success-text">{successMessage}</p> : null}
            {error ? <p className="error-text">{error}</p> : null}
          </div>

          <TokenCard tokenData={tokenData} />
        </section>
      )}

      {(view === "all" || view === "queue") && (
        <section className="right-panel">
          <div className="summary-grid">
            <SummaryCard
              title="Waiting"
              value={overview?.summary?.totalWaiting ?? 0}
              helperText="Customers currently in queue"
            />
            <SummaryCard
              title="Serving"
              value={overview?.summary?.totalServing ?? 0}
              helperText="Tokens now being served"
            />
            <SummaryCard
              title="Completed"
              value={overview?.summary?.totalCompleted ?? 0}
              helperText="Finished tokens today"
            />
          </div>

          <QueueTable serviceQueues={overview?.serviceQueues || []} />
        </section>
      )}

      {view !== "all" && view !== "token" && view !== "queue" ? (
        <section className="card">
          <p>Please select a valid customer view from the sidebar.</p>
        </section>
      ) : null}
    </div>
  );
}

export default CustomerPage;
