// Utilities
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: useLocalStorage('pinia/auth/username', '', {mergeDefaults: true }),
    token: useLocalStorage('pinia/auth/token', '', {mergeDefaults: true}),
  }),
})
