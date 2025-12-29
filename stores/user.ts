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
    user: null as User | null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user
  },

  actions: {
    // 原子登录：只管接口 & 状态
    async login(payload: { phone: string; password: string }) {
      const res = await $fetch<{
        user: User
        token: string
      }>('/api/auth/login', {
        method: 'POST',
        body: payload
      })

      this.user = res.user
      return res
    },

    // 恢复登录态
    async restore() {
      const res = await $fetch<{ user: User }>('/api/auth/me')
      this.user = res.user
    },

    async logout() {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })

      this.user = null
    }
  }
})