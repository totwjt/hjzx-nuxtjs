export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const res = await authFetch(event,
    '/client/container/list',
    {
      params: {
        instanceType: query.instanceType
      }
    }
  )
  return res
})
