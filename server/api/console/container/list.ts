export default defineEventHandler(async (event) => {
  const res = await authFetch(event,
    'https://m1.apifoxmock.com/m1/7602696-7341408-default/console/container/list'
  )
  console.log('bbb', res);
  return res
})
