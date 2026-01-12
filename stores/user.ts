// stores/user.ts
import { defineStore } from 'pinia'

export interface User {
  id: number
  phone: string
  email: string
  balance?: number
  avatar?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    inited: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.user
  },

  actions: {
    // 原子登录：只管接口 & 状态
    async login(payload: { phone: string; password: string }) {
      const res = await $fetch<{
        user: User
      }>('/api/auth/login', {
        method: 'POST',
        body: payload
      })

      // this.user = res.user
      return res
    },

    // 恢复登录态
    async restore() {
      this.user = await $fetch<User>('/api/auth/me')
    },

    async ensureUser() {
      if (this.inited) return
      this.inited = true

      const token = useCookie('auth_token')
      if (!token.value && import.meta.client) {

        return
      }

      const { data } = await useFetch<User>('/api/auth/me')

      this.user = data.value
    },

    async logout() {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })

      this.user = null
    }
  }
})