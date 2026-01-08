export default defineEventHandler(async (event) => {
  return await myFetch(
    'https://m1.apifoxmock.com/m1/7602696-7341408-default/client/package/templates/list'
  )
})
