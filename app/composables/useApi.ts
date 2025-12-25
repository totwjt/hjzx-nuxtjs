/**
 * API Composables
 * 提供响应式的 API 调用方法，集成错误处理和加载状态
 *
 * 注意：ref, readonly 等 Vue 函数由 Nuxt 自动导入，无需手动导入
 */

import type { ApiResponse } from '~/utils/api'
import { request, get, post, put, del, patch } from '~/utils/api'

/**
 * 使用 API 请求的 Composable
 * 提供响应式的 loading 和 error 状态
 */
export function useApi<T = unknown>() {
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async (
    url: string,
    config?: Parameters<typeof request>[1]
  ): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const result = await request<T>(url, {
        ...config,
        showError: false // 由 composable 统一处理错误
      })
      return result
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      // 可以在这里集成 Nuxt UI 的错误提示
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    execute
  }
}

/**
 * 便捷的 API 方法导出
 */
export const useGet = <T = unknown>(
  url: string,
  params?: Record<string, string | number | boolean>
) => get<T>(url, params)

export const usePost = <T = unknown>(url: string, body?: unknown) =>
  post<T>(url, body)

export const usePut = <T = unknown>(url: string, body?: unknown) =>
  put<T>(url, body)

export const useDelete = <T = unknown>(url: string) => del<T>(url)

export const usePatch = <T = unknown>(url: string, body?: unknown) =>
  patch<T>(url, body)

