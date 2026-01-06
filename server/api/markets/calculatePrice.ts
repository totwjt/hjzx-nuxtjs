export default defineEventHandler(async (event) => {

  const { itemId, type, quantity } = getQuery(event)

  return await authFetch(event, 'https://m1.apifoxmock.com/m1/7602696-7341408-default/client/package/templateItems/calculatePrice', {
    params: {
      itemId,
      type,
      quantity
    }
  })

})
