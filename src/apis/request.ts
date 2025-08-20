import axios from "axios";
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

class AxiosRequest {
  baseURL: string;
  timeout: number;
  instance: AxiosInstance | null = null;
  headers: CreateAxiosDefaults["headers"];

  constructor(options: CreateAxiosDefaults) {
    this.baseURL = options.baseURL || import.meta.env.VITE_BASE_URL;
    this.timeout = options.timeout || 10000;
    this.headers = options.headers || {
      "Content-Type": "application/json",
    };
    this.init();
  }
  init() {
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: this.headers,
    });
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance?.request(config) as Promise<T>;
  }
}

export default AxiosRequest;
