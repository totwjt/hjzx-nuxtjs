export default defineEventHandler(async (event) => {
    const { phone, password, uuid, code } = await readBody(event)

    // 验证必填字段
    if (!phone || !password) {
        throw createError({
            statusCode: 400,
            message: '手机号和密码不能为空'
        })
    }

    const data = await myFetch('/client/login', {
        method: 'POST',
        body: {
            username: phone,
            password,
            uuid,
            code,
            clientId: "c5cd7e4891bf95d1d19206ce24a7b32e",
            "grantType": "password"
        }
    })


    // 设置 cookie
    setCookie(event, 'auth_token', data?.access_token, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production',
        secure: false,    // 1
        // sameSite: 'none',  // 2
        // maxAge: 60 * 60 * 24 * 7, // 7天
        maxAge: data?.expire_in, // 7天
        path: '/'
    })

    // 设置 cookie
    setCookie(event, 'phone', phone, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production',
        secure: false,    // 1
        // sameSite: 'none',  // 2
        maxAge: data?.expire_in, // 7天
        path: '/'
    })

    return data
})