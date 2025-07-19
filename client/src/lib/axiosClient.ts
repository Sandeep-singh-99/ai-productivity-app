import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const fetchCsrfToken = async () => {
  const res = await axios.get("http://localhost:5000/api/v1/csrf-token", {
    withCredentials: true,
  });
  return res.data.csrfToken;
};

axiosClient.interceptors.request.use(
  async (config) => {
    const unsafeMethods = ["post", "put", "patch", "delete"];
    const method = config.method?.toLowerCase();

    if (unsafeMethods.includes(method || "")) {
      const csrfToken = await fetchCsrfToken();
      config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      error.response?.data?.message?.includes("invalid csrf token") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const csrfToken = await fetchCsrfToken();
      originalRequest.headers["X-CSRF-Token"] = csrfToken;

      return axiosClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
