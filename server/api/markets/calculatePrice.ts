export default defineEventHandler(async (event) => {

  const { itemId, type, quantity } = getQuery(event)

  try {
    const { code, msg, data } = await authFetch(event, 'https://m1.apifoxmock.com/m1/7602696-7341408-default/client/package/templateItems/calculatePrice', {
      params: {
        itemId,
        type,
        quantity
      }
    })

    if (code === 200) {
      return {
        success: true,
        price: data
      }
    }
  } catch (error) {
    console.log(error)

    return {
      code: 401,
      user: null
    }
  }
})
