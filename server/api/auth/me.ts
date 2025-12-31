export default defineEventHandler(async (event) => {
  // 1. 从 cookie 读取 token
  const token = getCookie(event, 'auth_token')

  // 2. 没有 token = 未登录
  if (!token) {
    return {
      code: 4011,
      user: null
    }
  }

  try {
    // 3. 用 token 换用户信息
    const { code, data } = await authFetch(event,
      'https://m1.apifoxmock.com/m1/7602696-7341408-default/client/auth/me'
    )

    if (code !== 200) {
      return {
        code: 401,
        user: null
      }
    }

    return {
      code: 200,
      user: {
        id: data.id,
        phone: data?.phone,
        email: data?.email,
        avatar: data?.avatar,
        balance: data?.balance
      }
    }
  } catch (error) {
    return {
      code: 401,
      user: null
    }
  }
})