<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { user, isLoggedIn } = storeToRefs(userStore)

const { logout, loading } = useAuth()

const UDropdownMenuOpen = ref(false)
const dropDownItem = computed(() => [
  [
    {
      label: user.value?.phone || '用户',
      avatar: {
        src: '/user/user-avatar.png'
      },
      to: '/console/user'
    }
  ],
  [
    {
      slot: 'balance'
    }
  ],
  [
    {
      onSelect: async () => {
        await logout()
        UDropdownMenuOpen.value = false
        await navigateTo('/login')
      },
      label: '退出登录',
      icon: 'i-lucide-log-out',
    }
  ]
])


const items = computed<NavigationMenuItem[]>(() => [
  {
    label: '算力市场',
    to: '/markets/',
    active: false
  },
  {
    label: '模型部署',
    to: '/markets/square',
    active: false
  },
  {
    label: 'JStack',
    active: false
    // to: 'https://go.nuxt.com/figma-ui',
  },
  {
    label: '关于我们',
    active: false
    // to: 'https://github.com/nuxt/ui/releases',
    // target: '_blank'
  }
])

const items2 = computed<NavigationMenuItem[]>(() => [
  {
    label: '算力圈',
    // to: '/1',
    // active: route.path.startsWith('/1')
  },
  {
    label: '文档中心',
    // to: '/docs/getting-started',
    // active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: '控制台',
    to: '/console/container',
    // active: route.path.startsWith('/docs/components')
  }
])

const goToBalance = async () => {
  await navigateTo('console/remain')
}

</script>

<template>
  <UHeader class="custom-header light:bg-linear-to-br light:from-primary-200 light:to-neutral-50 light:border-primary-100">

    <template #left>
      <div class="flex items-center">
        <LogoCustom />
        <UNavigationMenu :items="items" />
      </div>
    </template>

    <template #right>
      <UNavigationMenu color="secondary" :items="items2" />

      <UDropdownMenu arrow v-model:open="UDropdownMenuOpen" :items="dropDownItem" v-if="isLoggedIn">

        <template #balance>

          <div class="text-left min-w-30 flex justify-between items-center" @click="goToBalance">
            <div>
              <div class="text-xs font-extrabold">可用余额</div>
              <div class="">
                <div class="text-red-500 text-xs font-extrabold">¥ {{ user?.balance }}</div>
              </div>
            </div>
            <UIcon name="i-material-symbols:chevron-right" class="text-gray-300 mr-2 size-5 font-black align-middle" />
          </div>
        </template>

        <UUser class="cursor-pointer" :name="user?.phone" :avatar="{
          src: '/user/user-avatar.png'
        }" />

      </UDropdownMenu>

      <UButton color="secondary" variant="ghost" to="/login" v-else>
        登录/注册
      </UButton>

      <ThemeSwitcher />

    </template>
  </UHeader>
  <!-- <div class="min-h-16"></div> -->
</template>


<style lang="scss">
.custom-header {
  --ui-container: 100%;
}
</style>