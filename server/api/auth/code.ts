export default defineEventHandler(async (event) => {
  return await myFetch(`/auth/code`)
})
