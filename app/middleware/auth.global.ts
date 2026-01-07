// app/middleware/auth.global.ts
import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(async (to) => {

  if (['/', '/index', '/register', '/markets/'].includes(to.path)) return

  if ('/login' === to.path) {
    await useUserStore().ensureUser()
    if (useUserStore().user) return navigateTo('/')
    return
  }

  // 非白名单：先确保 user 已初始化（必要时才请求 /me）
  await useUserStore().ensureUser()
  if (!useUserStore().user) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }

})