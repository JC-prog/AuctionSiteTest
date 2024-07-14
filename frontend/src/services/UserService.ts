import axios, { AxiosInstance } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get(endpoint: string) {
    const response = await this.axiosInstance.get(endpoint);
    return response.data;
  }

  public async post(endpoint: string, body: any) {
    const response = await this.axiosInstance.post(endpoint, body);
    return response.data;
  }

  public async put(endpoint: string, body: any) {
    const response = await this.axiosInstance.put(endpoint, body);
    return response.data;
  }

  public async delete(endpoint: string) {
    const response = await this.axiosInstance.delete(endpoint);
    return response.data;
  }
}
