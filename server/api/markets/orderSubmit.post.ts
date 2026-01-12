
export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  return authFetch(event, '/client/order',
    {
      method:'post',
      body
    }
  )
})
