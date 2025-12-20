/**
 * API 请求层封装
 * 基于 Nuxt 的 $fetch，提供统一的请求处理、错误处理和类型支持
 *
 * 注意：useRuntimeConfig 和 $fetch 由 Nuxt 自动导入，无需手动导入
 */

// API 响应基础类型
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 请求配置类型
export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  params?: Record<string, string | number | boolean>
  headers?: Record<string, string>
  timeout?: number
  // 是否显示错误提示（默认 true）
  showError?: boolean
  // 是否显示加载提示（默认 false）
  showLoading?: boolean
}

// 错误类型
export class ApiError extends Error {
  constructor(
    public code: number,
    public override message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * 统一的 API 请求方法
 * @param url 请求地址
 * @param config 请求配置
 * @returns Promise<T>
 */
export async function request<T = unknown>(
  url: string,
  config: RequestConfig = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    params,
    headers = {},
    timeout = 30000,
    showError = true,
    showLoading = false
  } = config

  // 获取运行时配置
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.apiBase || '/api'

  // 构建完整 URL
  const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`

  try {
    // 显示加载提示
    if (showLoading) {
      // 可以集成 Nuxt UI 的 loading 组件
      // 这里先预留接口
    }

    // 发送请求
    const response = await $fetch<ApiResponse<T> | T>(fullUrl, {
      method,
      body: method !== 'GET' ? (body as any) : undefined,
      params: method === 'GET' ? params : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout
    })

    // 检查响应格式：如果是标准格式 { code, message, data }
    if (response && typeof response === 'object' && 'code' in response) {
      const apiResponse = response as ApiResponse<T>
      // 处理业务错误
      if (apiResponse.code !== 200 && apiResponse.code !== 0) {
        throw new ApiError(apiResponse.code, apiResponse.message || '请求失败', apiResponse.data)
      }
      return apiResponse.data as T
    }

    // 如果直接返回数据（非标准格式），直接返回
    return response as T
  } catch (error: unknown) {
    // 处理网络错误
    if (error instanceof ApiError) {
      if (showError) {
        // 可以集成 Nuxt UI 的通知组件
        // 这里先预留接口
        console.error('API Error:', error.message)
      }
      throw error
    }

    // 处理其他错误
    const errorMessage = error instanceof Error ? error.message : '网络请求失败'
    if (showError) {
      console.error('Request Error:', errorMessage)
    }
    throw new ApiError(-1, errorMessage, error)
  }
}

/**
 * GET 请求
 */
export function get<T = unknown>(
  url: string,
  params?: Record<string, string | number | boolean>,
  config?: Omit<RequestConfig, 'method' | 'params'>
): Promise<T> {
  return request<T>(url, { ...config, method: 'GET', params })
}

/**
 * POST 请求
 */
export function post<T = unknown>(
  url: string,
  body?: unknown,
  config?: Omit<RequestConfig, 'method' | 'body'>
): Promise<T> {
  return request<T>(url, { ...config, method: 'POST', body })
}

/**
 * PUT 请求
 */
export function put<T = unknown>(
  url: string,
  body?: unknown,
  config?: Omit<RequestConfig, 'method' | 'body'>
): Promise<T> {
  return request<T>(url, { ...config, method: 'PUT', body })
}

/**
 * DELETE 请求
 */
export function del<T = unknown>(
  url: string,
  config?: Omit<RequestConfig, 'method'>
): Promise<T> {
  return request<T>(url, { ...config, method: 'DELETE' })
}

/**
 * PATCH 请求
 */
export function patch<T = unknown>(
  url: string,
  body?: unknown,
  config?: Omit<RequestConfig, 'method' | 'body'>
): Promise<T> {
  return request<T>(url, { ...config, method: 'PATCH', body })
}

