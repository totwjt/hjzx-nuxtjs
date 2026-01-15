<!-- components/SideNav.vue -->
<script setup lang="ts">

</script>

<template>
  <UNavigationMenu :ui="{
    label: 'py-4 text-lg',
    link: 'py-3',
    linkLabel: 'text-sm'
  }" :items="consoleNavigationItems" popover  variant="pill" orientation="vertical" class="m-4" />
</template>