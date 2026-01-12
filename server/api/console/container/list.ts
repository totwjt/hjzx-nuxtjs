export default defineEventHandler(async (event) => {
  const res = await authFetch(event,
    '/client/container/list'
  )
  return res
})
