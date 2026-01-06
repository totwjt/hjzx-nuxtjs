<script setup lang="ts">

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

const schema = z.object({
  phone: z.string().min(11, '手机号不合法'),
  password: z.string().min(8, '密码至少 8 位')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { data } = payload

  try {

    const { code, message } = await $fetch('/api/auth/register', {
      method: 'post',
      body: {
        phone: data.phone, password: data.password
      }
    })

    if (code === 200) {
      toast.add({ title: '注册成功', description: '欢迎使用本系统' })
      await navigateTo('/login')
    } else {
      toast.add({ title: '注册失败', description: message || '请稍后重试', color: 'error' })
    }
  } catch (error) {
    toast.add({ title: '注册失败', description: '请稍后重试', color: 'error' })
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
        <UAuthForm :schema="schema" title="欢迎注册" description="" icon="i-lucide-user" :fields="fields" :loading="loading"
          @submit="onSubmit" />
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