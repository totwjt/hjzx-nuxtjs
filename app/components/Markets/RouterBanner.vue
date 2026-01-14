<template>
  <div
    class="router-banner flex justify-between items-center gap-2 py-4 bg-white ">

    <UButton v-for="(item, index) in routerItems" :key="index" :to="item.to" color="neutral"  variant="soft"
      active-color="primary" active-variant="solid"
      size="lg"
      :active="activeRoute === item.to" :icon="item.icon" block
      class="p-4 text-xl btn"
      :disabled="item.disabled"
      >
      {{ item.label }}
    </UButton>
  </div>
</template>

<script lang="ts" setup>

// 判断是否当前路由
const route = useRoute();

const activeRoute = computed(() => route.path);
const routerItems = ref([
  {
    icon: 'tabler:device-desktop-code',
    label: 'GPU容器实例',
    to: '/markets/',
    disabled: false
  },
  {
    icon: 'tabler:cpu-2',
    label: 'CPU容器实例',
    to: '/markets/cpu',
    disabled: false
  },
  {
    icon: 'tabler:server',
    label: 'GPU裸金属',
    to: '/markets/bms',
    disabled: true
  },
  {
    icon: 'tabler:puzzle',
    label: '模型部署',
    to: '/markets/square',
    disabled: true
  },
  {
    icon: 'tabler:photo',
    label: '企业部署',
    to: '/markets/enterprise',
    disabled: true
  }
])

</script>

<style></style>