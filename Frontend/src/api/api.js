import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalReq = error.config;
    const message = error.response?.data?.message;

    // access token expired → try refresh silently
    if (
      error.response?.status === 401 &&
      (message === "ACCESS_TOKEN_EXPIRED" || message === "UNAUTHORIZED") &&
      !originalReq._retry &&
      !originalReq.url.includes("api/auth/refresh")
    ) {
      originalReq._retry = true;

      try {
        await axios.post(
          `${API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return api(originalReq);
      } catch (refreshError) {
        // refresh failed → just reject, let ProtectedRoute handle redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;