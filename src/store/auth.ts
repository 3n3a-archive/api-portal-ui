// Utilities
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: useLocalStorage('pinia/auth/username', ''),
    token: useLocalStorage('pinia/auth/token', ''),
  }),
})
