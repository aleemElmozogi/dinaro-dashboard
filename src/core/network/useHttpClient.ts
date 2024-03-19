import axios, { type AxiosInstance } from "axios";
import config from "@/core/config";
import { useToast } from "../components/ui/toast";

let api: AxiosInstance;

function _createHTTPClient() {
  const { toast } = useToast();

  api = axios.create({
    baseURL: config.BASE_URL,
    // withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        localStorage.clear();
        if (!location.href.includes("auth")) {
          location.href = "/auth/login";
        }
      }

      toast(error.response?.data?.message);

      // trigger 'loading=false' event here
      return Promise.reject(error);
    }
  );

  return api;
}

export function useHttpClient() {
  if (!api) {
    _createHTTPClient();
  }

  return api;
}
