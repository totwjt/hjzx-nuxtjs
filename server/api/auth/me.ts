// server/api/auth/me.ts

export default defineEventHandler(async (event) => {
  // 1. 获取 cookie 中的 phone 字段
  const phone = getCookie(event, 'phone')

  // 2. 这个临时功能生效，直接 return 目标 JSON
  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw mapJavaError(401, '')
  }
  return {
    "phone": phone || "未知号码", // 如果 cookie 里没找到 phone，给个默认值
    "balance": 100
  }

  /* 原本的代码逻辑（暂时被上面的 return 屏蔽）：
  return await authFetch(event, `/client/auth/me`)
  */
})