import { mapJavaError } from './errorMap'

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
    throw createError({
      statusCode: 401,
      message: '未登录'
    })
  }

  const res = await $fetch<JavaResponse<T>>(url, {
    baseURL: process.env.JAVA_API_BASE,
    headers: {
      Authorization: token,
      ContentType: 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  console.log('www', url, res);
  if (res.code !== 200) {
    throw mapJavaError(res.code, res.msg)
  }

  return res?.data || res?.rows
}