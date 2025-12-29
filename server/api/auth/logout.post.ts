export default defineEventHandler(async (event) => {
  setCookie(event, 'auth_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0
  })

  return {
    success: true
  }
})
