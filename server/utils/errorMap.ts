// server/utils/errorMap.ts
export function mapJavaError(code: number, msg: string) {
  switch (code) {
    case 401:
      return createError({ statusCode: 401, message: '未登录' })
    case 403:
      return createError({ statusCode: 403, message: '无权限' })
    default:
      return createError({ statusCode: 400, message: msg || '请求失败' })
  }
}