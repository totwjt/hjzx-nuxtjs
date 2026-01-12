export default defineEventHandler(async (event) => {
  return await authFetch(event, '/client/order/list')
})
