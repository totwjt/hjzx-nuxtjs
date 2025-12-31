export default defineEventHandler(async (event) => {
  try {
    const { phone, password } = await readBody(event)

    // 验证必填字段
    if (!phone || !password) {
      throw createError({
        statusCode: 500,
        message: '手机号和密码不能为空'
      })
    }

    const { code, msg, data } = await $fetch('https://m1.apifoxmock.com/m1/7602696-7341408-default/client/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        phone,
        password
      }
    })

    if (code !== 200) {
      throw createError({
        statusCode: code,
        message: msg || '注册失败'
      })
    }

    return {
      code,
      message: msg,
      // user: data.user
    }
  } catch (error) {
    console.error('Login error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || '注册失败，请稍后重试'
    })
  }
})
