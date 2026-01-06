// app/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {

  if (['/', '/index', '/login', '/register'].includes(to.path)) return

  const token = useCookie('auth_token')

  console.log('middleware auth_token', token.value);

  if (!token.value) {
    return navigateTo('/login')
  }
})