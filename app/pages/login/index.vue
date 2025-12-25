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
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Submitted', payload)
}

// import { onSubmit } from './hooks'
</script>

<template>
    <div class="login">
        <ClientOnly fallback-tag="span" fallback="Loading comments...">
            <div class="logo w-screen mt-4 ml-4">
                <LogoCustom />
            </div>
            <div class="h-screen flex flex-col items-center justify-center gap-4 p-4">
                <UPageCard class="w-full max-w-md">
                    <UAuthForm :schema="schema" title="Login"
                        description="Enter your credentials to access your account." icon="i-lucide-user"
                        :fields="fields" :providers="providers" @submit="onSubmit" />
                </UPageCard>
            </div>
        </ClientOnly>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    position: fixed;
    top: 0;
    left: 0;
}
</style>