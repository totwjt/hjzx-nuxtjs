import { mapJavaError } from './errorMap'
const base = resolveApiBase()

interface JavaResponse<T> {
  code: number
  msg: string
  data: T
}

/**
 * 需要登录的 Java 接口请求
 */
export async function authFetch<T>(
  event: H3Event,
  url: string,
  options: any = {}
): Promise<T> {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw mapJavaError(401, '')
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    clientId: "c5cd7e4891bf95d1d19206ce24a7b32e",
    ContentType: 'application/json',
    ...(options.headers || {})
  }

  const res = await $fetch<JavaResponse<T>>(url, {
    baseURL: base,
    headers,
    ...options,
    // 1. 获取完整请求路径
    onRequest({ request, options }) {
      // 这里的 request 是相对路径，options.baseURL 是基准路径
      const fullPath = options.baseURL ? `${options.baseURL}${request}` : request
      console.log(`🚀 [Request] [${options.method || 'GET'}] ${fullPath}`)
      console.log(`🚀 [Request headers]`, headers)

      // 如果你想看具体的参数
      if (options.body) console.log('📦 Body:', options.body)
      if (options.params) console.log('🔍 Params:', options.params)
    },

    // 2. 捕获网络层面的错误 (如 404, 500)
    onResponseError({ request, response }) {
      console.error(
        `❌ [Response Error] [${response.status}] ${request}`,
        response._data // 这里通常包含后端返回的具体错误 JSON
      )
    },

    // 3. 响应拦截 (处理业务逻辑错误)
    onResponse({ response }) {
      const res = response._data
      console.log(`🍎 [Response Data]`, res);

      // 这里的逻辑对应你原有的 res.code !== 200
      if (res && res.code !== 200) {
        console.warn(`⚠️ [Business Error] Code: ${res.code}, Msg: ${res.msg}`)
        throw mapJavaError(res.code, res.msg)
      }
    }
  })

  if (res.code !== 200) {
    throw mapJavaError(res.code, res.msg)
  }

  return res?.data || res?.rows
}