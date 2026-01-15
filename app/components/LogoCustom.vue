<!-- components/Logo.vue -->
<template>
  <NuxtLink to="/">
    <div class="logo-lay p-2 dark:bg-primary range">
      <img src="/logo3.png" alt="Logo" class="logo-image" />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo-lay {
  height: 63px;

  .logo-image {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
}
</style>