<template>
  <UApp :locale="zh_cn" :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
const toaster = {}
// const toaster = { position: 'top-center' }

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
await callOnce(async () => {
  await userStore.ensureUser()
})
</script>