export default defineEventHandler(async (event) => {
    try {
        const { phone, password } = await readBody(event)

        // 验证必填字段
        if (!phone || !password) {
            throw createError({
                statusCode: 400,
                message: '手机号和密码不能为空'
            })
        }

        const { code, message, data } = await $fetch('http://127.0.0.1:4523/m1/7602696-7341408-default/client/login', {
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
                message: message || '登录失败'
            })
        }

        // 设置 cookie
        setCookie(event, 'auth_token', data?.token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === 'production',
            secure: false,    // 1
            // sameSite: 'none',  // 2
            maxAge: 60 * 60 * 24 * 7, // 7天
            path: '/'
        })

        return {
            code,
            message: message,
            // user: data.user
        }
    } catch (error) {
        console.error('Login error:', error)

        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || '登录失败，请稍后重试'
        })
    }
})