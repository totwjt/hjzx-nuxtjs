<!-- components/SideNav.vue -->
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
</script>

<template>
  <UNavigationMenu :ui="{
    label: 'py-4 text-lg',
    linkLabel: 'text-sm'
  }" :items="consoleNavigationItems" orientation="vertical" highlight class="m-4" />
</template>