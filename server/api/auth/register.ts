export default defineEventHandler(async (event) => {

  const { phone, password } = await readBody(event)
  console.log('phone', phone, password, `/client/register`);

  // 验证必填字段
  if (!phone || !password) {
    throw createError({
      statusCode: 500,
      message: '手机号和密码不能为空'
    })
  }

  // const { code, msg, data } = await myFetch(`${base}/client/register`, {
  const res = await myFetch(`/client/register`, {
    method: 'POST',
    body: {
      username: phone,
      password
    }
  })
  return res
})
