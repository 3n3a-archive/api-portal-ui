import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';
import { RemovableRef } from '@vueuse/core';

import type {AxiosInstance} from 'axios'
import axios from 'axios';
import { Store } from 'pinia';

interface LoginBody {
  username_or_email: string
  password: string
}

interface SignupBody {
  username: string,
  email: string,
  password: string,
}

interface LoginToken {
  token: string
}

interface LoginResponse {
  code: number
  message: string
  data: LoginToken | string
}

interface SignupResponse {
  code: number
  message: string
  data: string
}

export class Auth {
  http: AxiosInstance;
  token: string;
  authStore: Store<"auth", {
    username: RemovableRef<string>;
    token: RemovableRef<string>;
}, {}, {}>;
  appStore: Store<"app", {
    isAuthenticated: boolean;
    drawer: boolean;
}, {}, {}>;
  constructor() {
    this.http = axios.create({
      baseURL: process.env.API_URL,
      validateStatus: (status) => {
        return status < 500
      }
    });
    this.authStore = useAuthStore()
    this.appStore = useAppStore()
    this.token = this.authStore.token

    // add token as default
    this.http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
  }

  async ping(): Promise<boolean> {
    this.http.defaults.headers.common['Authorization'] = ''
    const pingResponse = await this.http.get('/api/ping')
    if (pingResponse.status === 200) {
      return true
    }
    return false
  }

  async loginWithEmailAndPassword(loginBody: LoginBody): Promise<LoginResponse> {

    this.http.defaults.headers.common['Authorization'] = ''
    const loginResponse = await this.http.post('/api/auth/login', loginBody)
    this.authStore.username = loginBody.username_or_email

    console.log(loginResponse.data.data.token)
    this.authStore.token = loginResponse.data.data.token
    return {
      code: loginResponse.status,
      ...loginResponse.data
    }
  }

  async signupWithEmailAndPassword(signupBody: SignupBody): Promise<SignupResponse> {
    this.http.defaults.headers.common['Authorization'] = ''
    const signupResponse = await this.http.post('/api/auth/signup', signupBody)
    return {
      code: signupResponse.status,
      ...signupResponse.data
    }
  }

  async logout(): Promise<Boolean> {
    const logout = await this.http.post('/api/auth/logout')
    if (logout.status === 200) {
      return true
    }
    return false
  }
}

export function useAuth() {
  return new Auth();
}
