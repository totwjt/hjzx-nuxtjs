export default defineEventHandler(async (event) => {
  try {
    // 3. 用 token 换用户信息
    const { code, rows } = await authFetch(event,
      'https://m1.apifoxmock.com/m1/7602696-7341408-default/client/package/templates/list'
    )

    if (code !== 200) {
      return {
        code: 500,
        user: null
      }
    }

    return {
      code: 200,
      rows
    }
  } catch (error) {
    return {
      code: 500,
      user: null
    }
  }
})
