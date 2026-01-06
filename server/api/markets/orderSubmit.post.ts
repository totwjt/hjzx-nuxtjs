import { METHODS } from "node:http"

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  return authFetch(event,
    'https://m1.apifoxmock.com/m1/7602696-7341408-default/client/order/submit',
    {
      method:'post',
      body
    }
  )
})
