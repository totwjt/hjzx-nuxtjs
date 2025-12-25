import type { FormSubmitEvent, AuthFormField, ButtonProps } from '@nuxt/ui'

import * as z from 'zod'
const toast = useToast()

const schema = z.object({
    phone: z.string().min(11, '手机号不合法'),
    password: z.string().min(8, '密码至少 8 位')
})

type Schema = z.output<typeof schema>

export async function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('payload', payload);

    const { data, status, error, refresh, clear } = await useHttpFetch('https://m1.apifoxmock.com/m1/7602696-7341408-default/auth/login', {
        method: 'POST',
        key: 'login',
        body: payload
    })

    if(data.value?.code === 200) {
        toast.add({ title: '登录成功', description: '欢迎使用本系统' })
    } else {
        toast.add({ title: '登录失败', description: data.value?.message || '请稍后重试', color: 'error' })
    }

}