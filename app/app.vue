<template>
  <UApp :locale="zh_cn" :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
const toaster = { }
// const toaster = { position: 'top-center' }
import { useUserStore } from '@/stores/user'

// 只在有登录态的前提下恢复
const userStore = useUserStore()

if (import.meta.client) {
  await userStore.restore()
}
</script>