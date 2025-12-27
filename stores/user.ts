import { defineStore } from 'pinia'

interface User {
  id: number
  phone: string
  email: string
  avatar?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    userInfo: (state) => state.user
  },

  actions: {
    // 登录
    async login(username: string, password: string) {
      this.loading = true
      try {
        // 调用 Server API
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { username, password }
        })

        // ⭐ 将用户信息存储到 Pinia
        // token 已经自动存在 cookie 中了
        this.user = response.user
        return { success: true }
      } catch (error: any) {
        return {
          success: false,
          error: error.data?.message || '登录失败'
        }
      } finally {
        this.loading = false
      }
    },

    // 获取当前用户信息
    async fetchUser() {
      try {
        // Server API 会自动从 cookie 读取 token
        const response = await $fetch('/api/auth/me')
        this.user = response.user
      } catch (error) {
        this.user = null
      }
    },

    // 退出登录
    async logout() {
      await $fetch('/api/auth/logout', { method: 'POST' })
      this.user = null
    }
  }
})