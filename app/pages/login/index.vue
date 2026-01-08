<script setup lang="ts">

const route = useRoute();
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField, ButtonProps } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [{
    name: 'phone',
    type: 'phone',
    label: '手机号',
    placeholder: '输入手机号',
    required: true
}, {
    name: 'password',
    label: '密码',
    type: 'password',
    placeholder: '输入密码',
    required: true
}]

const providers = <ButtonProps[]>[{
    variant: 'solid',
    color: 'success',
    label: '使用微信扫码登录',
    icon: 'ic:baseline-wechat',
    onClick: () => {
        toast.add({ title: '快捷登录', description: '使用微信扫码登录，开发中...' })
    }
}]

const schema = z.object({
    phone: z.string().min(11, '手机号不合法'),
    password: z.string().min(8, '密码至少 8 位')
})

type Schema = z.output<typeof schema>

const { login, loading } = useAuth()
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { data } = payload

  try {
    const res = await login({
      phone: data.phone,
      password: data.password
    })


    if (!res.success) {
      toast.add({
        title: '登录失败',
        description: res.message,
        color: 'error'
      })
      return
    }

    toast.add({
      title: '登录成功',
      description: '欢迎使用本系统'
    })

    // ⭐ redirect 优先
    const redirect =
      typeof route.query.redirect === 'string'
        ? route.query.redirect
        : '/'

    await navigateTo(redirect)
  } catch (err) {
    toast.add({
      title: '登录异常',
      description: '请稍后再试',
      color: 'error'
    })
  }
}
</script>

<template>
    <div class="login">
        <div class="logo w-screen mt-4 ml-4">
            <LogoCustom />
        </div>
        <div class="h-screen flex flex-col items-center justify-center gap-4 p-4">
            <UPageCard class="w-full max-w-md">
                <UAuthForm :schema="schema" title="欢迎使用" description="" icon="i-lucide-user" :fields="fields"
                    :providers="providers" :loading="loading" @submit="onSubmit" />
                <NuxtLink to="/register">
                    <div class="text-secondary text-sm">还没有账户？去注册</div>
                </NuxtLink>
            </UPageCard>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    position: fixed;
    top: 0;
    left: 0;
}
</style>