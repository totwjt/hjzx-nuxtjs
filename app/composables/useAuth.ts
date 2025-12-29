// composables/useAuth.ts
import { useUserStore } from '@/stores/user'
// const { clear } = useAuthToken()

interface AuthResult {
  success: boolean
  message?: string
}

export function useAuth() {
  const userStore = useUserStore()
  const router = useRouter()
  const loading = ref(false)

  const login = async (
    payload: { phone: string; password: string }
  ): Promise<AuthResult> => {
    loading.value = true
    try {
      await userStore.login(payload)
      await userStore.restore()

      return { success: true }
    } catch (err: any) {
      return {
        success: false,
        message: err?.data?.message || err?.message || '登录失败'
      }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    // 1. 清浏览器 token（必须）
    // clear()

    // 2. 清 Pinia 状态
    userStore.logout()

    // 3. 跳转
    router.push('/login')
  }

  return {
    login,
    logout,
    loading,
    isLogin: computed(() => userStore.isLoggedIn),
    user: computed(() => userStore.user)
  }
}