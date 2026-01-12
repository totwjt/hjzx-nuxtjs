export default defineEventHandler(async (event) => {
  const res = await authFetch(event,
    // '/client/container/list'
    'https://m1.apifoxmock.com/m1/7602696-7341408-default/client/container/list'
  )
  return res
})
