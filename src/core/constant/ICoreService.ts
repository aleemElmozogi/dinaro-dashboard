import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ICoreService {
  httpClient: AxiosInstance;
  API_URL: string;


  index(config?: AxiosRequestConfig): Promise<AxiosResponse>;
  show?(id: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  create?<T>(payload: T, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  update?<T>(
    id: string,
    payload: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse>;
  delete?(id: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
}
