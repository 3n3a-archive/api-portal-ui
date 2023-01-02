import { useAuthStore } from '@/store/auth';
import { RemovableRef } from '@vueuse/core';

import type {AxiosInstance} from 'axios'
import axios from 'axios';
import { Store } from 'pinia';

export interface ApiKeyType {
  id: number
  api_key: string
  user_id: number
}

export interface ApiKeyResponse {
  code: number
  message: string
  data: ApiKeyType[] | string
}

export interface ApiKeyCreatedResponse {
  code: number
  message: string
  data: string
}


export class ApiKey {
  http: AxiosInstance;
  token: string;
  authStore: Store<"auth", {
    username: RemovableRef<string>;
    token: RemovableRef<string>;
}, {}, {}>;
  constructor() {
    this.http = axios.create({
      baseURL: process.env.API_URL,
      validateStatus: (status) => {
        return status < 500
      }
    });
    this.authStore = useAuthStore()
    this.token = this.authStore.token

    // add token as default
    this.http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
  }

  async listApiKeys(): Promise<ApiKeyResponse> {
    const res = await this.http.get('/api/api-key')
    const apiKeyResponse: ApiKeyResponse = {
      code: res.status,
      ...res.data
    }
    return apiKeyResponse
  }

  async addKey(): Promise<ApiKeyCreatedResponse> {
    const res = await this.http.post('/api/api-key')
    const createdResponse: ApiKeyCreatedResponse = {
      code: res.status,
      ...res.data
    }
    return createdResponse
  }
}

export function useApiKey() {
  return new ApiKey();
}
