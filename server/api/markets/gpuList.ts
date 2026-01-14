export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return await myFetch(
    '/client/package/templates/list',
    {
      params: {
        templateType: query.type
      }
    }
  )
})