export default defineEventHandler(async (event) => {

  try {
    const { code, data } = await authFetch(event, 'https://m1.apifoxmock.com/m1/7602696-7341408-default/client/resource/templates/list')


    if (code !== 200) {
      return {
        code: 500,
        data: null
      }
    }

    return {
      code: 200,
      data
    }
  } catch (error) {

    console.log(error)
    return {
      code: 500,
      user: null
    }
  }
})
