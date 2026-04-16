import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAdmin = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const getQueueOverview = async () => {
  const response = await api.get("/queue/overview");
  return response.data;
};

export const createToken = async (payload) => {
  const response = await api.post("/token", payload);
  return response.data;
};

export const getTokenStatus = async (tokenId) => {
  const response = await api.get(`/queue/token/${tokenId}`);
  return response.data;
};

export const getCounters = async () => {
  const response = await api.get("/counter");
  return response.data;
};

export const callNextToken = async (counterId) => {
  const response = await api.patch(`/counter/${counterId}/call-next`);
  return response.data;
};

export const completeToken = async (counterId) => {
  const response = await api.patch(`/counter/${counterId}/complete`);
  return response.data;
};

export const createCounter = async (payload) => {
  const response = await api.post("/counter", payload);
  return response.data;
};

export default api;
