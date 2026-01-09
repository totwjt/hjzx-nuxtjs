export default defineEventHandler(async (event) => {

  const { itemId, type, quantity } = getQuery(event)

  return await myFetch('/client/package/templateItems/calculatePrice', {
    params: {
      itemId,
      type,
      quantity
    }
  })

})
