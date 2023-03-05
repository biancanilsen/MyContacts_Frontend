import { environment } from './environments/environment';
import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  headers: {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json',
  }
};

export class ApiClient {
  constructor() { }

  private getConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    };
  }

  async get(url: string): Promise<any> {
    let { data } = await axios.get(`${environment.baseUrl}${url}`, this.getConfig());
    return data;
  }

  async post(url: string, requestData?: any): Promise<any> {
    let { data } = await axios.post(`${environment.baseUrl}${url}`, requestData, this.getConfig());
    return data;
  }

  async put(url: string, requestData?: any) {
    let { data } = await axios.put(`${environment.baseUrl}${url}`, requestData, this.getConfig());
    return data;
  }

  async delete(url: string, params?: any) {
    let { data } = await axios.delete(`${environment.baseUrl}${url}/${params.id}`, this.getConfig());
    return data;
  }
}

