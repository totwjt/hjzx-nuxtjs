<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Logo图标',
    to: '/',
    active: route.path.startsWith('/')
  },
  {
    label: '算力市场',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: '模型部署',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  },
  {
    label: 'JStack',
    to: 'https://go.nuxt.com/figma-ui',
  },
  {
    label: '关于我们',
    to: 'https://github.com/nuxt/ui/releases',
    // target: '_blank'
  }
])

const items2 = computed<NavigationMenuItem[]>(() => [
  {
    label: '算力圈',
    to: '/1',
    active: route.path.startsWith('/1')
  },
  {
    label: '文档中心',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: '控制台',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  },
  {
    label: '登陆/注册',
    to: '/login',
    active: true
  },
])

</script>

<template>
  <UHeader class="fixed w-screen backdrop-filter bg-transparent" >
    <template #title>
      <!-- <Logo class="h-6 w-auto" />Logo -->
      <UNavigationMenu :items="items" />
    </template>

    <template #right>
      <UNavigationMenu color="secondary" , :items="items2" />

      <!-- <UColorModeButton />

        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/nuxt/ui"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip> -->
    </template>
  </UHeader>
</template>
