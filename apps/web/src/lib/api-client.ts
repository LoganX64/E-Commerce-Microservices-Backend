import axios from "axios";
import { getApiUrl, API_KEY } from "./constants";

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.baseURL = getApiUrl();
  config.headers.set("x-api-key", API_KEY);
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Request failed";
    return Promise.reject(new Error(message));
  },
);
