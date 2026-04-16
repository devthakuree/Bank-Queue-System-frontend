import { jwtDecode } from "jwt-decode";

export const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const getAuthToken = () => localStorage.getItem("authToken");

export const getAuthUser = () => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const payload = jwtDecode(token);
    return payload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  try {
    const payload = jwtDecode(token);
    if (!payload?.exp) {
      return true;
    }
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

export const isAdminLoggedIn = () => {
  const token = getAuthToken();
  if (!token) {
    return false;
  }
  if (isTokenExpired(token)) {
    clearAuthToken();
    return false;
  }

  const user = getAuthUser();
  return user?.role === "admin" || user?.role === "staff";
};

