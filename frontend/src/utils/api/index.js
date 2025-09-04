import axios from "axios";

// Create axios instance with common configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    // You could add auth token here if your API requires authentication
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    const { response } = error;
    if (response && response.status === 404) {
      console.error("Resource not found");
    } else if (response && response.status === 500) {
      console.error("Server error");
    } else if (!response) {
      console.error("Network error - check your connection");
    }
    return Promise.reject(error);
  }
);

// Parts API
export const partsApi = {
  // Get all parts
  getAll: () => api.get("/parts"),

  // Get part by ID
  getById: (id) => api.get(`/parts/${id}`),

  // Get parts by type
  getByType: (type) => api.get(`/parts/type/${type}`),

  // Compare part prices
  comparePrices: (partName) =>
    api.get(`/parts/compare/${encodeURIComponent(partName)}`),

  // Create new part
  create: (partData) => api.post("/parts", partData),

  // Update part
  update: (id, partData) => api.put(`/parts/${id}`, partData),

  // Delete part
  delete: (id) => api.delete(`/parts/${id}`),
};

export default api;
