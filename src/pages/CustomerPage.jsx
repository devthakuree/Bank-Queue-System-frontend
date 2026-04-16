import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import QueueTable from "../components/QueueTable";
import DashboardTopbar from "../components/DashboardTopbar";
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
    <div>
      <DashboardTopbar
        title="Dashboard"
        subtitle="Generate your token and track live queue updates."
      />

      <div className={`grid gap-6 ${view !== "all" ? "grid-cols-1" : "lg:grid-cols-2"}`}>
        {(view === "all" || view === "token") && (
          <section className="grid gap-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Take a Token</h2>
              <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-800" htmlFor="customerName">
                    Customer Name
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-800" htmlFor="serviceId">
                    Select Service
                  </label>
                  <select
                    id="serviceId"
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 disabled:opacity-60"
                >
                  {loading ? "Generating Token..." : "Generate Digital Token"}
                </button>
              </form>

              {successMessage ? (
                <p className="mt-4 text-sm font-semibold text-emerald-600">{successMessage}</p>
              ) : null}
              {error ? <p className="mt-4 text-sm font-semibold text-red-600">{error}</p> : null}
            </div>

            <TokenCard tokenData={tokenData} />
          </section>
        )}

        {(view === "all" || view === "queue") && (
          <section className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
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
    </div>
  );
}

export default CustomerPage;
