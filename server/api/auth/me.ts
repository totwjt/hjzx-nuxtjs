export default defineEventHandler(async (event) => {

  const base = resolveApiBase()
  return await authFetch(event,
    `${base}/client/auth/me`
  )

})