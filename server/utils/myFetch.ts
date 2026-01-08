import { mapJavaError } from './errorMap'

interface JavaResponse<T> {
  code: number
  msg: string
  data: T
}

/**
 * 不需要登录的 Java 接口请求
 */
export async function myFetch<T>(
  url: string,
  options: any = {}
): Promise<T> {
  const res = await $fetch<JavaResponse<T>>(url, {
    baseURL: process.env.JAVA_API_BASE,
    ...options
  })

  if (res.code !== 200) {
    throw mapJavaError(res.code, res.msg)
  }

  return res?.data || res?.rows
}