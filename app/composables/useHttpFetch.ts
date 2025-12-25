import type { UseFetchOptions } from '#app'

type HttpFetchOptions<T> = UseFetchOptions<T> & {
  headers?: Record<string, string>
}

export function useHttpFetch<T>(
  url: string,
  options: HttpFetchOptions<T> = {}
) {
  const token = useCookie('token')

  return useFetch(url, {
    ...options,

    baseURL: useRuntimeConfig().public.apiBase,

    headers: {
      ...(options.headers || {}),
      ...(token.value
        ? { Authorization: `Bearer ${token.value}` }
        : {})
    },

    onRequest({ request }) {
      console.debug('[HTTP] Request:', request)
    },

    onResponse({ response }) {

      // { code: number, message: string, data: T }
      // const body = response._data

      // if (body?.code !== 0) {
      //   throw createError({
      //     statusCode: 200,
      //     statusMessage: body?.message || '业务异常'
      //   })
      // }
    },

    onResponseError({ response }) {
      if (response?.status === 401) {
        // token 失效
        token.value = null
        navigateTo('/login')
      }
    },

    onRequestError({ error }) {
      console.error('[HTTP] Request Error:', error)
    }
  })
}