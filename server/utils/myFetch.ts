import { mapJavaError } from './errorMap'
const base = resolveApiBase()

interface JavaResponse<T> {
  code: number
  msg: string
  data: T
  rows?: T // 兼容你代码中的 res.rows
}

export async function myFetch<T>(
  url: string,
  options: any = {}
): Promise<T> {

  return await $fetch<JavaResponse<T>>(url, {
    baseURL: base,
    ...options,

    // 1. 获取完整请求路径
    onRequest({ request, options }) {
      // 这里的 request 是相对路径，options.baseURL 是基准路径
      const fullPath = options.baseURL ? `${options.baseURL}${request}` : request
      console.log(`🚀 [Request] [${options.method || 'GET'}] ${fullPath}`)

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

      // 这里的逻辑对应你原有的 res.code !== 200
      if (res && res.code !== 200) {
        console.warn(`⚠️ [Business Error] Code: ${res.code}, Msg: ${res.msg}`)
        throw mapJavaError(res.code, res.msg)
      }
    }
  }).then(res => {
    // 返回数据部分
    return res?.data || (res as any)?.rows
  })
}