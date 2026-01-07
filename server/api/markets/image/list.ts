import { myFetch } from "~/server/utils/myFetch"

export default defineEventHandler(async (event) => {

  return await myFetch('https://m1.apifoxmock.com/m1/7602696-7341408-default/client/resource/templates/list')

})
