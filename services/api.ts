import axios from "axios";

// Environment-based API URL fallback for health check or custom integrations
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  get: async <T>(url: string, config = {}): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },
  post: async <T>(url: string, data = {}, config = {}): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },
  put: async <T>(url: string, data = {}, config = {}): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },
  delete: async <T>(url: string, config = {}): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};
