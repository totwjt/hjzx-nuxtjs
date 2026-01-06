export const authFetch = async (event: any, url: string, options: any = {}) => {
    const token = getCookie(event, 'auth_token')
    console.log('server auth_token', token)

    if (!token) {
        throw createError({ statusCode: 401, message: '未登录' })
    }

    return await $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}