import { BASE_API_URL } from "@/util/constants";
import axios from "axios";

const axiosApi = axios.create({
  baseURL: BASE_API_URL,
});

// Attach token automatically for every request:
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

console.log(BASE_API_URL);
export async function get(url: string, config: any = {}) {
  const res = await axiosApi.get(url, { ...config });
  return res.data;
}

export async function post(url: string, data: any, config = {}) {
  const res = await axiosApi.post(url, { ...data }, { ...config });
  return res.data;
}
