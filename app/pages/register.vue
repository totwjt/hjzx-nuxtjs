<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()

/* ================= 验证码状态 ================= */

const captchaUuid = ref('')
const captchaImg = ref('')
const captchaEnabled = ref(false)

const loadCaptcha = async () => {
  try {
    const res: any = await $fetch('/api/auth/code')
    captchaEnabled.value = !!res.captchaEnabled
    captchaUuid.value = res.uuid || ''
    captchaImg.value = res.img
      ? `data:image/png;base64,${res.img}`
      : ''
  } catch (err) {
    captchaEnabled.value = false
    toast.add({ title: '验证码加载失败', color: 'error' })
  }
}

onMounted(loadCaptcha)

/* ================= 表单模型 ================= */

const form = reactive({
  phone: '',
  password: '',
  code: ''
})

/* ================= 校验 Schema ================= */

const schema = z.object({
  phone: z
    .string({ required_error: '请输入手机号' })
    .regex(/^1[3-9]\d{9}$/, '手机号格式不正确'),

  password: z
    .string({ required_error: '请输入密码' })
    .min(8, '密码至少 8 位'),

  code: z.string().optional().transform(v => v?.trim())
}).superRefine((data, ctx) => {
  if (!captchaEnabled.value) return

  if (!data.code) {
    ctx.addIssue({
      path: ['code'],
      message: '请输入验证码',
      code: z.ZodIssueCode.custom
    })
    return
  }

  // if (data.code.length < 4 || data.code.length > 6) {
  //   ctx.addIssue({
  //     path: ['code'],
  //     message: '验证码长度应为 4-6 位',
  //     code: z.ZodIssueCode.custom
  //   })
  // }
})

type Schema = z.output<typeof schema>

/* ================= 提交 ================= */

const loading = ref(false)

async function onSubmit(e: FormSubmitEvent<Schema>) {
  const data = e.data
  loading.value = true

  try {
    const res: any = await $fetch('/api/auth/register', {
      method: 'post',
      body: {
        phone: data.phone,
        password: data.password,
        code: data.code,
        uuid: captchaUuid.value
      }
    })

    console.log('register', res);

    toast.add({ title: '注册成功', description: '欢迎使用本系统' })
    await navigateTo('/login')
    return

  } catch (err) {
    toast.add({ title: '注册失败', description: '请稍后重试', color: 'error' })
    if (captchaEnabled.value) {
      loadCaptcha()
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login">
    <!-- Logo -->
    <div class="logo w-screen mt-4 ml-4">
      <LogoCustom />
    </div>

    <!-- 主体 -->
    <div class="h-screen flex flex-col items-center justify-center gap-4 p-4">
      <UPageCard class="w-full max-w-md">
        <UForm :schema="schema" :state="form" class="space-y-4" @submit="onSubmit">
          <h2 class="text-xl font-semibold text-left">
            欢迎注册
          </h2>

          <!-- 手机号 -->
          <UFormField label="手机号" name="phone">
            <UInput class="w-full" v-model="form.phone" placeholder="输入手机号" />
          </UFormField>

          <!-- 密码 -->
          <UFormField label="密码" name="password">
            <UInput class="w-full" v-model="form.password" type="password" placeholder="输入密码" />
          </UFormField>

          <!-- 验证码 -->
          <UFormField v-if="captchaEnabled" label="验证码" name="code">
            <div class="flex items-center gap-2">
              <UInput v-model="form.code" placeholder="输入验证码" class="flex-1" />
              <img v-if="captchaImg" :src="captchaImg" class="h-10 w-24 cursor-pointer rounded border" title="点击刷新验证码"
                @click="loadCaptcha" />
            </div>
          </UFormField>

          <!-- 提交 -->
          <UButton type="submit" color="primary" block :loading="loading">
            注册
          </UButton>

          <NuxtLink to="/login">
            <div class="text-secondary text-sm text-center">
              已有账户？去登录
            </div>
          </NuxtLink>
        </UForm>
      </UPageCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  position: fixed;
  top: 0;
  left: 0;
}
</style>