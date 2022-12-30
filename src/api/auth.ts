import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';
import { RemovableRef } from '@vueuse/core';

import type {AxiosInstance} from 'axios'
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
  message: string
  data: LoginToken | string
}

interface SignupResponse {
  message: string
  data: string
}

export class Auth {
  $axios: AxiosInstance;
  token: string;
  authStore: Store<"auth", {
    username: RemovableRef<string>;
    token: RemovableRef<string>;
}, {}, {}>;
  appStore: Store<"app", {
    isAuthenticated: boolean;
    drawer: boolean;
}, {}, {}>;
  constructor(axios: AxiosInstance) {
    this.$axios = axios;
    this.authStore = useAuthStore()
    this.appStore = useAppStore()
    this.token = this.authStore.token
  }

  async loginWithEmailAndPassword(loginBody: LoginBody): Promise<LoginResponse> {
    this.$axios.defaults.headers.common['Authorization'] = ''
    const loginResponse = await this.$axios.post('/api/auth/login', loginBody)
    // TODO: add username and token to authstore
    return loginResponse.data
  }

  async signupWithEmailAndPassword(signupBody: SignupBody): Promise<SignupResponse> {
    this.$axios.defaults.headers.common['Authorization'] = ''
    const signupResponse = await this.$axios.post('/api/auth/signup', signupBody)
    return signupResponse.data
  }

  async logout(): Promise<Boolean> {
    const logout = await this.$axios.post('/api/auth/logout', undefined, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    if (logout.status === 200) {
      return true
    } else {
      return false
    }
  }
}
