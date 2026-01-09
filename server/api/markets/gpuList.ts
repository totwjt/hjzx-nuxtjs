export default defineEventHandler(async (event) => {
  return await myFetch(
    '/client/package/templates/list'
  )
})
